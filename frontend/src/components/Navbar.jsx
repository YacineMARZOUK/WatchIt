import { Link, useNavigate } from 'react-router-dom';
import { Search, MonitorPlay, Sun, Moon, User, LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import { useState } from 'react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-bold transition-transform group-hover:scale-110">
            <MonitorPlay size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
            Watch<span className="text-red-600">It</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-auto hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="search"
              placeholder="Search movies, series, documentaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border-none focus:-outline-offset-2 focus:ring-2 focus:ring-red-500 text-sm"
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/watchlist" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="gap-2">
                  <CheckSquare size={16} /> Watchlist
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User size={16} /> <span className="hidden sm:inline-block">{user.username}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
