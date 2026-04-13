import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "Nischay Reddy — Software Engineer",
  description: "Entry-level Software Engineer portfolio. Web, Mobile, UX/UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          "--font-serif-stack": "var(--font-playfair), serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}