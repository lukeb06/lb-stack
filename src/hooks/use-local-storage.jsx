'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
    const [state, setState] = useState({});

    useEffect(() => {
        const storage = localStorage.getItem('state');
        if (storage) {
            setState(JSON.parse(storage));
        }
    }, []);

    const set = (key, value) => {
        const newState = { ...state, [key]: value };
        localStorage.setItem('state', JSON.stringify(newState));
        setState(newState);
    };

    const modify = (newState) => {
        const updatedState = { ...state, ...newState };
        localStorage.setItem('state', JSON.stringify(updatedState));
        setState(updatedState);
    };

    return (
        <LocalStorageContext.Provider value={[state, set, modify]}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export const useLocalStorage = () => {
    return useContext(LocalStorageContext);
};
