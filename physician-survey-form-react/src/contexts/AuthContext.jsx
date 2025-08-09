import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me'); // Use api.get
        setUser(response.data); // Axios puts data in .data
      } catch (error) {
        console.error('Failed to fetch user', error);
        setUser(null);
        // Handle 401 Unauthorized specifically if needed, though interceptor handles it
        if (error.response && error.response.status === 401) {
          navigate('/auth'); // Redirect to login on 401
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => { // Assuming login takes email and password
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data); // Axios puts data in .data
      // You might want to navigate here after successful login
      // navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      // Handle login error (e.g., display toast)
      throw error; // Re-throw to allow component to handle
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout'); // Use api.post
      setUser(null);
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
