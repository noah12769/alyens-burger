"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const directionsOverlayRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLElement>(null);
  const GALLERY_COUNT = 5;

  const handleVideoEnded = () => {
    setTimeout(() => {
      heroVideoRef.current?.play();
    }, 5000);
  };

  // Desktop fan-out animation
  useEffect(() => {
    if (window.innerWidth <= 767) return;
    const el = galleryRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else {
          el.classList.remove("is-visible");
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mobile scroll-driven gallery
  useEffect(() => {
    if (window.innerWidth > 767) return;
    const section = conceptRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const imageWidth = window.innerWidth * 0.75 + 16;
      gallery.style.transform = `translateX(${-progress * imageWidth * (GALLERY_COUNT - 1)}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = directionsOverlayRef.current;
    if (!el) return;
    if (directionsOpen) {
      el.style.display = "flex";
      requestAnimationFrame(() => el.classList.add("active"));
      document.body.style.overflow = "hidden";
    } else {
      el.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => { el.style.display = "none"; }, 350);
    }
  }, [directionsOpen]);

  const DEST_LAT = 48.827857;
  const DEST_LNG = 2.349519;
  const wazeUrl = `https://waze.com/ul?ll=${DEST_LAT}%2C${DEST_LNG}&navigate=yes`;
  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${DEST_LAT},${DEST_LNG}`;
  const appleUrl = `https://maps.apple.com/?daddr=${DEST_LAT},${DEST_LNG}&dirflg=d`;

  return (
    <>
      <div className="fixed-bg" />

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a href="/" className="nav-logo-link">
            <Image
              src="/images/logo-aliens-burger.png"
              alt="Alien's Burger logo"
              className="nav-logo-image"
              width={120}
              height={120}
            />
          </a>
          <nav className="menu-wrapper">
            <a href="#CONCEPT" className="nav-link">CONCEPT</a>
            <a href="/menu" className="nav-link">MENU</a>
          </nav>
          <div className="nav-right">
            <a
              href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0"
              className="white-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="button-text-wrap">
                <span className="btn-front is-dark">NOUS CONTACTER</span>
                <span className="btn-hidden is-dark">NOUS CONTACTER</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="section-hero">
        <div className="background-video">
          <div className="gradient-top" />
          <div className="gradient-bottom" />
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3DHhT3EJPzYGodVzhAVwQwAcFA3/hf_20260516_190308_01149ee0-f793-41f7-84e2-f4deb03d8785.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hero-container">
          <div>
            <h1 className="hero-title-text">
              UN BURGER<br />INTERSTELLAIRE
            </h1>
          </div>
          <div className="hero-buttons">
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
            <a href="/menu" className="white-button">
              <div className="button-text-wrap">
                <span className="btn-front is-dark">VOIR LE MENU</span>
                <span className="btn-hidden is-dark">VOIR LE MENU</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CONCEPT SECTION */}
      <section id="CONCEPT" className="section-concept" ref={conceptRef as React.RefObject<HTMLDivElement>}>
        <div className="sticky-wrapper">
          <div className="text-container">
            <h1 className="heading is-1">À PROPOS</h1>
            <div className="concept-text">
              Chez Alien&apos;s Burger, on ne fait pas de simples burgers. Nos recettes viennent d&apos;un autre univers. Chaque création est pensée comme une expérience : fermée, surprenante, et conçue pour exploser en saveurs dès la première bouchée. Ici, on ne mange pas un burger… on découvre un autre monde.
            </div>
            <a
              href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0"
              className="white-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="button-text-wrap">
                <span className="btn-front is-dark">VOYAGER</span>
                <span className="btn-hidden is-dark">VOYAGER</span>
              </div>
            </a>
            <h1 className="heading is-brand">ALIEN&apos;S BURGER</h1>
          </div>

          <div className="horizontal-track" ref={galleryRef}>
            <img src="/images/IMG_9944.jpg" alt="" className="image-type-1" />
            <img src="/images/IMG_9938.jpg" alt="" className="image-type-2" />
            <img src="/images/IMG_9945.jpg" alt="" className="image-type-1 is-2" />
            <img src="/images/IMG_9941.jpg" alt="" className="image-type-2" />
            <img src="/images/IMG_9939.jpg" alt="" className="image-type-1" />
          </div>
        </div>
      </section>

      {/* LOGO SPACER */}
      <div className="logo-spacer" />

      {/* LOCATION SECTION */}
      <section className="section-location">
        <div className="location-inner">
          <div className="location-photo">
            <img src="/images/1.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="location-info-col">
            <h2 className="location-brand">ALYEN&apos;S BURGER</h2>
            <div className="location-block">
              <span className="location-label">Nos horaires de livraison</span>
              <span className="location-value">Du Lundi au Dimanche</span>
              <span className="location-value">19h00 — 03h00</span>
              <span className="location-sub">Ouverture des précommandes dès 17h00</span>
            </div>
            <div className="location-block">
              <span className="location-label">Zones de livraison</span>
              <span className="location-value">P-A-P · Gosier · Abymes</span>
              <span className="location-value">Baie-Mahault · Petit-Bourg · Lamentin</span>
            </div>
            <div className="location-block">
              <span className="location-label">Moyen de paiement</span>
              <span className="location-value">Espèces · CB · Lien SumUp</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="section-marquee">
        <div className="marquee-track">
          {[0, 1, 2].map((i) => (
            <div key={i} className="marquee-group">
              <span className="marquee-text">VOYAGER</span>
              <a
                href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0"
                className="marquee-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                COMMANDER
              </a>
              <span className="marquee-text">VOYAGER</span>
              <a
                href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0"
                className="marquee-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                COMMANDER
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="MENU" className="section-menu">
        <div className="menu-text-div">
          <h1 className="menu-heading">Pas besoin d&apos;en faire trop.</h1>
          <p className="menu-subtext">
            De bons burgers, des bonnes frites, et une vraie envie d&apos;y retourner.
          </p>
          <a href="/menu" className="white-button">
            <div className="button-text-wrap">
              <span className="btn-front is-dark">VOIR LE MENU</span>
              <span className="btn-hidden is-dark">VOIR LE MENU</span>
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-footer">
        <div className="footer-grid">
          <div className="left-footer">
            <h2 className="eyebrow-frunch">Nos Réseaux</h2>
            <div className="footer-social-div">
              <div className="footer-social">
                <a href="https://www.instagram.com/alyens_burger" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/Instagram.svg" alt="Instagram" width={30} height={30} loading="lazy" />
                </a>
                <a href="https://www.instagram.com/alyens_burger" className="footer-text" target="_blank" rel="noopener noreferrer">
                  ALYENS_BURGER
                </a>
              </div>
              <div className="footer-social">
                <a href="https://www.tiktok.com/@alyens_burger" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/tiktok.svg" alt="TikTok" width={30} height={30} loading="lazy" />
                </a>
                <a href="https://www.tiktok.com/@alyens_burger" className="footer-text" target="_blank" rel="noopener noreferrer">
                  ALYENS_BURGER
                </a>
              </div>
            </div>
          </div>

          <Image
            src="/images/logo-aliens-burger.png"
            alt="Alien's Burger"
            className="kebab-image-footer"
            width={200}
            height={200}
            loading="lazy"
          />

          <div className="right-footer">
            <h2 className="eyebrow-frunch">Contact</h2>
            <div className="footer-social-div">
              <div className="footer-social">
                <a href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="#25D366" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.524 5.855L.057 23.903l6.201-1.43A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.865 9.865 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.867 9.867 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1c5.467 0 9.9 4.434 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z"/>
                  </svg>
                </a>
                <a href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0" className="footer-text" target="_blank" rel="noopener noreferrer">
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="incipit-div">
          <p className="incipit-text">
            ALIEN&apos;S BURGER — TOUS DROITS RÉSERVÉS. SITE CRÉÉ PAR{" "}
            <a href="https://www.instagram.com/lumea.fx?igsh=MTVpYjBveTQzdmEyaw==" className="incipit-link" target="_blank" rel="noopener noreferrer">LUMEA</a>
          </p>
        </div>
      </footer>

      {/* DIRECTIONS POPUP */}
      <div
        ref={directionsOverlayRef}
        className="directions-overlay"
        style={{ display: "none" }}
        onClick={(e) => {
          if (e.target === directionsOverlayRef.current) setDirectionsOpen(false);
        }}
      >
        <div className="directions-sheet" role="dialog" aria-modal="true">
          <div className="directions-header">
            <div className="directions-title">Itinéraire</div>
            <button className="directions-close" onClick={() => setDirectionsOpen(false)} aria-label="Fermer">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="directions-body">
            <a href={wazeUrl} className="dir-btn" target="_blank" rel="noopener noreferrer">
              <span>Ouvrir dans Waze</span><span className="dir-badge">Rapide</span>
            </a>
            <a href={gmapsUrl} className="dir-btn" target="_blank" rel="noopener noreferrer">
              <span>Ouvrir dans Google Maps</span><span className="dir-badge">Classique</span>
            </a>
            <a href={appleUrl} className="dir-btn" target="_blank" rel="noopener noreferrer">
              <span>Ouvrir dans Plans</span><span className="dir-badge">iPhone</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
