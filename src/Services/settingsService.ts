import { httpInterceptor} from '@/lib/utils'; // إذا كنت بحاجة لاستدعاء apiHandler في أماكن أخرى

const refreshToken = sessionStorage.getItem('refreshToken');

// دالة لتحميل البيانات
export const getData = async <T>(resource: string): Promise<T[]> => {
    try {
        if (!refreshToken) throw new Error('Refresh token is missing');

        const response = await httpInterceptor('GET', null, {}, `${process.env.NEXT_PUBLIC_API_URL}/${resource}`, refreshToken);
        return response;
    } catch (error) {
        console.error(`Failed to fetch data for ${resource}`, error);
        throw error;
    }
};

// دالة لإضافة البيانات
 export const handleAdd = async <T>(resource: string, data: T): Promise<void> => {
    try {
        if (!refreshToken) throw new Error('Refresh token is missing');

        await httpInterceptor('POST', data, {}, `${process.env.NEXT_PUBLIC_API_URL}/${resource}`, refreshToken);
    } catch (error) {
        console.error(`Failed to add data to ${resource}`, error);
        throw error;
    }
};

// دالة لتعديل البيانات
 export const handleEdit = async <T>(resource: string, data: T): Promise<void> => {
    try {
        if (!refreshToken) throw new Error('Refresh token is missing');

        await httpInterceptor('PUT', data, {}, `${process.env.NEXT_PUBLIC_API_URL}/${resource}`, refreshToken);
    } catch (error) {
        console.error(`Failed to edit data in ${resource}`, error);
        throw error;
    }
};

// دالة لحذف البيانات
 const handleDelete = async (resource: string, id: number): Promise<void> => {
    try {
        if (!refreshToken) throw new Error('Refresh token is missing');

        await httpInterceptor('DELETE', {}, { id }, `${process.env.NEXT_PUBLIC_API_URL}/${resource}`, refreshToken);
    } catch (error) {
        console.error(`Failed to delete data from ${resource}`, error);
        throw error;
    }
};