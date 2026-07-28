const W = 640;
const H = 380;
const PAD_L = 64;
const PAD_R = 32;
const PAD_T = 72;
const PAD_B = 64;
const X_MAX = 10;
const Y_MAX = 130;

const M_RATE = 12;
const A_INIT = 50;
const A_SCALE = 1.6;
const A_RATE = 3;

const xToPx = (t: number) => PAD_L + (t / X_MAX) * (W - PAD_L - PAD_R);
const yToPx = (y: number) => PAD_T + (1 - y / Y_MAX) * (H - PAD_T - PAD_B);

const manualY = (t: number) => M_RATE * t;
const autoY = (t: number) => A_INIT * (1 - Math.exp(-t / A_SCALE)) + A_RATE * t;

function findCross(): { t: number; y: number } {
  let lo = 0;
  let hi = X_MAX;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (autoY(mid) > manualY(mid)) lo = mid;
    else hi = mid;
  }
  const t = (lo + hi) / 2;
  return { t, y: manualY(t) };
}

const cross = findCross();

function buildPath(fn: (t: number) => number): string {
  const points: string[] = [];
  for (let t = 0; t <= X_MAX; t += 0.1) {
    points.push(`${xToPx(t).toFixed(1)},${yToPx(fn(t)).toFixed(1)}`);
  }
  return points.join(' ');
}

function buildSavingArea(): string {
  const points: string[] = [];
  for (let t = cross.t; t <= X_MAX; t += 0.1) {
    points.push(`${xToPx(t).toFixed(1)},${yToPx(manualY(t)).toFixed(1)}`);
  }
  for (let t = X_MAX; t >= cross.t; t -= 0.1) {
    points.push(`${xToPx(t).toFixed(1)},${yToPx(autoY(t)).toFixed(1)}`);
  }
  return points.join(' ');
}

interface LegendItem {
  type: 'line' | 'box' | 'circle';
  color: string;
  label: string;
}

const LEGEND: LegendItem[] = [
  { type: 'line', color: 'hsl(var(--destructive))', label: '수동 테스트' },
  { type: 'line', color: 'hsl(var(--primary))', label: '자동화 테스트' },
  { type: 'box', color: '#f2a900', label: '누적 절감액' },
  { type: 'circle', color: 'hsl(var(--destructive))', label: '회수 시점' },
];

export function RoiCurve() {
  const ticks = [0, 2, 4, 6, 8, 10];
  const manualPath = buildPath(manualY);
  const autoPath = buildPath(autoY);
  const savingArea = buildSavingArea();

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="자동화 ROI: 수동 테스트 누적 비용 vs 자동화 테스트 누적 비용 비교"
        className="w-full h-auto"
      >
        <g transform={`translate(${PAD_L}, 24)`}>
          {LEGEND.map((item, i) => {
            const x = i * 145;
            return (
              <g key={item.label} transform={`translate(${x}, 0)`}>
                {item.type === 'line' && (
                  <line x1={0} y1={6} x2={22} y2={6} stroke={item.color} strokeWidth="2.5" />
                )}
                {item.type === 'box' && (
                  <rect x={2} y={0} width={20} height={12} fill={item.color} fillOpacity="0.18" />
                )}
                {item.type === 'circle' && (
                  <circle cx={11} cy={6} r="6" fill="none" stroke={item.color} strokeWidth="1.5" strokeDasharray="3 3" />
                )}
                <text x={28} y={10} fontSize="12" fill="hsl(var(--muted-foreground))">
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>

        <rect
          x={PAD_L}
          y={PAD_T}
          width={W - PAD_L - PAD_R}
          height={H - PAD_T - PAD_B}
          fill="none"
          stroke="hsl(var(--border))"
        />

        {[20, 40, 60, 80, 100, 120].map((y) => (
          <line
            key={y}
            x1={PAD_L}
            y1={yToPx(y)}
            x2={W - PAD_R}
            y2={yToPx(y)}
            stroke="hsl(var(--border))"
            strokeOpacity="0.3"
          />
        ))}

        {ticks.map((t) => (
          <g key={t}>
            <line x1={xToPx(t)} y1={H - PAD_B} x2={xToPx(t)} y2={H - PAD_B + 4} stroke="hsl(var(--border))" />
            <text
              x={xToPx(t)}
              y={H - PAD_B + 18}
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--muted-foreground))"
            >
              {t}
            </text>
          </g>
        ))}

        <text x={PAD_L - 12} y={PAD_T + 4} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
          누적 비용
        </text>
        <text
          x={(PAD_L + W - PAD_R) / 2}
          y={H - 18}
          textAnchor="middle"
          fontSize="11"
          fill="hsl(var(--muted-foreground))"
        >
          시간 (스프린트)
        </text>

        <polygon points={savingArea} fill="#f2a900" fillOpacity="0.18" />

        <polyline points={manualPath} fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
        <polyline points={autoPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />

        <line
          x1={xToPx(cross.t)}
          y1={yToPx(cross.y)}
          x2={xToPx(cross.t)}
          y2={H - PAD_B}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity="0.4"
          strokeDasharray="3 3"
        />
        <circle
          cx={xToPx(cross.t)}
          cy={yToPx(cross.y)}
          r="10"
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>

      <div className="mt-4 rounded-md border border-border bg-surface p-4 text-sm leading-relaxed">
        <p>
          <span className="font-semibold text-foreground">핵심:</span>{' '}
          <span className="text-muted-foreground">
            테스트 자동화는 작성 시점의 초기 투자 비용 (자동화 곡선의 처음 가파른 구간) 이 크지만, 시간이 지날수록 수동 테스트 대비 누적 비용이 작아집니다. 두 곡선이 만나는 지점이 회수 시점이고, 그 이후의 차이 (노란 영역) 가 자동화로 절감되는 비용입니다.
          </span>
        </p>
      </div>
    </div>
  );
}
