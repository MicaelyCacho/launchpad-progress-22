import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    email: 'aluno@launch.com',
    name: 'João Silva',
    role: 'student'
  },
  {
    id: '2',
    email: 'professor@launch.com',
    name: 'Maria Santos',
    role: 'teacher'
  },
  {
    id: '3',
    email: 'admin@launch.com',
    name: 'Pedro Admin',
    role: 'admin'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simula autenticação
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'senha123') {
      setUser(foundUser);
      localStorage.setItem('launch_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('launch_user');
  };

  // Verifica se há usuário no localStorage ao carregar
  React.useEffect(() => {
    const savedUser = localStorage.getItem('launch_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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