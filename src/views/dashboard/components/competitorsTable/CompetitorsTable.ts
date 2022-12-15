import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper';

// TODO: Should this interface (ITimeSeries) be imported from IDashboard?
interface ITimeSeries {
    time: number;
    value: number;
}
export interface ICompetitorsRow {
    competitor: string;
    current_score: number;
    current_score_pct: number;
    prev_score: number;
    prev_score_pct: number;
    current_posts: number;
    prev_posts: number;
    diff_period: number;
    virtual?: string;
    time_series?: Array<number>;//Array<ITimeSeries>;
}

export interface ICardCompetitors extends ICardSectionWrapper{
    rows: Array<ICompetitorsRow>
}
// {
//     "hashtag": "nike_peru",
//     "score": 4.3,    //decimal
//     "posts": 231,
//     "last_period_posts": 210
// },