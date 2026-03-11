import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Loader2 } from 'lucide-react';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const VideoDetails = lazy(() => import('./pages/VideoDetails').then(m => ({ default: m.VideoDetails })));
const Watchlist = lazy(() => import('./pages/Watchlist').then(m => ({ default: m.Watchlist })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Global Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-red-600" />
  </div>
);

// Layout Wrapper
const Layout = ({ children }) => (
  <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes - No Navbar */}
            <Route path="/login" element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            } />
            <Route path="/register" element={
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            } />

            {/* Main Application Routes - With Navbar */}
            <Route path="/*" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/video/:id" element={<VideoDetails />} />
                    
                    {/* Protected Routes */}
                    <Route path="/watchlist" element={
                      <ProtectedRoute>
                        <Watchlist />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    {/* 404 Catch All */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Layout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
