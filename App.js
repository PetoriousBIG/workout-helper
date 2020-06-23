import React from 'react';
import Entry from './components/entry.js';
import { AppProvider } from './context/app-context';

//top level of the app
export default function App() {
  return (
    <AppProvider>
      <Entry/>
    </AppProvider>
  );
}


