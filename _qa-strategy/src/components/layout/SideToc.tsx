import { useEffect, useState } from 'react';
import { SECTIONS } from '@/content/sections.meta';

export function SideToc() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="섹션 목차"
      className="hidden lg:block fixed left-[max(24px,calc((100vw-1280px)/2))] top-32 w-56"
    >
      <ol className="space-y-1 text-sm">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={[
                'flex items-baseline gap-2 px-2 py-1 rounded transition-colors',
                active === s.id
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              <span className="font-mono text-xs tabular-nums">{String(s.number).padStart(2, '0')}</span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
