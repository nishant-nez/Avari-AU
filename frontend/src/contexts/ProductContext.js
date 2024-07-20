import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('/api/product/all', { withCredentials: true });
    setProducts(response.data);
  };

  const handleSearch = (query) => {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (id) => {
    if (id !== 0) {
      const filtered = products.filter((product) => product.category.id === id);
      setFilteredProducts(filtered);
    }
  }

  const clear = () => {
    setFilteredProducts(products);
  }

  const filterByVendor = (id) => {
    const filtered = products.filter((product) => product.vendor.id === id);
    setFilteredProducts(filtered);
    setProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return <ProductContext.Provider value={ { products, fetchProducts, filteredProducts, handleSearch, handleCategoryChange, clear, filterByVendor } }>{ children }</ProductContext.Provider>
};

export default ProductProvider;
