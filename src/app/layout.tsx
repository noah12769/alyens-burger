import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALIEN'S BURGER | Smash burgers & sandwiches généreux — Paris 13e",
  description:
    "Alien's Burger Paris 13e : Des bons burgers smashés, des sandwiches généreux et des frites croustillantes. Peu de choses, mais bien faites & toujours avec le sourire. Sur place, à emporter ou en livraison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
