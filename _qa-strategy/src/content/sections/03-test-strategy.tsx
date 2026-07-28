import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { FieldNote } from '@/components/section/FieldNote';
import { TestPyramid } from '@/components/diagrams/TestPyramid';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'test-strategy')!;

const LEVELS = ['Unit', 'Integration', 'E2E'] as const;
const TYPES = ['기능', '회귀', '탐색', '접근성', '성능', '보안'] as const;
const MATRIX: Record<(typeof LEVELS)[number], Record<(typeof TYPES)[number], string>> = {
  Unit: { 기능: '필수', 회귀: '필수', 탐색: '-', 접근성: '부분', 성능: '부분', 보안: '부분' },
  Integration: { 기능: '필수', 회귀: '필수', 탐색: '-', 접근성: '필수', 성능: '필수', 보안: '필수' },
  E2E: { 기능: '핵심만', 회귀: '핵심만', 탐색: '필수', 접근성: '필수', 성능: '필수', 보안: '필수' },
};

export function TestStrategySection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          어디에서 무엇을 테스트할지가 비용과 신뢰도를 동시에 결정합니다. 같은 결함을 어느 레벨에서
          잡느냐에 따라 비용이 큰 폭으로 벌어집니다. 전략 없이 자동화부터 늘리면 아이스크림 콘 함정에
          빠집니다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-2">테스트 피라미드</h3>
            <p className="text-muted-foreground mb-4">
              피라미드 비율은 도메인 / 안정성 / 변경 빈도에 따라 조정합니다. 일반 가이드라인 (Unit 70 /
              Integration 20 / E2E 10) 은 출발선일 뿐 종착선이 아닙니다.
            </p>
            <TestPyramid />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">레벨 × 타입 매트릭스</h3>
            <div className="rounded-md border border-border overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2">레벨 / 타입</th>
                    {TYPES.map((t) => (
                      <th key={t} className="text-left px-3 py-2">
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEVELS.map((l) => (
                    <tr key={l} className="border-t border-border">
                      <td className="px-3 py-2 font-semibold">{l}</td>
                      {TYPES.map((t) => (
                        <td key={t} className="px-3 py-2 text-muted-foreground">
                          {MATRIX[l][t]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>아이스크림 콘 (E2E 비대) 으로 회귀 비용이 누적되는 구조.</li>
              <li>레벨 / 타입 정의 없이 테스트 추가만 요구하는 모호한 요청.</li>
              <li>탐색 테스트를 자동화로 대체하려는 시도.</li>
            </ul>
          </div>
        </>
      }
      fieldNote={
        <FieldNote assets={(META.caseAssets ?? []).map((c) => ({ title: c.title, href: `../${c.asset}.html` }))}>
          <p>
            테스트 케이스 설계 / 우선순위 / 유형 분류를 표준화한 사례. 케이스를 단순 나열에서 레벨 /
            타입 / 우선순위 / 위험도 4축으로 재구성하고, 검토 / 회귀 / 폐기를 정책으로 운영합니다.
            템플릿화된 테스트 케이스가 누적되면서 회귀 자동화 후보 선정도 데이터 기반으로 가능해집니다.
          </p>
        </FieldNote>
      }
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: '레벨 × 타입 매트릭스의 셀 우선순위는 리스크 점수가 정합니다.',
            'shift-left': '단위 레벨 비중을 키우는 것은 결함을 가장 이른 시점에 잡는 것입니다.',
            roi: '회귀 / 접근성 / 성능 자동화는 장기 ROI 가 가장 큰 영역입니다.',
          }}
        />
      }
    />
  );
}
