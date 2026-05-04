import { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

export interface FieldNoteAsset {
  title: string;
  href: string;
}

interface Props {
  assets: FieldNoteAsset[];
  children: ReactNode;
}

export function FieldNote({ assets, children }: Props) {
  return (
    <aside
      aria-label="포트폴리오 적용 사례"
      className="rounded-md border border-border bg-muted/30 p-5"
    >
      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2">Field Note</p>
      <div className="text-foreground leading-relaxed">{children}</div>
      <div className="mt-3 flex flex-col gap-1.5">
        {assets.map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {a.title} 보러가기 <ExternalLink className="h-3 w-3" />
          </a>
        ))}
      </div>
    </aside>
  );
}
