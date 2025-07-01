// src/context/EmailContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the context
const EmailContext = createContext();

// Hook to access the context
export const useEmail = () => useContext(EmailContext);

// Email provider to manage the email globally
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
