import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { FieldNote } from '@/components/section/FieldNote';
import { RoiCurve } from '@/components/diagrams/RoiCurve';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'automation')!;

const DECISION_TREE = [
  { step: 1, label: '반복 빈도', desc: '같은 시나리오가 N회 이상 반복되는가' },
  { step: 2, label: '안정성', desc: '명세 / UI 변동 빈도가 낮은가' },
  { step: 3, label: '비용', desc: '작성 + 유지보수 비용이 회수 가능한가' },
  { step: 4, label: '회귀 위험', desc: '실패 시 사용자 가치 손상이 큰가' },
];

const TOOLCHAIN = [
  { area: 'UI / Web', tool: 'Playwright, Cypress' },
  { area: 'API', tool: 'REST Assured, Postman, Schemathesis' },
  { area: 'Mobile', tool: 'Appium, XCUITest, Espresso' },
  { area: '데이터 / 검증', tool: 'Great Expectations, dbt test, 자체 스크립트' },
];

export function AutomationSection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          자동화는 ROI 가 입증될 때만 자산이다. 입증 없이 늘어난 자동화는 유지보수 비용으로 변하고,
          Flaky 테스트가 누적되면 신호가 노이즈에 묻힌다. 무엇을 자동화하지 않을지가 무엇을 자동화할지
          만큼 중요하다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-3">자동화 후보 결정 트리</h3>
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-3" aria-label="자동화 후보 결정 트리">
              {DECISION_TREE.map((d) => (
                <li key={d.step} className="rounded-md border border-border bg-surface p-4 relative">
                  <span className="absolute -top-3 left-3 h-6 w-6 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-mono">
                    {d.step}
                  </span>
                  <p className="mt-2 font-semibold">{d.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground mt-3">
              네 질문 모두에 Yes 일 때 자동화 후보로 채택한다. 한 항목이라도 No 가 있으면 수동 또는
              샘플링으로 대체.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">ROI 곡선</h3>
            <RoiCurve />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">도구 체인 표준</h3>
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2 w-40">영역</th>
                    <th className="text-left px-3 py-2">권장 도구</th>
                  </tr>
                </thead>
                <tbody>
                  {TOOLCHAIN.map((t) => (
                    <tr key={t.area} className="border-t border-border">
                      <td className="px-3 py-2 font-semibold">{t.area}</td>
                      <td className="px-3 py-2 text-muted-foreground">{t.tool}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>모든 것을 자동화: ROI 미입증 영역까지 자동화하면 누적 비용이 폭발한다.</li>
              <li>Flaky 테스트 방치: 신뢰도 잃은 테스트는 차라리 없는 것이 낫다.</li>
              <li>자동화율 KPI 의 의례화: 숫자만 추적하면 가치가 빈 자동화가 늘어난다.</li>
            </ul>
          </div>
        </>
      }
      fieldNote={
        <FieldNote
          assetTitle={META.caseAssetTitle ?? 'Multiplatform Automation + Web Selector Extractor'}
          assetHref={`../${META.caseAsset}.html`}
        >
          <p>
            PC / Web / Mobile 통합 자동화에서 가장 큰 비용은 셀렉터 / 식별자의 변동 대응이다.
            셀렉터 추출 보조 도구를 별도로 마련하여 작성 비용을 단축하고, 변동에 강한 식별 전략 (역할
            + 라벨 + 안정 ID 우선) 으로 유지 비용도 낮췄다. 결과적으로 자동화 후보 결정 트리의 비용
            축이 개선되어 자동화 가능 영역이 넓어졌다.
          </p>
        </FieldNote>
      }
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: '자동화 후보 결정에 리스크 점수가 가중치로 반영되어야 한다.',
            'shift-left': 'CI 의 가능한 한 왼쪽 단계로 자동화 게이트를 옮긴다.',
            roi: '본 섹션 자체가 Automation ROI 의 본진이다.',
          }}
        />
      }
    />
  );
}
