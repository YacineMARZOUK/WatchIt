import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MonitorPlay } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = login(email, password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white font-bold transition-transform group-hover:scale-110">
              <MonitorPlay size={28} />
            </div>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Please sign in to your account
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 py-8 px-6 shadow-xl rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                {error}
              </div>
            )}
            
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-zinc-500">Don't have an account? </span>
            <Link to="/register" className="font-semibold text-red-600 hover:text-red-500 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
