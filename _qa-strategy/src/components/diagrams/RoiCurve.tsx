import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const W = 600;
const H = 320;
const PAD_L = 64;
const PAD_R = 24;
const PAD_T = 56;
const PAD_B = 56;
const X_MAX = 10;
const Y_MIN = -130;
const Y_MAX = 130;

const xToPx = (t: number) => PAD_L + (t / X_MAX) * (W - PAD_L - PAD_R);
const yToPx = (b: number) => PAD_T + (1 - (b - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD_T - PAD_B);

interface CurveProps {
  breakEven: number;
  gainMax: number;
  scale: number;
  initialCost: number;
}

function CurveSvg({ breakEven, gainMax, scale, initialCost }: CurveProps) {
  const points: string[] = [];
  for (let t = 0; t <= X_MAX; t += 0.2) {
    const b = gainMax * Math.tanh((t - breakEven) / scale);
    points.push(`${xToPx(t).toFixed(1)},${yToPx(b).toFixed(1)}`);
  }
  const ticks = [0, 2, 4, 6, 8, 10];
  const endBenefit = gainMax * Math.tanh((X_MAX - breakEven) / scale);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`자동화 ROI 곡선: 회수 시점 ${breakEven} 스프린트, 10 스프린트 후 누적 이득 약 ${Math.round(endBenefit)}`}
      className="w-full h-auto"
    >
      <g transform={`translate(${PAD_L}, 16)`}>
        <circle cx={6} cy={9} r="4" fill="hsl(var(--destructive))" />
        <text x={16} y={13} fontSize="12" fill="hsl(var(--muted-foreground))">
          초기 투자 비용
        </text>
        <line x1={132} y1={9} x2={156} y2={9} stroke="#f2a900" strokeDasharray="3 3" strokeWidth="1.5" />
        <text x={162} y={13} fontSize="12" fill="hsl(var(--muted-foreground))">
          회수 시점
        </text>
        <circle cx={236} cy={9} r="4" fill="hsl(var(--primary))" />
        <text x={246} y={13} fontSize="12" fill="hsl(var(--muted-foreground))">
          10 스프린트 후 누적 이득
        </text>
      </g>
      <rect
        x={PAD_L}
        y={PAD_T}
        width={W - PAD_L - PAD_R}
        height={H - PAD_T - PAD_B}
        fill="none"
        stroke="hsl(var(--border))"
      />
      <line
        x1={PAD_L}
        y1={yToPx(0)}
        x2={W - PAD_R}
        y2={yToPx(0)}
        stroke="hsl(var(--border))"
        strokeDasharray="4 4"
      />
      <text x={PAD_L - 8} y={yToPx(0) + 4} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
        본전
      </text>
      <text x={PAD_L - 8} y={PAD_T + 12} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
        이득
      </text>
      <text x={PAD_L - 8} y={H - PAD_B} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
        손실
      </text>
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
      <text
        x={(PAD_L + W - PAD_R) / 2}
        y={H - 14}
        textAnchor="middle"
        fontSize="11"
        fill="hsl(var(--muted-foreground))"
      >
        시간 (스프린트)
      </text>
      <line
        x1={xToPx(breakEven)}
        y1={PAD_T}
        x2={xToPx(breakEven)}
        y2={H - PAD_B}
        stroke="#f2a900"
        strokeDasharray="3 4"
        strokeWidth="1.5"
      />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx={xToPx(0)} cy={yToPx(-initialCost)} r="5" fill="hsl(var(--destructive))" />
      <circle cx={xToPx(X_MAX)} cy={yToPx(endBenefit)} r="5" fill="hsl(var(--primary))" />
    </svg>
  );
}

export function RoiCurve() {
  return (
    <Tabs defaultValue="short" className="w-full">
      <TabsList>
        <TabsTrigger value="short">단기 ROI (빠른 회수)</TabsTrigger>
        <TabsTrigger value="long">장기 ROI (큰 이득)</TabsTrigger>
      </TabsList>
      <TabsContent value="short" className="mt-4">
        <CurveSvg breakEven={2} gainMax={70} scale={2} initialCost={50} />
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="text-xs text-muted-foreground">초기 투자 비용</p>
            <p className="font-semibold mt-1">작음</p>
          </div>
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="text-xs text-muted-foreground">회수 시점</p>
            <p className="font-semibold mt-1">약 2 스프린트 후</p>
          </div>
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="text-xs text-muted-foreground">누적 이득 (장기 대비)</p>
            <p className="font-semibold mt-1">기준 (1 배)</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          반복 빈도 높고 안정적인 시나리오 (회귀 / 스모크 / 핵심 사용자 흐름). 자동화 작성 비용이 작아 빠르게 회수되며, 이후 누적 이득은 일정 수준에서 평탄해진다.
        </p>
      </TabsContent>
      <TabsContent value="long" className="mt-4">
        <CurveSvg breakEven={5} gainMax={120} scale={3} initialCost={110} />
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="text-xs text-muted-foreground">초기 투자 비용</p>
            <p className="font-semibold mt-1">큼</p>
          </div>
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="text-xs text-muted-foreground">회수 시점</p>
            <p className="font-semibold mt-1">약 5 스프린트 후</p>
          </div>
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="text-xs text-muted-foreground">누적 이득 (단기 대비)</p>
            <p className="font-semibold mt-1">약 1.7 배</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          초기 작성 비용이 크지만 장기 이득이 큰 시나리오 (데이터 검증 / 성능 / 접근성 회귀). 회수까지는 더 오래 걸리지만, 그 이후의 누적 이득이 단기보다 훨씬 크다.
        </p>
      </TabsContent>
    </Tabs>
  );
}
