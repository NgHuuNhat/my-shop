import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../shared/assets/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop Thời Trang – Sản phẩm mới nhất | Trang chủ",
  description: "Khám phá bộ sưu tập giày, áo, phụ kiện mới nhất. Giá tốt, chất lượng cao. Mua sắm ngay hôm nay!",
  keywords: ["giày", "áo", "phụ kiện", "thời trang", "sneaker", "shop quần áo"],
  openGraph: {
    title: "Shop Thời Trang – Bộ sưu tập mới nhất",
    description: "Trải nghiệm mua sắm hiện đại với nhiều sản phẩm nổi bật.",
    url: "https://my-shop-phi-bay.vercel.app/",
    siteName: "My Fashion Shop",
    images: [
      {
        url: "https://picsum.photos/1200/630?random=1",
        width: 1200,
        height: 630,
        alt: "Hero Banner - Bộ sưu tập thời trang",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}  >
        {children}
      </body>
    </html>
  );
}
