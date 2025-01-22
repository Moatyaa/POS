import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import '../../Styles/globals.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import Image from "next/image";
import {StaticImageData} from "@/Types/types";

export default function ModalSlider({ images }: StaticImageData ) {

    return (
        <section id='modalSlider' className='my-[15px]'>
            {images.length !== 0 ? <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper w-[180px] h-[180px]"
            >
                {images.map((image,index)=>{
                    return (
                        <SwiperSlide key={index} className='!center'>
                            <div className="catHolder w-[100%]">
                                <Image
                                    className="w-[120px] h-[120px]"
                                    src={image}
                                    alt='Slider Item'
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper> : 'There Is No Available Images'}

        </section>
    );
}
