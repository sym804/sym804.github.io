import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { SECTIONS } from '@/content/sections.meta';
import { useState } from 'react';

export function MobileToc() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden fixed top-3 right-3 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="목차 열기"
          className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-surface border border-border"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="right">
          <ol className="space-y-2 text-base mt-6">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-2 px-2 py-2 rounded hover:bg-muted"
                >
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {String(s.number).padStart(2, '0')}
                  </span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </SheetContent>
      </Sheet>
    </div>
  );
}
