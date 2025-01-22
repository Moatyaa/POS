'use client'
import CategoriesSlider from "../Categories/CategoriesSlider";
import Image from "next/image";
import { products } from "@/Constants/data";
import { ProductType } from "@/Types/types";
import { useCart } from "@/Context/CartContext";


function Categories() {
    const {setCartProducts} = useCart(); // Use cart context
    // const {categoryId} = useCategory();

    const handleClick = (item: ProductType) => {
        setCartProducts((prevCart: ProductType[]) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };



    return (
        <section id="categories">
            <div className="border-b pb-[15px]">
                <CategoriesSlider />
            </div>
            <div className="products">
                <div className="grid grid-cols-5 gap-4">
                    {products.map((item, index) => (
                        <div
                            className="card group cursor-pointer"
                            onClick={() => handleClick(item)}
                            key={index}
                        >
                            <div className="catHolder overflow-hidden group relative">
                                <Image
                                    className="object-cover group-hover:scale-110 group-hover:opacity-90 group-hover:rotate-[2deg] transition-transform duration-300 ease-in-out"
                                    src={item.image.src}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                />
                            </div>
                            <h3 className="itemName">{item.name}</h3>
                            <div className="cardInfo">
                                <span className="itemCategory">{item.category}</span>
                                <span className="itemPrice">{item.price} EGP</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
