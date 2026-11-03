import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "احجز موعدك | Dental Care Egypt",
  description: "اختر الخدمة واليوم والموعد المناسب وأرسل طلب حجزك إلى Dental Care Egypt.",
};

export default function BookingLayout({ children }: LayoutProps<"/booking">) {
  return children;
}
