import { httpInterceptor } from '@/lib/utils'; // Adjust the import path accordingly
import { handleError } from '@/lib/utils';
import {Product} from "@/Types/productsTypes";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Product`;
const API_URL_Stock = `${process.env.NEXT_PUBLIC_API_URL}/ProductStock`;


// Fetch all products
export const getProducts = async (accessToken: string): Promise<Product[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, `${API_URL}`, accessToken);
    } catch (error) {
        throw handleError(error, 'An error occurred while fetching products');
    }
};

// Create a new product
export const createStockProduct = async (productData: { product_id: number , branch_id: number, stock:number }, token: string): Promise<Product> => {
    try {
        return await httpInterceptor('POST', productData, null, API_URL_Stock, token);
    } catch (error) {
        throw handleError(error, 'Failed to create product');
    }
};

// Update an existing product
export const updateProduct = async (productData: Product, token: string): Promise<Product> => {
    try {
        return await httpInterceptor('PUT', productData, null, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to update product');
    }
};

// Delete a product
export const deleteProduct = async (id: number, token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE', {}, { id: id }, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to delete product');
    }
};
