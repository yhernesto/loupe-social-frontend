import ApiService from './api.services'
import { IDateFormattedRange } from '@/Controller'
import { IAlertForm, IAlertsRow, IAlertDb } from './interfaces/IAlerts'


export default class AlertsService extends ApiService{
//	apiService: ApiService = new ApiService({baseURL: '/dashboard'}); // TODO: It should be /alerts

	m_dbAlerts: Array<IAlertDb> = [];

	constructor(){
		super({baseURL: '/dashboard'})
	}

	async editAlert(p_alertForm: IAlertForm): Promise<void>{

		// const config = {
		// 	params: {// 2021/07/29", to: "2021/07/30
		// 		"hashtag": "adidasperu",
		// 		// "min_date": "2021-04-01",
		// 		// "max_date": "2021-04-30"
		// 		"min_date": p_dateFilter.from,
		// 		"max_date": p_dateFilter.to
		// 	  }
		// }
		// return (await this.apiService.get('/hashtag_relation_ratio', config)).data
		const isNotEmpty: boolean = Object.values(p_alertForm).every(x => x !== null )
		if (isNotEmpty)
			this.m_dbAlerts.push(p_alertForm as IAlertDb)

		// if (p_alertForm.name != null &&
		// 	p_alertForm.brand != null &&
		// 	p_alertForm.containing != null &&
		// 	p_alertForm.email != null &&
		// 	p_alertForm.hour != null &&
		// 	p_alertForm.language != null &&
		// 	p_alertForm.sendingType != null &&
		// 	p_alertForm.viewThreshold != null
		// 	){
		// 	this.m_dbAlerts.push(p_alertForm as IAlertDb)
		// }


	}
	async createAlert(p_alertForm: IAlertForm): Promise<void>{
		const isNotEmpty: boolean = Object.values(p_alertForm).every(x => x !== null )
		if (isNotEmpty)
			this.m_dbAlerts.push(p_alertForm as IAlertDb)
	}

	getAlerts(): Array<IAlertsRow>{
		return this.m_dbAlerts.map((_row: IAlertDb) => {
			return {
				name: _row.name,
				brand: _row.brand,
				containing: _row.containing,
				language: _row.language
			}
		})	
	}
}

