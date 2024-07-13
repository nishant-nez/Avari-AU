import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('/api/product/all', { withCredentials: true });
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return <ProductContext.Provider value={ { products, fetchProducts } }>{ children }</ProductContext.Provider>
};

export default ProductProvider;
