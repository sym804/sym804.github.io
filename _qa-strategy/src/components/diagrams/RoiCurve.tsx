import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function CurveSvg({ breakEven }: { breakEven: number }) {
  const points: [number, number][] = [];
  for (let t = 0; t <= 10; t++) {
    const benefit = -50 + 25 * (t - breakEven);
    points.push([t * 50, 200 - Math.max(-100, Math.min(150, benefit))]);
  }
  return (
    <svg viewBox="0 0 520 280" role="img" aria-label="자동화 ROI 곡선">
      <line x1="40" y1="200" x2="500" y2="200" stroke="hsl(var(--border))" />
      <line x1="40" y1="40" x2="40" y2="260" stroke="hsl(var(--border))" />
      <text x="40" y="30" fontSize="11" fill="hsl(var(--muted-foreground))">
        누적 이득
      </text>
      <text x="470" y="220" fontSize="11" fill="hsl(var(--muted-foreground))">
        시간
      </text>
      <polyline
        points={points.map(([x, y]) => `${40 + x},${y}`).join(' ')}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
      />
      <line
        x1={40 + breakEven * 50}
        y1="40"
        x2={40 + breakEven * 50}
        y2="260"
        stroke="#f2a900"
        strokeDasharray="4 4"
      />
      <text x={40 + breakEven * 50 + 6} y="55" fontSize="11" fill="#f2a900">
        손익분기
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
        <CurveSvg breakEven={2} />
        <p className="text-sm text-muted-foreground mt-2">
          반복 빈도 높고 안정적인 시나리오. 회귀 / 스모크 / 핵심 사용자 흐름.
        </p>
      </TabsContent>
      <TabsContent value="long" className="mt-4">
        <CurveSvg breakEven={5} />
        <p className="text-sm text-muted-foreground mt-2">
          초기 비용이 크나 장기적으로 누적 이득이 큰 시나리오. 데이터 검증 / 성능 / 접근성 회귀.
        </p>
      </TabsContent>
    </Tabs>
  );
}
