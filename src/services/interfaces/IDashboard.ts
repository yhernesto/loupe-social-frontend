/**
 * Summary Stats Interfaces
 */
export interface IStatsLogs {
	time: string               //post created date. Date in string format yyyy-mm-dd
	likes: number              //sum of likes for date
	posts: number              //sum of posts for date
	comments: number           //sum of comments for date
	unique_profiles: number    //amount of unique profiles
}

export interface IResSummaryStats {
	likes: number,
	comments: number,
	posts: number,
	unique_profiles: number,
	stats_logs: Array<IStatsLogs>
}

/**
 * Relation Interfaces
 */
export interface IRelationLogs {
	hashtag: string,
	occurrences: number
}

export interface IResRelationRatio {
	max: number,	// max value of occurrences
	min: number,	// min value of occurrences
	relation_logs: Array<IRelationLogs>
}

export interface PostsListTaken{
	shortcode: string,
	text: string,
	takenAt?: number,
	updatedAt?: number
}

/**
 * Sentiment Interfaces
 */
export interface IResPostsSentimentScore {
	score: number;
	magnitude: number;
	posts: number;			//count total posts
	positives: {
		posts: number;		//count positives posts
		score: number;
		magnitude: number;
		postList: Array<PostsListTaken>
	},
	negatives: {
		posts: number;		//count negative posts
		score: number;
		magnitude: number;
		postList: Array<PostsListTaken>
	},
	neutrals: {
		postList: Array<PostsListTaken>
	}
}

export interface IResSentimentScore {
  allPosts: IResPostsSentimentScore
  topPosts: IResPostsSentimentScore
	taggedPosts: IResPostsSentimentScore
}

/**
 * Rivals Interfaces
 */
export interface IResRivalsStat {
	hashtag: string								//hashtag rival
  current_posts: number
  current_score: number         //avg sentiment score in current period
	current_score_pct: number
  current_magnitude: number     //avg sentiment magnitude in current period
  prev_posts: number            
  prev_score: number            //avg sentiment score in previous period
	prev_score_pct: number
  prev_magnitude: number        //avg sentiment magnitude in previous period
  posts_logs:  Array<number>    //posts count in current period
																//The total of posts numbers in period are grouped in 
																//10 groups and then each group are averaged
}

/**
 * Popular Posts Interfaces
 */
export interface IResPopularPosts {
	shortcode: string,
  is_top: boolean,
  text: string,
  score: number,
  score_pct?: number,
  magnitude: number,
  magnitude_pct?: number,
  likes: number,
  comments: number,
  takenAt: Date
}

/**
 * Top Influencers Lite Interfaces
 */
export interface IResTopInfluencersLite {
	_profile_id: string,
	ig_id: number,    
	username: string,
	full_name: string, 
	profile_pic_url: string,
	is_verified?: boolean,
	posts: number,				//global profile stat
	followers: number,			//global profile stat
	postsUsingHashtag: number,	//posts using hashtag name
	social: string				// instagram, facebook, twitter, tik_tok
}

/**
 * Top Influencers Interfaces
 */
interface ISubInfluencer {
	_profile_id: string,
	ig_id: number,    
	username: string,
	full_name: string, 
	biography: string,
	profile_pic_url: string,
	is_verified?: boolean,
	posts: number,              //global profile stat
	followers: number,          //global profile stat
	likesByHashtag: number,     //likes of posts using hashtag
	commentsByHashtag: number,  //comments of posts using hashtag
	hashtagMentions: number     //posts using hashtag name
}

export interface IResTopInfluencers {
	byHashtag: Array<ISubInfluencer>;
	byLikes: Array<ISubInfluencer>;
	byComments: Array<ISubInfluencer>;
}