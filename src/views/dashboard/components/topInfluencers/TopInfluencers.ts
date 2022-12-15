export interface ITopInfluencersRow {
    id: number;
    name: string;
    email: string;
    avatar: string;
}
export interface ICardTopInfluencers {
    title: string;
    rows: Array<ITopInfluencersRow>
}

// export interface ICardsTopInfluencers {
//     cards: Array<ICardTopInfluencers>
// }