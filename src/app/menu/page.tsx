import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MENU | ALIEN'S BURGER",
  description: "Découvrez notre menu : burgers smashés, sandwichs généreux et frites croustillantes.",
};

const MENU_IMAGES = [
  "/images/IMG_9930.jpg",
  "/images/IMG_9931.jpg",
  "/images/IMG_9932.jpg",
  "/images/IMG_9933.jpg",
];

export default function MenuPage() {
  return (
    <main className="menu-page">
      <header className="menu-header">
        <a href="/">
          <Image
            src="/images/logo-aliens-burger.png"
            alt="Alien's Burger logo"
            className="menu-page-logo"
            width={100}
            height={100}
          />
        </a>
      </header>

      <div className="menu-images-list">
        {MENU_IMAGES.map((src, i) => (
          <div key={i} className="menu-image-wrapper">
            <Image
              src={src}
              alt={`Menu Alien's Burger ${i + 1}`}
              width={900}
              height={1200}
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
            <span className="btn-front is-beige">COMMANDER</span>
            <span className="btn-hidden is-beige">COMMANDER</span>
          </div>
        </a>
      </div>
    </main>
  );
}
