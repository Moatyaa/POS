'use client'
import toast from "react-hot-toast";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { httpInterceptor} from '@/lib/utils';
import { Content } from "@/Types/categoriesTypes";
import { TabResource } from "@/app/settings/[resource]/page";
import Cookies from "js-cookie";
import {Branch, Category} from "@/Types/modalType";
import axios from "axios";
import noImage from '../../public/Icons/no-image.png'
import {Product} from "@/Types/productsTypes";
export type SettingContextTypes = {
    data: Content[];
    isLoading: boolean;
    error: string | null;
    fetchData: (activeTab: TabResource , size: number) => void;
    fetchDataById: (activeTab: string) => Product;
    addData: (item: Content, resource: string) => void;
    modifyData: (item: Content, resource: string) => void;
    setError: Dispatch<SetStateAction<string | null>>;
    setLast: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setStockProducts: Dispatch<SetStateAction<Product[]>>;
    fetchStockProducts:() => void;
    stockProducts: Product[];
    removeData: (id: number, resource: string) => void;
    categories: Category[];
    cooperation: Content[];
    shift: Content | undefined ;
    branches: Branch[];
    roles: Content[]
    fetchCategories: () => void;
    fetchCooperation: () => void;
    fetchBranches: () => void;
    fetchCurrentShift:  () => void;
    uploadImage:  (item:Content, image:File, resource: string) => void;
    setData: Dispatch<SetStateAction<Content[]>>;
    last: boolean,
    handleError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
    locale: string
}

const CategoryContext = createContext<SettingContextTypes | undefined>(undefined);

const SettingContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Content[]>([]);
    const [last, setLast] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [shift, setShift] = useState<Content>();
    const [cooperation, setCooperation] = useState<any>(null);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [roles, setRoles] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [stockProducts, setStockProducts] = useState<any[]>([]);
    const [locale, setLocale] = useState<string>("ar");

    // const [size, setsize] = useState<number>(10);
    const storageRefreshedToken = Cookies.get('refreshToken');

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', {} , {isPagable: false}, `${process.env.NEXT_PUBLIC_API_URL}/Category`, storageRefreshedToken);
            await Promise.all(response.content.map(async (category:Category) => await fetchCategoryProductCount(category)))
            setCategories(response.content);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            setError('Failed to fetch categories');
        } finally {
            setIsLoading(false);
        }
    };
    const fetchCategoryProductCount = async (category:Category) => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', {} , {isPagable: false}, `${process.env.NEXT_PUBLIC_API_URL}/ProductStock/GetCountByCategoryId/${category.id}`, storageRefreshedToken);
            category.numberOfProductsStock = response;
        } catch (error) {
            console.error('Failed to fetch categories', error);
            setError('Failed to fetch categories');
        } finally {
            setIsLoading(false);
        }
        return category;
    };

    const fetchStockProducts = async () => {
        setStockProducts([])
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProducts:any =  await httpInterceptor('GET', {}, {isPagable: false}, `${process.env.NEXT_PUBLIC_API_URL}/ProductStock`, storageRefreshedToken ? storageRefreshedToken :'');
            setStockProducts(fetchedProducts.content)
            return fetchedProducts.content
        } catch {
             setError('An error occurred while fetching products');
        }
    };

    const fetchCurrentShift = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            const response = await httpInterceptor('GET', {} , {}, `${process.env.NEXT_PUBLIC_API_URL}/Shift/ActiveShift`, storageRefreshedToken);
            setShift(response);
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
        } catch (err) {
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

    const fetchData = async (activeTab: TabResource, page: number) => {
        setIsLoading(true);
        setError(null);

        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');


            const response = await httpInterceptor(
                'GET',
                {},
                {page: page},
                `${process.env.NEXT_PUBLIC_API_URL}/${activeTab.resource}?size=10`,
                storageRefreshedToken
            );


            if (page === 0) {
                setData(response.content);
            } else {
                setData((prev) => {
                    const existingIds = prev.map((item: Content) => item.id);
                    const newItems = response.content.filter((item: Content) => !existingIds.includes(item.id));
                    return [...prev, ...newItems];
                });
            }

            setLast(response.last);

            await fetchCategories();
            await fetchCooperation();

        } catch (error) {
            console.error(`Failed to fetch data for ${activeTab.resource}`, error);
            setError('Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };


    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.setAttribute('src' , `${noImage.src}`);
    };

    const fetchDataById = async (activeTab: string) => {
        setData([])
        if (!activeTab) return;
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            if (!storageRefreshedToken) throw new Error('Refresh token is missing');
            return await httpInterceptor('GET',{}, {}, `${process.env.NEXT_PUBLIC_API_URL}/${activeTab}`, storageRefreshedToken);
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

    const uploadImage = async (item: Content, image: File, resource: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', image);
        try {
            const accessTokenResponse = await axios.post(`http://localhost:9090/auth/refresh-token?refreshToken=${storageRefreshedToken}`);
            const accessToken = accessTokenResponse.data.accessToken;

            const response = await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_URL}/${resource}/UploadImage/${item.id}`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success('تم رفع الصورة بنجاح')
            window.location.reload();
            return response.data;
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    const modifyData = async (item: Content, resource: string): Promise<void> => {
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
        if(storageRefreshedToken) {
            setData([])
            fetchRoles()
            fetchBranches()
            fetchCategories();
            fetchCooperation();
            fetchCurrentShift();
            const locale = Cookies.get('MYNEXTAPP_LOCALE') || 'ar';
            setLocale(locale);
        }
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
                fetchCurrentShift,
                shift,
                setData,
                last,
                setIsLoading,
                branches,
                fetchBranches,
                uploadImage,
                roles,
                setLast,
                handleError,
                stockProducts,
                fetchStockProducts,
                setStockProducts,
                locale
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
