const VERTICES = [
  { id: 'risk', x: 200, y: 40, label: 'Risk-Based', axis: 'Where', colorVar: 'hsl(var(--primary))' },
  { id: 'shift-left', x: 50, y: 280, label: 'Shift-Left', axis: 'When', colorVar: 'hsl(var(--accent-brand))' },
  { id: 'roi', x: 350, y: 280, label: 'Automation ROI', axis: 'How', colorVar: '#f2a900' },
] as const;

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

export function TrianglePrinciple({ size = 'md' }: Props) {
  const widthClass = size === 'sm' ? 'max-w-[280px]' : size === 'lg' ? 'max-w-[520px]' : 'max-w-[400px]';
  return (
    <div className={`mx-auto ${widthClass}`}>
      <svg
        viewBox="0 0 400 320"
        role="img"
        aria-label="QA 3원칙 트라이앵글: Risk-Based, Shift-Left, Automation ROI"
      >
        <polygon
          points={VERTICES.map((v) => `${v.x},${v.y}`).join(' ')}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
        />
        {VERTICES.map((v) => (
          <g key={v.id}>
            <circle cx={v.x} cy={v.y} r="10" fill={v.colorVar} />
            <text
              x={v.x}
              y={v.y - 18}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="hsl(var(--foreground))"
            >
              {v.label}
            </text>
            <text
              x={v.x}
              y={v.y + 28}
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--muted-foreground))"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
            >
              ({v.axis})
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
