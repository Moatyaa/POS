import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useSettings } from "@/Context/SettingsContext";
import { Product } from "@/Types/productsTypes";
import { Category } from "@/Types/modalType";
import ImageWithFallback from "@/Components/ui/ImageWithFallback";
import { httpInterceptor } from "@/lib/utils";
import allMenu from '../../../public/Icons/allMenu.svg';
import Cookies from "js-cookie";
import Image from 'next/image';
import {useTranslations} from "use-intl";

interface Props {
    setStockProducts: Dispatch<SetStateAction<Product[]>>;
}

function CategoriesSlider({ setStockProducts }: Props) {
    const storageRefreshedToken = Cookies.get('refreshToken');
    const { categories, fetchDataById, setError, stockProducts } = useSettings();
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const t = useTranslations('Slider')
    async function handleClick(id: number) {
        setStockProducts([]);
        setActiveCategory(id);
        sessionStorage.setItem("ActiveCategoryId", String(id))
        try {
            const response: Product = await fetchDataById(`ProductStock/GetByCategoryId/${id}`);
            setStockProducts(response.content);
        } catch (err) {
            console.error(err);
        }
    }

    async function getAll() {
        sessionStorage.removeItem('ActiveCategoryId')
        try {
            const fetchedProducts: any = await httpInterceptor('GET', {}, { isPagable: false }, `${process.env.NEXT_PUBLIC_API_URL}/ProductStock`, storageRefreshedToken ? storageRefreshedToken : '');
            setStockProducts(fetchedProducts.content);
            setActiveCategory(null); // Set "

            // All Menu" as active
            return fetchedProducts.content;
        } catch {
            setError('An error occurred while fetching products');
        }
    }

    useEffect(() => {
        const storedId = sessionStorage.getItem("ActiveCategoryId");
        if (storedId) {
            handleClick(parseInt(storedId, 10));
        } else {
            getAll();
        }
    }, []);


    return (
        <section className="categorieSlider">
            <Swiper
                slidesPerView={5}
                spaceBetween={15}
                modules={[Pagination]}
                className="mySwiper"
                dir={'ltr'}
            >
                <SwiperSlide
                    onClick={() => getAll()}
                    className={`categoryCard group default-shadow flex-col ${activeCategory === null ? 'active' : ''}`}
                    key={'All'}
                >
                    <div className="iconHolder">
                        <Image src={allMenu} alt={'All Menu'} width={20} height={20} />
                    </div>
                    <div className="catInfo">
                        <h3 className="catTitle">{t("All Menu")}</h3>
                        <p className="catQuantity">{stockProducts.length} {t("Items")}</p>
                    </div>
                </SwiperSlide>
                {categories.map((cat: Category, index: number) => (
                    <SwiperSlide
                        onClick={() => handleClick(cat.id)}
                        className={`categoryCard group default-shadow flex-col ${activeCategory === cat.id ? 'active' : ''}`}
                        key={index}
                    >
                        <div className="iconHolder">
                            <ImageWithFallback id={cat.id} resource={`Category`} />
                        </div>
                        <div className="catInfo">
                            <h3 className="catTitle">{cat.name}</h3>
                            <p className="catQuantity">{cat.numberOfProductsStock} {t("Items")}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default CategoriesSlider;
