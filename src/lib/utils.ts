import React from "react";
import clsx, {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import axios from "axios";
import {Product} from "@/Types/productsTypes";
import toast from "react-hot-toast";

export const incrementCartItem = (
    id: number,
    cartProducts: Product[],
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    stockProducts: Product[]
) => {
    const itemToUpdate = cartProducts.find(item => item.id === id);

    if (itemToUpdate) {
        const stockItem = stockProducts.find(item => item.id === id);

        if (stockItem) {
            const remainingStock = stockItem.stock - itemToUpdate.quantity;

            if (remainingStock > 0) {
                const updatedCart = cartProducts.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
                setCartProducts(updatedCart);
            } else {
                toast.error(`Cannot add more. 0 items left in stock.`);
            }
        }
    }
};


// Decrement the count by 1, but prevent it from going below 1
export const decrementCartItem = (
    id: number,
    cartProducts: Product[],
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>
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
    id: number,
    cartItems: Product[],
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
import Cookies from 'js-cookie';

// تعريف نوع القيمة المرجعة من الدالة
interface DateTimeFormate {
    dateTime: string;
    dateDay: string;
    dateOnly: string;
    timeOnly: string;
}


// تعريف نوع القيمة المرجعة من الدالة
interface DateTimeFormate {
    dateTime: string;
    dateDay: string;
    dateOnly: string;
    timeOnly: string;
}

// الدالة الرئيسية لتنسيق التاريخ والوقت
export const formatDateTime = (dateString: Date): DateTimeFormate => {
    // تحديد اللغة تلقائيًا
    const locale = Cookies.get("MYNEXTAPP_LOCALE") || navigator.language || 'en-US';
    const isArabic = locale.startsWith('ar');

    // تحديد نظام الترقيم بناءً على اللغة
    const numberingSystem = isArabic ? 'arab' : 'latn';

    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        weekday: isArabic ? 'short' : 'short', // يوم الأسبوع (مختصر)
        month: isArabic ? 'short' : 'short', // الشهر (مختصر)
        day: 'numeric', // اليوم (رقم)
        hour: 'numeric', // الساعة (رقم)
        minute: 'numeric', // الدقيقة (رقم)
        hour12: true, // استخدام نظام 12 ساعة
        numberingSystem: numberingSystem, // تحديد نظام الترقيم
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short', // يوم الأسبوع (مختصر)
        year: 'numeric', // السنة (رقم)
        month: isArabic ? '2-digit' : 'short', // الشهر (مختصر أو رقمين)
        day: 'numeric', // اليوم (رقمين)
        numberingSystem: numberingSystem, // تحديد نظام الترقيم
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: isArabic ? 'short' : 'short', // الشهر (مختصر)
        year: 'numeric', // السنة (رقم)
        day: 'numeric', // اليوم (رقم)
        numberingSystem: numberingSystem, // تحديد نظام الترقيم
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric', // الساعة (رقم)
        minute: 'numeric', // الدقيقة (رقم)
        hour12: true, // استخدام نظام 12 ساعة
        numberingSystem: numberingSystem, // تحديد نظام الترقيم
    };

    // تنسيق التاريخ والوقت
    const formattedDateTime: string = new Date(dateString).toLocaleString(
        locale,
        dateTimeOptions
    );

    const formattedDateDay: string = new Date(dateString).toLocaleString(
        locale,
        dateDayOptions
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        locale,
        dateOptions
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        locale,
        timeOptions
    );

    // إرجاع القيم المنسقة
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



