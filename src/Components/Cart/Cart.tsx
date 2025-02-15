'use client';

import React, { useState } from 'react';
import Image from "next/image";
import edit from '../../../public/Icons/edit.svg';
import deleteIcon from '../../../public/Icons/delete.svg';
import { deleteCartItem, incrementCartItem, decrementCartItem, handleInputNumberChange } from "@/lib/utils";
import { useCart } from "@/Context/CartContext";
import CartConfirmationModal from "@/Components/Cart/CartConfirmationModal";
import {useProduct} from "@/hooks/useProduct";
import ImageWithFallback from "@/Components/ui/ImageWithFallback";
import {useTranslations} from "use-intl";

function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomNumber, setRoomNumber] = useState(1001);
    const { cartProducts, setCartProducts } = useCart();
    const {stockProducts} = useProduct();
    const t = useTranslations('Cart');

    const handleIncrement = (id: number) => {
        incrementCartItem(id, cartProducts, setCartProducts, stockProducts);
    };

    const handleDecrement = (id: number) => {
        const product = cartProducts.find(item => item.id === id);

        if (product && product.quantity === 1) {
            handleDelete(id);
        } else {
            decrementCartItem(id, cartProducts, setCartProducts);
        }
    };

    const handleDelete = (id: number) => {
        const updatedCart = deleteCartItem(id, cartProducts);
        setCartProducts(updatedCart);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        handleInputNumberChange(e, (newQuantity) => {
            const updatedCart: any = cartProducts.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            setCartProducts(updatedCart);
        });
    };

    return (
        <section id='cart' className='cart'>
            <div className='cartHeader'>
                <div className='headerInfo'>
                    <h2 className='cartRoomNum flex items-center'>
                        <span>{t('roomLabel')}</span>
                        <input
                            id='roomNumber'
                            className='w-[15%] !bg-transparent'
                            value={roomNumber}
                            onChange={(e) => handleInputNumberChange(e, setRoomNumber, 1001)}
                            type="text"
                            min="1"
                        />
                        <span>{t('orderLabel')}</span>
                    </h2>
                    <p className='cartOrderNum'>{t('orderNumber')} #005</p>
                </div>
                <label htmlFor='roomNumber' className='headerEdit'>
                    <Image src={edit} alt={t('editIconAlt')} />
                </label>
            </div>

            <div className='cartContent h-[75vh] overflow-auto'>
                {cartProducts.length !== 0 ? cartProducts.map((item) => (
                    <div key={item.id} className='cartItem'>
                        <div className='cartItemContainer'>
                            <div className='cartItemImage'>
                                <ImageWithFallback id={item.product_id} resource={`Product`} width={100} height={100}/>
                            </div>
                            <div className='cartItemDetails'>
                                <div>
                                    <h4 className="cartItemName">{item.product.name}</h4>
                                    <p className="cartItemPrice">{item.product.salePrice} {t("EGP")}</p>
                                </div>
                                <div className='cartItemProperties'>
                                    <div className='iconBackLayer' onClick={() => handleDelete(item.id)}>
                                        <span className='iconBg'>
                                            <Image src={deleteIcon} alt={t('deleteIconAlt')} className='w-[12px] h-[12px]' />
                                        </span>
                                    </div>
                                    <div className='modalCount'>
                                        <button
                                            onClick={() => handleDecrement(item.id)}
                                            aria-label={t('decrementAriaLabel')}
                                            className="operationIcon !w-[25px] !h-[25px] !text-[18px]"
                                            disabled={item.quantity === 0}
                                        >
                                            -
                                        </button>
                                        <input
                                            className="w-[50px] !text-center bg-transparent outline-none"
                                            value={item.quantity}
                                            onChange={(e) => handleInputChange(e, item.id)}
                                            type="number"
                                            min="1"
                                            disabled={true}
                                        />
                                        <button
                                            onClick={() => handleIncrement(item.id)}
                                            aria-label={t('incrementAriaLabel')}
                                            className="operationIcon !w-[25px] !h-[25px] !text-[18px]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <span className='py-5 flex justify-center items-center h-[75vh] text-[18px] text-center'>
                        {t('noItemsInCart')}
                    </span>
                )}
            </div>

            <div className='cartFooter border-t'>
                <div className='cartFooterInfo'>
                    <span>{t('total')}</span>
                    <span>
                        {cartProducts.reduce((sum, item) => Math.ceil(sum + item.product.salePrice * item.quantity), 0)} {t("EGP")}
                    </span>
                </div>
                <button
                    type="button"
                    className="cartPlaceOrder ant-btn"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    <span>{t('placeOrder')}</span>
                </button>
            </div>
            <CartConfirmationModal isOpen={isModalOpen} onCancel={setIsModalOpen} />
        </section>
    );
}

export default Cart;
