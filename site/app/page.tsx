import { BackgroundNetworkPattern } from "@/components/BackgroundNetworkPattern";
import { DashboardCard } from "@/components/DashboardCard";
import { HeroNetworkGraphic } from "@/components/HeroNetworkGraphic";

export default function HomePage() {
  return (
    <main>
      <BackgroundNetworkPattern />
      <HeroNetworkGraphic />
      <DashboardCard title="LLM Wiki MVP">정적 감사용 기본 홈입니다.</DashboardCard>
    </main>
  );
}
