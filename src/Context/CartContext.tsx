"use client"
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CartContextType, ProductType } from "@/Types/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const savedCart = localStorage.getItem("cartProducts");
            if (savedCart) {
                setCartProducts(JSON.parse(savedCart));
            }
        }
    }, []);

    // useEffect(() => {
    //     if (cartProducts.length >= 0 && typeof window !== "undefined") {
    //         localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    //     }
    // }, [cartProducts]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
