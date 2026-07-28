export type Principle = 'risk' | 'shift-left' | 'roi';

export interface CaseAsset {
  asset: string;
  title: string;
}

export interface SectionMeta {
  id: string;
  number: number;
  title: string;
  oneLiner: string;
  caseAssets?: CaseAsset[];
}

export const SECTIONS: SectionMeta[] = [
  { id: 'philosophy', number: 1, title: 'QA 철학 & 미션', oneLiner: '우리는 왜 테스트하는가' },
  {
    id: 'quality-definition',
    number: 2,
    title: '품질의 정의 & 기준',
    oneLiner: 'DoR (착수 기준) / DoD (완료 기준) / Severity',
  },
  {
    id: 'test-strategy',
    number: 3,
    title: '테스트 전략',
    oneLiner: 'Pyramid 와 레벨 × 타입 매트릭스',
    caseAssets: [{ asset: 'YM_TestCase', title: 'YM TestCase' }],
  },
  {
    id: 'automation',
    number: 4,
    title: '자동화 전략',
    oneLiner: '무엇을 왜 어떻게 자동화할 것인가',
    caseAssets: [
      { asset: 'multiplatform_automation', title: 'Multiplatform Automation' },
      { asset: 'Web_Selector_Extractor', title: 'Web Selector Extractor' },
    ],
  },
  {
    id: 'risk-based',
    number: 5,
    title: '리스크 기반 테스팅',
    oneLiner: '영향도 × 발생도 5x5',
    caseAssets: [{ asset: 'stockradar', title: 'StockRadar' }],
  },
  {
    id: 'shift-left',
    number: 6,
    title: 'Shift-Left & CI/CD',
    oneLiner: '단계별 게이트 통합',
    caseAssets: [{ asset: 'AI_Squad', title: 'AI Squad' }],
  },
  {
    id: 'defect-management',
    number: 7,
    title: '결함관리 & 지속개선',
    oneLiner: '라이프사이클 + 5 Whys / RCA (근본 원인 분석)',
  },
];

export const PRINCIPLE_LABELS: Record<Principle, { label: string; axis: string }> = {
  risk: { label: 'Risk-Based', axis: 'Where' },
  'shift-left': { label: 'Shift-Left', axis: 'When' },
  roi: { label: 'Automation ROI', axis: 'How' },
};
