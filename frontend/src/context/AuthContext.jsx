import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedMember = localStorage.getItem('selectedMember');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedMember) setSelectedMember(JSON.parse(savedMember));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setSelectedMember(null);
    localStorage.removeItem('user');
    localStorage.removeItem('selectedMember');
  };

  const selectMember = (member) => {
    setSelectedMember(member);
    localStorage.setItem('selectedMember', JSON.stringify(member));
  };

  return (
    <AuthContext.Provider value={{ user, selectedMember, login, logout, selectMember }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
