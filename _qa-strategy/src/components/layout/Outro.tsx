import { Card } from '@/components/ui/card';

const ASSETS = [
  { href: '../stockradar.html', title: 'StockRadar', desc: '주식 분석 플랫폼 QA 사례 (메트릭 적용)' },
  { href: '../AI_Squad.html', title: 'AI Squad', desc: 'AI 제품 단계별 QA 게이트 설계' },
  { href: '../multiplatform_automation.html', title: 'Multiplatform Automation', desc: 'PC / Web / Mobile 통합 자동화' },
  { href: '../Web_Selector_Extractor.html', title: 'Web Selector Extractor', desc: '셀렉터 추출 자동화 도구' },
  { href: '../YM_TestCase.html', title: 'YM TestCase', desc: '테스트 케이스 4축 표준화' },
];

export function Outro() {
  return (
    <section className="py-20 mx-auto max-w-[1280px] px-6 border-t border-border mt-24">
      <h2 className="text-2xl font-sans font-bold">관련 산출물</h2>
      <p className="text-muted-foreground mt-2">전략의 적용 사례로 이어지는 동일 폴더의 포트폴리오 자산.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ASSETS.map((a) => (
          <a key={a.href} href={a.href} className="group">
            <Card className="p-5 h-full transition-colors group-hover:bg-muted/30">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{a.desc}</p>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
