import { reactive } from "vue";
import MyBrandService from '@/services/myBrand.services';
import appController, { IDateFormattedRange, IDateRange } from '@/Controller'
import { getDateFormatted } from "@/utils/date";

import {
	IProfileSummary,
	IBestTimeToPost,
	ITopTimeToPost,
	IHashtagStats,
	IPostsTextStats,
	IStatsProgressByWeekDay,
	ISentimentScoreMyBrand
} from './IMyBrand'
import { convertDateToEpoch } from "@/utils/epochConverter";
import {ISentimentScore} from "@/views/dashboard/models/IDashboard";
import {IResPostsSentimentScore} from "@/services/interfaces/IDashboard";

export interface IHeatMapData {
	weekDay: number;
	hour: number;
	total: number;
}

export interface IStatInfo {
	amount: number,
	diff : number
}

/**
 * Constants
 */
export const EHeatMapToggle = {
	LIKES: 'Likes',
	COMMENTS: 'global-comments',
	FREQUENCY: 'global-frecuency',
}

export const heatMapToggles = [ EHeatMapToggle.COMMENTS, EHeatMapToggle.LIKES ]


class BestTimeToPost implements IBestTimeToPost {
	loading = false;
	days = [];
	likes_stats = {		  //min and max likes within given range
		min: 0,
		max: 0
	};
	comments_stats = {	   //min and max comments within given range
		min: 0,
		max: 0
	};
	views_stats = {		  //min and max views within given range
		min: 0,
		max: 0
	}
}

class TopTimeToPost implements ITopTimeToPost {
	loading = false;
	likes = [];
	comments = [];
}

class PostsTextStats implements IPostsTextStats {
	loading = false;
	numberOfHashtagStats = [];
	postsLengthStats = [];
}

class HashtagStats implements IHashtagStats {
	loading = false;
	data = [];
}

class StatsProgressByWeekDay implements IStatsProgressByWeekDay {
	loading = false;
	data = [];
}

const sentimentPost: IResPostsSentimentScore = {
	score: 0,
	magnitude: 0,
	posts: 0,
	positives : {
		posts: 0,
		score: 0,
		magnitude: 0,
		postList: [
			{
				shortcode: '',
				text: '',
				takenAt:0
			}
		]
	},
	negatives : {
		posts: 0,
		score: 0,
		magnitude: 0,
		postList: [
			{
				shortcode: '',
				text: '',
				takenAt:0
			}
		]
	},
	neutrals:{
		postList: [
			{
				shortcode: '',
				text: '',
				takenAt: 0
			}
		]
	}
}

class SentimentScoreMyBrand implements ISentimentScoreMyBrand{
	loading = false;
	allComments = sentimentPost

}

export class MyBrand {

	// Profile Info
	private m_profileInfo: IProfileSummary | null = null

	// Best Time to Post
	private m_bestTimeToPost: IBestTimeToPost = new BestTimeToPost();

	// Top Time to Post
	private m_topTimeToPost: ITopTimeToPost = new TopTimeToPost();

	// HashtagStats
	private m_hashtagStats: IHashtagStats = new HashtagStats();

	//Sentiments
	private m_sentiments: ISentimentScoreMyBrand = new SentimentScoreMyBrand();

	// Posts Text Stats
	private m_postsTextStats: IPostsTextStats = new PostsTextStats();

	// IStatsProgressByWeekDay
	private m_statsProgressByWeekDay: IStatsProgressByWeekDay = new StatsProgressByWeekDay();

	// Services
	private m_apiService = new MyBrandService();

	/**
	 * Cache
	 */	
	private _cache: boolean = true;
	private __dateFilter: IDateRange | null = null;
	private __prvDateRange: IDateRange | null = null;

	constructor(){
		console.log('Creating MyBrand instance')
	}

	/**********************
	 * Getters and Setters
	 **********************/
	get apiService(): MyBrandService {
		return this.m_apiService;
	}

	get profileInfo(): IProfileSummary | null {
		return this.m_profileInfo
	}
	set profileInfo(p_profileInfo: IProfileSummary | null) {
		this.m_profileInfo = p_profileInfo
	}

	getFullName(): string {
		return this.m_profileInfo ? this.m_profileInfo.profile.full_name[0].toUpperCase() + this.m_profileInfo.profile.full_name.slice(1,-1) : '';
	}
	getUserName(): string {
		return this.m_profileInfo ? '@' + this.m_profileInfo.profile.username : '';
	}

	getFollowers(): number {
		return this.m_profileInfo ? Math.ceil(this.m_profileInfo.current_stats.followers) : 0;
	}

	getFollowing(): number {
		return this.m_profileInfo ? Math.ceil(this.m_profileInfo.current_stats.following) : 0;
	}

	getIgtvs(): number {
		return this.m_profileInfo ? Math.ceil(this.m_profileInfo.current_stats.igtvs) : 0;
	}

	getTags(): number {
		return this.m_profileInfo ? Math.ceil(this.m_profileInfo.current_stats.tags) : 0;
	}

	getTotalPosts(): number {
		return this.m_profileInfo ? Math.ceil(this.m_profileInfo.current_stats.media) : 0;
	}

	getMediaInfo(): IStatInfo {
		return {
			amount: this.m_profileInfo ? Math.ceil(this.m_profileInfo.post_period_stats.media) : 0,
			diff: this.m_profileInfo ? Math.ceil((this.m_profileInfo.post_period_stats.media || 0) - (this.m_profileInfo.prev_period_stats.media || 0)) : 0
		}
	}

