"use client";

import { useMemo, useState } from "react";
import "./commander.css";
import {
  COMBO_MENUS,
  A_LA_CARTE_ITEMS,
  PAYMENT_METHODS,
  WHATSAPP_NUMBER,
  type MenuItem,
} from "../../lib/menu-data";

const ALL_ITEMS: MenuItem[] = [...COMBO_MENUS, ...A_LA_CARTE_ITEMS];

type Step = "select" | "form" | "recap";

type FormState = {
  nom: string;
  telephone: string;
  commune: string;
  remarques: string;
  paiement: string;
};

const EMPTY_FORM: FormState = {
  nom: "",
  telephone: "",
  commune: "",
  remarques: "",
  paiement: "",
};

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(/\.00$/, "").replace(".", ",")}€`;
}

export default function CommanderClient() {
  const [step, setStep] = useState<Step>("select");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<string[]>([]);

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

  const goToForm = () => {
    if (totalItems === 0) return;
    setStep("form");
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!form.nom.trim()) errors.push("Le nom est obligatoire.");
    if (!form.telephone.trim()) errors.push("Le numéro de téléphone est obligatoire.");
    if (!form.commune.trim()) errors.push("La commune de livraison est obligatoire.");
    if (!form.paiement) errors.push("Le mode de paiement est obligatoire.");
    setFormErrors(errors);
    return errors.length === 0;
  };

  const goToRecap = () => {
    if (validateForm()) setStep("recap");
  };

  const confirmOrder = () => {
    const menuLines = cartLines
      .map((line) => `${line.qty}x ${line.item.name}`)
      .join(", ");
    const menuDetail = form.remarques.trim()
      ? `${menuLines} — Remarques : ${form.remarques.trim()}`
      : menuLines;

    const message = [
      `1 - Nom : ${form.nom.trim()}`,
      `2 - Numéro de téléphone : ${form.telephone.trim()}`,
      `3 - Commune de livraison + localisation : ${form.commune.trim()}`,
      `4 - Menu : ${menuDetail}`,
      `5 - Mode de paiement : ${form.paiement}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="cmd-page">
      <div className="cmd-inner">
        <a href="/menu" className="cmd-back">← Retour au menu</a>
        <h1 className="cmd-title">Commander</h1>
        <p className="cmd-sub">Version test — sélection, infos, puis envoi direct sur WhatsApp</p>

        <div className="cmd-steps-indicator">
          <span className={step === "select" || step === "form" || step === "recap" ? "is-active" : ""} />
          <span className={step === "form" || step === "recap" ? "is-active" : ""} />
          <span className={step === "recap" ? "is-active" : ""} />
        </div>

        {step === "select" && (
          <>
            <h2 className="cmd-section-title">Menus (frites + boisson incluses)</h2>
            {COMBO_MENUS.map((item) => (
              <ItemRow key={item.id} item={item} qty={cart[item.id] ?? 0} onChange={setQty} />
            ))}

            <h2 className="cmd-section-title">À la carte</h2>
            {A_LA_CARTE_ITEMS.map((item) => (
              <ItemRow key={item.id} item={item} qty={cart[item.id] ?? 0} onChange={setQty} />
            ))}

            <div className="cmd-total-bar">
              <div>
                <div className="cmd-total-label">{totalItems} article{totalItems > 1 ? "s" : ""}</div>
                <div className="cmd-total-value">{formatPrice(total)}</div>
              </div>
              <button
                className="cmd-btn is-primary"
                disabled={totalItems === 0}
                onClick={goToForm}
              >
                Continuer
              </button>
            </div>
            {totalItems === 0 && (
              <p className="cmd-empty-note">Sélectionnez au moins un article pour continuer.</p>
            )}
          </>
        )}

        {step === "form" && (
          <>
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
              <label htmlFor="cmd-tel">Numéro de téléphone</label>
              <input
                id="cmd-tel"
                type="tel"
                value={form.telephone}
                onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
              />
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-commune">Commune de livraison + localisation</label>
              <input
                id="cmd-commune"
                type="text"
                placeholder="Ex : Gosier, quartier Bas du Fort..."
                value={form.commune}
                onChange={(e) => setForm((f) => ({ ...f, commune: e.target.value }))}
              />
            </div>
            <div className="cmd-field">
              <label htmlFor="cmd-remarques">Remarques (sauce, supplément, boisson, dessert)</label>
              <textarea
                id="cmd-remarques"
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

            <div className="cmd-btn-row">
              <button className="cmd-btn is-secondary" onClick={() => setStep("select")}>
                Retour
              </button>
              <button className="cmd-btn is-primary" onClick={goToRecap}>
                Voir le récapitulatif
              </button>
            </div>
          </>
        )}

        {step === "recap" && (
          <>
            <h2 className="cmd-section-title">Récapitulatif</h2>

            <div className="cmd-recap-block">
              <div className="cmd-recap-label">Commande</div>
              {cartLines.map((line) => (
                <div key={line.item.id} className="cmd-recap-item-row">
                  <span>{line.qty}x {line.item.name}</span>
                  <span>{formatPrice(line.item.price * line.qty)}</span>
                </div>
              ))}
              <div className="cmd-recap-item-row" style={{ marginTop: 8, fontWeight: 700 }}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="cmd-recap-block">
              <div className="cmd-recap-label">Nom</div>
              <div className="cmd-recap-value">{form.nom}</div>
            </div>
            <div className="cmd-recap-block">
              <div className="cmd-recap-label">Téléphone</div>
              <div className="cmd-recap-value">{form.telephone}</div>
            </div>
            <div className="cmd-recap-block">
              <div className="cmd-recap-label">Commune de livraison + localisation</div>
              <div className="cmd-recap-value">{form.commune}</div>
            </div>
            {form.remarques && (
              <div className="cmd-recap-block">
                <div className="cmd-recap-label">Remarques</div>
                <div className="cmd-recap-value">{form.remarques}</div>
              </div>
            )}
            <div className="cmd-recap-block">
              <div className="cmd-recap-label">Mode de paiement</div>
              <div className="cmd-recap-value">{form.paiement}</div>
            </div>

            <div className="cmd-btn-row">
              <button className="cmd-btn is-secondary" onClick={() => setStep("form")}>
                Retour
              </button>
              <button className="cmd-btn is-primary" onClick={confirmOrder}>
                Confirmer la commande
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function ItemRow({
  item,
  qty,
  onChange,
}: {
  item: MenuItem;
  qty: number;
  onChange: (id: string, delta: number) => void;
}) {
  return (
    <div className="cmd-item">
      <div className="cmd-item-info">
        <div className="cmd-item-name">{item.name}</div>
        {item.description && <div className="cmd-item-desc">{item.description}</div>}
        <div className="cmd-item-price">{formatPrice(item.price)}</div>
      </div>
      <div className="cmd-qty">
        <button onClick={() => onChange(item.id, -1)} disabled={qty === 0} aria-label={`Retirer ${item.name}`}>
          −
        </button>
        <span className="cmd-qty-value">{qty}</span>
        <button onClick={() => onChange(item.id, 1)} aria-label={`Ajouter ${item.name}`}>
          +
        </button>
      </div>
    </div>
  );
}
