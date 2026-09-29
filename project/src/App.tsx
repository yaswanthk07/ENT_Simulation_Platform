import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PlatformIntro from '@/components/PlatformIntro';
import ClassicalSimSection from '@/components/ClassicalSimSection';
import SimulationLab from '@/components/SimulationLab';
import QuantumSection from '@/components/QuantumSection';
import OtherServicesSection from '@/components/OtherServicesSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import RoadmapSection from '@/components/RoadmapSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-white overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <PlatformIntro />
        <ClassicalSimSection />
        <SimulationLab />
        <QuantumSection />
        <OtherServicesSection />
        <ArchitectureSection />
        <RoadmapSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
