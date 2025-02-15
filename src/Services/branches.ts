import { httpInterceptor } from '@/lib/utils';
import { handleError } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Branch`
const API_URL_USER = `${process.env.NEXT_PUBLIC_API_URL}/AppUser`
export interface Branch {
    id: string;
    name: string;
}
export interface User {
    id: string;
    name: string;
    content: []
}

// Fetch all branches
export const getBranches = async (accessToken: string): Promise<Branch[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, API_URL, accessToken);
    } catch (error) {
        throw handleError(error, 'Failed to fetch branches');
    }
};

export const getUsers = async (accessToken: string): Promise<User[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, API_URL_USER, accessToken);
    } catch (error) {
        throw handleError(error, 'Failed to fetch Users');
    }
};

// Create a new branch
export const createBranch = async (branchData: { name: string }, token: string): Promise<Branch> => {
    try {
        return await httpInterceptor('POST', branchData, null, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to create branch');
    }
};

// Update an existing branch
export const updateBranch = async (branchData: any, token: string): Promise<Branch> => {
    try {
        return await httpInterceptor('PUT', branchData, null, API_URL , token)
    } catch (error) {
        throw handleError(error, 'Failed to update branch');
    }
};

// Delete a branch
export const deleteBranch = async (id: string, token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE', {}, { id: id }, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to delete branch');
    }
};