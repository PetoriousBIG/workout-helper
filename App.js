import React from 'react';
import { AppProvider } from './context/app-context';
import TopLevelTabsNav from './navigation/AppNav.js';

//top level of the app
export default function App() {
  return (
    <AppProvider>
      <TopLevelTabsNav/>
    </AppProvider>
  );
}


