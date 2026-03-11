import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../data/mockData';
import { VideoCard } from '../components/VideoCard';
import { Filter, ArrowUpDown, Loader2, AlertCircle } from 'lucide-react';
import { videoService } from '../services/api';

export function Home() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [filterType, setFilterType] = useState('ALL'); // ALL, FILM, SERIE, DOCUMENTAIRE
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent'); // recent, rating, title
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await videoService.getAllVideos();
        setVideos(response.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setError("Could not load videos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Apply filters and sorting
  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videos];

    // Search filter
    if (initialSearch) {
      const query = initialSearch.toLowerCase();
      result = result.filter(v =>
        v.title.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filterType !== 'ALL') {
      result = result.filter(v => v.type === filterType);
    }

    // Category filter
    if (filterCategory !== 'ALL') {
      result = result.filter(v => v.categoryId === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'recent') {
        return b.releaseYear - a.releaseYear;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [videos, initialSearch, filterType, filterCategory, sortBy]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
        <h2 className="text-xl font-semibold">Loading Discover...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-zinc-500 mb-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with title and search term if active */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {initialSearch ? `Search results for "${initialSearch}"` : 'Discover'}
        </h1>
        <p className="text-zinc-500 mt-2">Find your next favorite movie or series.</p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 w-full sm:w-auto">
          <Filter size={18} />
          Filters:
        </div>

        <div className="flex flex-wrap gap-2 flex-1">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-9 px-3 rounded-md bg-zinc-100 dark:bg-zinc-800 border-none text-sm focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Types</option>
            <option value="FILM">Movies</option>
            <option value="SERIE">Series</option>
            <option value="DOCUMENTAIRE">Documentaries</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-9 px-3 rounded-md bg-zinc-100 dark:bg-zinc-800 border-none text-sm focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-sm font-medium text-zinc-500 flex items-center gap-1">
            <ArrowUpDown size={16} /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 rounded-md bg-zinc-100 dark:bg-zinc-800 border-none text-sm focus:ring-2 focus:ring-red-500"
          >
            <option value="recent">Recently Added</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {filteredAndSortedVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-dashed">
          <h3 className="text-xl font-semibold mb-2">No content found</h3>
          <p className="text-zinc-500">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
