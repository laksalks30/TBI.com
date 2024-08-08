
'use client';

import React, { createContext, useContext, useState } from 'react';

interface ResourceContextProps {
    data: { name: string; value: number }[];
    updateData: (newData: { name: string; value: number }[]) => void;
}

const ResourceContext = createContext<ResourceContextProps | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState([
        { name: 'Labor', value: 400 },
        { name: 'Materials', value: 300 },
        { name: 'Equipment', value: 300 },
    ]);

    const updateData = (newData: { name: string; value: number }[]) => {
        setData(newData);
    };

    return (
        <ResourceContext.Provider value={{ data, updateData }}>
            {children}
        </ResourceContext.Provider>
    );
}

export const useResource = () => {
    const context = useContext(ResourceContext);
    if (!context) {
        throw new Error('useResource must be used within a ResourceProvider');
    }
    return context;
};
