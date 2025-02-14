import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Services from "./components/Services";
import './styles.css';

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
