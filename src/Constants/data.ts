import home from '../../public/Icons/home.svg'
import reports from '../../public/Icons/reports.svg'
import inventory from '../../public/Icons/inventory.svg'
import teams from '../../public/Icons/teams.svg'
import settings from '../../public/Icons/settings.svg'
import {SidebarLinks} from "@/Types/types";
import {CategoriesType} from "@/Types/types";
import allMenu from '../../public/Icons/allMenu.svg'
import bakery from '../../public/Icons/bakery.svg'
import drinks from '../../public/Icons/drinks1.svg'
import pizza from '../../public/Icons/pizza.svg'
import sandwiches from '../../public/Icons/sandwiche.svg'
import deserts from '../../public/Icons/desert.svg'
import beef from '../../public/Images/beef.png'
import Croissant from '../../public/Images/cor.png'
import Cappuccino from '../../public/Images/cappuccino.svg'
import ApplePie from '../../public/Images/ApplePie.png'
import icedTea from '../../public/Images/icedTea.png'
import chocklateCake from '../../public/Images/chocklateCake.png'
import CheckenSandwich from '../../public/Images/CheckenSandwich.png'
import latte from '../../public/Images/latte.png'
import espresso from '../../public/Images/espresso.png'
import vanillaCupCake from '../../public/Images/vanillaCupCake.png'
import lemonada from '../../public/Images/lemonada.png'

export const sideBarLinks:SidebarLinks[] = [
    {
        title: 'Point of Sale',
        route: '/',
        icon: home,
        role: 'User'
    },
    {
        title: 'Reports',
        route: '/reports',
        icon: reports,
        role: 'Admin'
    },
    {
        title: 'Inventory',
        route: '/inventory',
        icon: inventory,
        role: 'User'
    },
    {
        title: 'Teams',
        route: '/teams',
        icon: teams,
        role: 'Admin'
    },
    {
        title: 'Settings',
        route: `/settings`,
        icon: settings,
        role: 'User',
        dropDownItems : [
            {
                option: 'Categories',
                route: '/category',
                id: 12,
                role: 'User'
            },{
                option: 'Products',
                route: '/product',
                id: 13,
                role: 'User'
            },{
                option: 'Branches',
                route: '/branch',
                id: 15,
                role: 'Admin'
            },{
                option: 'Cooperations',
                route: '/cooperation',
                id: 16,
                role: 'Admin'
            },{
                option: 'Customers',
                route: '/customer',
                id: 18,
                role: 'User'
            },{
                option: 'Suppliers',
                route: '/supplier',
                id: 17,
                role: 'Admin'
            },{
                option: 'Terminals',
                route: '/terminal',
                id: 20,
                role: 'Admin'
            },
        ]
    },
]

export const resources = [
    {
        name: 'Categories',
        resource: 'Category',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the category name.',
            },
        ],
        key: 2,
        role: 'User'
    },
    {
        name: 'Products',
        resource: 'Product',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the product name.',
            },
            {
                label: 'Price',
                key: 'salePrice',
                type: 'number',
                message: 'Please input a valid price.',
            },
            {
                label: 'SKU',
                key: 'sku',
                type: 'string',
                message: 'Please input the SKU.',
            },
            {
                label: 'Category',
                key: 'category_id',
                type: 'select',
                message: 'Please select a category.',
            },
        ],
        key: 5,
        role: 'User'
    },
    {
        name: 'Branches',
        resource: 'Branch',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the branch name.',
            },
            {
                label: 'Address',
                key: 'address',
                type: 'string',
                message: 'Please input the branch address.',
            },
            {
                label: 'Phone',
                key: 'phone',
                type: 'string',
                message: 'Please input a valid phone number.',
            },
            {
                label: 'Cooperation',
                key: 'cooperation_id',
                type: 'select',
                message: 'Please select a cooperation.',
            },
        ],
        key: 1,
        role: 'Admin'
    },
    {
        name: 'Cooperations',
        resource: 'Cooperation',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the cooperation name.',
            }
        ],
        key: 3,
        role: 'Admin'
    },
    {
        name: 'Customers',
        resource: 'Customer',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the customer name.',
            },
            {
                label: 'Phone',
                key: 'phone',
                type: 'string',
                message: 'Please input a valid phone number.',
            },
            {
                label: 'Email',
                key: 'email',
                type: 'string',
                message: 'Please input a valid email address.',
            },
            {
                label: 'Cooperation',
                key: 'cooperation_id',
                type: 'select',
                message: 'Please select a cooperation.',
            },
        ],
        key: 4,
        role: 'User'
    },
    {
        name: 'Suppliers',
        resource: 'Supplier',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the supplier name.',
            },
            {
                label: 'Contact',
                key: 'contact',
                type: 'string',
                message: 'Please input the contact information.',
            },
            {
                label: 'Address',
                key: 'address',
                type: 'string',
                message: 'Please input the supplier address.',
            },
        ],
        key: 6,
        role: 'Admin'
    },{
        name: 'Terminals',
        resource: 'Terminal',
        fields: [
            {
                label: 'Name',
                key: 'name',
                type: 'string',
                message: 'Please input the Terminal name.',
            },
            {
                label: 'Identifier',
                key: 'identifier',
                type: 'string',
                message: 'Please input the identifier information.',
            },
            {
                label: 'Branch',
                key: 'branch_id',
                type: 'select',
                message: 'Please input the Terminal Branch.',
            },
        ],
        key: 7,
        role: 'Admin'
    },
];


