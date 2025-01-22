import { httpInterceptor } from '@/lib/utils';
import { handleError } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Supplier`; // Adjust the API URL

// Type definition for Supplier
export interface Supplier {
    id: string;
    name: string;
    address: string;
    contact: string;
    timestamp?: string;
}

// Fetch all suppliers
export const getSuppliers = async (accessToken: string): Promise<Supplier[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, API_URL, accessToken);
    } catch (error) {
        throw handleError(error, 'Failed to fetch suppliers');
    }
};

// Create a new supplierSet
export const createSupplier = async (supplierData: Supplier, token: string): Promise<Supplier> => {
    try {
        return await httpInterceptor('POST', supplierData, null, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to create supplierSet');
    }
};

// Update an existing supplierSet
export const updateSupplier = async (supplierData: Supplier, token: string): Promise<Supplier> => {
    try {
        return await httpInterceptor('PUT', supplierData, null, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to update supplierSet');
    }
};

// Delete a supplierSet
export const deleteSupplier = async (id: number, token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE', {}, { id: id }, `${API_URL}`, token);
    } catch (error) {
        throw handleError(error, 'Failed to delete supplierSet');
    }
};
