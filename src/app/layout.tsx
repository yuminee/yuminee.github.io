import type { Metadata } from "next";
import { Gowun_Batang, Gaegu } from "next/font/google";
import "./globals.css";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const gaegu = Gaegu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "욱남 ♥ 유민 결혼합니다",
  description: "2026년 6월 13일 토요일 오후 4시, 용산가족공원 야외예식장",
  openGraph: {
    title: "욱남 ♥ 유민 결혼합니다",
    description: "2026년 6월 13일 토요일 오후 4시, 용산가족공원 야외예식장",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ background: '#FFF1CA' }}>
      <head>
        <meta name="theme-color" content="#FFF1CA" />
      </head>
      <body
        className={`${gowunBatang.variable} ${gaegu.variable} antialiased`}
        style={{ fontFamily: "var(--font-body), serif" }}
      >
        {children}
      </body>
    </html>
  );
}
