export type Content = {
    id: number;
    createdAt: string;
    updatedAt: string;
    timestamp: string;
    name: string;
    description: string | null;
    color: string | null;
    salePrice?: number;
    sku?: string;
    phone?: string;
    address?: string;
    contact?: string;
    image?: string;
    category: ModifyCatTypes;
    email? : string,
    cooperation: ModifyCatTypes;
    identifier? : string;
    workingBalance:number;
    [key: string]: any
};


export type ModifyCatTypes = {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    timestamp?: string;
    name?: string;
    description?: string | null;
    color?: string | null;
    address?: string | null;
    phone?: number | null;
};
