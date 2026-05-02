export type Principle = 'risk' | 'shift-left' | 'roi';

export interface SectionMeta {
  id: string;
  number: number;
  title: string;
  oneLiner: string;
  caseAsset?: string;
  caseAssetTitle?: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'philosophy', number: 1, title: 'QA 철학 & 미션', oneLiner: '우리는 왜 테스트하는가' },
  { id: 'quality-definition', number: 2, title: '품질의 정의 & 기준', oneLiner: 'DoR / DoD / Severity' },
  {
    id: 'test-strategy',
    number: 3,
    title: '테스트 전략',
    oneLiner: 'Pyramid 와 레벨 × 타입 매트릭스',
    caseAsset: 'YM_TestCase',
    caseAssetTitle: 'YM TestCase',
  },
  {
    id: 'automation',
    number: 4,
    title: '자동화 전략',
    oneLiner: '무엇을 왜 어떻게 자동화할 것인가',
    caseAsset: 'multiplatform_automation',
    caseAssetTitle: 'Multiplatform Automation + Web Selector Extractor',
  },
  { id: 'risk-based', number: 5, title: '리스크 기반 테스팅', oneLiner: '영향도 × 발생도 5x5' },
  {
    id: 'shift-left',
    number: 6,
    title: 'Shift-Left & CI/CD',
    oneLiner: '단계별 게이트 통합',
    caseAsset: 'AI_Squad',
    caseAssetTitle: 'AI Squad',
  },
  {
    id: 'metrics',
    number: 7,
    title: '메트릭 & KPI',
    oneLiner: 'DPI / 누수율 / 자동화 커버리지 / MTTR',
    caseAsset: 'stockradar',
    caseAssetTitle: 'StockRadar',
  },
  { id: 'defect-management', number: 8, title: '결함관리 & 지속개선', oneLiner: '라이프사이클 + 5 Whys / RCA' },
];

export const PRINCIPLE_LABELS: Record<Principle, { label: string; axis: string }> = {
  risk: { label: 'Risk-Based', axis: 'Where' },
  'shift-left': { label: 'Shift-Left', axis: 'When' },
  roi: { label: 'Automation ROI', axis: 'How' },
};
