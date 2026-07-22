import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mono = "font-mono tabular-nums";

function Section({ no, title, children }: {
  no: string; title: string; children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <Separator className="mb-10" />
      <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        <span className={`${mono} mr-3 text-lg font-medium text-primary`}>{no}</span>
        {title}
      </h2>
      <div className="mt-5 max-w-[68ch] space-y-4 leading-[1.85]">{children}</div>
    </section>
  );
}

/** 이슈 로그 원문 인용. 주장과 기록을 눈으로 구분할 수 있어야 한다. */
function Issue({ id, date, severity, children }: {
  id: string; date: string; severity?: string; children: React.ReactNode;
}) {
  return (
    <div className="my-5 rounded-md border border-border bg-surface px-5 py-4">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <code className={`${mono} rounded bg-muted px-2 py-0.5`}>{id}</code>
        <span className={`${mono} text-muted-foreground`}>{date}</span>
        {severity && <Badge variant="danger">{severity}</Badge>}
      </div>
      <p className="text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="font-display text-3xl font-bold tracking-tight tabular-nums">{value}</div>
        <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

const DOMAIN = [
  ["ETF / 배당", 127],
  ["백테스트 / 퀀트", 113],
  ["거래일 · 휴장", 80],
  ["재무 · 공시", 72],
  ["시점 정합성 (PIT)", 51],
] as const;

const REAL_BUGS = [
  "백테스트 엔진 CAGR 3배 과대계상 (분기 전략)",
  "윤년 미처리 - 월간 예측에서 2월이 항상 28일로 하드코딩",
  "시장 통계(PER/PBR/배당수익률) 단순 평균으로 부정확",
  "스크리너 장중 미확정 종가로 조회되는 문제",
  "old_lvq 등이 매일 당일을 buy_date 로 사용 (월간 리밸런싱인데)",
  "52주 신고가/신저가 데이터 키움증권 대비 불일치",
];

const BUILT = [
  {
    n: "양식",
    d: "테스트케이스 양식과 이슈 등록 양식을 먼저 정했다. 12개 컬럼, 버그 5단계(Block/Critical/Major/Minor/Trivial)와 개선 3단계.",
  },
  {
    n: "룰",
    d: "양식을 지키게 하는 규칙. 보안 이슈는 Minor 이상, 데이터 이슈는 Major 이상 같은 하한선을 포함한다.",
  },
  { n: "스킬", d: "룰을 AI 가 매번 읽고 따르도록 스킬로 만들었다." },
  {
    n: "하네스",
    d: "스킬만으로 지켜지지 않는 것을 훅으로 강제했다. global_guard.py 는 699줄이고 테스트가 47건 붙어 있다.",
  },
  {
    n: "교차검증",
    d: "검증자를 둘 붙였다. 외부 모델과 자체 리뷰 에이전트를 동시에, 독립적으로. 하나만 쓰면 그 하나의 사각지대가 그대로 남는다.",
  },
];

export default function Narrative() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
      <p className={`${mono} text-sm text-primary`}>stockradar · 2026.03 ~ 2026.07</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.15] tracking-tight md:text-6xl">
        AI 로 제품을 만든다는 것
      </h1>

      <div className="mt-8 max-w-[68ch] space-y-4 text-lg leading-[1.8]">
        <p>
          AI 의 생산성은 매우 뛰어나다.{" "}
          <strong className="text-foreground">그러나 그것만으로 제품이 되지는 않는다.</strong>
        </p>
        <p className="text-muted-foreground">
          제품이 되려면 기획력을 기반으로 한 AI 하네스, 오케스트레이션, 정형화된 룰과 스킬,
          그리고 검증할 수 있는 능력이 함께 있어야 한다. 종합적인 기술이 필요하다.
        </p>
        <p className="text-muted-foreground">
          이 문서는 그 주장을 stockradar 를 만들면서 남은 기록으로 뒷받침한다.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="1,126" label="이슈 로그에 남은 건수 (한국 941 · 미국 185)" />
        <Stat value="4.5" label="개월. 2026년 3월 1일 시작" />
        <Stat value="2" label="개 시장. 한국에서 시작해 이틀 만에 미국까지" />
        <Stat value="1" label="회. 프론트엔드 아키텍처 전면 교체" />
      </div>

      <Section no="01" title="왜 시작했나">
        <p>
          증권사 QA 취업을 위한 포트폴리오, 그리고 개인적으로 쓸 퀀트 전략 도구.
          그 두 가지가 원래 목적이었다.
        </p>
        <p>처음에는 PyQt5 데스크톱 뷰어로 만들었다. 그런데 첫 이슈가 이것이었다.</p>
        <Issue id="ISS-001" date="2026-03-01" severity="Major">
          PyQt5 데스크톱 뷰어 한계 - 배포/공유 불가.
          원인: PyQt5 데스크톱 앱은 설치 필요, 모바일 접근 불가
        </Issue>
        <p>
          만든 것을 남에게 보여줄 수 없으면 포트폴리오가 아니다. 웹으로 돌렸다.
          시작 첫날의 판단이었다.
        </p>
      </Section>

      <Section no="02" title="생산성은 실제로 뛰어났다">
        <p>웹으로 옮긴 뒤 속도가 붙었다. 기록에 남은 버전만 봐도 이렇다.</p>
        <div className="my-6 flex flex-wrap items-center gap-3">
          <code className={`${mono} rounded-md border border-border bg-surface px-3 py-2 text-sm`}>
            2026-03-02 · BE 1.2
          </code>
          <span className="text-muted-foreground">에서</span>
          <code className={`${mono} rounded-md border border-border bg-surface px-3 py-2 text-sm`}>
            2026-03-17 · BE 3.10
          </code>
        </div>
        <p>
          <strong className="text-foreground">
            2주 만에 백엔드 메이저 버전이 1.2 에서 3.10 까지 갔다.
          </strong>
        </p>
        <p>
          속도가 붙으니 기능을 계속 추가하게 됐다. 한국 시장만 하려던 것이
          시작 이틀 만에 미국 시장으로 넓어졌다.
        </p>
        <Issue id="US #1" date="2026-03-03">
          Express + React + TS + Vite 프로젝트 초기 구축
        </Issue>
        <p>
          자신감이 생겨서 두 번째 시장을 연 것이다. 이것이 다음 문제의 출발점이 된다.
        </p>
      </Section>

      <Section no="03" title="규모가 커지자 두 가지가 따라왔다">
        <p>
          기능을 계속 추가한 결과는 규모였다. 그리고 규모는 두 가지를 데려왔다.
        </p>

        <h3 className="!mt-10 font-display text-xl font-bold tracking-tight">
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
          <strong className="text-foreground">바닐라 JS 에서 Next.js 로.</strong>
        </p>
        <Alert variant="info" className="!mt-6">
          <AlertTitle>이건 버그를 고친 것이 아니다</AlertTitle>
          <AlertDescription>
            유지보수 비용에 대한 판단이었다. AI 는 이 판단을 하지 않는다.
            시키면 계속 기능을 얹는다.
          </AlertDescription>
        </Alert>

        <h3 className="!mt-10 font-display text-xl font-bold tracking-tight">이슈가 늘어났다</h3>
        <p>
          이슈 로그에 남은 것이 <strong className="text-foreground">1,126건</strong>이다.
          한국 941건, 미국 185건. GitHub 이슈는 859번까지 올라갔다.
        </p>
      </Section>

      <Section no="04" title="그래서 통제가 필요해졌다">
        <p>
          이슈가 늘어난 것 자체는 문제가 아니다. 문제는 같은 종류가 반복된다는 것과,
          무엇이 처리됐는지 알 수 없게 된다는 것이다.
        </p>
        <p>그래서 순서대로 만들었다.</p>
        <ol className="!mt-6 space-y-4">
          {BUILT.map((b, i) => (
            <li key={b.n} className="flex gap-4">
              <span className={`${mono} shrink-0 pt-0.5 text-sm text-primary`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-semibold">{b.n}</div>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="!mt-8">
          <strong className="text-foreground">이 다섯은 전부 사람이 설계한 것이다.</strong>{" "}
          AI 는 이 안에서 구현했다.
        </p>
      </Section>

      <Section no="05" title="그런데 체계만으로는 부족했다">
        <p>
          버그 463건의 내용을 분류했더니{" "}
          <strong className="text-foreground">70%(325건)가 주식 도메인 고유 개념과 얽혀 있었다.</strong>
        </p>
        <div className="!mt-6 space-y-2">
          {DOMAIN.map(([label, n]) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-40 shrink-0 text-sm">{label}</div>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary"
                     style={{ width: `${(n / 127) * 100}%` }} />
              </div>
              <div className={`${mono} w-10 shrink-0 text-right text-sm`}>{n}</div>
            </div>
          ))}
        </div>
        <p className="!mt-8">숫자보다 내용이 분명하다.</p>
        <ul className="!mt-4 space-y-2.5 rounded-md border border-border bg-surface p-5 text-[15px]">
          {REAL_BUGS.map((b) => (
            <li key={b} className="leading-relaxed">{b}</li>
          ))}
        </ul>
        <p className="!mt-6">
          이건 일반 개발자가 예상할 수 없는 종류다. 시가총액 가중으로 평균을 내야 한다는 것,
          장중 종가는 확정값이 아니라는 것, 월간 리밸런싱에서 매수일은 오늘이 아니라는 것.{" "}
          <strong className="text-foreground">
            도메인을 아는 사람만 이것이 틀렸다는 것을 안다.
          </strong>
        </p>
        <Alert variant="warning" className="!mt-6">
          <AlertTitle>양식과 룰이 만들지 못하는 것</AlertTitle>
          <AlertDescription>
            양식과 룰과 하네스는 "형식을 지키게" 만든다. "값이 맞는지" 는 만들지 못한다.
            그건 아는 사람이 봐야 한다.
          </AlertDescription>
        </Alert>
      </Section>

      <Section no="06" title="결론">
        <p>AI 는 빠르다. 2주에 메이저 버전을 여덟 번 올릴 만큼 빠르다.</p>
        <p>
          그 속도는 기능을 계속 추가하게 만들고, 그러면 규모가 커진다. 규모가 커지면
          유지보수 비용을 판단해야 하고, 이슈가 늘어나면 통제 체계가 필요해진다.
          그리고 도메인이 걸린 오류는 아는 사람이 봐야만 잡힌다.
        </p>
        <p className="!mt-6">
          <strong className="text-foreground">
            이 네 가지 중 어느 것도 AI 가 대신하지 않았다.
          </strong>
        </p>
        <div className="!mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["기획", "무엇을 만들지, 어디까지 넓힐지"],
            ["아키텍처 판단", "언제 구조를 바꿀지"],
            ["정형화", "양식, 룰, 스킬, 하네스"],
            ["검증", "도메인을 아는 사람의 확인, 그리고 그것을 체계화한 교차검증"],
          ].map(([k, v]) => (
            <Card key={k}>
              <CardContent className="p-5">
                <div className="font-display text-lg font-bold">{k}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="!mt-8 text-lg">
          생산성이 뛰어난 도구를 제품으로 바꾸는 데 필요한 것은{" "}
          <strong className="text-foreground">종합적인 기술</strong>이다.
        </p>
      </Section>

      <Section no="07" title="이 기록이 말할 수 없는 것">
        <p>정직하게 남긴다.</p>
        <Alert variant="destructive" className="!mt-5">
          <AlertTitle>시간에 따른 품질 추이는 이 데이터로 그릴 수 없다</AlertTitle>
          <AlertDescription>
            이슈 로그의 양식이 기간마다 달라졌다. 발견일 · 심각도 · 유형 세 칸이 모두
            해석되는 행은 1,126건 중 725건(65%)이다. 3월은 원본 241건 중 해석되는 것이
            1건뿐이다. 이 상태로 "시간이 지나며 Critical 이 줄었다" 같은 그래프를 그리면
            품질 추이가 아니라 양식이 언제 바뀌었는지를 그린 그래프가 된다. 그래서 그리지 않았다.
          </AlertDescription>
        </Alert>
        <p className="!mt-6">
          <strong className="text-foreground">도메인 70% 는 "언급된" 비율이지 "원인인"
          비율이 아니다.</strong>{" "}
          키워드로 분류했으므로 ETF 화면의 널 체크 버그도 여기 걸린다. 위에 인용한 사례들은
          실제 도메인 로직 오류지만, 325건 전부가 그렇다고 주장할 근거는 없다.
        </p>
      </Section>

      <footer className="mt-20 border-t border-border pt-8 text-sm text-muted-foreground">
        <p>
          근거 자료: stockradar 이슈 로그(한국 941건 · 미국 185건), GitHub Issues,
          Claude Code 훅 · 스킬 · 규칙 문서.
        </p>
        <p className="mt-2">서영민 · QA Automation Engineer / SDET</p>
      </footer>
    </main>
  );
}
