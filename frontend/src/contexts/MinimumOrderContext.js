import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const MinimumOrderContext = createContext();

const MinimumOrderProvider = ({ children }) => {
    const [minOrder, setMinOrder] = useState(0);

    const fetchMinimumOrder = async () => {
        const response = await axios.get('/api/default/minorder', { withCredentials: true });
        setMinOrder(response.data);
    };

    useEffect(() => {
        fetchMinimumOrder();
    }, []);


    return <MinimumOrderContext.Provider value={ { minOrder, fetchMinimumOrder } }>{ children }</MinimumOrderContext.Provider>
};

export default MinimumOrderProvider;
