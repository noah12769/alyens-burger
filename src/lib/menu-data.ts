// Données du menu Alien's Burger — partagées entre /menu (vitrine + schema.org)
// et /commander (tunnel de commande).

export type MenuCategory = "menu" | "alacarte" | "dessert";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: MenuCategory;
};

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  menu: "Menus",
  alacarte: "À la carte",
  dessert: "Dessert",
};

export const COMBO_MENUS: MenuItem[] = [
  { id: "menu-wings", name: "Menu Wings", price: 12, description: "1 part de frites + 1 boisson", image: "/images/products/menu-wings.jpg", category: "menu" },
  { id: "menu-wings-bbq", name: "Menu Wings BBQ", price: 14, description: "1 part de frites + 1 boisson", image: "/images/products/menu-wings-bbq.jpg", category: "menu" },
  { id: "menu-tenders", name: "Menu Tenders", price: 12, description: "1 part de frites + 1 boisson", image: "/images/products/menu-tenders.jpg", category: "menu" },
  { id: "menu-chicken-ball", name: "Menu Chicken Ball", price: 16, description: "1 part de frites + 1 boisson", image: "/images/products/menu-chicken-ball.jpg", category: "menu" },
];

export const A_LA_CARTE_ITEMS: MenuItem[] = [
  { id: "alc-tenders", name: "Tenders", price: 6.5, description: "Part de 5", image: "/images/products/alc-tenders.jpg", category: "alacarte" },
  { id: "alc-wings-bbq", name: "Wings BBQ", price: 8, description: "Part de 5", image: "/images/products/alc-wings-bbq.jpg", category: "alacarte" },
  { id: "alc-hot-dog", name: "Hot-Dog", price: 6.5, description: "Saucisse de poulet", image: "/images/products/alc-hotdog.jpg", category: "alacarte" },
  { id: "alc-wings", name: "Wings", price: 6.5, description: "Part de 5", image: "/images/products/alc-wings.jpg", category: "alacarte" },
];

export const DESSERT_ITEMS: MenuItem[] = [
  { id: "alc-dessert", name: "Dessert", price: 6, description: "Fondant chocolat, salade de fruits ou glace", image: "/images/products/alc-dessert.jpg", category: "dessert" },
];

export const ALL_ITEMS: MenuItem[] = [...COMBO_MENUS, ...A_LA_CARTE_ITEMS, ...DESSERT_ITEMS];

export const PAYMENT_METHODS = ["Espèces", "Carte bancaire", "Lien SumUp"] as const;

// ⚠️ TEST TEMPORAIRE : numéro personnel de Noah, le temps de vérifier que
// l'envoi WhatsApp depuis /commander fonctionne bien. À REMETTRE à
// "590690722870" (et à supprimer le numéro personnel du code/historique
// une fois le test validé).
export const WHATSAPP_NUMBER = "REDACTED";
export const WHATSAPP_ORDER_URL =
  "https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0";
