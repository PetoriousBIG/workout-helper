import React from 'react';
import { AppProvider } from './src/context/app-context';
import TopLevelTabsNav from './src/navigation/AppNav.js';

//Entry point for the application, which calls a 
//custom navigation component which renders the entry screen
export default function App() {
  return (
    <AppProvider>
      <TopLevelTabsNav/>
    </AppProvider>
  );
}


