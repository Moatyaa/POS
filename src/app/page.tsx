import React from 'react';
import Header from "@/Components/Header/Header";
import Cart from "@/Components/Cart/Cart";
import {CategoryProvider} from "@/Context/CatIdContext";
import {CartProvider} from "@/Context/CartContext";
import Categories from '../Components/Categories/Categories'

function Home() {
    return <>
         <CartProvider>
            <section className='point_of_Sale'>
                <div className='pos_leftSide'>
                    <Header/>
                    <CategoryProvider>
                        <Categories/>
                    </CategoryProvider>
                </div>
                <div className='pos_rightSide'>
                    <Cart/>
                </div>
            </section>
        </CartProvider>
    </>
}

export default Home;