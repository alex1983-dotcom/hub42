import "./index.css";

import { FormEvent, useState } from "react";
import "./index.css"; // подключаем стили ниже

type FormData = {
   name: string;
   email: string;
   phone: string;
   company: string;
   source: string;
   message: string;
};

export const MyForm: React.FC = () => {
   const [form, setForm] = useState<FormData>({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "",
      message: "",
   });

   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log("Отправляем:", form);
      // здесь fetch / axios / любой ваш способ
   };

   return (
      <form className="order-form" onSubmit={handleSubmit}>
         <h2 className="order-form__title">Оставить заявку</h2>

         <div className="order-form__grid">
            <label className="order-form__field">
               <span className="order-form__label">Имя *</span>
               <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
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
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  required
               >
                  <option value="">Откуда узнали про нас?</option>
                  <option value="google">Google</option>
                  <option value="yandex">Яндекс</option>
                  <option value="social">Соцсети</option>
                  <option value="friend">Друзья / коллеги</option>
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
            <button type="submit" className="order-form__submit">
               Отправить заявку
            </button>
            <p className="order-form__note">
               Нажимая «Отправить», вы соглашаетесь с Политикой
               конфиденциальности и Пользовательским соглашением
            </p>
         </div>
      </form>
   );
};
