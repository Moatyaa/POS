import { httpInterceptor } from '@/lib/utils'; // Adjust the import path accordingly
import { handleError } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Category`;

interface Category {
    id: string;
    name: string;
}

// Fetch all categories
export const getCategories = async (accessToken: string) => {
    try {
        return await httpInterceptor('GET', null, null,  `${API_URL}?size=200`, accessToken);
    } catch (error) {
        throw handleError(error, 'An error occurred while fetching categories');
    }
};

// Create a new category
export const createCategory = async (categoryData: { name: string }, token: string): Promise<Category> => {
    try {
        return await httpInterceptor('POST', categoryData, null , API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to create category');
    }
};

// Update an existing category
export const updateCategory = async ( categoryData: {id: number ,name: string }, token: string): Promise<Category> => {
    try {
        return await httpInterceptor('PUT', categoryData, null ,`${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to update category');
    }
};

// Delete a category
export const deleteCategory = async (id: number , token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE',{},{id: id} ,`${API_URL}`, token);
        {}
    } catch (error) {
        throw handleError(error, 'Failed to delete category');
    }
};
