
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  authMethod: 'LOCAL' | 'LDAP';
  setAuthMethod: (method: 'LOCAL' | 'LDAP') => void;
  login: (username: string, password: string, authType: 'LOCAL' | 'LDAP') => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<'LOCAL' | 'LDAP'>('LDAP');

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string, authType: 'LOCAL' | 'LDAP'): Promise<boolean> => {
    console.log(`Attempting ${authType} login for:`, username);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login logic - in real app, this would call your backend
    if (username && password) {
      // Extended permissions for a more comprehensive core portal
      const mockUser: User = {
        id: '1',
        username,
        email: `${username}@company.com`,
        permissions: [
          'dashboard',
          'system-activity',
          'users',
          'profile', 
          'roles',
          'k8s',
          'monitoring',
          'database',
          'fee-config',
          'payment-methods',
          'error-codes',
          'api-testing',
          'documents',
          'security',
          'api-keys',
          'notifications',
          'settings',
          'core-momo',
          'core-paylater',
          'core-newton',
          'core-invest',
          'core-error-desc',
          'user-search',
          'user-management'
        ]
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    }
    
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    console.log('Attempting Google login');
    
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful Google login
    const mockUser: User = {
      id: '2',
      username: 'Google User',
      email: 'user@gmail.com',
      permissions: [
        'dashboard',
        'system-activity',
        'users',
        'profile', 
        'roles',
        'k8s',
        'monitoring',
        'database',
        'fee-config',
        'payment-methods',
        'error-codes',
        'api-testing',
        'documents',
        'security',
        'api-keys',
        'notifications',
        'settings',
        'core-momo',
        'core-paylater',
        'core-newton',
        'core-invest',
        'core-error-desc',
        'user-search',
        'user-management'
      ]
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      authMethod, 
      setAuthMethod, 
      login, 
      loginWithGoogle, 
      logout 
    }}>
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
