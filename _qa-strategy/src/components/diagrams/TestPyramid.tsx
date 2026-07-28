interface Layer {
  label: string;
  share: string;
  speed: string;
  color: string;
}

const LAYERS: Layer[] = [
  { label: 'E2E', share: '~10%', speed: '느림', color: '#f2a900' },
  { label: 'Integration', share: '~20%', speed: '중간', color: 'hsl(var(--primary))' },
  { label: 'Unit', share: '~70%', speed: '빠름', color: '#12b76a' },
];

export function TestPyramid() {
  return (
    <figure className="mx-auto max-w-[520px]">
      <svg
        viewBox="0 0 520 360"
        role="img"
        aria-label="테스트 피라미드: E2E 10퍼센트, Integration 20퍼센트, Unit 70퍼센트"
      >
        {LAYERS.map((layer, i) => {
          const baseY = 40 + i * 100;
          const widthAtBase = 80 + i * 140;
          const widthAtTopValue = 80 + (i - 1) * 140;
          const widthAtTop = widthAtTopValue < 0 ? 80 : widthAtTopValue;
          const xLeft = 260 - widthAtBase / 2;
          const xRight = 260 + widthAtBase / 2;
          const xTopLeft = 260 - widthAtTop / 2;
          const xTopRight = 260 + widthAtTop / 2;
          return (
            <g key={layer.label}>
              <polygon
                points={`${xTopLeft},${baseY} ${xTopRight},${baseY} ${xRight},${baseY + 100} ${xLeft},${baseY + 100}`}
                fill={layer.color}
                opacity="0.18"
                stroke={layer.color}
                strokeWidth="1.5"
              />
              <text
                x="260"
                y={baseY + 55}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="hsl(var(--foreground))"
              >
                {layer.label}
              </text>
              <text
                x="260"
                y={baseY + 75}
                textAnchor="middle"
                fontSize="11"
                fill="hsl(var(--muted-foreground))"
              >
                {layer.share} · {layer.speed}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-center text-xs text-muted-foreground mt-2">
        피라미드 비율은 가이드라인. 도메인 특성에 따라 조정합니다.
      </figcaption>
    </figure>
  );
}
