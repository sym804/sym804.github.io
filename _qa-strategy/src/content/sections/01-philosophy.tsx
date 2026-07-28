import { SectionShell } from '@/components/section/SectionShell';
import { TriangleRecap } from '@/components/section/TriangleRecap';
import { TrianglePrinciple } from '@/components/diagrams/TrianglePrinciple';
import { SECTIONS } from '@/content/sections.meta';

const META = SECTIONS.find((s) => s.id === 'philosophy')!;

export function PhilosophySection() {
  return (
    <SectionShell
      meta={META}
      why={
        <p>
          테스트는 결함을 찾는 활동이 아니라 가치를 보호하는 활동입니다. 이 정의가 흔들리면 테스트
          활동은 형식화되고, 가장 중요한 결정 (어디에 시간을 쓸지) 이 모호해집니다.
        </p>
      }
      body={
        <>
          <div>
            <h3 className="text-xl font-semibold mb-2">QA 의 미션</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>사용자가 받는 가치가 손상되지 않도록 보호합니다.</li>
              <li>결함의 발견 비용을 최소화합니다. (늦게 발견될수록 비쌉니다.)</li>
              <li>의사결정자에게 신뢰할 수 있는 신호를 제공합니다.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">3원칙: Where / When / How</h3>
            <p className="text-muted-foreground">
              모든 활동은 세 질문에 답합니다. 어디에 집중할 것인가 (Risk-Based), 언제 개입할 것인가
              (Shift-Left), 어떻게 효율화할 것인가 (Automation ROI). 한 원칙만으로는 한쪽으로 치우치고,
              세 원칙이 만나는 지점에서 의사결정이 단단해집니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">안티 패턴</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>커버리지 100% 신화: 양적 목표만 좇으면 진짜 위험이 가려집니다.</li>
              <li>게이트 키핑형 QA: 테스트가 통과 의례가 되면 학습 기회가 사라집니다.</li>
              <li>자동화 만능론: 자동화의 ROI 가 마이너스인 영역까지 자동화하면 누적 비용이 커집니다.</li>
            </ul>
          </div>
        </>
      }
      visual={<TrianglePrinciple size="md" />}
      triangleRecap={
        <TriangleRecap
          notes={{
            risk: '왜 이 원칙이 필요한가는 곧 어디에 자원을 쓸 것인가의 문제입니다.',
            'shift-left': '결함을 늦게 발견하지 않도록 모든 단계에서 가치 보호를 시작합니다.',
            roi: '자동화가 가치 보호의 수단일 때만 자산이 됩니다.',
          }}
        />
      }
    />
  );
}
