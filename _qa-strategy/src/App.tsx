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
import { DefectManagementSection } from '@/content/sections/08-defect-management';
import { SECTIONS } from '@/content/sections.meta';

const COMPONENTS: Record<string, () => JSX.Element> = {
  philosophy: PhilosophySection,
  'quality-definition': QualityDefinitionSection,
  'test-strategy': TestStrategySection,
  automation: AutomationSection,
  'risk-based': RiskBasedSection,
  'shift-left': ShiftLeftSection,
  'defect-management': DefectManagementSection,
};

export default function App() {
  return (
    <>
      <TopNav />
      <MobileToc />
      <Hero />
      <div className="mx-auto max-w-[1280px] px-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <SideToc />
        </aside>
        <main className="space-y-32 max-w-[820px]">
          {SECTIONS.map((s) => {
            const C = COMPONENTS[s.id];
            return C ? <C key={s.id} /> : null;
          })}
        </main>
      </div>
      <Outro />
      <Footer />
    </>
  );
}
