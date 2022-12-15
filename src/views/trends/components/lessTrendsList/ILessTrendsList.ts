import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'
export interface ITableRow {
	hashtag: string;
	occurrences: number
}

export interface ICardLessTrends extends ICardSectionWrapper{
	title: string;
	rows: Array<ITableRow>;
}
