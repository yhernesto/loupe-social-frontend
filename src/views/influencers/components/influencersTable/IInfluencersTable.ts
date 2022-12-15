import { ICardSectionWrapper } from "@/components/cardSectionWrapper/ICardSectionWrapper";

export interface IInfluencerRow {
	username: string;
	full_name: string; 
	biography: string;
	profile_pic_url: string;
	posts: number;				//global profile stat
	followers: number;			//global profile stat
	hashtagMentions: number;	//posts using hashtag name
	likesByHashtag: number;		//likes of posts using hashtag
	commentsByHashtag: number;	//comments of posts using hashtag
	hashtagScore: number;		//AVG score of posts using hashtag
	score_pct: number;
	lastText: string;
	shourtCode?: string;
}

export interface ICardInfluencers extends ICardSectionWrapper{
    rows: Array<IInfluencerRow>
}

