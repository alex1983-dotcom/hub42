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
   is_active: boolean;
}
export interface Icon {
   id: number;
   name: string;
   file_name: string;
   css_class: string;
   url: string;
}
export interface Category {
   id: number;
   name: string;
   slug: string;
}

export interface Blog {
   id: number;
   image: string; // URL
   title: string;
   slug: string;
   preview: string;
   body: string; // Markdown
   status: "published" | "draft";
   published_at: string;
   meta_description: string;
   created_at: string;
   updated_at: string;
   category: Category;
}

export interface Blogs {
   count: number;
   next: string | null;
   previous: string | null;
   results: Blog[];
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
export interface image {
   image: string;
   alt: string;
}
export interface Printer extends Record<string, unknown> {
   id: number;
   name: string;
   slug: string;
   tagline: string;
   description: string;
   image: string;
   is_published: boolean;
   price: number;
   product_type: "dryer";
   category: Category;
   images: image[]; // если понадобится – замените на конкретный тип
   icon: Icon;
   volume_construction: string;
   extruders_count: string;
   bed_max_temp: number | null;
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
   purpose: string;
   heating_type: string;
   capacity_spools: number;
   humidity_and_temperature: string;
   power_consumption: string;
   noise_level: string;
   integration: string;
   compressed_air: string;
   sort_order: number;
   created_at: string; // ISO-8601
   updated_at: string; // ISO-8601
}
export type ObjectPrinters = {
   count: number;
   next: string;
   previous: string;
   results: Printer[];
};

export interface PropsAdditionSection {
   color: string;
   bgColor: string;
   content: string;
   mainContent: string;
}
export type PropsConnectionButtons = Pick<
   PropsAdditionSection,
   "color" | "bgColor" | "content"
>;
export interface RoadmapItem {
   id: number;
   text: string;
   sort_order: number;
}

export interface OfferItem {
   id: number;
   text: string;
   sort_order: number;
}

export interface Service {
   id: number;
   service_type: string;
   parent_block: {
      id: number;
      block_type: string;
      title: string;
      subtitle: string;
      content: string;
      is_active: boolean;
      items: unknown[]; // ← замените на конкретный тип элементов, когда появится
   };
   title: string;
   icon: {
      id: number;
      name: string;
      file_name: string;
      css_class: string;
      url: string;
   };
   sort_order: number;
   roadmap_items: RoadmapItem[];
   offer_items: OfferItem[];
}

export interface ServicesResponse {
   count: number;
   next: null | string;
   previous: null | string;
   results: Service[];
}
export interface SourcesInformation {
   count: number;
   next: null | string;
   previous: null | string;
   results: Source[];
}
export interface Source {
   id: number;
   name: string;
}
export type FormData = {
   name: string;
   email: string;
   phone: string;
   company: string;
   message: string;
   lead_source: number | null;
};
export interface IconsResponse {
   count: number;
   next: null | string;
   previous: null | string;
   results: Icon[];
}

export interface FooterSection {
   id: number;
   created_at: string; // ISO-8601
   updated_at: string; // ISO-8601
   title: string;
   subtitle: string;
   office_address: string;
   office_phone: string;
   email: string;
   user_agreement: string;
   privacy_policy: string;
   is_system: boolean;
}
export type StateIdPrinter = { id: number | null };
// export type ID = number;
// export type ISOString = string; // ISO-8601
// export type Slug = string;
// export type URL = string;
// export type CSSClass = string;
// export interface BaseEntity {
//    id: ID;
//    created_at: ISOString;
//    updated_at: ISOString;
// }
// export interface NamedEntity extends BaseEntity {
//    name: string;
//    slug?: Slug;
// }

// export interface Icon extends NamedEntity {
//    file_name: string;
//    css_class: CSSClass;
//    url: URL;
// }

// export interface Paginated<T> {
//    count: number;
//    next: URL | null;
//    previous: URL | null;
//    results: T[];
// }
// export interface ContentBlock extends NamedEntity {
//    title: string;
//    subtitle: string;
//    content: string;
//    is_active: boolean;
//    sort_order: number;
//    icon: Icon;
// }

// export interface RoadmapItem extends NamedEntity {
//    sort_order: number;
// }

// export interface OfferItem extends NamedEntity {
//    sort_order: number;
// }

// export interface Service extends ContentBlock {
//    service_type: string;
//    parent_block: ContentBlock;
//    roadmap_items: RoadmapItem[];
//    offer_items: OfferItem[];
// }
// export interface HeroSection extends BaseEntity {
//    title: string;
//    subtitle: string;
//    office_address: string;
//    office_phone: string;
//    email: string;
//    user_agreement: string;
//    privacy_policy: string;
//    is_system: boolean;
// }
// export interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }
// export interface Printer extends BaseEntity {
//    name: string;
//    slug: string;
//    tagline: string;
//    description: string;
//    image: string;
//    is_published: boolean;
//    price: number;
//    product_type: "dryer";
//    category: Category;
//    images: string[]; // URL[]
//    icon: Icon;
//    volume_construction: string;
//    extruders_count: string;
//    bed_max_temp: number | null;
//    layer_thickness: string;
//    filament_diameter: string;
//    print_speed: string;
//    positioning_accuracy: string;
//    surface_of_site: string;
//    control: string;
//    software: string;
//    dimensions: string;
//    weight: string;
//    energy_consumption: string;
//    materials: string;
//    guarantee: string;
//    power_supply: string;
//    additionally: string;
//    purpose: string;
//    heating_type: string;
//    capacity_spools: number;
//    humidity_and_temperature: string;
//    power_consumption: string;
//    noise_level: string;
//    integration: string;
//    compressed_air: string;
//    sort_order: number;
//    created_at: string;
//    updated_at: string;
// }
// export interface FormData {
//    name: string;
//    email: string;
//    phone: string;
//    company: string;
//    message: string;
//    lead_source: number | null;
// }
// export type IconsResponse = Paginated<Icon>;
// export type ServicesResponse = Paginated<Service>;
// export type HeroResponse = Paginated<HeroSection>;
// export type ObjectPrintersResponse = Paginated<Printer>;
