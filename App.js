import React from 'react';
import { AppProvider } from './context/app-context';
import TopLevelTabsNav from './navigation/AppNav.js';

//Entry point for the application, which calls a 
//custom navigation component which renders the entry screen
export default function App() {
  return (
    <AppProvider>
      <TopLevelTabsNav/>
    </AppProvider>
  );
}


