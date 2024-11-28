import React, { createContext, useState, useContext } from "react";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); // Ховаємо через 5 секунд
  };

  const hideError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}
      {error && (
        <div className="fixed top-0 left-0 w-full bg-red-600 font-kanit text-white px-4 py-2 flex items-center justify-between shadow-lg z-50">
          <span>{error}</span>
          <button
            onClick={hideError}
            className="ml-4 bg-red-800 hover:bg-red-700 font-kanit text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Close
          </button>
        </div>
      )}
    </ErrorContext.Provider>
  );
};
