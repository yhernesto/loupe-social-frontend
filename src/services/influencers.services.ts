import ApiService from './api.services'
import { IDateFormattedRange } from '@/Controller'

import { IResTopInfluencersNew } from './interfaces/IInfluencers'
import { API_SOCIAL_BASE } from '@/constants';

export default class InfluencersService extends ApiService{

	constructor(){
		super({baseURL: '/hashtag', socialApiBase: API_SOCIAL_BASE.INSTAGRAM})
	}

	/**
	 *
	 * @returns
	 * @param p_hashtag
	 * @param p_minDate
	 */
	async getTopInfluencersNew(p_hashtag: string = "", p_minDate: number): Promise<Array<IResTopInfluencersNew>>{
		const config = {
			params: {
				"hashtag": p_hashtag,			// required. Hashtag name
				"min_date": p_minDate,	// required. Formatted required: yyyy-mm-dd.
			}
		}
		return (await this.get('/topInfluencersNew', config)).data
	}
}

