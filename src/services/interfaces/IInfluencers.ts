/**
 * Influencers Interfaces
 */

export interface IPostsByProfile {
	shortcode: string
	is_top: boolean
	ig_id: number
	likes: number
	comments: number
	text: string
	score: number
	magnitude: number
	takenDate: number
}
export interface IResTopInfluencersNew {
	_profile_id: string,
	ig_id: number,   //PK
	username: string,
	full_name: string,
	profile_pic_url: string,
	is_verified?: boolean,
	posts: number,						// global profile stat
	followers: number,					// global profile stat
	hashtagMentions: number,			// posts using hashtag name
	biography: string,
	likesByHashtag: number,				// likes of posts using hashtag
	commentsByHashtag: number,			// comments of posts using hashtag
	scoreByHashtag: number,				// AVG score of posts using hashtag
	score_pct: number,
	LastHashtagPost?: IPostsByProfile	// Influencer Last post using hashtag
}