	getFollowersInfo(): IStatInfo {
		return {
			amount: this.m_profileInfo ? Math.ceil(this.m_profileInfo.post_period_stats.followers) : 0,
			diff: this.m_profileInfo ? Math.ceil((this.m_profileInfo.post_period_stats.followers || 0) - (this.m_profileInfo.prev_period_stats.followers || 0)) : 0
		}
	}
	
	getFollowingInfo(): IStatInfo {
		return {
			amount: this.m_profileInfo ? Math.ceil(this.m_profileInfo.post_period_stats.following) : 0,
			diff: this.m_profileInfo ? Math.ceil((this.m_profileInfo.post_period_stats.following || 0) - (this.m_profileInfo.prev_period_stats.following || 0)) : 0
		}
	}

	getIgtvsInfo(): IStatInfo {
		return {
			amount: this.m_profileInfo ? Math.ceil(this.m_profileInfo.post_period_stats.igtvs) : 0,
			diff: this.m_profileInfo ? Math.ceil((this.m_profileInfo.post_period_stats.igtvs || 0) - (this.m_profileInfo.prev_period_stats.igtvs || 0)) : 0
		}
	}

	getTagsInfo(): IStatInfo {
		return {
			amount: this.m_profileInfo ? Math.ceil(this.m_profileInfo.post_period_stats.tags) : 0,
			diff: this.m_profileInfo ? Math.ceil((this.m_profileInfo.post_period_stats.tags || 0) - (this.m_profileInfo.prev_period_stats.tags || 0)) : 0
		}
	}

	get bestTimeToPost(): IBestTimeToPost {
		return this.m_bestTimeToPost;
	}

	set bestTimeToPost(newBestTimeToPost: IBestTimeToPost){
		this.m_bestTimeToPost = newBestTimeToPost;
	}
	get sentiments():ISentimentScoreMyBrand{
		return this.m_sentiments;
	}

	get topTimeToPost(): ITopTimeToPost{
		return this.m_topTimeToPost
	}
	set topTimeToPost(newTopTimeToPost: ITopTimeToPost){
		this.m_topTimeToPost = newTopTimeToPost;
	}

	get hashtagStats(): IHashtagStats{
		return this.m_hashtagStats
	}
	set hashtagStats(newHashtagStats: IHashtagStats){
		this.m_hashtagStats = newHashtagStats;
	}

	get postsTextStats(): IPostsTextStats{
		return this.m_postsTextStats
	}
	set postsTextStats(newPostsTextStats: IPostsTextStats){
		this.m_postsTextStats = newPostsTextStats;
	}

	get statsProgressByWeekDay(): IStatsProgressByWeekDay{
		return this.m_statsProgressByWeekDay
	}
	set statsProgressByWeekDay(newStatsProgressByWeekDay: IStatsProgressByWeekDay){
		this.m_statsProgressByWeekDay = newStatsProgressByWeekDay;
	}

	/***************
	 * Methods
	 ***************/

	/**
	 * 
	 */
	public killCache(): void {
		this.__dateFilter = null
	}

	/**
	 * 
	 * @param p_dateFilter 
	 */
	async loadInfo(p_dateFilter: IDateRange, p_prvDateRange: IDateRange){

		const igOficialID = JSON.stringify(appController.user.profile?.client.ig_official_id);

		if (!this._cache || (!this.__dateFilter || this.__dateFilter !== p_dateFilter) || (!this.__dateFilter || this.__prvDateRange !== p_prvDateRange)){
			this.__dateFilter = p_dateFilter;
			this.__prvDateRange = p_prvDateRange;

			if (this.m_profileInfo) this.m_profileInfo.loading = true;

			this.m_bestTimeToPost.loading = true;
			this.m_topTimeToPost.loading = true;
			this.m_hashtagStats.loading = true;
			this.m_postsTextStats.loading = true;
			this.m_statsProgressByWeekDay.loading = true;
			
			const dateFormattedFilter: IDateFormattedRange = { from: getDateFormatted(p_dateFilter.from), to: getDateFormatted(p_dateFilter.to) }
			
			const minDateInEpochFormat = convertDateToEpoch(dateFormattedFilter.from)!;
			const igOfficialProfile = appController.user.profile?.client.ig_official_profile!;
			const prv_minDateInEpochFormat = convertDateToEpoch(getDateFormatted(p_prvDateRange.from)!)!;

			//Profile Information
			this.m_profileInfo = {...(await this.m_apiService.getProfileSummary(igOficialID,prv_minDateInEpochFormat, minDateInEpochFormat)), ...{loading:false}}

			//Sentiment score [Chart pie]
			this.m_sentiments = {...(await this.m_apiService.getCommentSentiments(igOfficialProfile, minDateInEpochFormat)), ...{loading: false}}

			// Best Time to Post TODO!!!
			this.m_bestTimeToPost = {...(await this.m_apiService.getBestTimeToPost(igOfficialProfile, minDateInEpochFormat)), ...{loading: false}}

			// Top Time to Post
			this.m_topTimeToPost = {...(await this.m_apiService.getTopTimeToPost(igOfficialProfile, minDateInEpochFormat)), ...{loading: false}}

			// Hashtag Stats
			this.m_hashtagStats = {data: (await this.m_apiService.getHashtagStats(igOfficialProfile, minDateInEpochFormat)), ...{loading: false}}

			// Posts Text Stats
			this.m_postsTextStats = {...(await this.m_apiService.getPostsTextStats(igOfficialProfile, minDateInEpochFormat)), ...{loading: false}}

			// Stats Progress By Week Day
			this.m_statsProgressByWeekDay = {data: (await this.m_apiService.getStatsProgressByWeekDay(igOfficialProfile, minDateInEpochFormat)), ...{loading: false}}

		}
	}
}

const myBrand = reactive(new MyBrand());
export default myBrand