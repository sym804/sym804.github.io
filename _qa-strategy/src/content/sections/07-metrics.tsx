import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { FieldNote } from '@/components/section/FieldNote';
import { KpiCardGrid } from '@/components/diagrams/KpiCardGrid';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'metrics')!;

const KPI_DEF = [
  {
    name: 'DPI',
    formula: '(요구 / 설계 단계 결함) ÷ (전체 결함)',
    unit: '%',
    goal: '높을수록 좋음',
    cycle: '스프린트',
  },
  {
    name: '누수율',
    formula: '(다음 단계로 넘어간 결함) ÷ (현재 단계 결함)',
    unit: '%',
    goal: '낮을수록 좋음',
    cycle: '스프린트',
  },
  {
    name: '자동화 커버리지',
    formula: '(자동화된 핵심 시나리오) ÷ (전체 핵심 시나리오)',
    unit: '%',
    goal: '높을수록 좋음 (단, 가치 있는 시나리오 한정)',
    cycle: '월간',
  },
  {
    name: 'MTTR',
    formula: '(결함 인지 → 종료 시간 합) ÷ (결함 수)',
    unit: '일',
    goal: '낮을수록 좋음',
    cycle: '스프린트',
  },
];

export function MetricsSection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          직감 대신 숫자. 같은 KPI 로 같은 결정을 한다. 메트릭은 회고의 인풋이자 자동화 / 프로세스
          개선의 근거가 되며, 의사결정의 분산을 줄인다. 다만 KPI 가 목적이 되면 가치가 비어 가니
          정의 / 산출 / 갱신 / 공유의 룰이 명확해야 한다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-3">4 KPI 정의</h3>
            <div className="rounded-md border border-border overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2">KPI</th>
                    <th className="text-left px-3 py-2">산출 식</th>
                    <th className="text-left px-3 py-2">단위</th>
                    <th className="text-left px-3 py-2">목표</th>
                    <th className="text-left px-3 py-2">갱신 주기</th>
                  </tr>
                </thead>
                <tbody>
                  {KPI_DEF.map((k) => (
                    <tr key={k.name} className="border-t border-border">
                      <td className="px-3 py-2 font-semibold">{k.name}</td>
                      <td className="px-3 py-2 text-muted-foreground font-mono text-xs">{k.formula}</td>
                      <td className="px-3 py-2 text-muted-foreground">{k.unit}</td>
                      <td className="px-3 py-2 text-muted-foreground">{k.goal}</td>
                      <td className="px-3 py-2 text-muted-foreground">{k.cycle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">현재 vs 목표 시각</h3>
            <KpiCardGrid />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">측정 / 리포트 룰</h3>
            <p className="text-muted-foreground">
              QA 담당이 매 스프린트 종료 시 산출하여 회고에 인풋으로 제공하고, 월간 단위로 트렌드를
              대시보드에 게시한다. 단위 / 산출 식 / 데이터 출처를 함께 기록해야 갱신 시 일관성이
              유지된다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>KPI 의 의례화: 수치만 좇고 의사결정에 사용하지 않는다.</li>
              <li>단일 지표 만능론: 한 KPI 가 모든 품질을 대표한다는 가정.</li>
              <li>임의 단위 변경: 정의가 흔들리면 트렌드 자체가 의미를 잃는다.</li>
            </ul>
          </div>
        </>
      }
      fieldNote={
        <FieldNote assetTitle={META.caseAssetTitle ?? 'StockRadar'} assetHref={`../${META.caseAsset}.html`}>
          <p>
            데이터 정합성 검증이 핵심인 도메인에서 누수율과 DPI 를 분기별로 추적하여 결함 주입 단계가
            점진적으로 앞당겨졌다. 자동화 커버리지를 무조건 높이지 않고, 핵심 데이터 흐름과 사용자
            가치 시나리오에 한정하여 ROI 를 입증한 후 점진적으로 확장하는 패턴을 적용했다.
          </p>
        </FieldNote>
      }
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: '메트릭이 리스크 매트릭스의 갱신 인풋이 된다.',
            'shift-left': 'DPI 가 단계별 결함 주입 시점을 가시화한다.',
            roi: '자동화 커버리지와 MTTR 가 자동화 ROI 의 직접 증거다.',
          }}
        />
      }
    />
  );
}
