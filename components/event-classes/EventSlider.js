import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
const EventSlider = (props) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
    return (
        <Swiper
            // install Swiper modules
            spaceBetween={30}
            slidesPerView={4}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log('')}
            onSlideChange={() => console.log('')}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                481: {
                    slidesPerView: 3,
                },
                769: {

                    slidesPerView: 4,
                },
                // when window width is >= 768px

            }}


        >
            {props.children}

        </Swiper>);
}

export default EventSlider;