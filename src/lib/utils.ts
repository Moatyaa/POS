import { ProductType } from "@/Types/types";
import React from "react";
import clsx, {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import axios from "axios";

// Increment the count by 1 for a specific item in the cart
export const incrementCartItem = (
    id: number,
    cartProducts: ProductType[],
    setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
    // Update the quantity of the specific item in the cart
    const updatedCart = cartProducts.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    // Update the state with the new cart
    setCartProducts(updatedCart);
};

// Decrement the count by 1, but prevent it from going below 1
export const decrementCartItem = (
    id: number,
    cartProducts: ProductType[],
    setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
    // Only decrement the quantity if it's greater than 1
    const updatedCart = cartProducts.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    // Update the state with the new cart
    setCartProducts(updatedCart);
};

// Delete an item from the cart by its ID
export const deleteCartItem = (
    cartItems: ProductType[],
    id: number
) => {
    // Filter out the item with the matching ID
    return cartItems.filter(item => item.id !== id);
};

// A reusable function for handling number input changes
export const handleInputNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>,
    defaultValue: number = 1
) => {
    const value = e.target.value;

    if (value === '') {
        setState(defaultValue);  // Set to the default value when the input is empty
    } else if (/^\d+$/.test(value)) {  // Validate that input is a valid number
        setState(Number(value));  // Set the count to the number
    }
};

// Format date and time (can be expanded based on your needs)
export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        year: "numeric", // numeric year (e.g., '2023')
        month: "2-digit", // abbreviated month name (e.g., 'Oct')
        day: "2-digit", // numeric day of the month (e.g., '25')
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric", // numeric day of the month (e.g., '25')
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );

    const formattedDateDay: string = new Date(dateString).toLocaleString(
        "en-US",
        dateDayOptions
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );

    return {
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
    };
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleError = (error: unknown, defaultMessage: string): string => {
    if (error instanceof Error) {
        return error.message || defaultMessage;
    }
    return defaultMessage;
};




export const httpInterceptor = async (method: string, body:unknown  ,params: unknown  , endPoint: string, token:string) => {
    try {
        const accessToken = await axios.post(`http://localhost:9090/auth/refresh-token?refreshToken=${token}`)
        const response = await axios({
            method: method,
            url: endPoint,
            params: params,
            data:  body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken.data.accessToken}`,
            },
        });

        return response.data;

    } catch (error) {
        console.error('API call failed:', error);
        throw error; 
    }
};



