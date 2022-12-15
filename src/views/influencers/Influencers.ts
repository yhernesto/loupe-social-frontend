import { reactive } from "vue";
import appController, { IDateFormattedRange, IDateRange } from '@/Controller'
import { getDateOffSet, getDateFormatted } from "@/utils/date";

import InfluencersService from '@/services/influencers.services';
import { ITopInfluencersNew } from './IInfluencers';
import {convertDateToEpoch} from "@/utils/epochConverter";


class TopInfluencersNew implements ITopInfluencersNew {
	loading = false;
	data = [];
}

export class Influencers {
	private m_loadingConfig: boolean = true;
	private m_topInfluencers: ITopInfluencersNew = new TopInfluencersNew(); 

	// Services
	private m_apiService = new InfluencersService();


	/**
	 * Cache
	 */	
	private _cache: boolean = true;
	private __dateFilter: IDateRange | null = null;

	constructor(){
		console.log('Creating Influencers Instance')
	}

	get apiService(): InfluencersService {
		return this.m_apiService;
	}

    /**
     * Getters / Setters
     */
    get loadingConfig(): boolean {
        return this.m_loadingConfig
    }
    set loadingConfig(val: boolean){
        this.m_loadingConfig = val
    }

    get topInfluencers(): ITopInfluencersNew{
        return this.m_topInfluencers
    }
    set topInfluencers(val: ITopInfluencersNew){
        this.m_topInfluencers = val
    }

	public killCache(): void {
		this.__dateFilter = null
	}

	/**
	 * Methods 
	 */
	public async loadInfo( p_dateFilter: IDateRange ){
		if (!this._cache || (!this.__dateFilter || this.__dateFilter !== p_dateFilter)){
			this.__dateFilter = p_dateFilter;
			// Current range
			const dateFormattedFilter: IDateFormattedRange = { from: getDateFormatted(p_dateFilter.from), to: getDateFormatted(p_dateFilter.to) }
			const minDateInEpochFormat = convertDateToEpoch(dateFormattedFilter.from)!;
			const officialIgHashtag = appController.user.profile?.client.ig_official_hashtag;

			this.m_topInfluencers.loading = true;
			this.m_topInfluencers = { data: (await this.m_apiService.getTopInfluencersNew(officialIgHashtag, minDateInEpochFormat)), loading: false}
		}
	}
}


const influencers = reactive(new Influencers());
export default influencers