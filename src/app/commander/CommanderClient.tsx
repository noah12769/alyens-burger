"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import "./commander.css";
import {
  ALL_ITEMS,
  CATEGORY_LABELS,
  PAYMENT_METHODS,
  WHATSAPP_NUMBER,
  type MenuCategory,
  type MenuItem,
} from "../../lib/menu-data";

const CATEGORIES: MenuCategory[] = ["menu", "alacarte", "dessert"];

const ZONES = [
  "Zone 1 — Baie-Mahault / Pointe-à-Pitre",
  "Zone 2 — Abymes / Lamentin / Gosier / Petit-Bourg",
  "Multivers — hors zone (minimum 50€ de panier)",
] as const;

// Les 32 communes de Guadeloupe (liste officielle, via l'API Geo du
// gouvernement français) — la localisation précise (quartier, repère) se fait
// directement sur WhatsApp avec le bot, pas sur le site : ce champ ne sert
// qu'à indiquer la commune.
const GUADELOUPE_COMMUNES = [
  "Anse-Bertrand", "Baie-Mahault", "Baillif", "Basse-Terre", "Bouillante",
  "Capesterre-Belle-Eau", "Capesterre-de-Marie-Galante", "Deshaies", "Gourbeyre",
  "Goyave", "Grand-Bourg", "La Désirade", "Lamentin", "Le Gosier", "Le Moule",
  "Les Abymes", "Morne-à-l'Eau", "Petit-Bourg", "Petit-Canal", "Pointe-Noire",
  "Pointe-à-Pitre", "Port-Louis", "Saint-Claude", "Saint-François", "Saint-Louis",
  "Sainte-Anne", "Sainte-Rose", "Terre-de-Bas", "Terre-de-Haut", "Trois-Rivières",
  "Vieux-Fort", "Vieux-Habitants",
];

// Enlève les accents (NFD + suppression des marques diacritiques U+0300–U+036F)
// pour une recherche de commune plus tolérante ("gosier" doit matcher "Le
// Gosier", "abymes" doit matcher "Les Abymes", etc.).
function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type Step = "products" | "cart" | "form";

type FormState = {
  nom: string;
  prenom: string;
  telephone: string;
  zone: string;
  commune: string;
  remarques: string;
  paiement: string;
};

const EMPTY_FORM: FormState = {
  nom: "",
  prenom: "",
  telephone: "",
  zone: "",
  commune: "",
  remarques: "",
  paiement: "",
};

