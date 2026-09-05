import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { COMBO_MENUS, A_LA_CARTE_ITEMS, DESSERT_ITEMS } from "../../lib/menu-data";

export const metadata: Metadata = {
  title: "MENU | ALIEN'S BURGER",
  description:
    "Le menu Alien's Burger en Guadeloupe : burgers, wings, tenders et desserts. Commande uniquement sur WhatsApp, livraison de 19h à 3h.",
};

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Menu Alien's Burger",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Menus (frites + boisson incluses)",
      hasMenuItem: COMBO_MENUS.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: { "@type": "Offer", price: item.price, priceCurrency: "EUR" },
      })),
    },
    {
      "@type": "MenuSection",
      name: "À la carte",
      hasMenuItem: A_LA_CARTE_ITEMS.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: { "@type": "Offer", price: item.price, priceCurrency: "EUR" },
      })),
    },
    {
      "@type": "MenuSection",
      name: "Dessert",
      hasMenuItem: DESSERT_ITEMS.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: { "@type": "Offer", price: item.price, priceCurrency: "EUR" },
      })),
    },
  ],
};

const MENU_IMAGES = [
  { src: "/images/menu/alien-visual.jpg", width: 853, height: 1280, alt: "Alien's Burger", small: true },
  { src: "/images/menu/combo.jpg", width: 1254, height: 1254, alt: "Menus Alien's Burger : Wings, Wings BBQ, Tenders, Chicken Ball avec frites et boisson" },
  { src: "/images/menu/a-la-carte.jpg", width: 1536, height: 1024, alt: "Menu à la carte Alien's Burger : tenders, wings, hot-dog, dessert" },
  { src: "/images/menu/zones-livraison.jpg", width: 1280, height: 853, alt: "Zones de livraison et tarifs Alien's Burger" },
];

const ORDER_STEPS = [
  { label: "Nom" },
  { label: "Numéro de téléphone" },
  { label: "Commune de livraison + localisation" },
  { label: "Menu (sauce, supplément, boisson, dessert)" },
  { label: "Mode de paiement" },
];

export default function MenuPage() {
  return (
    <main className="menu-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <header className="menu-header">
        <Link href="/">
          <Image
            src="/images/branding/logo.png"
            alt="Alien's Burger logo"
            className="menu-page-logo"
            width={520}
            height={290}
          />
        </Link>
      </header>

      <div className="order-steps">
        <h1 className="order-steps-title">Comment commander ?</h1>
        <p className="order-steps-sub">Commande uniquement sur WhatsApp — voici la démarche à suivre</p>
        <ol className="order-steps-list">
          {ORDER_STEPS.map((step, i) => (
            <li key={i} className="order-step">
              <span className="order-step-number">{i + 1}</span>
              <span className="order-step-label">{step.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="menu-images-list">
        {MENU_IMAGES.map((img, i) => (
          <div key={i} className={`menu-image-wrapper${img.small ? " is-small" : ""}`}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="menu-image"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="menu-order-cta">
        <a
          href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0"
          className="green-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="button-text-wrap">
            <span className="btn-front is-beige">COMMANDER SUR WHATSAPP</span>
            <span className="btn-hidden is-beige">COMMANDER SUR WHATSAPP</span>
          </div>
        </a>
      </div>
    </main>
  );
}
