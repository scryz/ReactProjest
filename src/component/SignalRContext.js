import React, { createContext, useContext } from 'react';
import SignalRService from './SignalRService'; // Путь к вашему файлу SignalRService.js

const SignalRContext = createContext();

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider = ({ children }) => {
  return (
    <SignalRContext.Provider value={SignalRService}>
      {children}
    </SignalRContext.Provider>
  );
};