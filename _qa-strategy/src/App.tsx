import { TopNav } from '@/components/layout/TopNav';
import { SideToc } from '@/components/layout/SideToc';
import { MobileToc } from '@/components/layout/MobileToc';
import { Hero } from '@/components/layout/Hero';
import { Outro } from '@/components/layout/Outro';
import { Footer } from '@/components/layout/Footer';
import { PhilosophySection } from '@/content/sections/01-philosophy';
import { QualityDefinitionSection } from '@/content/sections/02-quality-definition';
import { TestStrategySection } from '@/content/sections/03-test-strategy';
import { AutomationSection } from '@/content/sections/04-automation';
import { RiskBasedSection } from '@/content/sections/05-risk-based';
import { ShiftLeftSection } from '@/content/sections/06-shift-left';
import { MetricsSection } from '@/content/sections/07-metrics';
import { DefectManagementSection } from '@/content/sections/08-defect-management';
import { SECTIONS } from '@/content/sections.meta';

const COMPONENTS: Record<string, () => JSX.Element> = {
  philosophy: PhilosophySection,
  'quality-definition': QualityDefinitionSection,
  'test-strategy': TestStrategySection,
  automation: AutomationSection,
  'risk-based': RiskBasedSection,
  'shift-left': ShiftLeftSection,
  metrics: MetricsSection,
  'defect-management': DefectManagementSection,
};

export default function App() {
  return (
    <>
      <TopNav />
      <SideToc />
      <MobileToc />
      <Hero />
      <main className="mx-auto max-w-[760px] lg:max-w-[820px] lg:ml-[max(320px,calc((100vw-1280px)/2+320px))] px-6 space-y-32">
        {SECTIONS.map((s) => {
          const C = COMPONENTS[s.id];
          return C ? <C key={s.id} /> : null;
        })}
      </main>
      <Outro />
      <Footer />
    </>
  );
}
