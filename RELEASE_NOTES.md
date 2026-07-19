# Portfolio_QA_sym Release Notes

## 2026-07-19 - 전 자산 정량 수치 실측 통일

index.html / 케이스 HTML / PDF / PPTX 가 서로 다른 값을 주장하던 상태를 원본 레포 실측 기준으로 통일했다. 대상은 HTML 7개, PPTX 4개, PDF 5개.

### 배경

같은 지표가 자산마다 최대 3가지 값으로 갈려 있었다. 예를 들어 YM TestCase 자동화 테스트 수는 index 카드 454, 케이스 페이지 257, PDF/PPTX 567 이었다. 채용 담당자가 허브에서 상세로 넘어가는 순서로 보면 첫 화면부터 어긋나는 구조였다.

원인은 두 가지였다. (1) 2026-07-10 실측 감사 결과가 `index.html` 카드에만 반영되고 케이스 페이지와 배포 자산에는 전파되지 않았다. (2) PPTX 계열은 2026-06-08 이후 갱신이 멈춰 그 사이 3개월치 성장분이 빠졌다.

### 실측 결과 - 대부분 과소 표기였다

주장보다 실측이 작은 항목은 stockradar 에서 하나도 없었다. 정정 방향은 대체로 상향이다.

- **stockradar**: 데이터 소스 6 -> **14**, API 210 -> **215**, 라우터 43 -> **51**, 종목 15,229 -> **17,259**, 데이터 행 3,970만 -> **4,941만**, DB 5.7GB -> **6.7GB**, 보조지표 12 -> **17**, 일일 배치 7단계·20단계 -> **KRX 44 + US 22**, 퀀트 3 -> **10**(월간 3 + 일일 4 + 특화 3)
- **YM TestCase**: 자동화 테스트 454/257/567 -> **620** (vitest 358 + E2E 93 + pytest 169). 454 는 백엔드 169개를 통째로 누락한 값이었고, 257 은 "테스트 파일 수 + 스펙 파일 수 + 부분 실행 기록"을 더한 계산 착오였다. 라우터 15 -> **16**, 번역 키 650+ -> **1,446/언어**
- **AI Squad**: LoC 2,377 -> **6,337**, 운영 모드 3 -> **4**(리서치 모드 슬라이드/섹션 신규 작성), 커밋 40+ -> **141**
- **멀티플랫폼**: 시나리오 36/40 -> **39**(Web 12 + Android 14 + iOS 13), 테스트 스텝 260+ -> **256**, element.py 요소 100+ -> **266**, AppBase 600+줄 -> **658줄**

### 근거 없는 주장 제거

- **"100% 해결" 폐기**. GitHub Issues 954건 중 952건 종료(2건 open), 이슈 로그에는 진행중 7건이 남아 있어 어느 기준으로도 성립하지 않았다. "1,023건 추적 (GitHub 954건 중 952건 종료)" 로 교체
- **시나리오 36 / 핵심 기능 27 / 번역 키 650+** 는 어떤 계산 기준으로도 재현되지 않아 실측값으로 하향(39 / 15 / 1,446)
- **CSV 로케이터 200+행** 은 실제 186행이라 하향
- **"Jenkins CI/CD"** 가 3플랫폼 전반처럼 읽히던 것을 Android/iOS 한정 + Web 은 GitHub Actions 로 명시
- **iOS 녹화 "10분"** 은 코드 주석 오류(`timeLimit=1800` 은 30분)를 그대로 옮긴 값이라 30분으로 정정
- **"scroll_to_element 20회 재시도"** 는 실제로 무한 루프라 "발견 시까지 재시도" 로 정정

### 자산 간 오염 정정

- Competencies 역량 카드의 "Playwright 257개 자동화 테스트" 는 YM TestCase 값이 멀티플랫폼 항목에 잘못 복사된 오기였다. 실측값으로 교체
- `stockradar_v7.pptx` 는 전 세대 자료였다(API 55, 미국 3,500종목, 1,840만 행, "미국 시장 구현 시작"). 32슬라이드 전반의 수치를 현행화하고, 자체 모순이던 **"100% 해결률 (87/141건 완료)"**(실제 62%)을 정정
- stockradar 의 "42개 화면" 은 합계는 맞으나 내역이 "KRX 사이드바 18(4월) + US 라우트 24(7월)" 로 기준이 섞여 있었다. 현재 사이드바 기준 KRX 21 + US 21 로 교정

### 산출물 재생성

- PPTX 4종 수정 후 `_qa/render.py`(PowerPoint COM)로 PDF 3종 재생성
- `stockradar.pdf` 는 HTML 인쇄본이라 Playwright 로 재생성. 이때 `.hero-title` 이 `opacity:0` + `animation forwards` 구조라 애니메이션을 죽이면 히어로가 통째로 사라진다. 애니메이션은 유지하고 스크롤 기반 `.reveal` 만 강제 노출시켜야 한다
- 검증: 폐기 수치 전수 스캔 결과 HTML/PPTX/PDF 잔존 0건 (YM TestCase v1.0.0.0 타임라인의 "567 ALL PASS" 는 당시 이력이라 의도적 보존)

## 2026-05-02 - QA Engineering Strategy Playbook 추가

### 신규 산출물
- 풀스택 QA 품질 관리 전략 8섹션 멀티섹션 SPA
- 위치: `_qa-strategy/` (소스 React 앱), `qa_strategy/` (정적 빌드 산출물)
- 외부 면접용 + 사내 룰북 공통 자산

### 구성
- 3원칙 트라이앵글: Risk-Based (Where) + Shift-Left (When) + Automation ROI (How)
- 8섹션: 철학, 품질 정의 (DoR/DoD/Severity), 테스트 전략, 자동화, 리스크 기반, Shift-Left/CI/CD, 메트릭 (DPI/누수율/자동화 커버리지/MTTR), 결함 관리
- SVG 다이어그램 7개 (Triangle, Pyramid, RoiCurve, RiskHeatmap 5x5, ShiftLeftStepper, KpiCardGrid, DefectLifecycle)
- 4 케이스 섹션 (3, 4, 6, 7) Field Note 가 본 폴더 5 산출물 (StockRadar, AI Squad, Multiplatform Automation, Web Selector Extractor, YM TestCase) 과 양방향 링크

### 디자인 시스템
- sym-ui 디자인 시스템의 외부 프로젝트 사용 첫 사례
- 토큰 / Tailwind preset / 컴포넌트 11종 (Card, Badge, Accordion, Tabs, Tooltip, Progress, Breadcrumb, Sheet, Stepper, DataTable, Checkbox) 소스 복사 모델
- Pretendard Variable + IBM Plex Mono, 다크 단일 모드 (L>=15% 룰)

### 품질 게이트
- typecheck / lint / build 통과 (Vite 5 + React 18 + TypeScript 5)
- a11y 자동 검증 (axe-playwright) 3 시나리오 WCAG 2.1 AA 위반 0건
- visual regression baseline 7곳 등록 (Playwright)

### 허브 통합
- index.html 작품 그리드에 Project 06 카드 신규 추가 (`./qa_strategy/index.html` 상대 경로)
- Outro 산출물 그리드 5장 양방향 링크

### 글로벌 룰 준수
- 엠대시 / 엔대시 사용 0건 (검수 완료)
- 회사 비공개 정보 노출 0건 (Field Note 일반화 / 익명화)
- 한글 깨짐 방지 (UTF-8 통일)
- main 브랜치 손대지 않음 (`feat/qa-strategy` 브랜치)
