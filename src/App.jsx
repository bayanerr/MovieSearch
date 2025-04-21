import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import MovieCards from './components/MovieCards'
import MovieDetail from './components/MovieDetail';
import MoviesPage from './components/MoviesPage';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div className='sidebar'>
      <Sidebar />
      </div>
      <div className="main-content" style={{ marginLeft: 200 }}>
        <Routes>
          <Route path="/" element={<MovieCards />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
      
    </div>
  );
}
export default App