export const Categories: CategoriesType[] = [
    {
        name: 'All Menu',
        quantity: 90,
        image: allMenu,
        id: 1,
        color: 'text-white', // Text color
        bgColor: 'bg-blue-500' // Background color
    },
    {
        name: 'Bakery',
        quantity: 20,
        image: bakery,
        id: 2,
        color: 'text-gray-800', // Text color
        bgColor: 'bg-yellow-500' // Background color
    },
    {
        name: 'Deserts',
        quantity: 10,
        image: deserts,
        id: 3,
        color: 'text-white', // Text color
        bgColor: 'bg-pink-500' // Background color
    },
    {
        name: 'Drinks',
        quantity: 20,
        image: drinks,
        id: 4,
        color: 'text-white', // Text color
        bgColor: 'bg-green-500' // Background color
    },
    {
        name: 'Pizza',
        quantity: 30,
        image: pizza,
        id: 5,
        color: 'text-white', // Text color
        bgColor: 'bg-red-500' // Background color
    },
    {
        name: 'Sandwiches',
        quantity: 10,
        image: sandwiches,
        id: 6,
        color: 'text-white', // Text color
        bgColor: 'bg-orange-500' // Background color
    }
];

export const products = [
    {
        id: 1,
        image: chocklateCake,
        name: "Chocolate Cake",
        category: "Cake",
        price: 5.99,
        quantity: 1,
    },
    {
        id: 2,
        image: Croissant,
        name: "Croissant",
        category: "Pastry",
        price: 2.49,
        quantity: 1,
    },
    {
        id: 3,
        image: Cappuccino,
        name: "Cappuccino",
        category: "Coffee",
        price: 3.49,
        quantity: 1,
    },
    {
        id: 4,
        image: latte,
        name: "Latte",
        category: "Coffee",
        price: 3.99,
        quantity: 1,
    },
    {
        id: 5,
        image: ApplePie,
        name: "Apple Pie",
        category: "Dessert",
        price: 4.29,
        quantity: 1,
    },
    {
        id: 6,
        image: icedTea,
        name: "Iced Tea",
        category: "Drink",
        price: 2.99,
        quantity: 1,
    },
    {
        id: 7,
        image: CheckenSandwich,
        name: "Chicken Sandwich",
        category: "Snack",
        price: 6.49,
        quantity: 1,
    },
    {
        id: 8,
        image: vanillaCupCake,
        name: "Vanilla Cupcake",
        category: "Cake",
        price: 2.99,
        quantity: 1,
    },
    {
        id: 9,
        image: espresso,
        name: "Espresso",
        category: "Coffee",
        price: 2.49,
        quantity: 1,
    },
    {
        id: 10,
        image: lemonada,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 11,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 12,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 13,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 14,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 15,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 16,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 17,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 18,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    }, {
        id: 19,
        image: beef,
        name: "Lemonade",
        category: "Drink",
        price: 3.29,
        quantity: 1,
    },
];

export const cartProducts = [

]

export const productImages = [
    beef,Croissant,chocklateCake,latte,lemonada,Cappuccino,CheckenSandwich
]
export const categoriesImages = [
 allMenu ,
 bakery ,
 drinks ,
 pizza ,
 sandwiches ,
 deserts
]




