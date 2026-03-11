import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { VideoCard } from '../components/VideoCard';
import { Button } from '../components/Button';
import { Bookmark, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { videoService, userService } from '../services/api';

export function Watchlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useLocalStorage('watchit_watchlist', []);
  const [history] = useLocalStorage('watchit_history', []);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlistAndVideos = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // 1. Fetch user's watchlist items
        const watchlistResponse = await userService.getWatchlist(user.id);
        const watchlistItems = watchlistResponse.data; // Expected format depends on backend

        // 2. Fetch all videos to map details
        const videosResponse = await videoService.getAllVideos();
        const allVideos = videosResponse.data;

        // 3. Map watchlist items to video objects
        const detailedWatchlist = watchlistItems.map(item => {
          // Assuming backend returns an array of video IDs or objects with videoId
          const videoId = typeof item === 'object' ? item.videoId : item;
          const video = allVideos.find(v => v.id === videoId);
          if (!video) return null;

          const isWatched = history.some(h => h.userId === user.id && h.videoId === videoId);
          // For deletion, if backend returns an item ID, use it, else use videoId
          const watchlistItemId = typeof item === 'object' ? (item.id || videoId) : videoId;

          return { ...video, isWatched, watchlistItemId };
        }).filter(v => v !== null);

        setUserWatchlist(detailedWatchlist);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
        setError("Could not load your watchlist. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistAndVideos();
  }, [user, history]);

  const removeFromWatchlist = async (e, videoId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await userService.removeFromWatchlist(user.id, videoId);
      // Optimistically update UI
      setUserWatchlist(userWatchlist.filter(item => item.id !== videoId));
    } catch (err) {
      console.error("Failed to remove from watchlist:", err);
      // Ideally show a toast notification here
      alert("Failed to remove video. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
        <h2 className="text-xl font-semibold">Loading Watchlist...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p className="text-zinc-500 mb-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
          <Bookmark className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            My Watchlist
          </h1>
          <p className="text-zinc-500 mt-1">
            {userWatchlist.length} {userWatchlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      {userWatchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {userWatchlist.map(video => (
            <div key={video.watchlistItemId} className="relative group">
              <VideoCard video={video} />

              {/* Overlay controls - specific to Watchlist */}
              <button
                onClick={(e) => removeFromWatchlist(e, video.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110 shadow-lg"
                title="Remove from watchlist"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              {video.isWatched && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-md z-20 shadow-md">
                  WATCHED
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-dashed">
          <Bookmark className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
          <p className="text-zinc-500 mb-6">Save shows and movies to keep track of what you want to watch.</p>
          <Button onClick={() => navigate('/')}>Explore Content</Button>
        </div>
      )}
    </div>
  );
}
