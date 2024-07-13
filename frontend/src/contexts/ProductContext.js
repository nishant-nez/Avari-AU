import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/product/all', { withCredentials: true });
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return <ProductContext.Provider value={ { products } }>{ children }</ProductContext.Provider>
};

export default ProductProvider;
