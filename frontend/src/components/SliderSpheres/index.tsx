import React, { useRef } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetch } from "../../Helpers";
import { Main } from "../../types";
import "./index.css";

export const SliderSpheres = () => {
   const swiperWrappedRef = useRef<HTMLElement | null>(null);

   const { data, error, loading } = useFetch<Main>(
      "http://localhost:8000/api/pages/blocks/4/"
   );
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="sliderShperes__section">
         <h2 className="sliderShperes__section-title">{data?.title}</h2>
         <h3 className="sliderShperes__section-subtitle">{data?.subtitle}</h3>
         <div className="sliderShperes__section-container">
            <Swiper
               modules={[Navigation, Pagination, EffectFade]}
               grabCursor
               initialSlide={3}
               centeredSlides
               slidesPerView="auto"
               speed={800}
               slideToClickedSlide
               pagination={{ clickable: true }}
               breakpoints={{
                  320: { spaceBetween: 40 },
                  650: { spaceBetween: 40 },
                  1000: { spaceBetween: 20 },
               }}
               onSwiper={(swiper: SwiperClass) => {
                  swiperWrappedRef.current = swiper.wrapperEl;
               }}
            >
               <ul className="sliderShperes__section-list">
                  {data?.items.map((p, idx) => (
                     <SwiperSlide
                        key={idx}
                        className="sliderShperes__section-item"
                     >
                        <h3 className="sliderShperes__section-item-title">
                           {p.title}
                        </h3>
                        <div className="sliderShperes__section-item-wrapper">
                           <p className="sliderShperes__section-item-content">
                              {p.content}
                           </p>
                           <img
                              src={p.icon?.url}
                              alt="images"
                              className="sliderSpheres__section-item-img"
                           />
                        </div>
                     </SwiperSlide>
                  ))}
               </ul>
            </Swiper>
         </div>
      </section>
   );
};
