import { httpInterceptor } from '@/lib/utils'; // Adjust the import path accordingly
import { handleError } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Role`; // Update API URL for roles

interface Role {
    id: string;
    name: string;
}

// Fetch all roles
export const getRoles = async (accessToken: string): Promise<Role[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, `${API_URL}`, accessToken);
    } catch (error) {
        throw handleError(error, 'An error occurred while fetching roles');
    }
};

// Create a new role
export const createRole = async (roleData: { name: string }, token: string): Promise<Role> => {
    try {
        return await httpInterceptor('POST', roleData, null, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to create role');
    }
};

// Update an existing role
export const updateRole = async (roleData: { id: number; name: string }, token: string): Promise<Role> => {
    try {
        return await httpInterceptor('PUT', roleData, null, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to update role');
    }
};

// Delete a role
export const deleteRole = async (id: number, token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE', {}, { id: id }, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to delete role');
    }
};
