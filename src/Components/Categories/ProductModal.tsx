// import React, { useState } from 'react';
// import { incrementCount, decrementCount, handleAddToCart } from '@/lib/utils';
// import Image from 'next/image';
// import CustomModal from "@/Components/CustomModal/CustomModal";
// import {ProductModalProps} from "@/Types/types";
//
// const ProductModal = ({ modalOpen, setModalOpen, currentItem }:ProductModalProps) => {
//     const [count, setCount] = useState(1);
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         if (value === '') {
//             setCount(1);
//         } else if (/^\d+$/.test(value)) { // Validate that input is a valid number
//             setCount(Number(value));
//         }
//     };
//
//     const handleIncrement = () => {
//         incrementCount(count, setCount); // Calls the imported increment function
//     };
//
//     const handleDecrement = () => {
//         decrementCount(count, setCount); // Calls the imported decrement function
//     };
//
//     const handleAddToCartAction = () => {
//         handleAddToCart(currentItem, count);
//         setModalOpen(false);  // Close modal after adding to cart
//     };
//
//     if (!currentItem) return null;
//
//     const content = (
//         <div className='relative'>
//             <div className='modalImage'>
//                 <Image
//                     src={currentItem?.image?.src || '/default-image.png'}
//                     className='w-[50%]'
//                     alt={currentItem?.name || "Product Image"}
//                     width={200}
//                     height={200}
//                 />
//             </div>
//             <span className='itemCategory absolute end-[15px] top-0 !rounded-[0]'>{currentItem?.category}</span>
//             <div className='modalInfo'>
//                 <p className='itemName !text-[20px] mt-[5px]'>{currentItem?.name}</p>
//                 <p className='modalPrice'>{currentItem?.price} EGP</p>
//             </div>
//             <div className='modalCount'>
//                 <button
//                     onClick={handleDecrement} // Decrease the count
//                     aria-label="Decrease quantity"
//                     className="operationIcon"
//                 >
//                     -
//                 </button>
//                 <input
//                     className="count"
//                     value={count}
//                     onChange={handleInputChange}
//                     type="text" // Change type to text to disable number arrows
//                     min="1"
//                     pattern="\d*"
//                 />
//                 <button
//                     onClick={handleIncrement} // Increase the count
//                     aria-label="Increase quantity"
//                     className="operationIcon"
//                 >
//                     +
//                 </button>
//             </div>
//             <button
//                 type="button"
//                 className="modalBtn ant-btn"
//                 onClick={handleAddToCartAction} // Add to cart logic
//             >
//                 <span>Add to Cart ({Math.ceil(count * currentItem.price)} EGP)</span>
//             </button>
//         </div>
//     );
//
//
//     return (
//         <CustomModal
//             modalOpen={modalOpen}
//             setModalOpen={setModalOpen}
//             title="Item Detail"
//             content={content}
//         />
//     );
// };
//
// export default ProductModal;
