import type { Metadata } from "next";
import "./globals.css";

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
        url: "/images/hf_20260516_182739_108f80dc-a6b0-4aa1-8aa4-d0fa64b43768.jpg",
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
      image: `${SITE_URL}/images/logo-aliens-burger.png`,
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
    <html lang="fr">
      <head>
        {/* Polices Google chargées via <link> (préconnexion + priorité de découverte
            immédiate par le navigateur) plutôt que par @import dans le CSS : un
            @import est découvert tardivement (après le téléchargement + parsing de
            globals.css) et retarde d'autant le chargement de la police, ce qui
            allonge la fenêtre de FOUT (texte affiché avec la police de secours,
            beaucoup moins condensée que Bebas Neue) — observée sur Android/Chrome
            (réseau/cache différents de l'iPhone de test) sous forme de titre du
            hero trop large et rogné à l'écran. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout, donc appliqué à tout le site, pas à une seule page */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700;900&family=Outfit:wght@200;300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
