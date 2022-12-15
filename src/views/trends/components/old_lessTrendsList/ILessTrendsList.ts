export interface ILessTrendsRow {
    hashtag: string;
    occurrences: number;
}
export interface ICardLessTrends {
    title: string;
    rows: Array<ILessTrendsRow>
}