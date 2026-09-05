import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Polices auto-hébergées par Next (next/font) : téléchargées au build et
// servies depuis notre propre domaine, avec préchargement automatique et
// aucun aller-retour vers fonts.googleapis.com au chargement de la page —
// remplace le <link> externe utilisé précédemment (qui restait un point de
// dépendance réseau tiers, même préconnecté). Montserrat était chargée mais
// jamais utilisée dans le CSS : retirée.
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
const outfit = Outfit({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const SITE_URL = "https://alyens-burger.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ALIEN'S BURGER | Burgers, wings & tenders livrés en Guadeloupe",
  description:
    "Alien's Burger en Guadeloupe : burgers, wings, tenders et desserts livrés tous les jours de 19h à 3h à Pointe-à-Pitre, Gosier, Abymes, Baie-Mahault, Petit-Bourg et Lamentin. Commande uniquement sur WhatsApp.",
  openGraph: {
    title: "ALIEN'S BURGER | Burgers, wings & tenders livrés en Guadeloupe",
    description:
      "Burgers, wings, tenders et desserts livrés tous les jours de 19h à 3h en Guadeloupe. Commande uniquement sur WhatsApp.",
    url: SITE_URL,
    siteName: "Alien's Burger",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/sections/cta-bg.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALIEN'S BURGER | Burgers, wings & tenders livrés en Guadeloupe",
    description:
      "Burgers, wings, tenders et desserts livrés tous les jours de 19h à 3h en Guadeloupe. Commande uniquement sur WhatsApp.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FoodEstablishment",
      "@id": `${SITE_URL}/#restaurant`,
      name: "Alien's Burger",
      image: `${SITE_URL}/images/branding/logo-pattern.png`,
      url: SITE_URL,
      telephone: "+590690722870",
      servesCuisine: ["Burgers", "Fast food", "Américain"],
      priceRange: "€€",
      areaServed: [
        "Pointe-à-Pitre",
        "Gosier",
        "Abymes",
        "Baie-Mahault",
        "Petit-Bourg",
        "Lamentin",
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Guadeloupe",
        addressCountry: "GP",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "19:00",
          closes: "03:00",
        },
      ],
      acceptsReservations: "False",
      paymentAccepted: "Espèces, Carte bancaire, SumUp",
      sameAs: [
        "https://www.instagram.com/alyens_burger",
        "https://www.tiktok.com/@alyens_burger",
      ],
      hasMenu: `${SITE_URL}/menu`,
      potentialAction: {
        "@type": "OrderAction",
        target: "https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0",
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      },
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#comment-commander`,
      name: "Comment commander chez Alien's Burger",
      description:
        "La démarche à suivre pour passer commande chez Alien's Burger, uniquement via WhatsApp.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Nom", text: "Indiquez votre nom." },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Numéro de téléphone",
          text: "Indiquez votre numéro de téléphone.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Commune de livraison + localisation",
          text: "Indiquez votre commune de livraison et votre localisation précise.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Menu",
          text: "Indiquez votre menu, avec sauce, supplément, boisson et dessert.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Mode de paiement",
          text: "Indiquez votre mode de paiement : espèces, carte bancaire ou lien SumUp.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {/* Vercel Web Analytics — gratuit jusqu'à 50 000 visites/mois, sert
            son propre script/API depuis ce même domaine (pas un domaine
            tiers), donc rien à ajouter à la Content-Security-Policy. */}
        <Analytics />
      </body>
    </html>
  );
}
