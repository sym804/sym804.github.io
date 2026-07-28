import { useEffect, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const mono = "font-mono tabular-nums";
/** 섹션·차트 위 작은 라벨. 이전엔 mono + uppercase + 넓은 자간이라 한글이 흩어져
    잘 안 읽혔다. sans + 좁은 자간 + 조금 큰 크기로 또렷하게 둔다. */
const label = "font-sans text-[13px] font-semibold tracking-[0.01em] text-primary";

/** 스크롤로 요소가 뷰포트에 들어오면 .in-view 를 붙여 CSS 리빌을 한 번 재생한다. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── 조판 요소 ──────────────────────────────────────────────
   색과 폰트는 전부 sym-ui 토큰이다. 여기서 정하는 것은 크기와 간격,
   즉 무엇을 크게 보여줄지의 순서뿐이다.                        */

function Section({ no, title, children }: {
  no: string; title: string; kicker?: string; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} data-reveal className="relative mt-28 scroll-mt-16">
      {/* 번호를 크게 흘려 두어 긴 글에서 현재 위치가 보이게 한다 */}
      <div aria-hidden className={`${mono} pointer-events-none absolute -top-6 right-0
        select-none text-[88px] font-medium leading-none text-foreground/[0.04] md:text-[120px]`}>
        {no}
      </div>
      <div className="relative">
        <h2 className="font-display text-[28px] font-bold leading-tight tracking-tight md:text-[38px]">
          {title}
        </h2>
        <div className="mt-6 space-y-5 text-[17px] leading-[1.9] text-muted-foreground">
          {children}
        </div>
      </div>
    </section>
  );
}

/** 논지의 결정적 문장. 본문과 같은 크기로 두면 그냥 지나간다. */
function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="!my-10 border-l-2 border-primary pl-6">
      <p className="font-display text-[22px] font-bold leading-[1.55] tracking-tight text-foreground md:text-[26px]">
        {children}
      </p>
    </blockquote>
  );
}

/** 이슈 로그 원문. 내 주장과 남아 있는 기록을 눈으로 구분할 수 있어야 한다. */
function Issue({ id, date, severity, children }: {
  id: string; date: string; severity?: string; children: React.ReactNode;
}) {
  return (
    <figure className="!my-7 overflow-hidden rounded-lg border border-border bg-surface">
      <figcaption className="flex flex-wrap items-center gap-2.5 border-b border-border
        bg-surface-elevated px-5 py-2.5">
        <code className={`${mono} text-xs text-primary`}>{id}</code>
        <span className={`${mono} text-xs text-muted-foreground`}>{date}</span>
        {severity && <Badge variant="danger">{severity}</Badge>}
        <span className="ml-auto text-[11px] uppercase tracking-wider text-muted-foreground">
          이슈 로그 원문
        </span>
      </figcaption>
      <p className="px-5 py-4 text-[15px] leading-relaxed text-foreground">{children}</p>
    </figure>
  );
}

function Stat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <Card className="border-border/80">
      <CardContent className="p-6">
        <div className="font-display text-4xl font-extrabold leading-none tracking-tight tabular-nums">
          {value}
          {unit && <span className="ml-1 text-xl font-bold text-muted-foreground">{unit}</span>}
        </div>
        <div className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

/** 2절: 2026년 3월, 백엔드 버전이 2주 만에 1.2 에서 3.10 까지 오른 궤적.
    값은 이슈 로그 '발생 버전' 컬럼에서 뽑은 실측(대표 지점만). */
const VERSION_TRACK = [
  { d: "03-02", v: "1.2", val: 12, major: false },
  { d: "03-05", v: "2.0", val: 20, major: true },
  { d: "03-07", v: "2.4", val: 24, major: false },
  { d: "03-10", v: "3.0", val: 30, major: true },
  { d: "03-17", v: "3.10", val: 40, major: false },
] as const;

