import React, { createContext, useContext, useState } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [historyItems, setHistoryItems] = useState([]);

    const addHistoryItem = (item) => {
        setHistoryItems((prevItems) => [...prevItems, item]);
    };

    const clearHistory = () => {
        setHistoryItems([]);
    };

    return (
        <HistoryContext.Provider value={{ historyItems, addHistoryItem, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => useContext(HistoryContext);
