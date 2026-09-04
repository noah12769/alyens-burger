import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales | ALIEN'S BURGER",
  description: "Mentions légales du site Alien's Burger.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <Link href="/" className="legal-back">← Retour au site</Link>
        <h1 className="legal-title">Mentions légales</h1>

        <div className="legal-section">
          <h2>Édition du site</h2>
          <p>
            Le présent site est édité par Alek Virolan, exploitant en entreprise individuelle sous le
            nom commercial <strong>Alyen&apos;s Burger</strong>.
          </p>
          <ul>
            <li>Forme juridique : Entreprise individuelle</li>
            <li>Nom commercial : Alyen&apos;s Burger</li>
            <li>SIREN : 952 548 048</li>
            <li>SIRET (siège) : 952 548 048 00018</li>
            <li>Adresse du siège : 51 Impasse Nicole Reache, 97122 Baie-Mahault, Guadeloupe</li>
            <li>Directeur de la publication : Alek Virolan</li>
            <li>Contact : <a href="tel:+590690722870">+590 690 72 28 70</a> (WhatsApp / téléphone)</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images, logo, mise en page) est la
            propriété d&apos;Alien&apos;s Burger, sauf mention contraire, et ne peut être reproduit sans
            autorisation préalable.
          </p>
        </div>

        <div className="legal-section">
          <h2>Commandes</h2>
          <p>
            Les commandes se font exclusivement via WhatsApp au numéro indiqué sur le site. Le présent
            site ne dispose d&apos;aucun système de paiement en ligne ni de création de compte client.
          </p>
        </div>

        <div className="legal-section">
          <h2>Site réalisé par</h2>
          <p>
            <a href="https://www.instagram.com/lumea.fx?igsh=MTVpYjBveTQzdmEyaw==" target="_blank" rel="noopener noreferrer">Lumea</a>
          </p>
        </div>
      </div>
    </main>
  );
}
