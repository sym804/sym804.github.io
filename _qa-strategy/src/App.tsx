import { TopNav } from '@/components/layout/TopNav';
import { SideToc } from '@/components/layout/SideToc';
import { MobileToc } from '@/components/layout/MobileToc';
import { Hero } from '@/components/layout/Hero';
import { Outro } from '@/components/layout/Outro';
import { Footer } from '@/components/layout/Footer';
import { SECTIONS } from '@/content/sections.meta';

export default function App() {
  return (
    <>
      <TopNav />
      <SideToc />
      <MobileToc />
      <Hero />
      <main className="mx-auto max-w-[760px] lg:ml-[max(280px,calc((100vw-1200px)/2+260px))] px-6 space-y-32">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 min-h-[40vh]">
            <p className="text-xs font-mono tabular-nums text-muted-foreground">
              SECTION {String(s.number).padStart(2, '0')}
            </p>
            <h2 className="mt-2 text-3xl lg:text-4xl font-sans font-bold">{s.title}</h2>
            <p className="text-muted-foreground mt-2">{s.oneLiner}</p>
          </section>
        ))}
      </main>
      <Outro />
      <Footer />
    </>
  );
}
