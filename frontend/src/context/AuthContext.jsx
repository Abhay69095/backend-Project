import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      const hasVisited = localStorage.getItem("hasVisited");
      
      console.log("AuthContext initializing - hasVisited:", hasVisited, "userData:", !!userData);
      
      if (userData) {
        console.log("User found in localStorage, setting user state");
        setUser(JSON.parse(userData));
      } else if (!hasVisited) {
        console.log("New visitor detected, will show modal");
        // Mark as visited first
        localStorage.setItem("hasVisited", "true");
        // Then show modal with a small delay
        setTimeout(() => {
          console.log("Triggering modal display");
          setIsNewVisitor(true);
        }, 50);
      } else {
        console.log("Returning visitor, no modal");
      }
    } catch (error) {
      console.error("Error in AuthContext initialization:", error);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const closeRegistrationModal = () => {
    console.log("Closing registration modal");
    setIsNewVisitor(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isNewVisitor, closeRegistrationModal }}>
      {children}
    </AuthContext.Provider>
  );
};
