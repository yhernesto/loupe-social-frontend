import { IReqRelationRatio, IResRelationRating, IResLastRelationRation, IResLatestHashtagPosts } from "@/services/interfaces/ITrends"

export interface IRelationRating extends IReqRelationRatio {
    loading: boolean;
}

export interface ILowerRelationRating{
    loading: boolean;
    data: Array<IResRelationRating>
}

export interface ILatestRelationRating{
    loading: boolean;
    data: Array<IResLastRelationRation>
}

export interface ILatestHashtagPosts{
    loading: boolean;
    data: Array<IResLatestHashtagPosts>
}