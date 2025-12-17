import type { Metadata } from "next";
import { Merriweather, Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

// English headings - Prestige serif
const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// Body copy - Clean sans-serif
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Chinese headings - Elegant serif
const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dr Ricky's Education | 曲博士教育",
  description: "Scientist-led education for Years 6-10. Logic is everything. 科学家带出来的孩子，逻辑才是一切。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${inter.variable} ${notoSerifSC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
