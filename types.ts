

export enum IPOStatus {
  UPCOMING = 'Upcoming',
  OPEN = 'Open',
  CLOSED = 'Closed',
  LISTED = 'Listed',
}

export enum Recommendation {
  STRONG_APPLY = 'Strong Apply',
  MODERATE_APPLY = 'Moderate Apply',
  CAUTIOUS = 'Cautious',
  AVOID = 'Avoid',
}

export enum RedFlagSeverity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum RedFlagCategory {
  FINANCIAL = 'Financial',
  GOVERNANCE = 'Governance',
  LEGAL = 'Legal',
  RISK = 'Risk Factors',
  BUSINESS = 'Business Model',
  MARKET = 'Market',
  PROCEEDS = 'Use of Proceeds',
}

export interface SubscriptionData {
  rii: number;
  nii: number;
  qib: number;
  employee: number;
  total: number;
  lastUpdated: string;
}

export interface GMPDataPoint {
  date: string;
  price: number;
  percentage: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  summary: string;
}

export interface IPO {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  status: IPOStatus;
  openDate: string;
  closeDate: string;
  listingDate: string;
  allotmentDate: string;
  priceBand: string;
  lotSize: number;
  issueSize: string;
  gmp: number;
  gmpPercentage: number;
  gmpHistory: GMPDataPoint[];
  subscription: SubscriptionData;
  recommendation?: Recommendation;
  logoUrl?: string;
  // New Fields for Intelligence
  marketSentiment: number; // 0 to 100 (Bearish to Bullish)
  news?: NewsItem[];
}

export interface RedFlag {
  id: string;
  category: RedFlagCategory;
  title: string;
  severity: RedFlagSeverity;
  description: string;
  evidence: string;
  mitigation?: string;
}

export interface FinancialScore {
  profitability: number;
  cashFlow: number;
  balanceSheet: number;
  growth: number;
  governance: number;
  valuation: number;
  total: number;
}

// New Interface for Use of Proceeds
export interface UseOfProceedsItem {
  category: string;
  amount: string; // Display string like "2,250 Cr"
  percentage: number; // 0-100
  isRisk: boolean; // Highlights bar in red if true
  description?: string;
}

// New Interface for Peer Comparison
export interface PeerComparisonMetric {
  metric: string;
  companyValue: string;
  peerAverage: string;
  status: 'Better' | 'Worse' | 'Neutral';
}

// New Interface for Anchor Investors
export interface AnchorInvestor {
  name: string;
  category: 'Mutual Fund' | 'FII' | 'Insurance' | 'Other';
  amount: string;
  lockInEnd: string;
  tier: 1 | 2 | 3; // 1 = Top Tier (Goldman, SBI), 3 = Unknown
}

// New Interface for Listed Performance
export interface ListedIPOPerformance {
  id: string;
  name: string;
  listingDate: string;
  issuePrice: number;
  listingPrice: number;
  cmp: number; // Current Market Price
  listingGainPercent: number;
  currentGainPercent: number;
  sector: string;
  verdictWas: Recommendation;
}

export interface AnalysisReport {
  ipoId: string;
  summary: string;
  strengths: string[];
  risks: string[];
  redFlags: RedFlag[];
  financialScore: FinancialScore;
  verdictScore: number;
  verdictText: string;
  fullReportMarkdown: string;
  // New Fields
  useOfProceeds?: UseOfProceedsItem[];
  peerComparison?: PeerComparisonMetric[];
  anchorInvestors?: AnchorInvestor[];
}

// Premium Tool Types
export interface ValuationPoint {
  x: number; // e.g. Revenue Growth %
  y: number; // e.g. P/E Ratio
  z: number; // e.g. Market Cap (bubble size)
  name: string;
  type: 'IPO' | 'Peer';
}

// ADMIN TYPES
export interface ExtractionPrompt {
  sourceText: string;
  type: 'BASIC_INFO' | 'FINANCIAL_SCORE' | 'RED_FLAGS' | 'FULL_REPORT';
}
