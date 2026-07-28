import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { DefectLifecycle } from '@/components/diagrams/DefectLifecycle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'defect-management')!;

const RCA_STEPS = [
  { step: 1, label: '사실 정리', desc: '재현 / 영향 / 발견 시점 / 사용자 수치' },
  { step: 2, label: '영향 평가', desc: 'Severity × Priority × 노출 사용자' },
  { step: 3, label: 'Why × 5', desc: '표면 원인에서 근본 원인까지 다섯 번 묻기' },
  { step: 4, label: '근본 원인', desc: '단일 원인이 아닐 수 있음. 시스템 / 프로세스 / 사람' },
  { step: 5, label: '즉시 조치', desc: '서비스 영향 차단을 위한 단기 조치' },
  { step: 6, label: '재발 방지', desc: '코드 / 테스트 / 프로세스 / 모니터링 변경' },
  { step: 7, label: '학습 공유', desc: '회고 인풋 / 룰북 갱신 / 메트릭 갱신' },
];

// Priority 는 즉시 / 높음 / 보통 / 낮음 4단계.
// 여기서는 Severity 와 독립된 축이라는 것을 보이는 2x2 예시라 양 끝만 쓴다.
const SEV_PRI = [
  { sev: 'Critical', pri: '즉시', action: '릴리즈 차단 후 hotfix' },
  { sev: 'Critical', pri: '낮음', action: '미출시 기능이면 다음 릴리즈' },
  { sev: 'Minor', pri: '즉시', action: '데모 / 심사 직전이면 지금 고친다' },
  { sev: 'Minor', pri: '낮음', action: '백로그' },
];

export function DefectManagementSection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          결함은 자산입니다. 제대로 분류하고 라이프사이클을 통해 처리할 때만 학습이 누적됩니다. 비난 없이
          사실을 정리하고, 재발 방지로 끝맺을 때 결함이 다음 결함을 줄입니다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-3">결함 라이프사이클</h3>
            <DefectLifecycle />
            <p className="text-sm text-muted-foreground mt-3">
              인지부터 종료까지 6단계. 각 단계의 전환 조건을 명문화하면 처리 시간 (MTTR) 의 산출이
              자연스럽고, 단계별 누수도 가시화됩니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Severity vs Priority</h3>
            <p className="text-muted-foreground mb-3">
              Severity 는 객관적 영향도, Priority 는 처리 시급성입니다. 둘은 곱의 관계가 아니라 별개의
              차원이며, 조합에 따라 처리 시점이 달라집니다.
            </p>
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2">Severity</th>
                    <th className="text-left px-3 py-2">Priority</th>
                    <th className="text-left px-3 py-2">처리 시점</th>
                  </tr>
                </thead>
                <tbody>
                  {SEV_PRI.map((row) => (
                    <tr key={`${row.sev}-${row.pri}`} className="border-t border-border">
                      <td className="px-3 py-2">{row.sev}</td>
                      <td className="px-3 py-2">{row.pri}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">5 Whys / RCA (근본 원인 분석) 7단계 템플릿</h3>
            <Accordion type="single" collapsible>
              {RCA_STEPS.map((s) => (
                <AccordionItem key={s.step} value={`step-${s.step}`}>
                  <AccordionTrigger>
                    {s.step}. {s.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{s.desc}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Retrospective (회고) vs Postmortem (사후 분석)</h3>
            <p className="text-muted-foreground">
              Retrospective (회고) 는 정기적인 학습 자리로 잘된 점 / 개선점을 균형 있게 다룹니다.
              Postmortem (사후 분석) 은 사고 직후의 사실 정리로, blameless (비난 없이) 시간순 / 결정 /
              영향을 기록하고 재발 방지 액션으로 끝맺습니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>비난 문화: 사람을 원인으로 지목하면 사실이 숨겨집니다.</li>
              <li>RCA 의 형식화: 템플릿만 채우고 액션이 사라지면 학습이 누적되지 않습니다.</li>
              <li>회고 액션의 미실행: 다음 회고에서 같은 액션이 반복됩니다.</li>
            </ul>
          </div>
        </>
      }
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: 'RCA 결과는 리스크 매트릭스의 갱신 인풋이 됩니다.',
            'shift-left': '라이프사이클 단축의 핵심은 인지 단계를 앞당기는 것입니다.',
            roi: '회고 / RCA 의 누적 학습이 장기 자동화 ROI 의 기반이 됩니다.',
          }}
        />
      }
    />
  );
}
