import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { FieldNote } from '@/components/section/FieldNote';
import { ShiftLeftStepper } from '@/components/diagrams/ShiftLeftStepper';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'shift-left')!;

const STAGE_GATES = [
  { stage: '요구사항', activity: 'AC 합의 / 리스크 식별', gate: 'DoR (착수 기준) 통과', block: '리뷰 차단' },
  { stage: '설계', activity: '리스크 매트릭스 / 테스트 설계', gate: '리스크 점수 부여', block: '리뷰 차단' },
  { stage: '구현', activity: '단위 / 페어 리뷰', gate: '린트 / 타입 / 단위', block: 'CI 자동 차단' },
  { stage: '통합', activity: 'API 계약 / 통합 테스트', gate: '통합 성공률', block: 'CI 자동 차단' },
  { stage: '배포', activity: 'E2E / a11y / visual / 보안', gate: 'WCAG AA / 시각 회귀 / 보안 스캔', block: 'CI 자동 차단' },
];

export function ShiftLeftSection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          결함은 늦게 발견될수록 비싸다. QA 가 요구사항부터 개입하면 잘못된 가정 / 모호한 수용 기준 /
          누락된 비기능 요구가 코드 작성 전에 잡힌다. 단계마다 게이트를 두면 결함이 다음 단계로
          누수되는 경로 자체가 좁아진다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-3">단계별 QA 활동</h3>
            <ShiftLeftStepper />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">단계별 게이트 정책</h3>
            <div className="rounded-md border border-border overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2">단계</th>
                    <th className="text-left px-3 py-2">QA 활동</th>
                    <th className="text-left px-3 py-2">게이트</th>
                    <th className="text-left px-3 py-2">차단 정책</th>
                  </tr>
                </thead>
                <tbody>
                  {STAGE_GATES.map((s) => (
                    <tr key={s.stage} className="border-t border-border">
                      <td className="px-3 py-2 font-semibold">{s.stage}</td>
                      <td className="px-3 py-2 text-muted-foreground">{s.activity}</td>
                      <td className="px-3 py-2 text-muted-foreground">{s.gate}</td>
                      <td className="px-3 py-2 text-muted-foreground">{s.block}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>배포 직전 일괄 테스트: 결함 발견 시점이 가장 늦은 곳에 몰려 비용이 최대화된다.</li>
              <li>게이트 우회 (no-verify) 의 일상화: 한 번의 우회가 다음 우회를 부른다.</li>
              <li>게이트 통과율 KPI 의 의례화: 100% 통과만 추구하면 게이트가 수축된다.</li>
            </ul>
          </div>
        </>
      }
      fieldNote={
        <FieldNote assets={(META.caseAssets ?? []).map((c) => ({ title: c.title, href: `../${c.asset}.html` }))}>
          <p>
            AI 멀티에이전트 시스템의 코딩 모드는 5단계 파이프라인 (Claude 작성 → Codex 리뷰 → 3개 에이전트
            동시 테스트 → 이슈 수정 루프 → 최종 보고) 으로 단계별 검증을 자동화. 결정형 검증 (경로
            화이트리스트, 환경변수 토큰 필터링) 은 즉시 차단, 확률형 평가 (3개 에이전트 합의 감지, 백업
            에이전트 자동 전환) 는 신호 기반 분기로 처리한다. AI 특유의 비결정성을 단계 분리로 흡수한
            Shift-Left 구조.
          </p>
        </FieldNote>
      }
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: '위험이 큰 단계일수록 게이트의 강도와 차단 정책이 강해진다.',
            'shift-left': '본 섹션 자체가 Shift-Left 의 본진이다.',
            roi: '게이트 자동화의 ROI 는 단계가 왼쪽일수록 높다.',
          }}
        />
      }
    />
  );
}
