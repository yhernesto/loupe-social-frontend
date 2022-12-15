import ApiService from './api.services'
import { IDateFormattedRange } from '@/Controller'
import { IReqRelationRatio, IResLastRelationRation, IResLatestHashtagPosts, IResRelationRating } from './interfaces/ITrends'
import { API_SOCIAL_BASE } from '@/constants';


export default class TrendsService extends ApiService{

    constructor(){
		super({baseURL: '/hashtag', socialApiBase: API_SOCIAL_BASE.INSTAGRAM})
    }

    /**
	 *
	 * @returns
	 * @param p_hashtag
	 * @param p_minDate
	 */
	async getRelationRating(p_hashtag: string = "", p_minDate: number): Promise<IReqRelationRatio>{
		const config = {
			params: {
				"hashtag": p_hashtag,			//Hashtag name. Required
				"min_date": p_minDate,	//date in string format: yyyy-mm-dd
				"limit": 30						//limit of returned hashtags
			}
		}

		return (await this.get('/hashtagRelationRatio', config)).data
	}

    /**
	 *
	 * @returns
	 * @param p_hashtag
	 * @param p_minDate
	 */
	async getLowerRelationRating(p_hashtag: string = "", p_minDate: number): Promise<Array<IResRelationRating>>{
		const config = {
			params: {
				"hashtag": p_hashtag,			//Hashtag name. Required
				"min_date": p_minDate,	//date in string format: yyyy-mm-dd
                "limit": 10
			}
		}

		return (await this.get('/lowerHashtagRelationRatio', config)).data
	}

    /**
	 *
	 * @returns
	 * @param p_hashtag
	 * @param p_minDate
	 */
	async getLatestHashtagRelation(p_hashtag: string = "", p_minDate: number): Promise<Array<IResLastRelationRation>>{
		const config = {
			params: {
				"hashtag": p_hashtag,			//Hashtag name. Required
				"min_date": p_minDate,	//date in string format: yyyy-mm-dd
                "limit": 10
			}
		}

		return (await this.get('/latestHashtagRelation', config)).data
	}	
	
	async getLatestHashtagPosts(p_hashtag: string = "", p_minDate: number, p_profileId: string): Promise<Array<IResLatestHashtagPosts>>{
		const config = {
			params: {
				"hashtag": p_hashtag,			//Hashtag name. Required
				"min_date": p_minDate,  //date in string format: yyyy-mm-dd
				"top": 50,
				"_profile_id": p_profileId
			}
		}

		return (await this.get('/latestPosts', config)).data
	}

}

