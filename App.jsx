import React from "react";
import { StatusBar } from "expo-status-bar";

import { InscripcionScreen } from "./screens/InscripcionScreen";
import { RegistrationProvider } from "./src/context/RegistrationContext";

export default function App() {
  const { saveRegistration } = useRegistrationContext();
  return (
    <RegistrationProvider>
      <StatusBar style="dark" />

      <InscripcionScreen />
    </RegistrationProvider>
  );
}