import ApiService from './api.services'
import { IDateFormattedRange } from '@/Controller'
import {
	IResProfileSummary,
	IReqProfileSummary,
	IResBestTimeToPost,
	IResTopTimeToPost,
	IResHashtagStats,
	IResPostsTextStats,
	IResStatsProgressByWeekDay,
	IResSentimentScoreMyBrand
} from './interfaces/IMyBrand'
import {IResSentimentScore} from "@/services/interfaces/IDashboard";
import { API_SOCIAL_BASE } from '@/constants';

export default class TrendsService extends ApiService{

	constructor(){
		super({baseURL: '/profile', socialApiBase: API_SOCIAL_BASE.INSTAGRAM})
	}

	/**
	 * 
	 * @param p_payload IReqProfileSummary
	 * @returns 
	 */
	async getProfileSummary(p_profileId: string ,p_prevMinDate: number, p_post_minDate: number): Promise<IResProfileSummary>{

		const config = {
			params: {
				"profile_ig_id": p_profileId,
				"prev_per_min_date": p_prevMinDate,
				"post_per_min_date": p_post_minDate
			}
		}
		return (await this.get('/profileSummaryAvgStats', config)).data
	}

	async getBestTimeToPost(p_profileId: string = "", p_minDate: number): Promise<IResBestTimeToPost>{
		const config = {
			params: {
				_profile_id: p_profileId,		// required. profile ObjectId
				min_date: p_minDate,	// required. Formatted required: yyyy-mm-dd.

			}
		}
		return (await this.get('/bestTimeToPost', config)).data
	}

	async getTopTimeToPost(p_profileId: string = "", p_minDate: number): Promise<IResTopTimeToPost>{
		const config = {
			params: {
				_profile_id: p_profileId,		// required. profile ObjectId
				min_date: p_minDate,	// required. Formatted required: yyyy-mm-dd.

			}
		}
		return (await this.get('/topTimeToPost', config)).data
	}

	async getHashtagStats(p_profileId: string = "", p_minDate: number): Promise<Array<IResHashtagStats>>{
		const config = {
			params: {
				_profile_id: p_profileId,		// required. profile ObjectId
				min_date: p_minDate,	// required. Formatted required: yyyy-mm-dd.

			}
		}
		return (await this.get('/hashtagStats', config)).data
		
	}

	async getPostsTextStats(p_profileId: string = "", p_minDate: number): Promise<IResPostsTextStats>{
		const config = {
			params: {
				_profile_id: p_profileId,		// required. profile ObjectId
				min_date: p_minDate,	// required. Formatted required: yyyy-mm-dd.

			}
		}
		return (await this.get('/postsTextStats', config)).data
	}

	async getStatsProgressByWeekDay(p_profileId: string = "", p_minDate: number): Promise<Array<IResStatsProgressByWeekDay>>{
		const config = {
			params: {
				_profile_id: p_profileId,		// required. profile ObjectId
				min_date: p_minDate,	// required. Formatted required: yyyy-mm-dd.

			}
		}
		return (await this.get('/statsProgressByWeekDay', config)).data
	}

	/**
	 *
	 * @param p_profileId
	 * @param p_minDate
	 * @returns
	 */
	async getCommentSentiments(p_profileId: string , p_minDate: number): Promise<IResSentimentScoreMyBrand>{
		const config = {
			params: {
				"_profile_id": p_profileId,			//Hashtag name. Required
				"min_date": p_minDate,  //date in string format: yyyy-mm-dd
			}
		}
		return (await this.get('/sentimentScoreComments', config)).data
	}
}

