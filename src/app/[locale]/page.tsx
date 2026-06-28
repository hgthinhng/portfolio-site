import { HeroSection } from '@/components/sections/hero';
import { PillarsSection } from '@/components/sections/pillars';
import { ResearchSection } from '@/components/sections/research';
import { EngineSection } from '@/components/sections/engine';
import { AiSolutionsSection } from '@/components/sections/ai-solutions';
import { TeachSection } from '@/components/sections/teach';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <ResearchSection />
      <EngineSection />
      <AiSolutionsSection />
      <TeachSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
