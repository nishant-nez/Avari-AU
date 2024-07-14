import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
// components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import Vendors from './pages/Vendors';
import Products from './pages/admin/Products';

const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/product/:id' element={ <ProductDetails /> } />
        <Route path='/cart' element={ <Cart /> } />

        <Route path='/admin/login' element={ <AdminLogin /> } />
        <Route path='/admin/vendors' element={ <Vendors /> } />
        <Route path='/admin/products' element={ <Products /> } />
      </Routes>
      <Sidebar />
      <Footer />
    </Router>
  </div>;
};

export default App;
