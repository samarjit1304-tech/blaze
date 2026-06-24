import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BLAZE | Ignite Your Potential",
  description: "Experience premium, high-performance sportswear, footwear, and apparel at the official BLAZE store. Fuel the fire within and push your boundaries.",
  keywords: ["Sportswear", "Sneakers", "Running Shoes", "Athletic Apparel", "Luxury Streetwear", "BLAZE"],
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-black text-brand-white flex flex-col font-sans">
        <AppProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
