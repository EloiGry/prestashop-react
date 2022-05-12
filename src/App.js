import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import OneProduct from './pages/OneProduct';
import { OptionsContextProvider } from './context/options'


const App = () => {
  return (
    <BrowserRouter>
      <OptionsContextProvider>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/:id" element={<OneProduct/>}/>
          </Routes>
        </OptionsContextProvider>
    </BrowserRouter>
  );
};

export default App;