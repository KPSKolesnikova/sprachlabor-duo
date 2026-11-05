import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprachlabor · Deutsch zu zweit",
  description: "Учебная студия немецкого: маршрут A1–C1, практика, пробники и парная проверка.",
  icons: {
    icon: "/mark.svg",
    shortcut: "/mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
