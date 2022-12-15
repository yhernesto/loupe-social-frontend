import { reactive } from "vue";
import AlertsService from '@/services/alerts.services';
import { IAlertsRow } from '@/services/interfaces/IAlerts';
// import { IDateFormattedRange, IDateRange } from '@/Controller'

interface IFormInputs {
	name: string | null;
	brand: string | null;
	containing: null | Array<string>;
	language: string | null;
	viewThreshold: number;
	sendingType: string | null;
	hour: string | null;
	email: string | null;
}

export class Alerts {
	
	m_formInputs: IFormInputs = { 
									name: null,
									brand: null,
									containing: null,
									language: null,
									viewThreshold: 50,
									sendingType: null,
									hour: null,
									email: null
								};

	// Services
	m_apiService = new AlertsService();

	constructor(){
	}

	/***************
	 * Getters / Setters
	 ***************/

	get formInputs(): IFormInputs{
		return this.m_formInputs;
	}

	set formInputs(p_formInputs: IFormInputs){
		this.m_formInputs = p_formInputs;
	}

	/***************
	 * Methods
	 ***************/

	reset(): void {
		this.m_formInputs = { 
			name: null,
			brand: null,
			containing: null,
			language: null,
			viewThreshold: 50,
			sendingType: null,
			hour: null,
			email: null
		};
	}

	async createAlert(): Promise<void>{
		await this.m_apiService.createAlert(this.m_formInputs)
		this.reset();
	}
	
	async editAlert(): Promise<void>{
		await this.m_apiService.editAlert(this.m_formInputs)
		this.reset();
	}

	getAlerts(): Array<IAlertsRow>{
		return this.m_apiService.getAlerts();
	}
	// async loadInfo(): Promise<void>{
	// }

}

const alerts = reactive(new Alerts());
export default alerts