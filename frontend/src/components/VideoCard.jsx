import { Link } from 'react-router-dom';
import { Play, Star, Clock } from 'lucide-react';
import { categories } from '../data/mockData';

export function VideoCard({ video }) {
  const category = categories.find(c => c.id === video.categoryId);

  return (
    <div className="group relative flex flex-col gap-2 rounded-xl transition-all duration-300 hover:scale-105 hover:z-10">
      {/* Thumbnail Container */}
      <Link to={`/video/${video.id}`} className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30">
            <Play className="h-6 w-6 ml-1" /> {/* ml-1 for optical alignment of play icon */}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {video.type}
          </span>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-2">
          <span className="rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {video.duration}
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="flex flex-col gap-1 px-1">
        <Link to={`/video/${video.id}`} className="font-semibold text-zinc-100 line-clamp-1 hover:text-red-500 transition-colors">
          {video.title}
        </Link>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              {video.rating}
            </span>
            <span>{video.releaseYear}</span>
            <span>{category?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
