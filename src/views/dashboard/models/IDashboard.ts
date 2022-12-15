import { IResSummaryStats, IResRelationRatio, IResSentimentScore, IResRivalsStat, IResPopularPosts, IResTopInfluencersLite, IResTopInfluencers } from "@/services/interfaces/IDashboard"


export interface ISummaryStats extends IResSummaryStats {
    loading: boolean;
}

export interface IKeywordsRating extends IResRelationRatio {
    loading: boolean;
}

export interface ISentimentScore extends IResSentimentScore {
    loading: boolean;
}

export interface IRivalsStat {
    loading: boolean;
    data: Array<IResRivalsStat>
}

export interface IPopularPosts {
    loading: boolean;
    data: Array<IResPopularPosts>
}

export interface ITopInfluencersLite {
    loading: boolean;
    data: Array<IResTopInfluencersLite>
}

export interface ITopInfluencers extends IResTopInfluencers {
    loading: boolean;
}