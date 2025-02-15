import {useState, useCallback, useEffect, Dispatch, SetStateAction} from 'react';
import {
    getProducts,
    createStockProduct,
    updateProduct,
    deleteProduct,
} from '@/Services/products';
import { Product } from '@/Types/productsTypes';
import {handleError, httpInterceptor} from "@/lib/utils";
import toast from "react-hot-toast";

interface UseProductResult {
    products: Product[];
    setProducts: (products: Product[]) => void;
    setStockProducts: Dispatch<SetStateAction<Product[]>>;
    selectedProducts: Product[];
    stockProducts: Product[];
    suppliers: Product[];
    setSelectedProducts:  Dispatch<SetStateAction<Product[]>>;
    isLoading: boolean;
    error: string | null;
    fetchStockProducts:() => void;
    AddToStock:(PurchaseOrder: PurchaseOrder) => Promise<void>
    fetchProducts: (accessToken: string) => Promise<void>;
    addProduct: (productData: { product_id: number , branch_id: number, stock:number}, token: string) => Promise<void>;
    modifyProduct: (productData: Product, token: string) => Promise<void>;
    removeProduct: (id: number, token: string) => Promise<void>;
}

interface PurchaseOrder  {
    branch_id: string;
    supplier_id: string;
    purchaseOrderItems: {
        price: string;
        quantity: number | null;
        product_id: string;
    }[]
}
export const useProduct = (): UseProductResult => {
    const [products, setProducts] = useState<any[]>([]);
    const [stockProducts, setStockProducts] = useState<any[]>([]);
    const [suppliers, setSuplliers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
    const  refreshToken = sessionStorage?.getItem('refreshToken');

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


    const fetchStockProducts = async () => {
        setStockProducts([])
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProducts:any =  await httpInterceptor('GET', {}, {isPagable: false}, `${API_URL}/ProductStock`, refreshToken ? refreshToken :'');
            setStockProducts(fetchedProducts.content)
            return fetchedProducts.content
        } catch (error) {
            throw handleError(error, 'An error occurred while fetching products');
        }
    };

    const AddToStock = async (PurchaseOrder:PurchaseOrder) => {
        setIsLoading(true);
        setError(null);
        try {
            await httpInterceptor('POST', {...PurchaseOrder}, {}, `${API_URL}/PurchaseOrder`, refreshToken ? refreshToken :'');
        } catch (error) {
            toast.error('تـأكد من إختيار المورد')
            throw handleError(error, 'An error occurred while fetching products');
        }
    };

    const fetchSupplier = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedSupplier:any =  await httpInterceptor('GET', {}, {}, `${API_URL}/Supplier`, refreshToken ? refreshToken :'');
            setSuplliers(fetchedSupplier.content);
        } catch (error) {
            throw handleError(error, 'An error occurred while fetching products');
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

    useEffect(() => {
        if(refreshToken) {
            fetchProducts()
            fetchStockProducts()
            fetchSupplier()
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
        setSelectedProducts,
        stockProducts,
        fetchStockProducts,
        suppliers,
        AddToStock,
        setProducts,
        setStockProducts
    };
};
