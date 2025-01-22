'use client';
import React, { useState } from 'react';
import SubLinksHeader from '@/Components/SubLinksHeader/SubLinksHeader';
import { useProduct } from '@/hooks/useProduct';
import Image from "next/image";
import cor from '../../../public/Images/cor.png'
import EditModal from "@/Components/Settings/EditModal";
import {Content} from "@/Types/categoriesTypes";
function Inventory() {
    const { products , selectedProducts } = useProduct();

    const fields = [
        {
            label: 'Number',
            key: 'stock',
            type: 'number',
            message: 'Please input the customer name.'
        }
    ]

    const [modalState, setModalState] = useState({
        open: false,
        mode: '' as 'add' | 'edit',
        currentId: null as number | null,
        currentName: '',
        currentItem: {} as Content,
        type: "to Stock",
        resource: "ProductStock"

    });

    // Function to handle Edit modal
    // const handleEdit = (item: Content) => {
    //     setModalState({
    //         open: true,
    //         mode: 'edit',
    //         currentId: item.id,
    //         currentName: item.name,
    //         currentItem: item,
    //         type: "to Stock",
    //         resource: "ProductStock"
    //     });
    // };

    // // Function to handle Delete
    // const handleDelete = (id: number) => {
    //     removeData(id, resource);
    // };

    // Function to open Add modal
    const handleAdd = (product:any) => {
        setModalState({
            open: true,
            mode: 'add',
            currentId: null,
            currentName: '',
            currentItem: product,
            type: "to Stock",
            resource: "ProductStock"
        });
    };
    // const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    console.log(products);
    // Add product to selectedProducts
    // const handleAddProduct = useCallback((product: Product) => {
    //     setSelectedProducts((prevSelected) => {
    //         if (!prevSelected.some((p) => p.id === product.id)) {
    //             return [...prevSelected, product];
    //         }
    //         return prevSelected;
    //     });
    // }, []);
    //
    // // Remove product from selectedProducts
    // const handleRemoveProduct = useCallback((productId: number) => {
    //     setSelectedProducts((prevSelected) => prevSelected.filter((p) => p.id !== productId));
    // }, []);

    return (
        <>
            <section id="inventory" className="inventory p-6 bg-gray-100">
                <SubLinksHeader activeSubLinkTitle={"Inventory"} />
                <div className="inventoryBody grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Slider Section */}
                    <div className="inventorySlider bg-white shadow-md rounded-md p-4 ">
                        <h2 className="text-xl font-semibold mb-4">Products</h2>
                        <div className="space-y-4">
                            {products && products.length > 0 ?products.map((product) => (
                                <div
                                    key={product.id}
                                    className="sliderItem p-4 bg-blue-100 rounded-md hover:bg-blue-200 cursor-pointer transition"
                                    onClick={() => handleAdd(product)}
                                >
                                    {product.name}
                                </div>
                            )):''}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="inventoryContent overflow-auto h-[70vh]  col-span-2 bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Selected Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                            {selectedProducts?.map((product) => (
                                <div key={product.id} className="card p-4 border rounded-md shadow-sm">
                                    <div className="catHolder !bg-transparent border-b !rounded-none overflow-hidden group relative">
                                        <Image
                                            className="object-cover group-hover:scale-110 group-hover:opacity-90 group-hover:rotate-[2deg] transition-transform duration-300 ease-in-out"
                                            src={cor}
                                            alt={'cor'}
                                            width={120}
                                            height={120}
                                        />
                                    </div>                                    <h3 className="text-lg font-medium mb-1">Name: {product.name}</h3>
                                    <p className="mb-2">Price: {product.salePrice} EGP</p>
                                    <button
                                        className="text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleRemoveProduct(product?.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <EditModal
                modalState={modalState}
                setModalState={setModalState}
                activeSubLinkTitle={'to Stock'}
                fields={fields}
            />
        </>
    );
}

export default Inventory;
