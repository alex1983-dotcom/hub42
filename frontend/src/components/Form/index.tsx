// import "./index.css";
// import { FormEvent, useState } from "react";
// import { useFetch } from "../../Helpers";
// import { FormData, SourcesInformation } from "../../types";

// export const MyForm: React.FC = () => {
//    const { data, loading, error } = useFetch<SourcesInformation>(
//       "http://localhost:8000/api/requests/lead-sources"
//    );
//    const [form, setForm] = useState<FormData>({
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       message: "",
//       lead_source: null, // ← просто null
//    });
//    const handleChange = (
//       e: React.ChangeEvent<
//          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//       >
//    ) => {
//       const { name, value } = e.target;
//       setForm((prev) => ({ ...prev, [name]: value }));
//    };
//    const handleSubmit = async (e: FormEvent) => {
//       e.preventDefault();
//       try {
//          const res = await fetch(
//             "http://localhost:8000/api/requests/contact-requests/",
//             {
//                method: "POST",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify(form),
//             }
//          );
//          if (!res.ok) {
//             const err = await res
//                .json()
//                .catch(() => ({ detail: "Network error" }));
//             console.error("Ошибка сервера:", err);
//             return;
//          }
//          const data = await res.json();
//          console.log("Заявка создана:", data);
//          setForm({
//             name: "",
//             email: "",
//             phone: "",
//             company: "",
//             lead_source: null,
//             message: "",
//          });
//       } catch (networkError) {
//          console.error("Сетевая ошибка:", networkError);
//       }
//    };
//    if (loading) return <p>Loading…</p>;
//    if (error) return <p>Ошибка загрузки</p>;
//    return (
//       <form className="order-form" onSubmit={handleSubmit}>
//          <div className="order-form__wrapper">
//             <h3 className="order-form__title">Оставить заявку</h3>
//             <p className="order-form__subtitle">
//                Отчёт —<br />в течение 48 часов
//             </p>
//          </div>
//          <div className="order-form__grid">
//             <label className="order-form__field">
//                <span className="order-form__label">Имя *</span>
//                <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Имя"
//                   required
//                />
//             </label>
//             <label className="order-form__field">
//                <span className="order-form__label">Email *</span>
//                <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="mail@example.com"
//                   required
//                />
//             </label>
//             <label className="order-form__field">
//                <span className="order-form__label">Телефон</span>
//                <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="+7 (___) ___-__-__"
//                />
//             </label>
//             <label className="order-form__field">
//                <span className="order-form__label">Компания</span>
//                <input
//                   type="text"
//                   name="company"
//                   value={form.company}
//                   onChange={handleChange}
//                   placeholder="Название компании"
//                />
//             </label>
//             <label className="order-form__field  order-form__field--full">
//                <span className="order-form__label">Источник *</span>
//                <select
//                   name="lead_source"
//                   value={form.lead_source ?? ""}
//                   onChange={handleChange}
//                   required
//                >
//                   <option value="0">Откуда узнали про нас?</option>
//                   {data?.results.map((p) => (
//                      <option key={p.id} value={p.id}>
//                         {p.name}
//                      </option>
//                   ))}
//                </select>
//             </label>
//             <label className="order-form__field  order-form__field--full">
//                <span className="order-form__label">Сообщение</span>
//                <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   placeholder="Дополнительная информация"
//                   rows={4}
//                />
//             </label>
//          </div>
//          <div className="order-form__footer">
//             <p className="order-form__note">
//                Нажимая «Отправить», вы соглашаетесь с{" "}
//                <a href="/privacy" target="_blank" rel="noopener noreferrer">
//                   Политикой конфиденциальности
//                </a>{" "}
//                и{" "}
//                <a href="/terms" target="_blank" rel="noopener noreferrer">
//                   Пользовательским соглашением
//                </a>
//                .
//             </p>
//          </div>
//          <button type="submit" className="order-form__submit">
//             Отправить заявку
//          </button>
//       </form>
//    );
// };

import "./index.css";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../Helpers";
import { FormData, SourcesInformation } from "../../types";

const CONTACT_URL = "http://localhost:8000/api/requests/contact-requests/";
const REVIEW_URL = "http://localhost:8000/api/requests/leave-review/";

type SendState =
   | { type: "idle" }
   | { type: "success" }
   | { type: "error"; msg: string };

