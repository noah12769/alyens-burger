import type { Metadata } from "next";
import CommanderClient from "./CommanderClient";

export const metadata: Metadata = {
  title: "Commander | ALIEN'S BURGER",
  description:
    "Composez votre commande Alien's Burger en ligne puis envoyez-la directement sur WhatsApp.",
  robots: { index: false, follow: true },
};

export default function CommanderPage() {
  return <CommanderClient />;
}
