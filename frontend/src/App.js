import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
// pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import Vendors from './pages/admin/Vendors';
import Products from './pages/admin/Products';
import VendorLogin from './pages/vendor/VendorLogin';
import AdminOrders from './pages/admin/AdminOrders';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorProducts from './pages/vendor/VendorProducts';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';

const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/product/:id' element={ <ProductDetails /> } />
        <Route path='/cart' element={ <Cart /> } />

        <Route path='/checkout-success' element={ <CheckoutSuccess /> } />
        <Route path='/checkout-cancel' element={ <CheckoutCancel /> } />

        <Route path='/admin/login' element={ <AdminLogin /> } />
        <Route path='/admin/vendors' element={ <Vendors /> } />
        <Route path='/admin/products' element={ <Products /> } />
        <Route path='/admin/orders' element={ <AdminOrders /> } />

        <Route path='/vendor/login' element={ <VendorLogin /> } />
        <Route path='/vendor/orders' element={ <VendorOrders /> } />
        <Route path='/vendor/products' element={ <VendorProducts /> } />
      </Routes>
      <Sidebar />
      <Footer />
    </Router>
  </div>;
};

export default App;
