import { httpInterceptor } from '@/lib/utils';
import { handleError } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Cooperation`; // Adjust the API URL for cooperation

export interface Cooperation {
    id: number;
    name: string;
    timestamp: string; // ISO date format
}

// Fetch all cooperations
export const getCooperations = async (accessToken: string): Promise<Cooperation[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, API_URL, accessToken);
    } catch (error) {
        throw handleError(error, 'Failed to fetch cooperations');
    }
};

// Create a new cooperation
export const createCooperation = async (cooperationData: { name: string }, token: string): Promise<Cooperation> => {
    try {
        return await httpInterceptor('POST', cooperationData, null, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to create cooperation');
    }
};

// Update an existing cooperation
export const updateCooperation = async (cooperationData: Cooperation, token: string): Promise<Cooperation> => {
    try {
        return await httpInterceptor('PUT', cooperationData, null, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to update cooperation');
    }
};

// Delete a cooperation
export const deleteCooperation = async (id: number, token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE', {}, { id: id }, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to delete cooperation');
    }
};
