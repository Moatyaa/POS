export type CategoryPageType = {
    content: Content[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};

type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

type Sort = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
};

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
    cooperation: ModifyCatTypes
    identifier? : string
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

export type SettingsContextTypes  = {
    categories: Content[];
    isLoading: boolean;
    isError: string | null;
    fetchCategories: () => void;
}
