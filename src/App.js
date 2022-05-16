import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import OneProduct from './pages/OneProduct';
import Clothes from './pages/Clothes';
import Accessoires from './pages/Accessoires';
import Art from './pages/Art';
import Cart from './pages/Cart';
import { OptionsContextProvider } from './context/options'



const App = () => {
  return (
    <BrowserRouter>
      <OptionsContextProvider>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/:id" element={<OneProduct/>}/>
            <Route exact path="/vetements" element={<Clothes/>}/>
            <Route exact path="/accessoires" element={<Accessoires/>}/>
            <Route exact path="/art" element={<Art/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
          </Routes>
        </OptionsContextProvider>
    </BrowserRouter>
  );
};

export default App;