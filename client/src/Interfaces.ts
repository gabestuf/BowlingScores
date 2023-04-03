export interface filterOptions {
  session: String;
  startDate: Date | null;
  endDate: Date | null;
  score: number | null;
}

export interface GameStats {
  totalAvg: number;
  currentPeriodAvg: number;
  previousPeriodAvg: number;
  totalFirstShotPinAvg: number;
  currentFirstShotPinAvg: number;
  previousFirstShotPinAvg: number;
  totalStrikesPerGameAvg: number;
  currentStrikesPerGameAvg: number;
  previousStrikesPerGameAvg: number;
  totalOpenFrameCountAvg: number;
  currentOpenFrameCountAvg: number;
  previousOpenFrameCountAvg: number;
  totalNumGames: number;
  totalSpareConversionPercentage: number;
}
