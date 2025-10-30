import React from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../Helpers";
import { Printer } from "../../types";

type SpecEntry = {
   key: keyof Printer; 
   label: string;
   icon: string; 
};
const SPEC_CONFIG: SpecEntry[] = [
   { key: "volume_construction", label: "Объём построения", icon: "📦" },
   { key: "dimensions", label: "Габариты (Д×Ш×В)", icon: "📏" },
   { key: "extruders_count", label: "Кол-во экструдеров", icon: "🖨️" },
   { key: "bed_max_temp", label: "Температура стола", icon: " 🌡️" },
   { key: "filament_diameter", label: "Диаметр сопел", icon: "🔩" },
   { key: "print_speed", label: "Скорость печати", icon: "🚀" },
   { key: "positioning_accuracy", label: "Точность", icon: "📐" },
   { key: "materials", label: "Материалы", icon: "🧪" },
   { key: "energy_consumption", label: "Энергопотребление", icon: "⚡️" },
   { key: "power_supply", label: "Питание", icon: "🔌" },
   { key: "surface_of_site", label: "Поверхность стола", icon: "🪟" },
   { key: "control", label: "Управление", icon: "🎛️" },
   { key: "software", label: "ПО", icon: "💻" },
   { key: "additionally", label: "Дополнительно", icon: "✨" },
   { key: "weight", label: "Масса", icon: "⚖️" },
   { key: "guarantee", label: "Гарантия", icon: "🛡️" },
   { key: "purpose", label: "Назначение", icon: "🎯" },
   { key: "heating_type", label: "Нагрев камеры", icon: "🔥" },
   { key: "capacity_spools", label: "Вместимость катушек", icon: "🧵" },
   { key: "power_consumption", label: "Потребляемая мощность", icon: "⚡️" },
   {
      key: "humidity_and_temperature",
      label: "Влажность и температура",
      icon: "💧🌡️",
   },
   { key: "noise_level", label: "Уровень шума", icon: "🔇" },
   { key: "integration", label: "Интеграция", icon: "🔗" },
   {
      key: "compressed_air",
      label: "Подключение к сжатому воздуху",
      icon: "🌬️",
   },
   { key: "layer_thickness", label: "Толщина слоя", icon: " 🧱" },
];
export const CharacteristicsOfPrinter = () => {
   const { id } = useParams();

   const { data, loading, error } = useFetch<Printer | null>(
      `http://localhost:8000/api/equipment/products/${id}`
   );
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   if (!data) return null;
   return (
      <section className="characters__section">
         <h2 className="characters__section-title">Информация о продукте</h2>
         <h3 className="characters__section-subtitle">Характеристики</h3>
         <div className="spec-grid-wrapper">
            <div className="spec-grid">
               {SPEC_CONFIG.map(({ key, label, icon }) => {
                  const raw = data[key];
                  /* пропускаем пустые/null */
                  if (
                     raw === "" ||
                     raw === null ||
                     raw === undefined ||
                     raw === 0
                  )
                     return null;

                  return (
                     <div className="spec-cell" key={key}>
                        <div className="spec-icon">{icon}</div>
                        <div className="spec-label">{label}</div>
                        <div className="spec-value">{String(raw)}</div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};
