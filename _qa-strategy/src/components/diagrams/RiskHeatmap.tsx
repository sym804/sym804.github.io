import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const IMPACT = ['미미', '경미', '보통', '중대', '치명'];
const FREQUENCY = ['희박', '낮음', '보통', '높음', '매우높음'];

interface Zone {
  match: (i: number, f: number) => boolean;
  label: string;
  cell: string;
  tip: string;
}

const ZONES: Zone[] = [
  {
    match: (i, f) => i + f >= 7,
    label: 'Critical',
    cell: 'bg-destructive/30 border-destructive',
    tip: '즉시 대응 + 최우선 게이트',
  },
  {
    match: (i, f) => i + f >= 5,
    label: 'High',
    cell: 'bg-status-warning-bg border-status-warning-fg',
    tip: '회귀 자동화 + Shift-Left 검토',
  },
  {
    match: (i, f) => i + f >= 3,
    label: 'Medium',
    cell: 'bg-primary/20 border-primary',
    tip: '계획된 회귀 / 샘플링',
  },
  {
    match: () => true,
    label: 'Low',
    cell: 'bg-muted/40 border-border',
    tip: '탐색 테스트 / 모니터링',
  },
];

function classifyCell(impact: number, freq: number): Zone {
  return ZONES.find((z) => z.match(impact, freq))!;
}

export function RiskHeatmap() {
  return (
    <TooltipProvider>
      <figure className="mx-auto max-w-[560px]">
        <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1 text-xs">
          <div />
          {FREQUENCY.map((f) => (
            <div key={f} className="text-center text-muted-foreground py-1">
              {f}
            </div>
          ))}
          {IMPACT.slice()
            .reverse()
            .map((impactLabel, rowIdx) => {
              const impact = 4 - rowIdx;
              return (
                <div key={impactLabel} className="contents">
                  <div className="flex items-center text-muted-foreground pr-2">{impactLabel}</div>
                  {FREQUENCY.map((_, freq) => {
                    const zone = classifyCell(impact, freq);
                    return (
                      <Tooltip key={freq}>
                        <TooltipTrigger asChild>
                          <div
                            role="img"
                            aria-label={`영향도 ${impactLabel} 발생도 ${FREQUENCY[freq]} 등급 ${zone.label}`}
                            className={`aspect-square rounded border ${zone.cell} flex items-center justify-center text-[10px] font-mono`}
                          >
                            {zone.label[0]}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="font-semibold">{zone.label}</div>
                          <div className="text-xs">{zone.tip}</div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              );
            })}
        </div>
        <figcaption className="text-center text-xs text-muted-foreground mt-3">
          x: 발생도 · y: 영향도 · 셀 위에 hover 하면 대응 정책이 보임
        </figcaption>
      </figure>
    </TooltipProvider>
  );
}
