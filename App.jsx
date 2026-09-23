import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { InscripcionScreen } from './screens/InscripcionScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <InscripcionScreen />
    </>
  );
}