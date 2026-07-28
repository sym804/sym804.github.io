import { test, expect, type Page } from '@playwright/test';

/**
 * 시각 회귀.
 *
 * 요소 단위 스냅샷은 "격리 캡처" 로 찍는다. 긴 페이지에서 요소의 문서상 y 좌표는
 * 위쪽 콘텐츠 전부에 의존하고, 그 소수부가 달라지면 박스 높이가 1px 흔들려 전체가 diff 로 잡힌다.
 * 섹션 하나만 늘려도 무관한 스냅샷이 깨진다.
 *
 * 콘텐츠를 고칠 때마다 상관없는 테스트가 깨지면 그 스위트는 신뢰를 잃는다.
 * 그래서 대상 요소를 빈 문서로 복제해 최상단에 놓고 찍는다. 위쪽 콘텐츠와의 결합이 사라진다.
 *
 * 페이지 최상단 요소(hero)는 애초에 결합이 없으므로 그대로 찍는다.
 */

const WIDTH = 820; // main 의 max-w 와 동일

interface Shot {
  name: string;
  selector: string;
  /** true = 페이지 상단 고정 요소라 격리 불필요 */
  atTop?: boolean;
}

const SHOTS: Shot[] = [
  { name: 'hero', selector: 'header, main', atTop: true },
  { name: 'philosophy-section', selector: '#philosophy' },
  { name: 'test-pyramid', selector: '#test-strategy figure' },
  { name: 'risk-heatmap', selector: '#risk-based figure' },
  { name: 'shift-left-stepper', selector: '#shift-left ol' },
  { name: 'defect-lifecycle', selector: '#defect-management ol' },
];

/** 대상 요소를 빈 문서 최상단으로 복제해 위치 의존성을 제거한다. */
async function isolate(page: Page, selector: string) {
  await page.evaluate(
    ({ sel, width }) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error(`selector not found: ${sel}`);
      const wrap = document.createElement('div');
      wrap.id = '__shot';
      wrap.style.width = `${width}px`;
      wrap.appendChild(el.cloneNode(true));
      document.body.replaceChildren(wrap);
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      window.scrollTo(0, 0);
    },
    { sel: selector, width: WIDTH },
  );
  await page.waitForTimeout(200);
}

for (const s of SHOTS) {
  test(`visual: ${s.name}`, async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);

    if (!s.atTop) {
      await isolate(page, s.selector);
    }
    const target = s.atTop ? page.locator(s.selector).first() : page.locator('#__shot');

    await expect(target).toHaveScreenshot(`${s.name}.png`, { maxDiffPixelRatio: 0.005 });
  });
}
