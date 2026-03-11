import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button } from '../components/Button';
import { VideoCard } from '../components/VideoCard';
import { Star, Clock, Calendar, Check, Plus, AlertCircle, Loader2 } from 'lucide-react';
import { videoService, userService } from '../services/api';

export function VideoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Watchlist state [ { id, userId, videoId, addedAt } ]
  const [watchlist, setWatchlist] = useLocalStorage('watchit_watchlist', []);
  // WatchHistory state [ { id, userId, videoId, watchedAt, progressTime, completed } ]
  const [history, setHistory] = useLocalStorage('watchit_history', []);

  const [video, setVideo] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch current video
        const videoResponse = await videoService.getVideoById(id);
        const currentVideo = videoResponse.data;
        setVideo(currentVideo);

        // Fetch all videos to find similar ones
        try {
          const allVideosResponse = await videoService.getAllVideos();
          const similar = allVideosResponse.data
            .filter(v => v.categoryId === currentVideo.categoryId && v.id !== currentVideo.id)
            .slice(0, 5);
          setSimilarVideos(similar);
        } catch (simErr) {
          console.error("Failed to fetch similar videos", simErr);
        }

        // Check if in watchlist
        if (user) {
          try {
            const watchlistResponse = await userService.getWatchlist(user.id);
            const userWatchlist = watchlistResponse.data;
            // Assuming backend returns an array of objects with videoId or an array of video IDs
            const isInList = userWatchlist.some(item =>
              (typeof item === 'object' ? item.videoId : item) === currentVideo.id
            );
            setInWatchlist(isInList);
          } catch (watchErr) {
            console.error("Failed to verify watchlist status", watchErr);
          }
        }
      } catch (err) {
        console.error("Failed to fetch video details:", err);
        setError("Video not found or failed to load.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVideoDetails();
    }
  }, [id, user]);

  // Determine category locally if needed (assuming backend still uses numeric IDs that match frontend enum for now)
  // If backend returns category details, this might not be needed.
  // We remove local category matching if backend already provides 'categoryName'
  // But for now let's safely ignore it or use a default if it breaks.

  // Simulate adding to history when page loads
  useEffect(() => {
    if (user && video) {
      const existingEntry = history.find(h => h.userId === user.id && h.videoId === video.id);
      if (!existingEntry) {
        setHistory([
          ...history,
          {
            id: Math.random().toString(36).substring(2, 9),
            userId: user.id,
            videoId: video.id,
            watchedAt: new Date().toISOString(),
            progressTime: 0,
            completed: false
          }
        ]);
      }
    }
  }, [user, video]); // Only run when user or video changes

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
        <h2 className="text-xl font-semibold">Loading Video...</h2>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Video not found</h2>
        <p className="text-zinc-500 mb-6">{error || "The content you are looking for does not exist."}</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const toggleWatchlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      if (inWatchlist) {
        await userService.removeFromWatchlist(user.id, video.id);
        setInWatchlist(false);
      } else {
        await userService.addToWatchlist(user.id, video.id);
        setInWatchlist(true);
      }
    } catch (err) {
      console.error("Failed to modify watchlist:", err);
      alert("An error occurred while modifying your watchlist.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Video Player Section */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl mb-8">
        <iframe
          src={`${video.trailerUrl}?autoplay=0&rel=0&modestbranding=1`}
          title={`${video.title} Trailer`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-red-600/10 text-red-500 text-sm font-semibold rounded-full">
                {video.type}
              </span>
              <span className="px-3 py-1 bg-red-600/10 text-red-500 text-sm font-semibold rounded-full">
                {video.type}
              </span>
              {/* Optional: Add category mapping here if needed by the design */}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
              {video.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                {video.rating} / 10
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {video.releaseYear}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {video.duration}
              </span>
            </div>
          </div>

          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {video.description}
          </p>

          <div className="flex gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              size="lg"
              variant={inWatchlist ? "secondary" : "primary"}
              onClick={toggleWatchlist}
              className="gap-2"
            >
              {inWatchlist ? (
                <>
                  <Check className="h-5 w-5" /> In Watchlist
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" /> Add to Watchlist
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar Metadata */}
        <div className="space-y-6 bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 h-fit">
          <div>
            <h3 className="text-sm font-medium text-zinc-500 mb-1">Director</h3>
            <p className="font-semibold">{video.director}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-500 mb-2">Cast</h3>
            <div className="flex flex-wrap gap-2">
              {video.cast && video.cast.map(actor => (
                <span key={actor} className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-lg text-sm border border-zinc-200 dark:border-zinc-700">
                  {actor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Content */}
      {similarVideos.length > 0 && (
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-6">Similar Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {similarVideos.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
