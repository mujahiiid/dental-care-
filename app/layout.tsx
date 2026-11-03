import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Dental Care Egypt | رعاية تستحقها ابتسامتك",
  description: "تجربة متكاملة للعناية بالأسنان في القاهرة — راحة، وضوح، وابتسامة على مقاسك.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="ar" dir="rtl" className={cairo.variable} data-scroll-behavior="smooth"><body>{children}</body></html>;
}
