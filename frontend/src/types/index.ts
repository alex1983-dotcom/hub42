export type Main = {
   id: number;
   block_type: string;
   title: string;
   subtitle: string;
   content: string;
   is_active: boolean;
   items: Item[];
};

export interface Item {
   id: number;
   title: string;
   content: string;
   icon: Icon;
   sort_order: number;
}
export interface Icon {
   id: number;
   name: string;
   file_name: string;
   css_class: string;
   url: string;
}
export interface Img {
   id: number;
   name: string;
   file_name: string;
   css_class: string;
   url: string;
}
export interface BurgerButtonProps {
   isOpen: boolean;
   setOpen: (value: boolean) => void;
}
export interface BurgerButtonPropsMini {
   isOpen: boolean;
}


export interface PrinterImage {
   image: string; // URL
   alt: string;
}

export interface Category {
   id: number;
   name: string;
   slug: string;
}

export interface Printer {
   id: number;
   name: string;
   slug: string;
   tagline: string;
   description: string;
   image: string; // главное изображение (URL)
   is_published: boolean;
   volume_construction: string;
   extruders_count: string;
   bed_max_temp: number;
   layer_thickness: string;
   filament_diameter: string;
   print_speed: string;
   positioning_accuracy: string;
   surface_of_site: string;
   control: string;
   software: string;
   dimensions: string;
   weight: string;
   energy_consumption: string;
   materials: string;
   guarantee: string;
   power_supply: string;
   additionally: string;
   price: number;
   created_at: string; // ISO-date
   updated_at: string; // ISO-date
   category: Category;
   images: PrinterImage[];
}
