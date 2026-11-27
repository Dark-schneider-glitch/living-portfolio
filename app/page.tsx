import { HeroSection } from '@/components/sections/HeroSection';
import { LearnSection } from '@/components/sections/LearnSection';
import { CodeSection } from '@/components/sections/CodeSection';
import { YouTubeSection } from '@/components/sections/YouTubeSection';
import { BuildSection } from '@/components/sections/BuildSection';
import { CelebrateSection } from '@/components/sections/CelebrateSection';
import { PresentSection } from '@/components/sections/PresentSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LearnSection />
      <CodeSection />
      <YouTubeSection />
      <BuildSection />
      <CelebrateSection />
      <PresentSection />
      <Footer />
    </>
  );
}
