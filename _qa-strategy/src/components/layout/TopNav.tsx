import { useEffect, useState } from 'react';

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 backdrop-blur',
        'transition-colors',
        scrolled ? 'bg-background/80 border-b border-border shadow-sm' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto max-w-[1280px] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="../index.html" className="text-sm text-muted-foreground hover:text-foreground">
            Portfolio
          </a>
          <span className="text-foreground font-semibold">QA Strategy</span>
        </div>
      </div>
    </nav>
  );
}
