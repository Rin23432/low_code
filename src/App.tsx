import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import './App.css';
import List from './pages/manage/List';
function App() {
  return <RouterProvider router={routerConfig} />;
}

export default App;
