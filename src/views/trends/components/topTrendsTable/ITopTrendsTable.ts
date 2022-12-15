import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'
// TODO: Should this interface (ITimeSeries) be imported from IDashboard?
export interface ITrendsRow {
	topic: string;
	posts: number;
	lastPosts: number;
	lastPeriod: number;
}

export interface ICardTrends extends ICardSectionWrapper{
	title: string;
	rows: Array<ITrendsRow>
}