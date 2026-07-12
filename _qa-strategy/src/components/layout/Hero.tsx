import { TrianglePrinciple } from '@/components/diagrams/TrianglePrinciple';

export function Hero() {
  return (
    <section className="pt-28 pb-20 mx-auto max-w-[1280px] px-6">
      <p className="text-sm font-mono text-muted-foreground tracking-wide">QA ENGINEERING STRATEGY</p>
      <h1 className="mt-3 text-5xl lg:text-6xl font-sans font-bold leading-tight">
        풀스택 QA<br />품질 관리 전략
      </h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-[640px]">
        리스크 기반 우선순위, Shift-Left 예방, 자동화 ROI 의 세 원칙으로 짜는 청사진.
      </p>
      <div className="mt-12">
        <TrianglePrinciple size="lg" />
      </div>
    </section>
  );
}
