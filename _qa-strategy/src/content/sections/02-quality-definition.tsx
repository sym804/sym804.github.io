import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'quality-definition')!;

const SEVERITY = [
  { level: 'Block', desc: '서비스 장애, 아무것도 못하는 상태', cls: 'bg-status-danger-bg text-status-danger-fg' },
  { level: 'Critical', desc: '핵심 기능 마비, 데이터 손실 위험', cls: 'bg-status-danger-bg text-status-danger-fg' },
  { level: 'Major', desc: '주요 기능 오류, 중요 UI 이슈', cls: 'bg-status-warning-bg text-status-warning-fg' },
  { level: 'Minor', desc: '사소한 기능 오류, UI / 텍스트 이슈', cls: 'bg-muted text-muted-foreground' },
  { level: 'Trivial', desc: '기능 영향 없는 외관 이슈', cls: 'bg-muted text-muted-foreground' },
];

const DOR = [
  '요구사항이 사용자 가치 / 비즈니스 임팩트로 진술되어 있다.',
  '수용 기준 (Acceptance Criteria) 이 측정 가능한 형태로 작성되어 있다.',
  '기능 외 (성능 / 보안 / 접근성 / 운영) 요구가 명시되어 있다.',
  '의존성 / 선행 조건 / 영향 범위가 식별되어 있다.',
];

const DOD = [
  '모든 수용 기준이 통과되었다.',
  '단위 / 통합 / E2E 자동화가 회귀 가능한 상태로 추가되어 있다.',
  '코드 리뷰 / 린트 / 타입체크 / 보안 스캔이 통과되었다.',
  '배포 가능한 산출물이 빌드되고 모니터링 / 알람이 활성화되어 있다.',
  '결함 / 회고 인풋이 라이프사이클로 기록되었다.',
];

export function QualityDefinitionSection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          측정할 수 없으면 관리할 수 없다. 같은 단어를 다르게 쓰는 한 협업은 우연에 의지한다. DoR /
          DoD / Severity 를 명문화하는 순간 의사결정의 분산이 줄고 학습이 누적된다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-3">DoR / DoD</h3>
            <Accordion type="multiple">
              <AccordionItem value="dor">
                <AccordionTrigger>Definition of Ready (DoR)</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {DOR.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dod">
                <AccordionTrigger>Definition of Done (DoD)</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {DOD.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Severity 5단계</h3>
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2 w-32">단계</th>
                    <th className="text-left px-3 py-2">정의</th>
                  </tr>
                </thead>
                <tbody>
                  {SEVERITY.map((s) => (
                    <tr key={s.level} className="border-t border-border">
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs ${s.cls}`}>
                          {s.level}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{s.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              하한 룰: 보안 이슈는 Minor 이상으로, 데이터 / DB 이슈는 Major 이상으로 분류한다. 개선
              (enhancement) 은 Major / Minor / Trivial 3단계로 별도 운영한다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>"이 정도는 Minor 잖아" 라는 주관적 등급 협상.</li>
              <li>DoD 가 코드 머지로만 정의되어 운영 / 모니터링이 이후에 추가되는 패턴.</li>
              <li>Severity 와 Priority 를 같은 차원으로 혼용.</li>
            </ul>
          </div>
        </>
      }
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: 'Severity 와 영향도가 만나는 지점이 우선순위가 된다.',
            'shift-left': 'DoR 은 요구사항 단계에서 결함을 차단하는 첫 번째 게이트다.',
            roi: 'DoD 가 분명할수록 자동화의 stop condition 이 분명해진다.',
          }}
        />
      }
    />
  );
}