export const MyForm: React.FC = () => {
   /* 1. режим */
   const { pathname = "" } = useLocation();
   const mode = useMemo<"contact" | "review">(
      () => (pathname === "/opinions" ? "review" : "contact"),
      [pathname]
   );

   /* 2. справочник */
   const { data, loading, error } = useFetch<SourcesInformation>(
      mode === "contact"
         ? "http://localhost:8000/api/requests/lead-sources"
         : null
   );

   /* 3. форма */
   const [form, setForm] = useState<FormData>(() => ({
      name: "",
      email: "",
      phone: "",
      company: "",
      ...(mode === "contact"
         ? { message: "", lead_source: null }
         : { review: "" }),
   }));

   /* 4. состояние отправки */
   const [send, setSend] = useState<SendState>({ type: "idle" });

   /* 5. сброс формы при смене режима */
   useEffect(() => {
      setForm({
         name: "",
         email: "",
         phone: "",
         company: "",
         ...(mode === "contact"
            ? { message: "", lead_source: null }
            : { review: "" }),
      });
      setSend({ type: "idle" });
   }, [mode]);

   /* 6. авто-скрытие блока через 4 с */
   useEffect(() => {
      if (send.type === "success" || send.type === "error") {
         const t = setTimeout(() => setSend({ type: "idle" }), 4000);
         return () => clearTimeout(t);
      }
   }, [send]);

   /* 7. обработчик полей */
   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
   };

   /* 8. отправка */
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setSend({ type: "idle" });

      const url = mode === "contact" ? CONTACT_URL : REVIEW_URL;
      const body =
         mode === "contact"
            ? {
                 name: form.name,
                 email: form.email,
                 phone: form.phone,
                 company: form.company,
                 message: form.message,
                 lead_source: form.lead_source,
              }
            : {
                 name: form.name,
                 email: form.email,
                 phone: form.phone,
                 company: form.company,
                 review: form.review,
              };

      try {
         const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
         });
         if (!res.ok) {
            const txt = await res.text();
            throw new Error(txt || "Ошибка сервера");
         }
         await res.json();
         setSend({ type: "success" });
         /* сброс полей */
         setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            ...(mode === "contact"
               ? { message: "", lead_source: null }
               : { review: "" }),
         });
      } catch (e: any) {
         setSend({ type: "error", msg: e.message || "Сетевая ошибка" });
      }
   };

   /* 9. загрузка справочника */
   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;

   /* 10. блок результата */
   const resultBlock =
      send.type === "success" ? (
         <div className="order-form__success">
            {mode === "contact"
               ? "Заявка отправлена! Мы свяжемся в ближайшее время."
               : "Спасибо! Ваш отзыв отправлен."}
         </div>
      ) : send.type === "error" ? (
         <div className="order-form__error">{send.msg}</div>
      ) : null;

   return (
      <form className="order-form" onSubmit={handleSubmit}>
         {/* 10.1 шапка */}
         <div className="order-form__wrapper">
            <h3 className="order-form__title">
               {mode === "contact" ? "Оставить заявку" : "Оставить отзыв"}
            </h3>
            <p className="order-form__subtitle">
               {mode === "contact" ? (
                  <>
                     Отчёт —<br />в течение 48 часов
                  </>
               ) : (
                  <></>
               )}
            </p>
         </div>

         {/* 10.2 вывод результата */}
         {resultBlock}

         {/* 10.3 поля (скрываем во время показа результата) */}
         {send.type === "idle" && (
            <>
               <div className="order-form__grid">
                  <label className="order-form__field">
                     <span className="order-form__label">Имя *</span>
                     <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Имя"
                        required
                     />
                  </label>

                  <label className="order-form__field">
                     <span className="order-form__label">Email *</span>
                     <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="mail@example.com"
                        required
                     />
                  </label>

                  <label className="order-form__field">
                     <span className="order-form__label">Телефон</span>
                     <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+7 (___) ___-__-__"
                     />
                  </label>

                  <label className="order-form__field">
                     <span className="order-form__label">Компания</span>
                     <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Название компании"
                     />
                  </label>

                  {mode === "contact" && (
                     <>
                        <label className="order-form__field order-form__field--full">
                           <span className="order-form__label">Источник *</span>
                           <select
                              name="lead_source"
                              value={form.lead_source ?? ""}
                              onChange={handleChange}
                              required
                           >
                              <option value="" disabled>
                                 Откуда узнали про нас?
                              </option>
                              {data?.results.map((s) => (
                                 <option key={s.id} value={s.id}>
                                    {s.name}
                                 </option>
                              ))}
                           </select>
                        </label>

                        <label className="order-form__field order-form__field--full">
                           <span className="order-form__label">Сообщение</span>
                           <textarea
                              name="message"
                              value={form.message}
                              onChange={handleChange}
                              placeholder="Дополнительная информация"
                              rows={4}
                           />
                        </label>
                     </>
                  )}

                  {mode === "review" && (
                     <label className="order-form__field order-form__field--full">
                        <span className="order-form__label">Ваш отзыв</span>
                        <textarea
                           name="review"
                           value={form.review}
                           onChange={handleChange}
                           placeholder="Расскажите, что вы думаете"
                           rows={4}
                        />
                     </label>
                  )}
               </div>

               <div className="order-form__footer">
                  <p className="order-form__note">
                     Нажимая «Отправить», вы соглашаетесь с{" "}
                     <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Политикой конфиденциальности
                     </a>{" "}
                     и{" "}
                     <a href="/terms" target="_blank" rel="noopener noreferrer">
                        Пользовательским соглашением
                     </a>
                     .
                  </p>
               </div>

               <button type="submit" className="order-form__submit">
                  {mode === "contact" ? "Отправить заявку" : "Отправить отзыв"}
               </button>
            </>
         )}
      </form>
   );
};
