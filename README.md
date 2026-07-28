# 서영민 · QA Automation Engineer / SDET 포트폴리오

15년차 QA 자동화 엔지니어(SDET)의 포트폴리오 허브입니다. 보안 → 임베디드 → 이커머스 도메인에서 멀티플랫폼 테스트 자동화 체계를 구축해 왔습니다.

**라이브: https://sym804.github.io**

## 구성

- `index.html` - 포트폴리오 메인 허브 (경력 요약 + 프로젝트 인덱스 + 핵심 역량)
- 케이스 스터디 (정적 HTML)
  - `AI_Squad.html` - Claude·Codex·Gemini 멀티에이전트 오케스트레이션 봇
  - `multiplatform_automation.html` - Web·Mobile·API 통합 Python POM 자동화 프레임워크
  - `YM_TestCase.html` - 자체 개발 TC 관리 도구(TCMS)
  - `Web_Selector_Extractor.html` - QA 자동화용 셀렉터 추출 크롬 확장
  - `stockradar.html` - 주식 데이터 분석 플랫폼
- `_qa-strategy/` - QA Engineering Strategy SPA 소스 (Vite + React + TS)
- `qa_strategy/` - 위 SPA 빌드 산출물 (Pages 서빙)

## QA Engineering Strategy 개발 / 테스트

```bash
cd _qa-strategy
pnpm install

pnpm dev                # 개발 서버
pnpm build              # 빌드 -> ../qa_strategy

pnpm typecheck
pnpm lint
pnpm test               # 전체
pnpm test:a11y          # 접근성 (Playwright + axe-core)
pnpm test:visual        # 시각 회귀
```

> 요소 단위 시각 회귀 스냅샷은 "격리 캡처" 로 찍습니다. 긴 페이지에서 요소의 y 좌표가
> 위쪽 콘텐츠에 의존해, 섹션 하나만 늘려도 무관한 스냅샷이 깨지기 때문입니다.

> 시각 회귀 baseline 스냅샷은 현재 로컬(win32) 기준입니다. CI(ubuntu)를 도입하면 해당 플랫폼에서 `pnpm test:visual:update` 로 baseline 을 재생성해야 합니다.

## 스택

- 허브 / 케이스: 정적 HTML + CSS (Pretendard, SUIT, JetBrains Mono)
- QA 전략 SPA: Vite 5, React 18, TypeScript 5
- 테스트: Playwright (axe-core 접근성, 시각 회귀)
- 배포: GitHub Pages (main 브랜치)

## Author

서영민 (sym804) · sym804@naver.com
