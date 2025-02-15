'use client';
import CategoriesSlider from "../Categories/CategoriesSlider";
import { useCart } from "@/Context/CartContext";
import SettingContextProvider, {useSettings} from "@/Context/SettingsContext";
import soldOutImage from '../../../public/Icons/out-of-stock (4).png';
import Image from "next/image";
import { Product } from "@/Types/productsTypes";
import React, {useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import ImageWithFallback from "@/Components/ui/ImageWithFallback";
import {useUser} from "@/Context/UserContext";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

function Categories() {
    const { setStockProducts , stockProducts } = useSettings();
    const { setCartProducts, cartProducts } = useCart();
    const {logout} = useUser()
    const router = useRouter()
    useEffect(() => {
        const refreshTokenInCookies = Cookies.get('refreshToken');
        const refreshTokenInSession = sessionStorage.getItem('refreshToken');

        if (refreshTokenInCookies && !refreshTokenInSession) {
            Cookies.remove('refreshToken');
            logout();
            router.push('/login')
        }
    }, [logout])

    const handleClick = (item: Product) => {
        if(!item.product.service){
            const remainingStock = getStoredProductQuantity(item.product_id, item.stock);

            if (remainingStock <= 0) {
                toast.error('Out of stock');
                return;
            }
        }
        toast.success('Item added to cart');
        setCartProducts((prevCart: Product[]) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem && !existingItem.service) {
                console.log('nesdsds')
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const getStoredProductQuantity = (id: number, stock: number) => {
        const activeProduct = cartProducts.find(product => product.product_id === id);
        if (activeProduct) {
            const remainingStock = stock - activeProduct.quantity;
            return remainingStock <= 0 ? 0 : remainingStock;
        }
        return stock;
    };


    return (
        <section id="categories">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="border-b pb-[15px]">
                <SettingContextProvider>
                    <CategoriesSlider setStockProducts={setStockProducts} />
                </SettingContextProvider>
            </div>
            <div className="products">
                {stockProducts.length > 0 ? (
                    <div className="grid grid-cols-5 gap-4">
                        {stockProducts.map((item, index) => {

                            let remainingStock = 0
                            let isItemOutOfStock = false

                            if (!item.product.service) {
                                remainingStock = getStoredProductQuantity(item.product_id, item.stock);
                                isItemOutOfStock = remainingStock === 0;
                            }

                            return (
                                <div className="relative" key={index}>
                                    {isItemOutOfStock && (
                                        <div className="outOfStockLayer center cursor-not-allowed">
                                            <Image
                                                src={soldOutImage}
                                                alt="sold out"
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                    )}
                                    <div
                                        className="card group cursor-pointer relative"
                                        onClick={() => handleClick(item)}
                                        style={{ pointerEvents: isItemOutOfStock ? 'none' : 'auto' }}
                                    >
                                        <div className="catHolder overflow-hidden group relative h-[120px]">
                                            <ImageWithFallback id={item.product_id} resource={`Product`} width={120} height={120} className="object-cover group-hover:scale-110 group-hover:opacity-90 group-hover:rotate-[2deg] transition-transform duration-300 ease-in-out" />
                                        </div>
                                        <h3 className="itemName">{item.product.name}</h3>
                                        <div className="cardInfo">
                                            <span className="itemCategory">{item.product.category.name}</span>
                                            <span className="itemPrice">{item.product.salePrice} EGP</span>
                                            <span className={`itemStock ${item.product.service ? 'hideCount' : ''} `}>
                                                {isItemOutOfStock ? 0 : remainingStock}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[50vh] text-center mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-700">
                                لا توجد منتجات متاحة في هذا التصنيف! 🛒
                            </h2>
                            <p className="text-lg text-gray-500 mt-4">
                                جرب اختيار تصنيف آخر أو تابعنا لاحقًا.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Categories;
