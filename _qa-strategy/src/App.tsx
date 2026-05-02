import { TopNav } from '@/components/layout/TopNav';
import { SideToc } from '@/components/layout/SideToc';
import { MobileToc } from '@/components/layout/MobileToc';
import { Hero } from '@/components/layout/Hero';
import { Outro } from '@/components/layout/Outro';
import { Footer } from '@/components/layout/Footer';
import { PhilosophySection } from '@/content/sections/01-philosophy';
import { QualityDefinitionSection } from '@/content/sections/02-quality-definition';
import { RiskBasedSection } from '@/content/sections/05-risk-based';
import { DefectManagementSection } from '@/content/sections/08-defect-management';
import { SECTIONS } from '@/content/sections.meta';

const COMPONENTS: Record<string, () => JSX.Element> = {
  philosophy: PhilosophySection,
  'quality-definition': QualityDefinitionSection,
  'risk-based': RiskBasedSection,
  'defect-management': DefectManagementSection,
};

export default function App() {
  return (
    <>
      <TopNav />
      <SideToc />
      <MobileToc />
      <Hero />
      <main className="mx-auto max-w-[760px] lg:ml-[max(280px,calc((100vw-1200px)/2+260px))] px-6 space-y-32">
        {SECTIONS.map((s) => {
          const C = COMPONENTS[s.id];
          if (C) return <C key={s.id} />;
          return (
            <section key={s.id} id={s.id} className="scroll-mt-24 min-h-[40vh]">
              <p className="text-xs font-mono tabular-nums text-muted-foreground">
                SECTION {String(s.number).padStart(2, '0')}
              </p>
              <h2 className="mt-2 text-3xl lg:text-4xl font-sans font-bold">{s.title}</h2>
              <p className="text-muted-foreground mt-2">{s.oneLiner}</p>
              <p className="text-sm text-muted-foreground mt-4 italic">
                (사용자 복귀 후 작성 예정, Field Note 포함 케이스 섹션)
              </p>
            </section>
          );
        })}
      </main>
      <Outro />
      <Footer />
    </>
  );
}
