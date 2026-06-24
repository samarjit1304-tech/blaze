import { Hero } from "@/components/sections/Hero";
import { Collections } from "@/components/sections/Collections";
import { BestSellers } from "@/components/sections/BestSellers";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { SneakerLabSection } from "@/components/sections/SneakerLabSection";
import { AthleteSpotlight } from "@/components/sections/AthleteSpotlight";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-brand-black min-h-screen overflow-hidden">
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Interactive Divisions/Collections */}
      <Collections />

      {/* 3. High Demand Best Sellers */}
      <BestSellers />

      {/* 4. Sneaker Lab Interactive Showcase */}
      <SneakerLabSection />

      {/* 5. Infinite Smooth New Arrivals */}
      <NewArrivals />

      {/* 6. Ambassador Storytelling Spotlights */}
      <AthleteSpotlight />
    </div>
  );
}
