import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const W = 560;
const H = 300;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 24;
const PAD_B = 44;
const X_MAX = 10;
const Y_MIN = -120;
const Y_MAX = 120;

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
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`자동화 ROI 곡선 (손익분기 t=${breakEven}, 누적 이득 한계 ${gainMax})`}
      className="w-full h-auto"
    >
      <rect x={PAD_L} y={PAD_T} width={W - PAD_L - PAD_R} height={H - PAD_T - PAD_B} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
      <line
        x1={PAD_L}
        y1={yToPx(0)}
        x2={W - PAD_R}
        y2={yToPx(0)}
        stroke="hsl(var(--border))"
        strokeDasharray="4 4"
      />
      <text x={PAD_L - 8} y={yToPx(0) + 4} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
        0
      </text>
      <text x={PAD_L - 8} y={PAD_T + 12} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
        +이득
      </text>
      <text x={PAD_L - 8} y={H - PAD_B} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
        비용
      </text>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={xToPx(t)} y1={H - PAD_B} x2={xToPx(t)} y2={H - PAD_B + 4} stroke="hsl(var(--border))" />
          <text x={xToPx(t)} y={H - PAD_B + 18} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
            {t}
          </text>
        </g>
      ))}
      <text x={(PAD_L + W - PAD_R) / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
        시간 (스프린트 단위)
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
      <text x={xToPx(breakEven) + 6} y={PAD_T + 14} fontSize="11" fill="#f2a900" fontWeight="600">
        손익분기 t={breakEven}
      </text>
      <polyline points={points.join(' ')} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={xToPx(0)} cy={yToPx(-initialCost)} r="4" fill="hsl(var(--destructive))" />
      <text x={xToPx(0) + 8} y={yToPx(-initialCost) + 4} fontSize="11" fill="hsl(var(--destructive))">
        초기 비용
      </text>
      <circle cx={xToPx(X_MAX)} cy={yToPx(gainMax * Math.tanh((X_MAX - breakEven) / scale))} r="4" fill="hsl(var(--primary))" />
      <text x={xToPx(X_MAX) - 8} y={yToPx(gainMax * Math.tanh((X_MAX - breakEven) / scale)) - 8} textAnchor="end" fontSize="11" fill="hsl(var(--primary))">
        누적 이득 +{gainMax}
      </text>
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
        <p className="text-sm text-muted-foreground mt-2">
          반복 빈도 높고 안정적인 시나리오. 회귀 / 스모크 / 핵심 사용자 흐름. 초기 비용이 작고 t=2 부근에서 회수, 누적 이득은 +70 선에서 평탄.
        </p>
      </TabsContent>
      <TabsContent value="long" className="mt-4">
        <CurveSvg breakEven={5} gainMax={120} scale={3} initialCost={110} />
        <p className="text-sm text-muted-foreground mt-2">
          초기 비용이 크지만 장기 이득이 큰 시나리오. 데이터 검증 / 성능 / 접근성 회귀. t=5 부근에서 회수, 누적 이득은 단기 대비 1.7 배 (+120) 까지 도달.
        </p>
      </TabsContent>
    </Tabs>
  );
}
