import {
    IResProfileSummary,
    IResBestTimeToPost,
    IResTopTimeToPost,
    IResHashtagStats,
    IResPostsTextStats,
    IResStatsProgressByWeekDay,
    IResSentimentScoreMyBrand
} from "@/services/interfaces/IMyBrand"
import {IResPostsSentimentScore} from "@/services/interfaces/IDashboard";

export interface IProfileSummary extends IResProfileSummary {
    loading: boolean;
}
export interface IBestTimeToPost extends IResBestTimeToPost {
    loading: boolean;
}
export interface ITopTimeToPost extends IResTopTimeToPost {
    loading: boolean;
}
export interface IHashtagStats{
    loading: boolean;
    data: Array<IResHashtagStats>
}
export interface IPostsTextStats extends IResPostsTextStats {
    loading: boolean;
}
export interface IStatsProgressByWeekDay {
    loading: boolean;
    data: Array<IResStatsProgressByWeekDay>
}

export interface ISentimentScoreMyBrand extends IResSentimentScoreMyBrand{
    loading: boolean
}
