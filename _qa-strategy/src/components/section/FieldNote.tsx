import { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

interface Props {
  assetTitle: string;
  assetHref: string;
  children: ReactNode;
}

export function FieldNote({ assetTitle, assetHref, children }: Props) {
  return (
    <aside
      aria-label="포트폴리오 적용 사례"
      className="rounded-md border border-border bg-muted/30 p-5"
    >
      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2">Field Note</p>
      <div className="text-foreground leading-relaxed">{children}</div>
      <a
        href={assetHref}
        className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        {assetTitle} 보러가기 <ExternalLink className="h-3 w-3" />
      </a>
    </aside>
  );
}
