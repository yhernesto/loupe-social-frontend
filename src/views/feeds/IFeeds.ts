import { IResCountryLang, IResTopics, IResFeeds, IFeedsTrending as _IFeedsTrending } from "@/services/interfaces/IFeeds"

export interface ICountryLang extends IResCountryLang {}
export interface ITopics extends IResTopics {}

export interface IFeedsTrending extends _IFeedsTrending{}

export interface IFeeds extends IResFeeds {
    loading: boolean;
}

export interface ISelectOption {
	label: string;
	value: string;
}

export interface IWeightCol {
	col: number;
	weight: number;
}

export interface ITopicPayload{
	search?: string;
	direct_url?: string;
}