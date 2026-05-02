import { ReactNode } from 'react';
import type { SectionMeta } from '@/content/sections.meta';

interface Props {
  meta: SectionMeta;
  why: ReactNode;
  body: ReactNode;
  visual?: ReactNode;
  fieldNote?: ReactNode;
  triangleRecap: ReactNode;
}

export function SectionShell({ meta, why, body, visual, fieldNote, triangleRecap }: Props) {
  return (
    <section id={meta.id} className="scroll-mt-24 space-y-8">
      <header>
        <p className="text-xs font-mono tabular-nums text-muted-foreground">
          SECTION {String(meta.number).padStart(2, '0')}
        </p>
        <h2 className="mt-2 text-3xl lg:text-4xl font-sans font-bold">{meta.title}</h2>
        <p className="mt-2 text-muted-foreground">{meta.oneLiner}</p>
      </header>

      <div className="rounded-md border border-border bg-surface p-5">
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2">Why this matters</p>
        <div className="text-foreground leading-relaxed">{why}</div>
      </div>

      <div className="space-y-6 leading-relaxed">{body}</div>

      {visual && <div className="my-4">{visual}</div>}

      {fieldNote && <div>{fieldNote}</div>}

      <div>{triangleRecap}</div>
    </section>
  );
}
