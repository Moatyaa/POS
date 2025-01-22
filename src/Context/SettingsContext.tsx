'use client'
import toast from "react-hot-toast";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { httpInterceptor } from '@/lib/utils';
import { Content } from "@/Types/categoriesTypes";
import { TabResource } from "@/app/settings/[resource]/page";
import Cookies from "js-cookie";

export type SettingContextTypes = {
    data: Content[];
    isLoading: boolean;
    error: string | null;
    fetchData: (activeTab: TabResource) => void;
    fetchDataById: (activeTab: string, id:number) => void;
    addData: (item: Content, resource: string) => void;
    modifyData: (item: Content, resource: string) => void;
    setError: Dispatch<SetStateAction<string | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    removeData: (id: number, resource: string) => void;
    categories: Content[];
    cooperation: Content[];
    branches: any;
    roles: Content[]
    fetchCategories: () => void;
    fetchCooperation: () => void;
    fetchBranches: () => void;
    setData: Dispatch<SetStateAction<Content[]>>;
    last: boolean,
    size : number,
    setsize: Dispatch<SetStateAction<number>>
}

const CategoryContext = createContext<SettingContextTypes | undefined>(undefined);

const SettingContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Content[]>([]);
    const [last, setLast] = useState<boolean>(false);
    const [categories, setCategories] = useState<Content[]>([]);
    const [cooperation, setCooperation] = useState<any>(null);
    const [branches, setBranches] = useState<any>(null);
    const [roles, setRoles] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [size, setsize] = useState<number>(10);
    const storageRefreshedToken = Cookies.get('refreshToken');

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', null, {}, `${process.env.NEXT_PUBLIC_API_URL}/Category`, storageRefreshedToken);
            setCategories(response.content);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            setError('Failed to fetch categories');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCooperation = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', null, {}, `${process.env.NEXT_PUBLIC_API_URL}/Cooperation`, storageRefreshedToken);
            setCooperation(response.content);
        } catch (error) {
            setError('Failed to fetch cooperation');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBranches = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', null, {}, `${process.env.NEXT_PUBLIC_API_URL}/Branch`, storageRefreshedToken);
            setBranches(response.content);
        } catch (error) {
            console.error('Failed to fetch cooperation', error);
            setError('Failed to fetch cooperation');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRoles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', null, {}, `${process.env.NEXT_PUBLIC_API_URL}/Role`, storageRefreshedToken);
            setRoles(response.content);
        } catch (error) {
            console.error('Failed to fetch cooperation', error);
            setError('Failed to fetch cooperation');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async (activeTab: TabResource) => {
        setData([])
        console.log(size)
        if (!activeTab.resource) return;
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', {}, {}, `${process.env.NEXT_PUBLIC_API_URL}/${activeTab.resource}?size=${size}`, storageRefreshedToken);
            setData(response.content);
            setLast(response.last)
            await fetchCategories()
            await fetchCooperation()
        } catch (error) {
            console.error(`Failed to fetch data for ${activeTab.resource}`, error);
            setError('Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDataById = async (activeTab: string, id:number) => {
        setData([])
        if (!activeTab) return;
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            return await httpInterceptor('GET', {id: id}, {}, `${process.env.NEXT_PUBLIC_API_URL}/${activeTab}`, storageRefreshedToken);
        } catch (error) {
            console.error(`Failed to fetch data for ${activeTab}`, error);
            setError('Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    const addData = async (item: Content, resource: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Authentication error: Refresh token is missing');
            const response = await httpInterceptor(
                'POST',
                item,
                {},
                `${process.env.NEXT_PUBLIC_API_URL}/${resource}`,
                storageRefreshedToken
            );
            setData((prevData) => [...prevData, response]);
            await fetchBranches()
            toast.success('تم إضافة العنصر بنجاح'); // رسالة نجاح
        } catch (error: any) {
            handleErrorResponse(error);
        } finally {
            setIsLoading(false);
        }
    };

    const modifyData = async (item: Content, resource: string): Promise<void> => {
        console.log(item)
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Authentication error: Refresh token is missing');
            const response = await httpInterceptor(
                'PUT',
                item,
                {},
                `${process.env.NEXT_PUBLIC_API_URL}/${resource}`,
                storageRefreshedToken
            );
            setData((prev) => {
                const isExisting = prev.some((item) => item.id === Number(response.id));
                if (isExisting) {
                    return prev.map((item) =>
                        item.id === Number(response.id) ? response : item
                    );
                }
                return [...prev, response];
            });
            await fetchBranches()
            console.log(data)
            toast.success('تم تعديل العنصر بنجاح'); // رسالة نجاح
        } catch (error: any) {
            handleErrorResponse(error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeData = async (id: number, resource: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        console.log(storageRefreshedToken)
        try {
            await httpInterceptor(
                'DELETE',
                {},
                { id: id },
                `${process.env.NEXT_PUBLIC_API_URL}/${resource}`,
                storageRefreshedToken || ""
            );
            setData((prev) => prev.filter((item: Content) => item.id !== id));
            await fetchBranches()
            toast.success('تم حذف العنصر بنجاح'); // رسالة نجاح
        } catch (error: unknown) {
            toast.error('فشل في حذف العنصر قد يكون مرتبط بإعدادات اخري'); // رسالة فشل
        } finally {
            setIsLoading(false);
        }
    };

    const handleErrorResponse = (error: any) => {
        if (error.response) {
            switch (error.response.status) {
                case 403:
                    toast.error('غير مصرح');
                    break;
                case 404:
                    toast.error('حدث خطأ يرجي التأكد من عدم تواجد العنصر مسبقا');
                    break;
                case 500:
                    toast.error('حدث خطأ في الشبكه تحقق من الإتصال');
                    break;
                default:
                    toast.error('حدث خطأ يرجي التأكد من عدم تواجد العنصر مسبقاأو تحقق من إتصال الشبكه');
            }
        } else {
            setError('A network error occurred. Please check your connection and try again.');
        }
    };



    useEffect(() => {
        setData([])
        fetchRoles()
        fetchBranches()
        fetchCategories();
        fetchCooperation();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                data,
                isLoading,
                error,
                fetchData,
                addData,
                modifyData,
                removeData,
                setError,
                categories,
                cooperation,
                fetchCategories,
                fetchCooperation,
                fetchDataById,
                setData,
                last,
                setIsLoading,
                size,
                setsize,
                branches,
                fetchBranches,
                roles
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useSettings = (): SettingContextTypes => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingContextProvider');
    }
    return context;
};

export default SettingContextProvider;
