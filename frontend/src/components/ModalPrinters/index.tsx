import React, { useMemo } from "react";
import { BurgerButtonPropsMini } from "../../types";
import { useFetch } from "../../Helpers";
import { Printer } from "../../types";
import "./index.css";

const ENDPOINTS = [
  "http://localhost:8000/api/equipment/products/protype-cd400ht/",
  "http://localhost:8000/api/equipment/products/cd400/",
  "http://localhost:8000/api/equipment/dryers/filo/",
];

export const ModalPrinters: React.FC<BurgerButtonPropsMini> = ({ isOpen }) => {
  const endpoints = useMemo(() => ENDPOINTS, []);
  const { printers, loading, error } = useFetch<Printer>(endpoints);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Ошибка загрузки</p>;

  // ключ = индекс в массиве (100% уникален)
  return (
    <div className={`header__menu ${isOpen ? "active" : ""}`}>
      <h2 className="header__title">Наше Оборудование</h2>
      <ul className="header__menu-list">
        {printers.map((p, idx) => (
          <li key={idx} className="header__menu-item">
            <h3 className="header__menu-title">{p.name}</h3>
            {p.image && <img src={p.image} alt={p.name} />}
            <h4 className="header__menu-tagline">{p.tagline}</h4>
            <p className="header__menu-description">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};