import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ksign Display System",
  description: "AI 기반 디지털 사이니지 및 3D 가상 진열장 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
