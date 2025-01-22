'use client'
import React, { useState} from 'react';
import Image from "next/image";
import edit from '../../../public/Icons/edit.svg';
import deleteIcon from '../../../public/Icons/delete.svg';
import { deleteCartItem, incrementCartItem, decrementCartItem, handleInputNumberChange } from "@/lib/utils"; // Correct import
import { useCart } from "@/Context/CartContext";
import CartConfirmationModal from "@/Components/Cart/CartConfirmationModal";

function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomNumber, setRoomNumber] = React.useState(1001);
    const { cartProducts, setCartProducts } = useCart();

    // Increment quantity for specific item
    const handleIncrement = (id: number) => {
        incrementCartItem(id, cartProducts, setCartProducts);
    };

    // Decrement quantity for specific item
    const handleDecrement = (id: number) => {
        decrementCartItem(id, cartProducts, setCartProducts);
    };

    // Handle item deletion
    const handleDelete = (id: number) => {
        const updatedCart = deleteCartItem(cartProducts, id);
        setCartProducts(updatedCart);
    };

    // Handle direct input change for quantity
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        handleInputNumberChange(e, (newQuantity) => {
            const updatedCart:any= cartProducts.map(item =>
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
                        <span>Room #</span>
                        <input
                            id='roomNumber'
                            className='w-[15%] !bg-transparent'
                            value={roomNumber}
                            onChange={(e) => handleInputNumberChange(e, setRoomNumber, 1001)}
                            type="text"
                            min="1"
                        />
                        <span> Order</span>
                    </h2>
                    <p className='cartOrderNum'>Order Number #005</p>
                </div>
                <label htmlFor='roomNumber' className='headerEdit'>
                    <Image src={edit} alt='Edit Icon' />
                </label>
            </div>

            <div className='cartContent h-[75vh] overflow-auto'>
                {cartProducts.length !== 0 ? cartProducts.map((item) => (
                    <div key={item.id} className='cartItem'>
                        <div className='cartItemContainer'>
                            <div className='cartItemImage'>
                                <Image
                                    src={item.image.src}
                                    alt={"Product Image"}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className='cartItemDetails'>
                                <div>
                                    <h4 className='cartItemName'>{item.name}</h4>
                                    <p className='cartItemPrice'>{item.price} EGP</p>
                                </div>
                                <div className='cartItemProperties'>
                                    <div className='iconBackLayer' onClick={() => handleDelete(item.id)}>
                                        <span className='iconBg'>
                                            <Image src={deleteIcon} alt='Delete Icon' className='w-[12px] h-[12px]' />
                                        </span>
                                    </div>
                                    <div className='modalCount'>
                                        <button
                                            onClick={() => handleDecrement(item.id)}
                                            aria-label="Decrease quantity"
                                            className="operationIcon !w-[25px] !h-[25px] !text-[18px]"
                                        >
                                            -
                                        </button>
                                        <input
                                            className="w-[50px] text-center bg-transparent outline-none"
                                            value={item.quantity}
                                            onChange={(e) => handleInputChange(e, item.id)} // Changed to use handleInputChange for each item
                                            type="text"
                                            min="1"
                                        />
                                        <button
                                            onClick={() => handleIncrement(item.id)}
                                            aria-label="Increase quantity"
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
                        No Items in Your Cart
                    </span>
                )}
            </div>

            <div className='cartFooter border-t'>
                <div className='cartFooterInfo'>
                    <span>Total</span>
                    <span>
                        {cartProducts.reduce((sum, item) => Math.ceil(sum + item.price * item.quantity), 0)} EGP
                    </span>
                </div>
                <button
                    type="button"
                    className="cartPlaceOrder ant-btn"
                    onClick={()=>{setIsModalOpen(true)}}
                >
                    <span>Place Order</span>
                </button>
            </div>
            <CartConfirmationModal isOpen={isModalOpen}  onCancel={()=>{setIsModalOpen(false)}}/>
        </section>
    );
}

export default Cart;
