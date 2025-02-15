import React, {Dispatch, SetStateAction} from "react";
import {ModifyCatTypes} from "@/Types/categoriesTypes";
import {Product} from "@/Types/productsTypes";
export type UseToggleReturn = [boolean, () => void]; // Optional: Define return type for better readability
export type SidebarHeaderProps = {
    isOpen: boolean;
    toggle: () => void;
}
export type BurgerToggleProps = {
    toggle: () => void;
}
export type dateTimeFormate = {
    dateTime: string;
    dateDay: string;
    dateOnly: string;
    timeOnly: string
}
export type DropDownItem = {
    option: string;
    route: string;
    id: number;
    role: 'Admin' | 'User' | 'Administrator';
};

// Define the SidebarLink structure.
export type SidebarLinks = {
    title: string;
    icon: string;
    route: string;
    role : 'User' | 'Admin' | 'manager' | "Accountant";
    dropDownItems?: DropDownItem[];  // Optional array of dropdown items.
};

export type CategoriesType = {
    name: string;
    id: number;
    color: string,
}
export type ProductModalProps = {
    modalOpen: boolean; // Boolean to manage modal open state
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Setter function for modal state
    currentItem: ProductType// Current item (Product) or null/undefined if no item is selected
    count?: number; // Optional count, if provided it will be used for increment/decrement logic
    setCount?: React.Dispatch<React.SetStateAction<number>>; // Optional setter function for count
};

export type ProductType = {
    id: number;
    image: {
        src: string;
    };
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export type CategoriesSliderProps = {
    setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

export type CartItemsType = {
    title: string,
    quantity: number,
    icon: 'string',
    id: number,
    price: number
}
export type ModalProps = {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    content: React.ReactNode;
    footerActions?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
}
export type ShiftState = {
    isShiftSwitched: boolean;
    pin: string;
    balance: string;
    remainingAmount: string;
}

export type ShiftAction =
    | { type: 'TOGGLE_SHIFT' }
    | { type: 'SET_PIN'; payload: string }
    | { type: 'SET_BALANCE'; payload: string }
    | { type: 'SET_REMAINING_AMOUNT'; payload: string }
    |  {type: 'SET_RESET'; payload?: string}


export type ShiftModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    state: ShiftState;
    setPin: (pin: string) => void;
    setBalance: (balance: string) => void;
    setRemainingAmount: (remainingAmount: string) => void;
    errorMessage: string

}

export type CartModalProps = {
    isOpen: boolean;
    // onConfirm: () => void;
    onCancel: Dispatch<SetStateAction<boolean>>
}

export type CartContextType = {
    cartProducts: Product[]; // Should be an array of ProductType
    setCartProducts:  Dispatch<SetStateAction<Product[]>> // Setter for cartProducts
};

export type SubLinksHeaderProps = {
    activeSubLinkTitle?: string;
    subHeaderTitle?:string
}


export type StaticImageData = {
    images: StaticImageData[];
}

