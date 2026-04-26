import type { Metadata } from "next";
import { Gowun_Batang } from "next/font/google";
import "./globals.css";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gowun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "조욱남 ♡ 박유민 결혼합니다",
  description: "2026년 6월 13일 토요일 오후 4시, 용산가족공원 야외예식장",
  openGraph: {
    title: "조욱남 ♡ 박유민 결혼합니다",
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
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#FFFCCF" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <style>{`:root { --font-pretendard: "Pretendard Variable"; }`}</style>
      </head>
      <body className={`${gowunBatang.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
