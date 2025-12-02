// src/components/MyForm/MyForm.tsx
import "./index.css";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFetch } from "../../Helpers";
import { FormData, SourcesInformation } from "../../types";

type Errors = Record<string, string>;

const CONTACT_URL = "http://localhost:8000/api/requests/contact-requests/";
const REVIEW_URL = "http://localhost:8000/api/requests/leave-review/";

type SendState =
   | { type: "idle" }
   | { type: "success" }
   | { type: "error"; msg: string };

export const MyForm: React.FC = () => {
   const { pathname = "" } = useLocation();
   const mode = useMemo<"contact" | "review">(
      () => (pathname === "/opinions" ? "review" : "contact"),
      [pathname]
   );

   const { data, loading, error } = useFetch<SourcesInformation>(
      mode === "contact"
         ? "http://localhost:8000/api/requests/lead-sources"
         : null
   );

   const [form, setForm] = useState<FormData>(() => ({
      name: "",
      email: "",
      phone: "",
      company: "",
      ...(mode === "contact"
         ? { message: "", lead_source: null }
         : { review: "" }),
   }));

   const [errors, setErrors] = useState<Errors>({});
   const [touched, setTouched] = useState<Record<string, boolean>>({});
   const [send, setSend] = useState<SendState>({ type: "idle" });

   /* сброс при смене режима */
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
      setErrors({});
      setTouched({});
      setSend({ type: "idle" });
   }, [mode]);

   /* авто-скрытие сообщения */
   useEffect(() => {
      if (send.type === "success" || send.type === "error") {
         const t = setTimeout(() => setSend({ type: "idle" }), 4000);
         return () => clearTimeout(t);
      }
   }, [send]);

   /* валидация при каждом изменении */
   useEffect(() => {
      validate();
   }, [form, mode]);

   /* валидатор */
   const validate = (): boolean => {
      const newErrors: Errors = {};

      // name
      if (touched.name && !/^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/.test(form.name))
         newErrors.name = "2–30 букв, без цифр и символов";

      // email
      if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
         newErrors.email = "Введите корректный email";

      // phone (любой международный: + и 7–15 цифр)
      if (
         touched.phone &&
         form.phone &&
         !/^\+[\d]{7,15}$/.test(form.phone.replace(/[\s()-]/g, ""))
      )
         newErrors.phone = "Формат: +CCXXXXXXXX (7–15 цифр)";

      // company
      if (
         touched.company &&
         form.company &&
         (form.company.length < 2 || form.company.length > 50)
      )
         newErrors.company = "От 2 до 50 символов";

      // message / review
      const text = mode === "contact" ? form.message : form.review;
      if (
         touched[mode === "contact" ? "message" : "review"] &&
         text &&
         (text.length < 10 || text.length > 500)
      )
         newErrors.text = "От 10 до 500 символов";

      // lead_source
      if (mode === "contact" && touched.lead_source && !form.lead_source)
         newErrors.lead_source = "Выберите источник";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   /* обработчик полей */
   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
      setTouched((t) => ({ ...t, [name]: true }));
      if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
      if (name === "message" || name === "review") {
         if (errors.text) setErrors((e) => ({ ...e, text: "" }));
      }
   };

   /* телефон (только цифры и +) */
   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value.replace(/[^\d+]/g, "");
      if (!raw.startsWith("+")) raw = "+" + raw.replace(/^\++/g, "");
      if (raw.length > 16) raw = raw.slice(0, 16);
      setForm((p) => ({ ...p, phone: raw }));
      setTouched((t) => ({ ...t, phone: true }));
      if (errors.phone) setErrors((e) => ({ ...e, phone: "" }));
   };

   /* отправка */
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      // помечаем всё как touched
      setTouched({
         name: true,
         email: true,
         phone: true,
         company: true,
         lead_source: mode === "contact",
         [mode === "contact" ? "message" : "review"]: true,
      });
      if (!validate()) return;
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
         setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            ...(mode === "contact"
               ? { message: "", lead_source: null }
               : { review: "" }),
         });
         setTouched({});
         setErrors({});
      } catch (e: any) {
         setSend({ type: "error", msg: e.message || "Сетевая ошибка" });
      }
   };

   /* загрузка справочника */
   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;

   /* блок результата */
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

   const textFieldName = mode === "contact" ? "message" : "review";
   const textFieldValue = mode === "contact" ? form.message : form.review;

   return (
      <form className="order-form" onSubmit={handleSubmit} noValidate>
         {/* шапка */}
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

         {/* результат */}
         {resultBlock}

         {/* поля */}
         {send.type === "idle" && (
            <>
               <div className="order-form__grid">
                  {/* name */}
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
                     {errors.name && (
                        <span className="order-form__error-text">
                           {errors.name}
                        </span>
                     )}
                  </label>

                  {/* email */}
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
                     {errors.email && (
                        <span className="order-form__error-text">
                           {errors.email}
                        </span>
                     )}
                  </label>

                  {/* phone (любая страна) */}
                  <label className="order-form__field">
                     <span className="order-form__label">Телефон</span>
                     <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="+44XXXXXXXXX"
                     />
                     {errors.phone && (
                        <span className="order-form__error-text">
                           {errors.phone}
                        </span>
                     )}
                  </label>

                  {/* company */}
                  <label className="order-form__field">
                     <span className="order-form__label">Компания</span>
                     <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Название компании"
                     />
                     {errors.company && (
                        <span className="order-form__error-text">
                           {errors.company}
                        </span>
                     )}
                  </label>

                  {/* lead_source (contact only) */}
                  {mode === "contact" && (
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
                        {errors.lead_source && (
                           <span className="order-form__error-text">
                              {errors.lead_source}
                           </span>
                        )}
                     </label>
                  )}

                  {/* message / review */}
                  <label className="order-form__field order-form__field--full">
                     <span className="order-form__label">
                        {mode === "contact" ? "Сообщение" : "Ваш отзыв"}
                     </span>
                     <textarea
                        name={textFieldName}
                        value={textFieldValue}
                        onChange={handleChange}
                        placeholder={
                           mode === "contact"
                              ? "Дополнительная информация"
                              : "Расскажите, что вы думаете"
                        }
                        rows={4}
                     />
                     {errors.text && (
                        <span className="order-form__error-text">
                           {errors.text}
                        </span>
                     )}
                  </label>
               </div>

               {/* footer */}
               <div className="order-form__footer">
                  <p className="order-form__note">
                     Нажимая «Отправить», вы соглашаетесь с{" "}
                     <Link
                        to="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Политикой конфиденциальности
                     </Link>{" "}
                     и{" "}
                     <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Пользовательское соглашение
                     </Link>
                     .
                  </p>
               </div>

               {/* кнопка (не disabled, но валидируем перед отправкой) */}
               <button type="submit" className="order-form__submit">
                  {mode === "contact" ? "Отправить заявку" : "Отправить отзыв"}
               </button>
            </>
         )}
      </form>
   );
};
