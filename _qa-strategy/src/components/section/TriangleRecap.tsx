import type { Principle } from '@/content/sections.meta';
import { PRINCIPLE_LABELS } from '@/content/sections.meta';

interface Props {
  notes: Record<Principle, string>;
}

const COLOR_BY_PRINCIPLE: Record<Principle, string> = {
  risk: 'border-l-primary',
  'shift-left': 'border-l-accent-brand',
  roi: 'border-l-warning',
};

export function TriangleRecap({ notes }: Props) {
  return (
    <aside
      aria-label="3원칙 회수 요약"
      className="rounded-md border border-border bg-surface-elevated p-5"
    >
      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">
        3원칙으로 다시 보기
      </p>
      <ul className="space-y-3">
        {(['risk', 'shift-left', 'roi'] as const).map((p) => (
          <li key={p} className={`pl-3 border-l-2 ${COLOR_BY_PRINCIPLE[p]}`}>
            <p className="text-sm font-semibold">
              {PRINCIPLE_LABELS[p].label}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({PRINCIPLE_LABELS[p].axis})
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{notes[p]}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
