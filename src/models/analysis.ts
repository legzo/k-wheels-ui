export interface Analysis {
  readonly id: string;
  readonly name: string;
  readonly efforts: Effort[];
}

export interface Effort {
  readonly id: string;
  readonly name: string;
  readonly percentile: number;
  readonly positionAsString: string;
}

export interface DetailedAnalysis {
  readonly id: string;
  readonly name: string;
  readonly date: Date;
  readonly segments: Segment[];
}

export interface Segment {
  readonly id: string;
  readonly name: string;
  readonly percentile: number;
  readonly time: number;
  readonly pastTimes: number[];
}