import React from 'react';
import Entry from './components/entry.js';
import { AppProvider } from './context/app-context';

export default function App() {
  return (
    <AppProvider>
      <Entry/>
    </AppProvider>
  );
}


