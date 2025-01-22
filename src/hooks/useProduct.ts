import {useState, useCallback, useEffect, Dispatch, SetStateAction} from 'react';
import {
    getProducts,
    createStockProduct,
    updateProduct,
    deleteProduct,
} from '@/Services/products';
import { Product } from '@/Types/productsTypes';

interface UseProductResult {
    products: Product[];
    selectedProducts: Product[];
    setSelectedProducts:  Dispatch<SetStateAction<Product[]>>;
    isLoading: boolean;
    error: string | null;
    fetchProducts: (accessToken: string) => Promise<void>;
    addProduct: (productData: { product_id: number , branch_id: number, stock:number}, token: string) => Promise<void>;
    modifyProduct: (productData: Product, token: string) => Promise<void>;
    removeProduct: (id: number, token: string) => Promise<void>;
}

export const useProduct = (): UseProductResult => {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const  refreshToken = sessionStorage.getItem('refreshToken');

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProducts:any = await getProducts(refreshToken ? refreshToken :'');
            setProducts(fetchedProducts.content);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addProduct = useCallback(async (productData: { product_id: number , branch_id: number, stock:number }, token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const newProduct = await createStockProduct(productData, token);
            setSelectedProducts((prevSelected) => {
                if (!prevSelected.some((p) => p.id === newProduct.id)) {
                    return [...prevSelected, newProduct];
                }
                return prevSelected;
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const modifyProduct = useCallback(async (productData: Product, token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedProduct = await updateProduct(productData, token);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeProduct = useCallback(async (id: number, token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteProduct(id, token);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        products,
        isLoading,
        error,
        fetchProducts,
        addProduct,
        modifyProduct,
        removeProduct,
        selectedProducts,
        setSelectedProducts
    };
};
