import { reactive } from "vue";
import { getDateOffSet, getDateFormatted, EPeriod } from "./utils/date";
import User from '@/models/User'
import { API_SOCIAL_BASE } from "./constants";

import dashboard from "@/views/dashboard/models/Dashboard";
import trends from "@/views/trends/Trends";
import myBrand from "@/views/myBrand/MyBrand";
import influencers from '@/views/influencers/Influencers';

export interface IDateRange {
	from: Date;
	to: Date;
}

// TODO: Should be in utils/date
export interface IDateFormattedRange {
	from: string;
	to: string;
}

interface ISelectOption {
	label: string;
	value: string;
}

export interface IConfig {
	languages: Array<ISelectOption>
}

export class Controller {
	private m_config: IConfig; 

	private m_user: User = reactive(new User());

	private m_drawer: boolean = true;

	private m_dateFilter: IDateRange ; //mask = "YYYY-MM-DD"
	private m_prvDateFilter: IDateRange; //mask = "YYYY-MM-DD"
	private m_counter: number = 0;
	private m_period: number|null = EPeriod.WEEK;

	private m_socialMedia: string = API_SOCIAL_BASE.INSTAGRAM

	private m_loadingConfig: boolean = true;

	constructor() {
		this.m_config = { languages: [{label: 'Spanish', value: 'es-419'}, {label: 'English', value: 'en-419'}, {label: 'Português', value: 'pt'}]} // TODO: this is gonna be filled from a config endPoint


		this.m_dateFilter = { from: getDateOffSet(-6, 0, 0, {mode: 'start'}), to: getDateOffSet(0, 0, 0, {mode: 'end'}) };

		const diffDays: number = Math.ceil(Math.abs(this.m_dateFilter.to.getTime() - this.m_dateFilter.from.getTime()) / (1000 * 60 * 60 * 24))
		const prvDiffDays: number = diffDays < 7 ? 7 : diffDays;
		this.m_prvDateFilter = { from: getDateOffSet(-prvDiffDays, 0, 0, {date:this.m_dateFilter.from, inPlace: false, mode: 'start'}), to: getDateOffSet(-prvDiffDays, 0, 0, {date: this.m_dateFilter.to, inPlace: false, mode: 'end'}) }
	}

	get drawer(): boolean {
		return this.m_drawer
	}

	set drawer( p_drawer: boolean){
		this.m_drawer = p_drawer;
	}

	get counter(): number {
		return this.m_counter
	}

	set counter( p_counter: number){
		this.m_counter = p_counter;
	}

	get dateFilter(): IDateRange {
		return this.m_dateFilter
	}

	set dateFilter( p_dateFilter: IDateRange){
		this.m_dateFilter = p_dateFilter;
	}

	get prvDateRange(): IDateRange {
		return this.m_prvDateFilter
	}

	set prvDateRange( p_dateFilter: IDateRange){
		this.m_prvDateFilter = p_dateFilter;
	}

	get dateFormattedFilter(): IDateFormattedRange {
		return { from: getDateFormatted(this.m_dateFilter.from), to: getDateFormatted(this.m_dateFilter.to) };
	}

	set dateFormattedFilter( p_dateFilter: IDateFormattedRange){
		//"YYYY-MM-DD"
		// It saves the date in Date type instead of string
		const _from: Date = new Date(parseInt(p_dateFilter.from.substring(0,4)), parseInt(p_dateFilter.from.substring(5,7)) - 1, parseInt(p_dateFilter.from.substring(8,10)), 0, 0, 0)
		const _to: Date = new Date(parseInt(p_dateFilter.to.substring(0,4)), parseInt(p_dateFilter.to.substring(5,7)) - 1, parseInt(p_dateFilter.to.substring(8,10)), 23, 59, 59)
		this.m_dateFilter = {from: _from, to: _to};

		// Previous data range
		const diffDays: number = Math.ceil(Math.abs(this.m_dateFilter.to.getTime() - this.m_dateFilter.from.getTime()) / (1000 * 60 * 60 * 24))
		const prvDiffDays: number = diffDays < 7 ? 7 : diffDays + 1;
		this.m_prvDateFilter = { from: getDateOffSet(-prvDiffDays, 0, 0, {date: this.m_dateFilter.from, inPlace: false, mode: 'start'}), to: getDateOffSet(-prvDiffDays, 0, 0, {date: this.m_dateFilter.to, inPlace: false, mode: 'end'}) }
	}

	get period(): number|null {
		return this.m_period
	}

	set period( p_period: number|null){
		this.m_period = p_period;
		
	}

	get user(): User {
		return this.m_user;
	}

	set user(p_user: User) {
		this.m_user = p_user;
	}



	get loadingConfig(): boolean {
		return this.m_loadingConfig;
	}
	set loadingConfig(p_loadingConfig: boolean) {
		this.m_loadingConfig = p_loadingConfig;
	}

	get socialMedia(): string{
		return this.m_socialMedia
	}

	set socialMedia( p_value: string){
		this.m_socialMedia = p_value;

		dashboard.killCache();
		dashboard.apiService.socialApiBase = this.m_socialMedia

		trends.killCache();
		trends.apiService.socialApiBase = this.m_socialMedia

		myBrand.killCache();
		myBrand.apiService.socialApiBase = this.m_socialMedia;

		influencers.killCache();
		influencers.apiService.socialApiBase = this.m_socialMedia;
	}

	/**
	 * Methods
	 */

	public getConfig(): IConfig {
		return this.m_config
	}

	// Method used for async functions
	public init(){
		this.m_user.getProfile().finally(() => {
			this.m_loadingConfig = false;
		})
	}

}

const appController = reactive( new Controller);
appController.init()
export default appController;