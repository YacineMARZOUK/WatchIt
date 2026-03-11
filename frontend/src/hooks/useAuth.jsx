import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('watchit_users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('watchit_current_user', null);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (username, email, password) => {
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      // Use crypto.randomUUID() to generate a valid UUID format for PostgreSQL
      id: crypto.randomUUID(),
      username,
      email,
      password // Note: In a real app, never store plain text passwords!
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser); // Auto login after register
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    user: currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
