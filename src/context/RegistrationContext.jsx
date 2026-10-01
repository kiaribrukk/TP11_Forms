import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
  const [registrationData, setRegistrationData] = useState(null);

  const saveRegistration = (data) => {
    setRegistrationData(data);
  };

  const clearRegistration = () => {
    setRegistrationData(null);
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        saveRegistration,
        clearRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrationContext() {
  return useContext(RegistrationContext);
}