function VersionTimeline() {
  const pts = VERSION_TRACK;
  const W = 640, H = 200, L = 46, Rr = 604, T = 40, B = 148;
  const vmin = 10, vmax = 42;
  const x = (i: number) => L + (i / (pts.length - 1)) * (Rr - L);
  const y = (v: number) => B - ((v - vmin) / (vmax - vmin)) * (B - T);
  const linePts = pts.map((p, i) => `${x(i)},${y(p.val)}`).join(" ");
  const areaPts = `${x(0)},${B} ${linePts} ${x(pts.length - 1)},${B}`;
  return (
    <figure className="!my-8 overflow-hidden rounded-lg border border-border bg-surface p-5">
      <figcaption className="mb-2 flex items-center justify-between text-[13px]">
        <span className={label}>백엔드 버전 · 2026.03</span>
        <span className="text-muted-foreground">2주 · 메이저 2회</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="3월 2일 BE 1.2 에서 3월 17일 BE 3.10 까지 2주간 백엔드 버전이 상승한 그래프"
      >
        {[10, 20, 30, 40].map((g) => (
          <line
            key={g}
            x1={L}
            x2={Rr}
            y1={y(g)}
            y2={y(g)}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeDasharray="2 5"
          />
        ))}
        <polygon points={areaPts} fill="hsl(var(--primary) / 0.08)" />
        <polyline
          className="reveal-line"
          points={linePts}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ ["--dash" as string]: "900" } as React.CSSProperties}
        />
        {pts.map((p, i) => (
          <g key={p.d} className="reveal-dot" style={{ animationDelay: `${0.35 + i * 0.11}s` }}>
            <circle
              cx={x(i)}
              cy={y(p.val)}
              r={p.major ? 6 : 4}
              fill={p.major ? "hsl(var(--primary))" : "hsl(var(--surface))"}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <text
              x={x(i)}
              y={y(p.val) - 14}
              textAnchor="middle"
              style={{ fontFamily: "var(--font-sans)" }}
              fontSize={p.major ? 16 : 13}
              fontWeight={p.major ? 700 : 500}
              fill={p.major ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
            >
              {p.v}
            </text>
            <text
              x={x(i)}
              y={B + 24}
              textAnchor="middle"
              style={{ fontFamily: "var(--font-sans)" }}
              fontSize={12}
              fill="hsl(var(--muted-foreground))"
            >
              {p.d}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
        3월 17일 BE 3.10 을 지나,{" "}
        <span className="font-semibold text-foreground">지금은 BE 3.86</span> 이다.
      </p>
    </figure>
  );
}

/** 3절: 월별 이슈 발견(한국). 3월 초기 구축 폭발, 4-5월 안정, 6-7월 v2 재구축으로 재급증. */
const MONTHLY = [
  { m: "3월", n: 241 },
  { m: "4월", n: 92 },
  { m: "5월", n: 64 },
  { m: "6월", n: 171 },
  { m: "7월", n: 257 },
] as const;

function MonthlyIssues() {
  const max = 257;
  return (
    <figure className="!my-8 rounded-lg border border-border bg-surface p-5">
      <figcaption className="mb-4 flex items-center justify-between text-[13px]">
        <span className={label}>이슈 발견 · 월별 (한국)</span>
        <span className="text-muted-foreground">2026.03 - 07</span>
      </figcaption>
      <div className="flex items-end gap-3 sm:gap-5">
        {MONTHLY.map((d) => (
          <div key={d.m} className="flex flex-1 flex-col items-center">
            <span className="mb-2 text-sm font-semibold tabular-nums text-foreground">{d.n}</span>
            <div
              className="w-full rounded-t-md bg-primary/80"
              style={{ height: `${(d.n / max) * 180}px` }}
            />
            <span className="mt-2 text-xs text-muted-foreground">{d.m}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

/** 7절: v1(바닐라 JS)에서 뒤로가기 이슈가 재발한 목록과, 4월 2일 v2(Next.js)
    재설계로 라우팅이 프레임워크로 넘어가며 소멸한 것을 좌우로 대비한다. */
const RECUR_V1 = [
  { d: "03-05", t: "뒤로가기 시 사이트 완전 이탈" },
  { d: "03-12", t: "이벤트 새로고침·뒤로가기 복원 불가" },
  { d: "03-13", t: "퀀트 뒤로가기 시 하단 섹션 미표시" },
  { d: "03-13", t: "서브탭이 종합점수로 초기화" },
  { d: "03-16", t: "popstate 히스토리 루프에 갇힘" },
  { d: "03-16", t: "14개 뷰 뒤로가기 외부 이탈" },
] as const;

function RecurrenceTimeline() {
  return (
    <figure className="!my-8">
      <figcaption className={`${label} mb-3`}>
        뒤로가기 이슈 · v1 재발 → v2 소멸
      </figcaption>
      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {/* v1: 같은 부류가 반복해서 올라왔다 */}
        <div className="rounded-lg border border-destructive/35 bg-surface p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="font-display text-base font-bold text-foreground">v1 · 바닐라 JS</span>
            <span
              className={`${mono} text-sm font-bold`}
              style={{ color: "hsl(var(--destructive-text))" }}
            >
              재발 8건
            </span>
          </div>
          <ul className="space-y-2.5">
            {RECUR_V1.map((x, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug">
                <span
                  className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "hsl(var(--destructive))" }}
                />
                <span className="text-muted-foreground">
                  <span className={`${mono} text-foreground/70`}>{x.d}</span> {x.t}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
            SPA 히스토리 스택을 화면마다 손으로 쌓았다. 화면이 늘 때마다 같은 부류가 재발했다.
          </p>
        </div>

        {/* v2: 구조를 바꾸자 재발 자체가 사라졌다 */}
        <div className="flex flex-col rounded-lg border border-primary/45 bg-surface p-6">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-base font-bold text-foreground">v2 · Next.js</span>
            <span className={`${mono} text-xs text-muted-foreground`}>4/2 전면 재설계</span>
          </div>
          <div className="mt-3 font-display text-base font-extrabold tracking-tight text-primary">
            재발 0
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
            15개 뷰를 100% 다시 짰다. 라우팅과 히스토리를 프레임워크가 관리하게 되자, 손으로
            스택을 쌓던 그 재발이 한 번도 다시 올라오지 않았다.
          </p>
        </div>
      </div>
    </figure>
  );
}

const DOMAIN = [
  ["ETF / 배당", 108],
  ["백테스트 / 퀀트", 82],
  ["거래일 · 휴장", 43],
  ["재무 · 공시", 32],
  ["시점 정합성 (PIT)", 16],
] as const;

const GENERIC = [
  ["UI / 레이아웃", 49],
  ["기타 (미분류)", 32],
  ["null / 예외", 23],
  ["API 계약", 13],
  ["성능", 4],
] as const;

function Bars({ rows, tone }: {
  rows: readonly (readonly [string, number])[]; tone: "brand" | "muted";
}) {
  const max = 108;
  return (
    <div className="space-y-2.5">
      {rows.map(([label, n]) => (
        <div key={label} className="flex items-center gap-4">
          <div className="w-36 shrink-0 text-[13px] text-foreground">{label}</div>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${tone === "brand" ? "bg-primary" : "bg-muted-foreground/45"}`}
              style={{ width: `${(n / max) * 100}%` }}
            />
          </div>
          <div className={`${mono} w-9 shrink-0 text-right text-[13px] text-muted-foreground`}>
            {n}
          </div>
        </div>
      ))}
    </div>
  );
}

const REAL_BUGS = [
  "백테스트 엔진 CAGR 3배 과대계상 (분기 전략)",
  "윤년 미처리 - 월간 예측에서 2월이 항상 28일로 하드코딩",
  "시장 통계(PER/PBR/배당수익률) 단순 평균으로 부정확",
  "스크리너 장중 미확정 종가로 조회되는 문제",
  "월간 리밸런싱 전략이 매수일을 매일 당일로 계산 (실제로는 월 1회 매수)",
  "52주 신고가/신저가 데이터 키움증권 대비 불일치",
];

const BUILT = [
  ["양식", "테스트케이스 양식과 이슈 등록 양식을 먼저 정했다. 12개 컬럼, 버그 5단계(Block/Critical/Major/Minor/Trivial)와 개선 3단계."],
  ["룰", "양식을 지키게 하는 규칙. 보안 이슈는 Minor 이상, 데이터 이슈는 Major 이상 같은 하한선을 포함한다."],
  ["스킬", "룰을 AI 가 매번 읽고 따르도록 스킬로 만들었다."],
  ["하네스", "스킬만으로 지켜지지 않는 것을 훅으로 강제했다. global_guard.py 는 699줄이고 테스트가 47건 붙어 있다."],
  ["교차검증", "검증자를 둘 붙였다. 외부 모델과 자체 리뷰 에이전트를 동시에, 독립적으로. 하나만 쓰면 그 하나의 사각지대가 그대로 남는다."],
] as const;

const NOT_REPLACED = [
  ["기획", "무엇을 만들지, 어디까지 넓힐지"],
  ["아키텍처 판단", "언제 구조를 바꿀지"],
  ["정형화", "양식, 룰, 스킬, 하네스"],
  ["검증", "도메인을 아는 사람의 확인, 그리고 그것을 체계화한 교차검증"],
] as const;

export default function Narrative() {
  return (
    <div className="relative min-h-screen">
      {/* 상세 문서들이 쓰는 블루프린트 격자. 한 묶음으로 읽히게 하는 장치다. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)/0.5) 1px, transparent 1px)," +
            "linear-gradient(to bottom, hsl(var(--border)/0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 5%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 5%, transparent 70%)",
        }}
      />

      <main className="relative mx-auto max-w-5xl px-6 pb-28 pt-20 md:px-10 md:pt-28">
        <header>
          <p className={label}>
            stockradar · 2026.03 - 2026.07
          </p>
          <h1 className="mt-5 font-display text-[42px] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[68px]">
            AI 로 제품을
            <br />
            만든다는 것
          </h1>

          <div className="mt-10 space-y-5 text-[19px] leading-[1.85]">
            <p className="text-foreground">
              AI 의 생산성은 매우 뛰어나다.{" "}
              <strong className="font-bold">그러나 그것만으로 제품이 되지는 않는다.</strong>
            </p>
            <p className="text-muted-foreground">
              제품이 되려면 기획력을 기반으로 한 AI 하네스, 오케스트레이션, 정형화된 룰과 스킬,
              그리고 검증할 수 있는 능력이 함께 있어야 한다. 종합적인 기술이 필요하다.
            </p>
            <p className="text-muted-foreground">
              이 문서는 그 주장을, 증권 데이터 플랫폼 stockradar 를 4개월 반 동안 만들며 남은
              이슈 로그 1,132건과 버전 기록으로 뒷받침한다.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value="1,132" label="이슈 로그에 남은 건수 (한국 947 · 미국 185, 2026-07-23 기준)" />
            <Stat value="4.7" unit="개월" label="2026년 3월 1일 시작" />
            <Stat value="2" unit="개" label="시장. 한국에서 시작해 이틀 만에 미국까지" />
            <Stat value="1" unit="회" label="프론트엔드 아키텍처 전면 교체" />
          </div>
        </header>

        <Section no="01" kicker="시작" title="왜 시작했나">
          <p>
            목적은 두 가지였다. 증권사 QA 로 취업하기 위한 포트폴리오, 그리고 개인적으로 쓸
            퀀트 전략 도구. QA 로서 테스트할 대상을 직접 만들어 보고 싶었고, 투자자로서 필요한
            화면이 시중에 마땅치 않았다.
          </p>
          <p>
            그래서 처음에는 PyQt5 데스크톱 뷰어로 시작했다. 로컬에서 가장 빠르게 그릴 수 있었기
            때문이다. 그런데 시작 첫날 올린 이슈가 이것이었다.
          </p>
          <Issue id="ISS-001" date="2026-03-01" severity="Major">
            PyQt5 데스크톱 뷰어 한계 - 배포/공유 불가.
            원인: PyQt5 데스크톱 앱은 설치 필요, 모바일 접근 불가
          </Issue>
          <p>
            데스크톱 앱은 설치를 해야 하고 모바일에서 열리지 않는다. 만든 것을 링크 하나로
            보여줄 수 없으면 포트폴리오가 아니다. 그날로 웹으로 돌렸다. 시작 첫날의 판단이었고,
            이후 모든 것이 웹 위에서 쌓였다.
          </p>
        </Section>

        <Section no="02" kicker="속도" title="생산성은 실제로 뛰어났다">
          <p>
            웹으로 옮긴 첫 주에 백엔드 버전이 여덟 번 올라갔다. 3월 2일 1.2, 사흘 뒤 2.0,
            닷새 뒤 3.0. 열흘 남짓에 메이저 자릿수를 두 번 넘겼다. 기능을 붙이면 대체로
            그날 배포됐다. AI 로 구현하는 속도는 실제로 이만큼 빨랐다.
          </p>

          <VersionTimeline />

          <Pull>2주 만에 백엔드가 1.2 에서 3.10 까지 갔다.</Pull>

          <p>
            버전은 A.B.C.D 네 자리로 매긴다. A 는 사이트 전체를 바꾸는 대규모 업데이트,
            B 는 기능 추가, C · D 는 버그 수정이다. 그러니 2주 만에 3.10 이라는 건, 대규모
            개편을 두 번(1 → 2 → 3) 하고 그 위에 기능을 열 번 넘게 얹었다는 뜻이다.
          </p>
          <p>그 2주 사이에 실제로 붙은 화면은 이렇다.</p>
          <div className="!my-5 flex flex-wrap gap-2">
            {[
              "대시보드",
              "종목 차트",
              "시장 트리맵",
              "테마별 상세",
              "공시",
              "ETF 배당·신규상장",
              "종목 비교",
              "미국 시장",
            ].map((f) => (
              <span
                key={f}
                className="rounded-full border border-border bg-surface px-3 py-1 text-[13px] text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
          <p>
            대시보드로 시작해 종목 차트, 트리맵, 공시, ETF 화면이 며칠 단위로 하나씩 붙었고,
            3월 3일에는 미국 시장 백엔드까지 열었다. 기능을 구상하면 그 주 안에 동작하는
            화면이 됐다.
          </p>

          <p>
            다만 이 속도에는 대가가 있다. 빠르게 쌓으면 그만큼 규모도 빠르게 커진다.
            한국 시장만 만들려던 계획이 시작 이틀 만에 미국까지 넓어진 것도 속도가 붙었기
            때문이다.
          </p>
          <Issue id="US #1" date="2026-03-03">
            Express + React + TS + Vite 로 미국 시장 백엔드 초기 구축. 한국을 시작한 지 이틀째다.
          </Issue>
          <p>
            두 번째 시장을 연 것은 계획이 아니라 속도에 붙은 자신감이었다. 이것이 다음 장에서
            다룰 문제의 출발점이 된다.
          </p>
        </Section>

        <Section no="03" kicker="규모" title="규모가 커지자 두 가지가 따라왔다">
          <p>기능을 계속 추가한 결과는 규모였다. 그리고 규모는 두 가지를 데려왔다.</p>

          <h3 className="!mt-12 font-display text-[21px] font-bold tracking-tight text-foreground">
            유지보수가 불편해졌다
          </h3>
          <p>시작 5일째에 이미 이 이슈가 올라온다.</p>
          <Issue id="ISS-011" date="2026-03-05" severity="Major">
            모노리스 파일 유지보수 불가 (main.py 3,668줄, app.js 5,365줄)
          </Issue>
          <p>한 번 쪼갰지만 일주일 뒤 같은 문제가 다시 온다.</p>
          <Issue id="BE 3.1" date="2026-03-12" severity="Major">
            shared.py 868줄 모놀리식 - 유지보수 어려움
          </Issue>
          <p>
            기능이 늘어나는 속도가 구조를 정리하는 속도보다 빨랐다. 파일을 쪼개는 것으로는
            따라잡히지 않았다. 결국 프론트엔드를 통째로 바꿨다.{" "}
            <strong className="font-semibold text-foreground">바닐라 JS 에서 Next.js 로.</strong>
          </p>
          <Alert variant="info" className="!mt-8">
            <AlertTitle>이건 버그를 고친 것이 아니다</AlertTitle>
            <AlertDescription>
              유지보수 비용에 대한 판단이었다. AI 는 이 판단을 하지 않는다.
              시키면 계속 기능을 얹는다.
            </AlertDescription>
          </Alert>

          <h3 className="!mt-14 font-display text-[21px] font-bold tracking-tight text-foreground">
            이슈가 늘어났다
          </h3>
          <p>
            이슈 로그에 남은 것이{" "}
            <strong className="font-semibold text-foreground">1,132건</strong>이다.
            한국 947건, 미국 185건. GitHub 이슈 번호는 #868 까지 올라갔다.
            <span className="text-muted-foreground/70"> (2026-07-23 기준, 매일 늘어난다)</span>
          </p>

          <MonthlyIssues />

          <p>
            한 번에 쌓인 게 아니다. 3월에 241건이 몰린 것은 초기 구축기라 그렇다. 화면을
            빠르게 찍어내던 시기다. 4-5월에는 64건까지 내려가 안정됐다. 그런데 6월 171건,
            7월 257건으로 다시 뛴다. 프론트엔드를 Next.js(web_v2)로 새로 짜고, 스윙과
            상승장 주도주 같은 퀀트 전략을 여럿 신설한 시기다. 기능을 늘리면 이슈도 다시
            늘었다. 통제가 없으면 이 곡선은 관리되지 않는다.
          </p>
        </Section>

        <Section no="04" kicker="통제" title="그래서 통제가 필요해졌다">
          <p>
            이슈가 늘어난 것 자체는 문제가 아니다. 문제는 같은 종류가 반복된다는 것과,
            무엇이 처리됐는지 알 수 없게 된다는 것이다.
          </p>
          <p>그래서 순서대로 만들었다.</p>

          <ol className="!mt-8">
            {BUILT.map(([n, d], i) => (
              <li key={n} className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`${mono} z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary`}
                  >
                    {i + 1}
                  </div>
                  {i < BUILT.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-1 pt-1">
                  <div className="font-display text-lg font-bold text-foreground">{n}</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <Pull>이 다섯은 전부 사람이 설계한 것이다. AI 는 이 안에서 구현했다.</Pull>
        </Section>

        <Section no="05" kicker="한계" title="그런데 체계만으로는 부족했다">
          <p>
            양식과 룰과 하네스로 형식은 잡혔다. 이슈는 빠짐없이 기록됐고 심각도가 붙었다.
            그런데 형식이 맞아도 값이 틀리는 버그가 남았다. 그리고 그 값 오류는 한곳에 몰려
            있었다.
          </p>
          <p>
            유형이 명확한 버그 402건을 대표 주제 하나로 배타 분류했더니{" "}
            <strong className="font-semibold text-foreground">
              70%(281건)가 주식 도메인 고유 개념과 얽혀 있었다.
            </strong>
          </p>

          <div className="!mt-8 space-y-8 rounded-lg border border-border bg-surface p-6">
            <div>
              <p className={`${label} mb-4`}>
                주식 도메인 고유 개념 · 281건
              </p>
              <Bars rows={DOMAIN} tone="brand" />
            </div>
            <div>
              <p className="mb-4 font-sans text-[13px] font-semibold tracking-[0.01em] text-muted-foreground">
                일반 웹 개발 · 121건
              </p>
              <Bars rows={GENERIC} tone="muted" />
            </div>
            <p className="border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
              두 축은 겹친다. 버그의 51%(205건)가 도메인과 일반 개념을 동시에 건드려, 도메인 쪽으로
              먼저 배정했다. 그래서 "일반 121건" 은 깨끗한 절반이 아니라 도메인에 걸러지고 남은 잔차다.
            </p>
          </div>

          <p className="!mt-8">숫자보다 내용이 분명하다.</p>
          <ul className="!mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {REAL_BUGS.map((b) => (
              <li key={b} className="px-5 py-3.5 text-[15px] leading-relaxed text-foreground">
                {b}
              </li>
            ))}
          </ul>

          <p className="!mt-8">
            이건 일반 개발자가 예상할 수 없는 종류다. 시가총액 가중으로 평균을 내야 한다는 것,
            장중 종가는 확정값이 아니라는 것, 월간 리밸런싱에서 매수일은 오늘이 아니라는 것.
          </p>
          <Pull>도메인을 아는 사람만 이것이 틀렸다는 것을 안다.</Pull>
          <Alert variant="warning">
            <AlertTitle>양식과 룰이 만들지 못하는 것</AlertTitle>
            <AlertDescription>
              양식과 룰과 하네스는 "형식을 지키게" 만든다. "값이 맞는지" 는 만들지 못한다.
              그건 아는 사람이 봐야 한다.
            </AlertDescription>
          </Alert>

          <p className="!mt-7">
            <strong className="font-semibold text-foreground">이 분류 자체도 정답이 아니라 근사치다.</strong>{" "}
            버그 402건은 유형 칸이 명확한 것만 센 것이고, 초기 양식이 단순해 유형을 판별할 수
            없는 365건은 제외했다. 그 365건은 서술만 보면 오히려 일반 쪽이 많아, 포함했다면
            도메인 비율은 70%가 아니라 57%로 내려간다. "도메인을 하나라도 건드린 버그가 281건"
            이라는 것까지만 우선순위와 무관하게 고정된다. 개별 카테고리 숫자를 그대로 인용하지
            말아야 하는 이유다.
          </p>
        </Section>

        <Section no="06" kicker="결론" title="결론">
          <p>
            AI 는 빠르다. 2주에 백엔드가 1.2 에서 3.10 까지 갈 만큼 빠르다. 화면을 구상하면
            그 주 안에 동작하는 제품이 됐다.
          </p>
          <p>
            하지만 그 속도는 그대로 문제가 됐다. 빠르니 기능을 계속 얹었고, 규모가 커졌다.
            규모가 커지자 언제 구조를 갈아엎을지 판단해야 했고(바닐라 JS 에서 Next.js 로),
            반복되는 이슈를 막을 통제 체계가 필요해졌다. 그리고 값이 틀린 도메인 오류는 아는
            사람이 봐야만 잡혔다. 속도는 이 네 가지를 대신 해결해 주지 않았다.
          </p>

          <Pull>이 네 가지 중 어느 것도 AI 가 대신하지 않았다.</Pull>

          <div className="!mt-8 grid gap-4 sm:grid-cols-2">
            {NOT_REPLACED.map(([k, v]) => (
              <Card key={k} className="border-border/80">
                <CardContent className="p-6">
                  <div className="font-display text-lg font-bold text-foreground">{k}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="!mt-10 text-[19px] leading-[1.85] text-foreground">
            생산성이 뛰어난 도구를 제품으로 바꾸는 데 필요한 것은{" "}
            <strong className="font-bold">종합적인 기술</strong>이다.
          </p>
        </Section>

        <Section no="07" kicker="결과" title="그래서 품질은 좋아졌다">
          <p>
            이슈가 1,132건까지 늘었다고 품질이 나빠진 것은 아니다. 기록하고 분류한 목적은
            같은 문제의 반복을 끊는 것이었고, 실제로 끊겼다.
          </p>
          <p>
            가장 분명한 사례는 뒤로가기다. 첫 버전(바닐라 JS)에서는 브라우저 뒤로가기를 누르면
            대시보드로 돌아가지 않고 사이트를 완전히 벗어났다. SPA 히스토리 스택을 화면마다
            손으로 쌓아야 했기 때문이다.
          </p>
          <Issue id="FE 2.0" date="2026-03-05" severity="Major">
            브라우저 뒤로가기 시 대시보드로 돌아가지 않고 사이트를 완전히 벗어남 (SPA 히스토리
            스택 미관리)
          </Issue>

          <RecurrenceTimeline />

          <p>
            한 번 고치고 끝이 아니었다. 퀀트 화면, 이벤트 페이지, 모바일 네비게이션까지 화면이
            늘 때마다 같은 부류가 다시 올라왔다. 뒤로가기가 하단 섹션을 안 그리고, 서브탭을
            초기화하고, 히스토리 루프에 갇혔다. 개별 수정으로는 끝나지 않는 종류였다.
          </p>
          <p>
            4월 2일, 프론트엔드를 Next.js(web_v2)로 전면 재설계했다. 15개 뷰를 100% 다시
            짰다. 라우팅과 히스토리를 프레임워크가 관리하게 되자, 손으로 스택을 쌓던 그 재발이
            구조적으로 사라졌다. 같은 버그를 반복해 막다가, 구조를 바꿔 근본에서 끝낸 것이다.
          </p>

          <Pull>같은 버그가 다섯 번 재발하면, 고칠 것은 버그가 아니라 구조다.</Pull>

          <p>
            한 가지는 짚어 둔다. 이슈 로그의 양식은 시간이 지나며 컬럼이 늘었다. 초기에는 영역과
            심각도만 적다가 나중에 12개 컬럼(사전 조건 · 재현 방법 · 영향 범위 등)으로 고정됐다.
            그렇다고 이슈 관리가 중간에 시작된 것은 아니다. 번호는{" "}
            <strong className="font-semibold text-foreground">ISS-001 부터 지금까지 끊긴 적이 없다.</strong>{" "}
            양식이 정교해진 것이지, 관리가 없다가 생긴 것이 아니다.
          </p>
        </Section>

        <footer className="mt-24 border-t border-border pt-8 text-sm text-muted-foreground">
          <p className={`${mono} text-foreground`}>
            서영민 · QA Automation Engineer / SDET
          </p>
        </footer>
      </main>
    </div>
  );
}
