import { useEffect, useRef, useState } from "react";
import { Main } from "../../types";
import "./index.css";

const SWIPE_THRESHOLD = 50; // px

export const ScopeApplication = () => {
   const [block, setBlock] = useState<Main | null>(null);
   const [index, setIndex] = useState(0);
   const trackRef = useRef<HTMLDivElement>(null);
   const isDragging = useRef(false);
   const startX = useRef(0);
   const currentX = useRef(0);

   /* ---------- API ---------- */
   useEffect(() => {
      fetch("http://localhost:8000/api/pages/blocks/4")
         .then((r) => r.json())
         .then(setBlock)
         .catch(console.error);
   }, []);

   if (!block) return <p>Loading applications...</p>;

   const { title, subtitle, items } = block;
   const len = items.length;

   /* ---------- ЛОГИКА СЛАЙДЕРА ---------- */
   const go = (i: number) => setIndex((i + len) % len);

   /* ---------- МЫШЬ ---------- */
   const onMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      currentX.current = e.clientX;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
   };

   const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      currentX.current = e.clientX;
      const diff = currentX.current - startX.current;
      trackRef.current.style.transform = `translateX(calc(-${
         index * 100
      }% + ${diff}px))`;
   };

   const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      const diff = currentX.current - startX.current;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
         diff > 0 ? go(index - 1) : go(index + 1);
      } else {
         // отпустили внутри порога — возвращаемся
         if (trackRef.current) trackRef.current.style.transform = "";
      }
   };

   /* ---------- ТАЧ ---------- */
   const onTouchStart = (e: React.TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      currentX.current = e.touches[0].clientX;
   };

   const onTouchMove = (e: React.TouchEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      currentX.current = e.touches[0].clientX;
      const diff = currentX.current - startX.current;
      trackRef.current.style.transform = `translateX(calc(-${
         index * 100
      }% + ${diff}px))`;
   };

   const onTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const diff = currentX.current - startX.current;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
         diff > 0 ? go(index - 1) : go(index + 1);
      } else {
         if (trackRef.current) trackRef.current.style.transform = "";
      }
   };

   /* ---------- РЕНДЕР ---------- */
   return (
      <section className="applications-slider">
         <div className="applications-header">
            <h2 className="applications-title">{title}</h2>
            <p className="applications-subtitle">{subtitle}</p>
         </div>

         <div
            className="slider-body"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
         >
            <button
               className="slider-arrow slider-arrow--left"
               onClick={() => go(index - 1)}
               aria-label="Prev"
            />

            <div
               className="slider-track"
               ref={trackRef}
               style={{ transform: `translateX(-${index * 100}%)` }}
            >
               {items.map((it) => (
                  <article key={it.id} className="application-card">
                     <img
                        src={it.icon?.url || "/images/placeholder.jpg"}
                        alt={it.title}
                        className="application-card-img"
                     />
                     <h3 className="application-card-title">{it.title}</h3>
                     <p className="application-card-desc">{it.content}</p>
                  </article>
               ))}
            </div>

            <button
               className="slider-arrow slider-arrow--right"
               onClick={() => go(index + 1)}
               aria-label="Next"
            />
         </div>

         <div className="slider-dots">
            {items.map((_, i) => (
               <button
                  key={i}
                  className={`slider-dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
               />
            ))}
         </div>
      </section>
   );
};
