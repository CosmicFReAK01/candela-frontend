import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CandelaConstruction Private Limited | Trust delivered. — Pipeline EPC & Infrastructure",
  description: "CandelaConstruction Private Limited — Trust delivered. Specialized EPC contractor for cross-country high-pressure natural gas trunklines, horizontal directional drilling (HDD), and City Gas Distribution (CGD) networks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F8F4EC] text-[#242424] antialiased overflow-x-hidden selection:bg-[#C69C6D] selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}