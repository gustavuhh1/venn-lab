import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Espaço Veinn",
  description: "Laboratório educativo para estudo Teoria dos conjuntos",
  category: "Education",
  keywords: [
    "Teoria dos conjuntos",
    "Conjuntos",
    "Educação",
    "Matemática",
    "Laboratório educativo",
    "Espaço Veinn",
    "Interativo",
    "Aprendizado",
    "Visualização",
    "Diagramas de Venn",
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={rubik.className}>
      <body className={`${rubik.variable} antialiased`}>{children}</body>
    </html>
  );
}
