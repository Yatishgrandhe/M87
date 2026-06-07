import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import InfoCards from '@/components/InfoCards';
import TimelineSection from '@/components/TimelineSection';
import WormholeSection from '@/components/WormholeSection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <StatsSection />
        <InfoCards />
        <TimelineSection />
        <WormholeSection />
      </main>
      <Footer />
    </>
  );
}
