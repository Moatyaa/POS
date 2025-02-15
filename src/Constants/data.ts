import home from '../../public/Icons/home.svg'
import reports from '../../public/Icons/reports.svg'
import inventory from '../../public/Icons/inventory.svg'
import teams from '../../public/Icons/teams.svg'
import settings from '../../public/Icons/settings.svg'
import {SidebarLinks} from "@/Types/types";
import  financial from '../../public/Icons/icons8-bank-safe-50.png'
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
    },{
        title: 'Financial',
        route: '/financial',
        icon: financial,
        role: 'Accountant'
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
            },{
                label: 'Services',
                key: 'service',
                type: 'checkbox',
                message: 'Please select is service.',
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




export const cartProducts = [

]



