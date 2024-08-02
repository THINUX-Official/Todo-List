import React, { createContext, useState, useContext } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [historyItems, setHistoryItems] = useState([]);

    const addHistoryItem = (item) => {
        setHistoryItems((prevItems) => [...prevItems, item]);
    };

    return (
        <HistoryContext.Provider value={{ historyItems, addHistoryItem }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => useContext(HistoryContext);
