import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css"; // Основные стили
import "swiper/css/navigation"; // Стили для навигации
import "swiper/css/pagination"; // Стили для пагинации
import { useFetch } from "../../Helpers";
import { Main } from "../../types";
import "./index.css";

// Импортируйте модули, если вы их используете (например, для эффектов или навигации)

export const SliderSpheres = () => {
   const swiperWrappedRef = useRef<HTMLElement | null>(null);

   function adjustMargin(): void {
      const screenWidth = window.innerWidth;
      if (swiperWrappedRef.current) {
         swiperWrappedRef.current.style.marginLeft =
            screenWidth <= 520
               ? "0px"
               : screenWidth <= 650
               ? "-50px"
               : screenWidth <= 800
               ? "-100px"
               : "-150px";
      }
   }
   useEffect(() => {
      adjustMargin();
      window.addEventListener("resize", adjustMargin);
      return () => window.removeEventListener("resize", adjustMargin);
   }, []);
   const { data, error, loading } = useFetch<Main>(
      "http://localhost:8000/api/pages/blocks/4/"
   );
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="sliderShperes__section">
         <h2 className="sliderShperes__section-title">{data?.title}</h2>
         <p className="sliderShperes__section-subtitle">{data?.subtitle}</p>
         <div className="sliderSheres__section-container">
            <Swiper
               modules={[Navigation, Pagination, EffectFade]}
               grabCursor // Передайте нужные модули
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
                              src={p.icon.url}
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
