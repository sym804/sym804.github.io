const STAGES = [
  { label: '인지', desc: '발견 / 보고' },
  { label: '분류', desc: 'Severity × Priority' },
  { label: '할당', desc: 'Owner / 마감' },
  { label: '수정', desc: '구현 + 단위테스트' },
  { label: '검증', desc: '재현 → 통과' },
  { label: '종료', desc: '회고 인풋' },
];

export function DefectLifecycle() {
  return (
    <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" aria-label="결함 라이프사이클">
      {STAGES.map((s, i) => (
        <li key={s.label} className="rounded-md border border-border bg-surface p-4 relative">
          <span className="absolute -top-3 left-3 h-6 w-6 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-mono">
            {i + 1}
          </span>
          <p className="mt-2 font-semibold">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}
