// src/context/AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // const [baseURL, setURL] = useState("http://localhost:8082"); // Localhost Server url
  const [baseURL, setURL] = useState("https://new-api.productsscout.in"); // Global Server url


  return (
    <AppContext.Provider value={{ baseURL, setURL }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
