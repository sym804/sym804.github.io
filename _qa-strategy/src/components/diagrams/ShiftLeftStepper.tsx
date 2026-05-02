const STAGES = [
  { id: 'requirement', label: '요구사항', gates: ['리뷰', 'AC 합의'] },
  { id: 'design', label: '설계', gates: ['리스크 매트릭스', 'DoR'] },
  { id: 'implement', label: '구현', gates: ['린트', '타입체크', '단위'] },
  { id: 'integrate', label: '통합', gates: ['통합 테스트', 'API 계약'] },
  { id: 'deploy', label: '배포', gates: ['E2E', 'a11y', 'visual', '보안'] },
];

export function ShiftLeftStepper() {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-5 gap-4" aria-label="Shift-Left 단계별 게이트">
      {STAGES.map((stage, i) => (
        <li key={stage.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-mono">
              {i + 1}
            </span>
            <span className="font-semibold">{stage.label}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {stage.gates.map((g) => (
              <span
                key={g}
                className="inline-flex items-center rounded border border-border bg-muted px-2 py-0.5 text-xs"
              >
                {g}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
