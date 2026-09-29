import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ComputationalBottleneckSection from '@/components/ComputationalBottleneckSection';
import PlatformIntro from '@/components/PlatformIntro';
import ClassicalSimSection from '@/components/ClassicalSimSection';
import QuantumSection from '@/components/QuantumSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import RoadmapSection from '@/components/RoadmapSection';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-white overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ComputationalBottleneckSection />
        <PlatformIntro />
        <ClassicalSimSection />
        <QuantumSection />
        <ArchitectureSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
