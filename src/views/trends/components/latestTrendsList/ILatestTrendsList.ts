import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'
export interface ITableRow {
	hashtag: string;
	occurrences: number;
	takenAt: Date
}

export interface ICardLatestTrends extends ICardSectionWrapper{
	title: string;
	rows: Array<ITableRow>;
}
