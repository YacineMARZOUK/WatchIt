import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button } from '../components/Button';
import { User, Mail, Bookmark, PlayCircle, LogOut, Settings } from 'lucide-react';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [watchlist] = useLocalStorage('watchit_watchlist', []);
  const [history] = useLocalStorage('watchit_history', []);

  const stats = useMemo(() => {
    if (!user) return { watchlistCount: 0, watchedCount: 0 };
    
    return {
      watchlistCount: watchlist.filter(item => item.userId === user.id).length,
      watchedCount: history.filter(item => item.userId === user.id).length
    };
  }, [user, watchlist, history]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null; // Should be caught by ProtectedRoute anyway

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Account Profile
        </h1>
        <p className="text-zinc-500 mt-1">Manage your account settings and view your statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
            <div className="w-24 h-24 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <div className="flex items-center justify-center gap-2 text-zinc-500 mt-1 text-sm">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4" /> Settings
            </h3>
            <Button variant="outline" className="w-full justify-start">Edit Profile</Button>
            <Button variant="outline" className="w-full justify-start">Change Password</Button>
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Button 
                variant="danger" 
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics and Activity */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold">Your Activity</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-red-600/10 text-red-500 rounded-xl">
                <Bookmark className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Saved to Watchlist</p>
                <p className="text-3xl font-bold">{stats.watchlistCount}</p>
                <Button variant="ghost" size="sm" className="px-0 h-auto mt-1 text-red-500 hover:text-red-400" onClick={() => navigate('/watchlist')}>
                  View all &rarr;
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-green-500/10 text-green-500 rounded-xl">
                <PlayCircle className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Videos Watched</p>
                <p className="text-3xl font-bold">{stats.watchedCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="font-semibold mb-4">Account Information</h3>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <dt className="text-zinc-500">Member since</dt>
                <dd className="font-medium">March 2026</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <dt className="text-zinc-500">Subscription Plan</dt>
                <dd className="font-medium text-red-500">WatchIt Free</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-zinc-500">Account ID</dt>
                <dd className="font-medium font-mono text-xs">{user.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
