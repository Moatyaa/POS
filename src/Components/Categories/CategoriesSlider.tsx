import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Categories } from "@/Constants/data";
import Image from "next/image";
import { CategoriesType } from "@/Types/types";
import {useCategory} from "@/Context/CatIdContext";

function CategoriesSlider() {
    const {setCategoryId} = useCategory()

    function handleClick(id: number) {
        setCategoryId(id);
    }

    return (
        <section className="categorieSlider">
            <Swiper
                slidesPerView={5}
                spaceBetween={15}
                modules={[Pagination]}
                className="mySwiper"
            >
                {Categories.map((cat: CategoriesType, index: number) => (
                    <SwiperSlide
                        onClick={() => handleClick(cat.id)}
                        className="categoryCard group default-shadow flex-col"
                        key={index}
                    >
                        <div className="iconHolder">
                            <Image src={cat.image} alt={cat.name} className="catIcon" />
                        </div>
                        <div className="catInfo">
                            <h3 className="catTitle">{cat.name}</h3>
                            <p className="catQuantity">{cat.quantity} Items</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default CategoriesSlider;
