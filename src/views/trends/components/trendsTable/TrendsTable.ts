// TODO: Should this interface (ITimeSeries) be imported from IDashboard?
export interface ITrendsRow {
	topic: string;
	posts: number;
	lastPeriod: number;
	views: number;
	reaction: number;
	comments: number;
}

export interface ICardTrends{
	rows: Array<ITrendsRow>
}