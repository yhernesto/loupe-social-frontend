
import { IFeedsNews } from '@/services/interfaces/IFeeds'
import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'

export interface IFeedsNewsRow extends IFeedsNews{
	index: number;
	col: number;
}

export interface ICardFeedsArea extends ICardSectionWrapper{
	rows: Array<IFeedsNewsRow>;
}