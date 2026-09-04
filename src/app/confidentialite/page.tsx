import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | ALIEN'S BURGER",
  description: "Politique de confidentialité et protection des données du site Alien's Burger.",
};

export default function ConfidentialitePage() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <Link href="/" className="legal-back">← Retour au site</Link>
        <h1 className="legal-title">Politique de confidentialité</h1>

        <div className="legal-section">
          <h2>Données collectées</h2>
          <p>
            Ce site ne dispose d&apos;aucun formulaire d&apos;inscription, de compte client ou de paiement
            en ligne. Les commandes sont passées exclusivement via WhatsApp : lorsque vous nous contactez,
            vous nous transmettez directement (nom, numéro de téléphone, adresse de livraison, détails de
            votre commande) par ce canal, en dehors de ce site.
          </p>
        </div>

        <div className="legal-section">
          <h2>Utilisation des données</h2>
          <p>
            Les informations transmises via WhatsApp servent uniquement au traitement et à la livraison de
            votre commande. Elles ne sont ni revendues, ni transmises à des tiers à des fins commerciales.
          </p>
        </div>

        <div className="legal-section">
          <h2>Cookies et mesure d&apos;audience</h2>
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ni de traceurs tiers. Outil de mesure
            d&apos;audience (analytique) : non activé pour le moment.
          </p>
        </div>

        <div className="legal-section">
          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
            suppression des données vous concernant transmises via WhatsApp. Pour l&apos;exercer, contactez-nous
            au <a href="tel:+590690722870">+590 690 72 28 70</a>.
          </p>
        </div>

        <div className="legal-section">
          <h2>Contact</h2>
          <p>
            Pour toute question relative à cette politique, contactez Alien&apos;s Burger via{" "}
            <a href="https://api.whatsapp.com/message/2NJV3INJIUY4P1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
