import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('Home WCAG 2.1 AA violations = 0', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await injectAxe(page);
  await checkA11y(page, undefined, {
    detailedReport: true,
    detailedReportOptions: { html: false },
    axeOptions: {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    },
  });
});

test('Mobile TOC open WCAG 2.1 AA violations = 0', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: '목차 열기' }).click();
  await page.waitForTimeout(300);
  await injectAxe(page);
  await checkA11y(page, undefined, {
    detailedReport: true,
    detailedReportOptions: { html: false },
    axeOptions: {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    },
  });
});

test('Accordion open WCAG 2.1 AA violations = 0', async ({ page }) => {
  await page.goto('/#quality-definition');
  await page.waitForLoadState('networkidle');
  await page
    .getByRole('button', { name: /Definition of Ready/i })
    .first()
    .click();
  await page.waitForTimeout(300);
  await injectAxe(page);
  await checkA11y(page, undefined, {
    detailedReport: true,
    detailedReportOptions: { html: false },
    axeOptions: {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    },
  });
});
