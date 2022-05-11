import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import OneProduct from './pages/OneProduct';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<OneProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;