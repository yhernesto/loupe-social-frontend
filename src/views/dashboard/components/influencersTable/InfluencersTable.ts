import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper';
// TODO: Should this interface (ITimeSeries) be imported from IDashboard?
export interface IInfluencerRow {
	username: string;
	fullname: string;	//profile real name
	profile_pic_url: string,
	posts: number;		//global profile stat
	followers: number,          //global profile sta
	hashtagMentions: number,     //posts using hashtag name
	likesByHashtag: number,     //likes of posts using hashtag
	commentsByHashtag: number,  //comments of posts using hashtag
}

export interface IButtonToggle {
	label: string;
	value: string;
	selected: boolean
}

export interface ICardInfluencers extends ICardSectionWrapper{
	title: string;
    rows: Array<IInfluencerRow>
}

