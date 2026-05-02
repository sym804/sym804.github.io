import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { RiskHeatmap } from '@/components/diagrams/RiskHeatmap';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'risk-based')!;

const POLICY = [
  { zone: 'Critical', depth: '풀 시나리오 + 회귀', auto: '필수 자동화', gate: '배포 차단', monitor: '실시간 알람' },
  { zone: 'High', depth: '핵심 시나리오 + 부분 회귀', auto: '주요 경로 자동화', gate: '경고 후 통과', monitor: '대시보드 추적' },
  { zone: 'Medium', depth: '대표 케이스 샘플링', auto: '회귀 위주', gate: '메트릭만 수집', monitor: '주기 점검' },
  { zone: 'Low', depth: '탐색 테스트', auto: '거의 안 함', gate: '없음', monitor: '이상 탐지' },
];

export function RiskBasedSection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          모든 결함이 동등하지 않다. 영향도와 발생도를 곱한 점수로 우선순위를 그어야 한정된 리소스가
          진짜 위험에 닿는다. 점수 없이 모든 것을 똑같이 다루면 결국 가장 중요한 곳이 가장 부실해진다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-2">5x5 매트릭스 정의</h3>
            <p className="text-muted-foreground mb-3">
              영향도 (사용자 가치 손상의 크기) 5단계와 발생도 (빈도 / 노출 사용자 비율) 5단계를 결합해
              25 셀의 등급을 부여한다. 두 축의 합 (impact + frequency) 을 등급으로 분류:
              7 이상 Critical, 5-6 High, 3-4 Medium, 그 외 Low.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">우선순위 → 정책 매핑</h3>
            <div className="rounded-md border border-border overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2">등급</th>
                    <th className="text-left px-3 py-2">테스트 깊이</th>
                    <th className="text-left px-3 py-2">자동화</th>
                    <th className="text-left px-3 py-2">CI 게이트</th>
                    <th className="text-left px-3 py-2">모니터링</th>
                  </tr>
                </thead>
                <tbody>
                  {POLICY.map((p) => (
                    <tr key={p.zone} className="border-t border-border">
                      <td className="px-3 py-2 font-semibold">{p.zone}</td>
                      <td className="px-3 py-2 text-muted-foreground">{p.depth}</td>
                      <td className="px-3 py-2 text-muted-foreground">{p.auto}</td>
                      <td className="px-3 py-2 text-muted-foreground">{p.gate}</td>
                      <td className="px-3 py-2 text-muted-foreground">{p.monitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">리뷰 주기</h3>
            <p className="text-muted-foreground">
              스프린트 단위로 변경된 기능 / 발생한 결함을 인풋으로 등급을 재평가한다. 릴리즈 단위로
              전체 매트릭스를 한 번 점검하여 누락된 영역과 과대 평가된 영역을 균형 잡는다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>모든 결함을 동일 등급으로 처리하여 진짜 위험이 묻힌다.</li>
              <li>한 번 부여한 등급을 갱신하지 않아 매트릭스가 화석화된다.</li>
              <li>등급을 두고 협상이 벌어져 점수가 정치화된다.</li>
            </ul>
          </div>
        </>
      }
      visual={<RiskHeatmap />}
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: '본 섹션 자체가 Risk-Based 의 본진이다.',
            'shift-left': '점수 산정은 요구사항 단계에서 시작해야 늦지 않다.',
            roi: '점수에 비례한 자동화 투자 결정이 ROI 의 출발점이다.',
          }}
        />
      }
    />
  );
}
