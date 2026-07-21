import { test, expect } from '@playwright/test';

interface Shot {
  name: string;
  selector: string;
  goto: string;
}

const SHOTS: Shot[] = [
  { name: 'hero', selector: 'header, main', goto: '/' },
  { name: 'philosophy-section', selector: '#philosophy', goto: '/#philosophy' },
  { name: 'test-pyramid', selector: '#test-strategy figure', goto: '/#test-strategy' },
  { name: 'risk-heatmap', selector: '#risk-based figure', goto: '/#risk-based' },
  { name: 'shift-left-stepper', selector: '#shift-left ol', goto: '/#shift-left' },
  { name: 'defect-lifecycle', selector: '#defect-management ol', goto: '/#defect-management' },
];

for (const s of SHOTS) {
  test(`visual: ${s.name}`, async ({ page }) => {
    await page.goto(s.goto);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);
    const el = page.locator(s.selector).first();
    await expect(el).toHaveScreenshot(`${s.name}.png`, { maxDiffPixelRatio: 0.005 });
  });
}
