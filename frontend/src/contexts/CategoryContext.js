import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const response = await axios.get('/api/category/all', { withCredentials: true });
        setCategories(response.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    return <CategoryContext.Provider value={ { categories, fetchCategories } }>{ children }</CategoryContext.Provider>
};

export default CategoryProvider;
