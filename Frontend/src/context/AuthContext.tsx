import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
    
    // In a real app, this would verify the token with the backend
    // For example:
    // async function verifyToken() {
    //   try {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //       const response = await axios.get('/api/auth/verify', {
    //         headers: { Authorization: `Bearer ${token}` }
    //       });
    //       setUser(response.data.user);
    //     }
    //   } catch (error) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock login - in a real app this would be an API call
      // const response = await axios.post('/api/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // Mock successful response
      const mockUser = { id: '1', email, name: email.split('@')[0] };
      const mockToken = 'mock-jwt-token';
      
      // Store token and user in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock register - in a real app this would be an API call
      // const response = await axios.post('/api/auth/register', { name, email, password });
      // const { token, user } = response.data;
      
      // Mock successful response
      const mockUser = { id: '1', email, name };
      const mockToken = 'mock-jwt-token';
      
      // Store token and user in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};