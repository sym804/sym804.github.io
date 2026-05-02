import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Kpi {
  key: string;
  label: string;
  desc: string;
  current: number;
  target: number;
  unit: string;
  goodWhenLower?: boolean;
}

const KPIS: Kpi[] = [
  {
    key: 'dpi',
    label: 'DPI',
    desc: 'Defect Phase Injection',
    current: 22,
    target: 35,
    unit: '% (요구 / 설계 단계 주입)',
  },
  {
    key: 'leakage',
    label: '누수율',
    desc: '단계별 다음 단계 누수',
    current: 8,
    target: 5,
    unit: '%',
    goodWhenLower: true,
  },
  {
    key: 'coverage',
    label: '자동화 커버리지',
    desc: '핵심 시나리오 자동화율',
    current: 64,
    target: 80,
    unit: '%',
  },
  {
    key: 'mttr',
    label: 'MTTR',
    desc: '결함 인지 → 해결',
    current: 2.4,
    target: 1.5,
    unit: '일',
    goodWhenLower: true,
  },
];

function progressPercent(k: Kpi): number {
  if (k.goodWhenLower) {
    return Math.max(0, Math.min(100, (k.target / k.current) * 100));
  }
  return Math.max(0, Math.min(100, (k.current / k.target) * 100));
}

function statusClass(k: Kpi): string {
  const p = progressPercent(k);
  if (p >= 100) return 'bg-status-success-bg text-status-success-fg';
  if (p >= 70) return 'bg-status-warning-bg text-status-warning-fg';
  return 'bg-status-danger-bg text-status-danger-fg';
}

export function KpiCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {KPIS.map((k) => (
        <Card key={k.key} className="p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">{k.label}</h3>
            <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs ${statusClass(k)}`}>
              {k.current}
              {k.goodWhenLower ? ` (목표 ${k.target} 이하)` : ` / ${k.target}`}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {k.desc} · {k.unit}
          </p>
          <Progress value={progressPercent(k)} aria-label={`${k.label} 진행률`} />
        </Card>
      ))}
    </div>
  );
}
