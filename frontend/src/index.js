import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import ProductProvider from './contexts/ProductContext';
import SidebarProvider from './contexts/SidebarContext';
import CartProvider from './contexts/CartContext';
import CategoryProvider from './contexts/CategoryContext';
import MinimumOrderProvider from './contexts/MinimumOrderContext';
import { ToastBox } from './components/Toast';
import AuthProvider from './contexts/AuthContext';
import LocationProvider from './contexts/LocationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastBox />
      <SidebarProvider>
        <MinimumOrderProvider>
          <CartProvider>
            <CategoryProvider>
              <LocationProvider>
                <ProductProvider>
                  <App />
                </ProductProvider>
              </LocationProvider>
            </CategoryProvider>
          </CartProvider>
        </MinimumOrderProvider>
      </SidebarProvider>
    </AuthProvider>
  </React.StrictMode>
);
