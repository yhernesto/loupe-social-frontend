import ApiService from './api.services'
import { IResCountryLang, IResTopics, IReqFeedsInput, IResFeeds } from './interfaces/IFeeds'


export default class TrendsService extends ApiService{

	constructor(){
		super({baseURL: '/webFeeds'})
	}

	/**
	 * 
	 * @returns 
	 */
	async getWebFeedsCountriesLang(): Promise<Array<IResCountryLang>>{
		const config = {
			params: {}
		}
		return (await this.get('/getWebFeedsCountryLang', config)).data
	}

	/**
	 * 
	 * @returns 
	 */
	async getWebFeedsTopics(): Promise<Array<IResTopics>>{
		const config = {
			params: {}
		}
		return (await this.get('/getWebFeedsTopics', config)).data
	}

	/**
	 * 
	 * @param p_payload 
	 * @returns 
	 */
	async getFeeds(p_payload: IReqFeedsInput): Promise<IResFeeds>{
		const config = {
			params: p_payload
		}
		return (await this.get('/getFeeds', config)).data
	}
}