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
