// types.ts

// Cooperation Type (used in other types like Branch, Customer, etc.)
export interface Cooperation {
    id: number;
    name: string;
    timestamp: string;
}

// Category Type
export interface Category {
    id: number;
    timestamp: string;
    name: string;
    description: string;
    color: string;
}

// Product Type
export interface Product {
    id: number;
    timestamp: string;
    name: string;
    sku: string;
    salePrice: number;
    category_id: number;
    category: Category;
}

// Supplier Type
export interface Supplier {
    id: number;
    timestamp: string;
    name: string;
    contact: string;
    address: string;
}

// Customer Type
export interface Customer {
    id: number;
    timestamp: string;
    name: string;
    email: string;
    phone: string;
    loyaltyPoints: string;
    cooperation_id: number;
    cooperation: Cooperation;
}

// Branch Type
export interface Branch {
    id: number;
    name: string;
    timestamp: string;
    address: string;
    phone: string;
    cooperation_id: number;
    cooperation: Cooperation;
    appUsers: User[]
}

export interface User {
    id:number
    name: string;
    roles: Roles[];
    email: string;
}

interface Roles {
    name: string;
    id: number;
}
// Item Type (Union of all the entity types)
export type Item = Branch | Product | Supplier | Customer | Category;

// ModalState Type for managing the modal state
export interface ModalState {
    open: boolean;
    mode: 'edit' | 'add';
    currentId: number | null;
    currentName: string;
    currentItem: Item;
    type: 'category' | 'product' | 'branches' | 'role' | 'suppliers' | 'customer';
}

// ModifyCatTypes (used for categories or any other related type)
export interface ModifyCatTypes {
    id: number;
    name: string;
    description: string;
    color: string;
}

// SubLinksHeaderProps (for header component in settings page)
export interface SubLinksHeaderProps {
    activeSubLinkTitle: string;
}
