'use client';
import React, { useState} from 'react';
import SubLinksHeader from '@/Components/SubLinksHeader/SubLinksHeader';
import { useProduct } from '@/hooks/useProduct';
import Image from "next/image";
import plus from "../../../public/Icons/icon-plus.svg";
import AddProductModal from "@/Components/Inventory/AddStockProductModal";
import ImageWithFallback from "@/Components/ui/ImageWithFallback";
import {useTranslations} from "use-intl";
import {Product} from "@/Types/modalType";
import {Toaster} from "react-hot-toast";


function Inventory() {
    const { stockProducts , fetchStockProducts  } = useProduct();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>([]);
    const t = useTranslations("Inventory")
    const handleAdd = () => {
        setSelectedProduct([])
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        fetchStockProducts()
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
        setModalOpen(true)
    }
    console.log(stockProducts)


    return (
        <>
            <section id="inventory" className="inventory p-6 bg-gray-100">
                <Toaster/>
                <SubLinksHeader activeSubLinkTitle={"Inventory"}/>
                <div className="operationHeader" onClick={handleAdd}>
                    <h4>{t("Add Product to Stock")}</h4>
                    <div className="plusIcon">
                        <Image src={plus} width={15} height={15} alt="Add"/>
                    </div>
                </div>
                <div className="inventoryBody gap-6 mt-6">
                    <div
                        className="inventoryContent overflow-auto h-[70vh]  col-span-2 bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-4">{t("Stock Products")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                            {stockProducts?.map((product) => (
                                <div key={product.id}
                                     className="card p-4 border rounded-md shadow-sm"
                                     onClick={()=>handleProductClick(product)}
                                >
                                    <div
                                        className="catHolder w-[120px] h-[120px] mx-auto !bg-transparent border-b !rounded-none overflow-hidden group relative">
                                        <ImageWithFallback id={product.product_id} resource={`Product`} width={120} height={120}/>
                                    </div>
                                    <h3 className="text-lg font-medium mb-1">{t("Name")}: {product.product.name}</h3>
                                    <p className={`${product.product.service?'hidden' :''}`}>{t("Stock")}: {product.stock} </p>
                                    <p className="">{t("Price")}: {product.product.salePrice} </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} selectedProduct={selectedProduct} />
        </>
    );
}

export default Inventory;
