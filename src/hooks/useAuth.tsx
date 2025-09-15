import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not_started';
  walletBalance: number;
}

export type UserType = 'public' | 'registered' | 'kyc' | 'admin';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const savedUserType = localStorage.getItem('userType') as UserType;
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string, role: UserType = 'registered') => {
    // Mock authentication
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      phone: '+91 9876543210',
      kycStatus: role === 'kyc' ? 'approved' : 'not_started',
      walletBalance: role === 'kyc' ? 125000 : 0
    };

    setUser(mockUser);
    setUserType(role);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('userType', role);
    
    return Promise.resolve(mockUser);
  };

  const logout = () => {
    setUser(null);
    setUserType('public');
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    userType,
    isAuthenticated,
    login,
    logout,
    updateUser
  };
};