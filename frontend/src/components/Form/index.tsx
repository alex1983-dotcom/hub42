import "./index.css";

import { FormEvent, useState } from "react";
import "./index.css"; // подключаем стили ниже
import { useFetch } from "../../Helpers";
import { FormData, SourcesInformation } from "../../types";

export const MyForm: React.FC = () => {
   const { data, loading, error } = useFetch<SourcesInformation>(
      "http://localhost:8000/api/requests/lead-sources"
   );

   const [form, setForm] = useState<FormData>({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      lead_source: 0,
   });

   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      // 1. собираем payload по спецификации API

      try {
         // 2. POST-запрос на endpoint из скриншота
         const res = await fetch(
            "http://localhost:8000/api/requests/contact-requests/",
            {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(form),
            }
         );

         if (!res.ok) {
            // 3. обработка HTTP-ошибок
            const err = await res
               .json()
               .catch(() => ({ detail: "Network error" }));
            console.error("Ошибка сервера:", err);
            return;
         }

         // 4. успех
         const data = await res.json();
         console.log("Заявка создана:", data);

         // 5. опционально: очистить форму
         setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            lead_source: 0,
            message: "",
         });
      } catch (networkError) {
         console.error("Сетевая ошибка:", networkError);
      }
   };
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <form className="order-form" onSubmit={handleSubmit}>
         <div className="order-form__wrapper">
            <h3 className="order-form__title">Оставить заявку</h3>
            <p className="order-form__subtitle">
               Отчёт —<br />в течение 48 часов
            </p>
         </div>
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

            <label className="order-form__field  order-form__field--full">
               <span className="order-form__label">Источник *</span>
               <select
                  name="lead_source"
                  value={form.lead_source}
                  onChange={handleChange}
               >
                  <option value="">Откуда узнали про нас?</option>
                  {data?.results.map((p, idx) => (
                     <option value={p.id} key={idx}>
                        {p.name}
                     </option>
                  ))}
               </select>
            </label>

            <label className="order-form__field  order-form__field--full">
               <span className="order-form__label">Сообщение</span>
               <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Дополнительная информация"
                  rows={4}
               />
            </label>
         </div>

         <div className="order-form__footer">
            <p className="order-form__note">
               Нажимая «Отправить», вы соглашаетесь с{" "}
               <a href="/privacy" target="_blank" rel="noopener noreferrer">
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
            Отправить заявку
         </button>
      </form>
   );
};
