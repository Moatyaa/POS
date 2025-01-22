import {ModifyCatTypes} from "@/Types/categoriesTypes";

export type  Product = {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    timestamp?: string,
    name: string,
    sku: string,
    salePrice: number,
    category: ModifyCatTypes
    content: []
};

export type ProductContextTypes = {
    products: Product[];
    isLoading: boolean;
    isError: string | null;
    fetchProducts: () => void;
    addProduct: (product: { name: string }) => void;
    modifyProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
}