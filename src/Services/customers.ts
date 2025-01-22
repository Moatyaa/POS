import { httpInterceptor } from '@/lib/utils';
import { handleError } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Customer`;

interface Cooperation {
    id: number;
    name: string;
    timestamp: string;
}

export interface Customer {
    id: string;
    timestamp: string;
    name: string;
    email: string;
    phone: string;
    loyaltyPoints: string;
    cooperation_id: number;
    cooperation: Cooperation;
}

// Fetch all customers
export const getCustomers = async (accessToken: string): Promise<Customer[]> => {
    try {
        return await httpInterceptor('GET', {}, {}, API_URL, accessToken);
    } catch (error) {
        throw handleError(error, 'Failed to fetch customers');
    }
};

// Create a new customerSet
export const createCustomer = async (customerData: Omit<Customer, 'id' | 'timestamp'>, token: string): Promise<Customer> => {
    try {
        return await httpInterceptor('POST', customerData, null, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to create customerSet');
    }
};

// Update an existing customerSet
export const updateCustomer = async (customerData: Customer, token: string): Promise<Customer> => {
    try {
        return await httpInterceptor('PUT', customerData, null, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to update customerSet');
    }
};

// Delete a customerSet
export const deleteCustomer = async (id: string, token: string): Promise<{ message: string }> => {
    try {
        return await httpInterceptor('DELETE', {}, { id: id }, API_URL, token);
    } catch (error) {
        throw handleError(error, 'Failed to delete customerSet');
    }
};
