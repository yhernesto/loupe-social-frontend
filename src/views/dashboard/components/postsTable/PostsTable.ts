import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'

// TODO: Should this interface (ITimeSeries) be imported from IDashboard?
export interface IPostsRow {
  shortcode: string,
  is_top: boolean,
  text: string,
  score: number,
  score_pct?: number,
  magnitude: number,
  magnitude_pct?: number,
  likes: number,
  comments: number,
  createdAt: Date
}

export interface ICardPosts extends ICardSectionWrapper{
    rows: Array<IPostsRow>
}