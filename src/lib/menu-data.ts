// Données du menu Alien's Burger — partagées entre /menu (vitrine + schema.org)
// et /commander (tunnel de commande).

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export const COMBO_MENUS: MenuItem[] = [
  { id: "menu-wings", name: "Menu Wings", price: 12, description: "1 part de frites + 1 boisson" },
  { id: "menu-wings-bbq", name: "Menu Wings BBQ", price: 14, description: "1 part de frites + 1 boisson" },
  { id: "menu-tenders", name: "Menu Tenders", price: 12, description: "1 part de frites + 1 boisson" },
  { id: "menu-chicken-ball", name: "Menu Chicken Ball", price: 16, description: "1 part de frites + 1 boisson" },
];

export const A_LA_CARTE_ITEMS: MenuItem[] = [
  { id: "alc-tenders", name: "Tenders", price: 6.5, description: "Part de 5" },
  { id: "alc-wings-bbq", name: "Wings BBQ", price: 8, description: "Part de 5" },
  { id: "alc-hot-dog", name: "Hot-Dog", price: 6.5, description: "Saucisse de poulet" },
  { id: "alc-wings", name: "Wings", price: 6.5, description: "Part de 5" },
  { id: "alc-dessert", name: "Dessert", price: 6, description: "Fondant chocolat, salade de fruits ou glace" },
];

export const PAYMENT_METHODS = ["Espèces", "Carte bancaire", "Lien SumUp"] as const;

export const WHATSAPP_NUMBER = "590690722870";
export const WHATSAPP_ORDER_URL =
  "https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0";
