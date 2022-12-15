/**
 * Profile Summary Interfaces
 */
import {IResPostsSentimentScore} from "@/services/interfaces/IDashboard";

export interface IProfile{
	username: string,
	full_name: string,
	biography: string,
	profile_pic_url: string,
	is_verified: boolean,
}

export interface IProfileStats {
	media: number
	followers: number
	following: number
	igtvs:  number
	tags: number
	arEffects: number
	stories: number
}

export interface IReqProfileSummary {
	profile_ig_id: number
	prev_per_min_date: string
	prev_per_max_date?: string
	post_per_min_date: string
	post_per_max_date?: string
}

 export interface IResProfileSummary {
	profile: IProfile
	current_stats: IProfileStats
	prev_period_stats: IProfileStats
	post_period_stats: IProfileStats
}


/**
 * Best Time to Post Interfaces
 */
export interface IHours {
	hour: number		   // hour in 24h format
	likes: number	  // avg likes by day-hour
	comments: number   // avg comments by day-hour
	diffLikes: number		// avg difference between likes at current hour and last hour
	diffComments: number  // avg difference between comments at current hour and last hour
}

export interface IDaysHour {
	day_number: number		 //day of week (0-6)	
	hoursStats: Array<IHours>
}

export interface IResBestTimeToPost{
	days: Array<IDaysHour>,
	likes_stats: {		  //min and max likes within given range
		min: number,
		max: number
	},
	comments_stats: {	   //min and max comments within given range
		min: number,
		max: number
	},
	views_stats: {		  //min and max views within given range
		min: number,
		max: number
	}
}

/**
 * Top Time to Post Interfaces
 */
export interface ITopTimeLikes {
	day_number: number,
	day_hour: number,
	likes: number,
	comments: number,
	views_count: number
}

export interface IResTopTimeToPost {
	likes: Array<ITopTimeLikes>;		// list of stats order by likes_count
	comments: Array<ITopTimeLikes>;		// list of stats order by likes_count
}

/**
 * Hashtag Stats Interface
 */
export interface IResHashtagStats {
	hashtag: string
	avgLikes: number	//average likes
	avgComments: number	//average comments
}


/**
 * Post Text Stats Interface
 */
export interface INumberOfHashtagsStats {
	range: string,       //range names are strings like: '0-1', '1-5', '6-10', '11-'
	stats: {
		avgLikes: number,    
		avgComments: number,
		times: number      //amount of posts using a quantity of hashtags within range
	}
}

export interface IPostsLengthStats {
	range: string,       //range names are strings like:  '0-140', '140-200', '201-300', '301-' 
	stats: {
		avgLikes: number,    
		avgComments: number,
		times: number      //amount of posts with text length within range
	}
}

  export interface IResPostsTextStats {
	numberOfHashtagStats: Array<INumberOfHashtagsStats>;
	postsLengthStats: Array<IPostsLengthStats>
}

// Stats Progress By Week Day Interfaces
export interface IResStatsProgressByWeekDay {
	day_number: number,
	likes: number,
	comments: number
}

export interface IResSentimentScoreMyBrand {
	allComments: IResPostsSentimentScore
}