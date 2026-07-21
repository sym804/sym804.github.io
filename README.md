# 서영민 · QA Automation Engineer / SDET 포트폴리오

14년차 QA 자동화 엔지니어(SDET)의 포트폴리오 허브입니다. 보안 → 임베디드 → 이커머스 도메인에서 멀티플랫폼 테스트 자동화 체계를 구축해 왔습니다.

**라이브: https://sym804.github.io**

## 구성

- `index.html` - 포트폴리오 메인 허브 (경력 요약 + 프로젝트 인덱스 + 핵심 역량)
- 케이스 스터디 (정적 HTML)
  - `AI_Squad.html` - Claude·Codex·Gemini 멀티에이전트 오케스트레이션 봇
  - `multiplatform_automation.html` - Web·Mobile·API 통합 Python POM 자동화 프레임워크
  - `YM_TestCase.html` - 자체 개발 TC 관리 도구(TCMS)
  - `Web_Selector_Extractor.html` - QA 자동화용 셀렉터 추출 크롬 확장
  - `stockradar.html` - 주식 데이터 분석 플랫폼
- `_qa-strategy/` - QA 전략 플레이북 SPA 소스 (Vite + React + TS)
- `qa_strategy/` - 위 SPA 빌드 산출물 (Pages 서빙)

## QA 전략 SPA 개발 / 테스트

```bash
cd _qa-strategy
pnpm install
pnpm dev            # 개발 서버
pnpm build          # 빌드 -> ../qa_strategy
pnpm typecheck      # 타입 체크
pnpm test:a11y      # 접근성 테스트 (Playwright + axe-core)
pnpm test:visual    # 시각 회귀 테스트 (Playwright)
```

> 시각 회귀 baseline 스냅샷은 현재 로컬(win32) 기준입니다. CI(ubuntu)에서 돌리려면 해당 플랫폼에서 `pnpm test:visual --update-snapshots` 로 baseline 을 재생성해야 합니다.

## 스택

- 허브 / 케이스: 정적 HTML + CSS (Pretendard, SUIT, JetBrains Mono)
- QA 전략 SPA: Vite 5, React 18, TypeScript 5
- 테스트: Playwright (axe-core 접근성, 시각 회귀)
- 배포: GitHub Pages (main 브랜치)

## Author

서영민 (sym804) · sym804@naver.com
