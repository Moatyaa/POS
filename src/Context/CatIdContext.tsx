'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextType {
    categoryId: number | null;
    setCategoryId: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Provider Component
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [categoryId, setCategoryId] = useState<number | null>(null);

    return (
        <CategoryContext.Provider value={{ categoryId, setCategoryId }}>
            {children}
        </CategoryContext.Provider>
);
};

// Custom Hook to use the context
export const useCategory = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};
