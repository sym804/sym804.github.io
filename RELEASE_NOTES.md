# Portfolio_QA_sym Release Notes

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