// Envoi réel vers le numéro WhatsApp de la boutique. Repasser à false pour
// revenir en mode test (aperçu du message sans redirection WhatsApp), par
// exemple pour vérifier une future modification sans déclencher le bot.
const WHATSAPP_SEND_ENABLED = true;

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(/\.00$/, "").replace(".", ",")}€`;
}

export default function CommanderClient() {
  const [step, setStep] = useState<Step>("products");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const communeSuggestions = useMemo(() => {
    const query = normalize(form.commune.trim());
    if (!query) return [];
    return GUADELOUPE_COMMUNES.filter((name) => normalize(name).includes(query)).slice(0, 8);
  }, [form.commune]);

  const cartLines = useMemo(
    () =>
      ALL_ITEMS.filter((item) => (cart[item.id] ?? 0) > 0).map((item) => ({
        item,
        qty: cart[item.id],
      })),
    [cart]
  );

  const total = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [cartLines]
  );

  const totalItems = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.qty, 0),
    [cartLines]
  );

  const setQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      const copy = { ...prev, [id]: next };
      if (next === 0) delete copy[id];
      return copy;
    });
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!form.nom.trim()) errors.push("Le nom est obligatoire.");
    if (!form.prenom.trim()) errors.push("Le prénom est obligatoire.");
    if (!form.telephone.trim()) errors.push("Le numéro de téléphone est obligatoire.");
    if (!form.zone) errors.push("La zone de livraison est obligatoire.");
    if (!form.commune.trim()) errors.push("La commune de livraison est obligatoire.");
    if (!form.paiement) errors.push("Le mode de paiement est obligatoire.");
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleContinueForm = () => {
    if (validateForm()) setShowConfirm(true);
  };

  const buildMessage = () => {
    const menuLines = cartLines.map((line) => `${line.qty}x ${line.item.name}`).join(", ");
    const remarquesPart = form.remarques.trim() ? ` (remarques : ${form.remarques.trim()})` : "";

    return (
      `Bonsoir, j'aimerais commander ${menuLines}${remarquesPart}. ` +
      `Au nom de ${form.nom.trim()} ${form.prenom.trim()}, ` +
      `numéro de téléphone ${form.telephone.trim()}, ` +
      `commune de livraison : ${form.commune.trim()} (${form.zone}), ` +
      `moyen de paiement : ${form.paiement}.`
    );
  };

  const confirmOrder = () => {
    const message = buildMessage();
    setShowConfirm(false);

    if (WHATSAPP_SEND_ENABLED) {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setPreviewMessage(message);
    }
  };

  const openWhatsAppManually = () => {
    if (!previewMessage) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(previewMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCommuneChange = (value: string) => {
    setForm((f) => ({ ...f, commune: value }));
    setShowSuggestions(true);
  };

  const selectSuggestion = (name: string) => {
    setForm((f) => ({ ...f, commune: name }));
    setShowSuggestions(false);
  };

  return (
    <main className="cmd-page">
      {/* EN-TÊTE */}
      <header className="cmd-header">
        <button className="cmd-header-logo" onClick={() => setStep("products")} aria-label="Accueil du menu">
          <Image src="/images/logo-clean.png" alt="Alien's Burger" width={520} height={290} />
        </button>
        <button className="cmd-cart-btn" onClick={() => setStep("cart")} aria-label="Voir le panier">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" stroke="#f9f4e8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="21" r="1.4" fill="#f9f4e8" />
            <circle cx="18" cy="21" r="1.4" fill="#f9f4e8" />
          </svg>
          {totalItems > 0 && <span className="cmd-cart-badge">{totalItems}</span>}
        </button>
      </header>

      <div className="cmd-inner">
        {step === "products" && (
          <>
            {CATEGORIES.map((cat) => {
              const items = ALL_ITEMS.filter((i) => i.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="cmd-section-title">{CATEGORY_LABELS[cat]}</h2>
                  <div className="cmd-product-grid">
                    {items.map((item) => (
                      <ProductCard key={item.id} item={item} qty={cart[item.id] ?? 0} onChange={setQty} />
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="cmd-total-bar">
              <div>
                <div className="cmd-total-label">{totalItems} article{totalItems > 1 ? "s" : ""}</div>
                <div className="cmd-total-value">{formatPrice(total)}</div>
              </div>
              <button className="cmd-btn is-primary" disabled={totalItems === 0} onClick={() => setStep("cart")}>
                Commander
              </button>
            </div>
            {totalItems === 0 && (
              <p className="cmd-empty-note">Sélectionnez au moins un article pour continuer.</p>
            )}
          </>
        )}

        {step === "cart" && (
          <>
            <div className="cmd-top-actions">
              <button className="cmd-back" onClick={() => setStep("products")}>
                ← Continuer mes achats
              </button>
            </div>
            <h2 className="cmd-section-title">Votre panier</h2>
            {cartLines.length === 0 && <p className="cmd-empty-note">Votre panier est vide.</p>}
            <div className="cmd-cart-list">
              <div className="cmd-product-grid">
                {cartLines.map((line) => (
                  <ProductCard key={line.item.id} item={line.item} qty={line.qty} onChange={setQty} />
                ))}
              </div>
            </div>

            <div className="cmd-total-bar">
              <div>
                <div className="cmd-total-label">{totalItems} article{totalItems > 1 ? "s" : ""}</div>
                <div className="cmd-total-value">{formatPrice(total)}</div>
              </div>
              <button className="cmd-btn is-primary" disabled={totalItems === 0} onClick={() => setStep("form")}>
                Commander
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <div className="cmd-top-actions">
              <button className="cmd-back" onClick={() => setStep("cart")}>
                ← Retour au panier
              </button>
            </div>
            <h2 className="cmd-section-title">Vos informations</h2>
            <div className="cmd-field">
              <label htmlFor="cmd-nom">Nom</label>
              <input
                id="cmd-nom"
                type="text"
                value={form.nom}
                onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
              />
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-prenom">Prénom</label>
              <input
                id="cmd-prenom"
                type="text"
                value={form.prenom}
                onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
              />
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-tel">Numéro de téléphone</label>
              <input
                id="cmd-tel"
                type="tel"
                value={form.telephone}
                onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
              />
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-zone">Zone de livraison</label>
              <select
                id="cmd-zone"
                value={form.zone}
                onChange={(e) => setForm((f) => ({ ...f, zone: e.target.value }))}
              >
                <option value="">— Choisir une zone —</option>
                {ZONES.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-commune">Commune de livraison</label>
              <p className="cmd-field-hint">
                La localisation précise (quartier, repère) se donnera directement sur WhatsApp.
              </p>
              <div className="cmd-address-wrap">
                <input
                  id="cmd-commune"
                  type="text"
                  autoComplete="off"
                  placeholder="Ex : Gosier, Le Moule, Baie-Mahault..."
                  value={form.commune}
                  onChange={(e) => handleCommuneChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setShowSuggestions(false)}
                />
                {showSuggestions && communeSuggestions.length > 0 && (
                  <ul className="cmd-suggestions">
                    {communeSuggestions.map((name) => (
                      <li key={name} onMouseDown={(e) => { e.preventDefault(); selectSuggestion(name); }}>
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-remarques">Remarques (sauce, supplément, boisson, dessert)</label>
              <textarea
                id="cmd-remarques"
                placeholder="Ex : sauce ketchup, sans oignon, boisson Coca..."
                value={form.remarques}
                onChange={(e) => setForm((f) => ({ ...f, remarques: e.target.value }))}
              />
            </div>
            <div className="cmd-field">
              <label>Mode de paiement</label>
              <div className="cmd-radio-group">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method}
                    className={`cmd-radio-option${form.paiement === method ? " is-selected" : ""}`}
                    onClick={() => setForm((f) => ({ ...f, paiement: method }))}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {formErrors.length > 0 && (
              <div>
                {formErrors.map((err) => (
                  <p key={err} className="cmd-error">{err}</p>
                ))}
              </div>
            )}

            {previewMessage && (
              <div className="cmd-message-preview">
                <div className="cmd-message-preview-label">
                  Mode test — message non envoyé, voici l&apos;aperçu :
                </div>
                {previewMessage}
                <div className="cmd-btn-row">
                  <button className="cmd-btn is-secondary" onClick={openWhatsAppManually}>
                    Ouvrir sur WhatsApp quand même
                  </button>
                </div>
              </div>
            )}

            <div className="cmd-btn-row">
              <button className="cmd-btn is-secondary" onClick={() => setStep("cart")}>
                Retour
              </button>
              <button className="cmd-btn is-primary" onClick={handleContinueForm}>
                Continuer
              </button>
            </div>
          </>
        )}
      </div>

      {showConfirm && (
        <div className="cmd-popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}>
          <div className="cmd-popup" role="dialog" aria-modal="true">
            <h3 className="cmd-popup-title">Valider la commande ?</h3>
            <p className="cmd-popup-text">
              Vous allez être redirigé vers WhatsApp pour valider votre commande.
            </p>
            <div className="cmd-popup-btn-row">
              <button className="cmd-btn is-primary" onClick={confirmOrder}>
                Oui, valider
              </button>
              <button className="cmd-btn is-secondary" onClick={() => setShowConfirm(false)}>
                Retour
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProductCard({
  item,
  qty,
  onChange,
}: {
  item: MenuItem;
  qty: number;
  onChange: (id: string, delta: number) => void;
}) {
  return (
    <div className="cmd-product-card">
      <div className="cmd-product-photo">
        {item.image && <Image src={item.image} alt={item.name} width={300} height={300} />}
      </div>
      <div className="cmd-product-info">
        <div className="cmd-product-name">{item.name}</div>
        {item.description && <div className="cmd-product-desc">{item.description}</div>}
        <div className="cmd-product-price">{formatPrice(item.price)}</div>
        <div className="cmd-product-footer">
          {qty === 0 ? (
            <button className="cmd-add-btn" onClick={() => onChange(item.id, 1)}>
              Ajouter au panier
            </button>
          ) : (
            <div className="cmd-qty">
              <button onClick={() => onChange(item.id, -1)} aria-label={`Retirer ${item.name}`}>−</button>
              <span className="cmd-qty-value">{qty}</span>
              <button onClick={() => onChange(item.id, 1)} aria-label={`Ajouter ${item.name}`}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
