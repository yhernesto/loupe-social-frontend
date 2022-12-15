import { reactive } from "vue";
import { IRelationRating, ILowerRelationRating, ILatestRelationRating, ILatestHashtagPosts } from './ITrends';

import TrendsService from '@/services/trends.services';
import appController, { IDateFormattedRange, IDateRange } from '@/Controller'
import { getDateFormatted } from "@/utils/date";
import {biAward} from "@quasar/extras/bootstrap-icons";
import {getDateCalculatingOffsetDifference} from "@/utils/offsetDate";
import {convertDateToEpoch} from "@/utils/epochConverter";


class RelationRating implements IRelationRating {
	loading = false;
	max = 0;
	min = 0;
	relation_logs = []
}

class LowerRelationRating implements ILowerRelationRating {
	loading = false;
	data = [];
}

class LatestRelationRating implements ILowerRelationRating {
	loading = false;
	data = [];
}

class LatestHashtagPosts implements ILowerRelationRating {
	loading = false;
	data = [];
}

export class Trends {
	// Ratings
	private m_instagramRating : IRelationRating = new RelationRating();
	// Previous Ratings
	private m_prvInstagramRating : IRelationRating = new RelationRating();

	// Less Used Hashtag
	private m_lessUsedHashtags: ILowerRelationRating = new LowerRelationRating();

	// Less Used Hashtag
	private m_latestUsedHashtags: ILatestRelationRating = new LatestRelationRating();

	// Less Used Hashtag
	private m_latestHashtagPosts: ILatestHashtagPosts = new LatestHashtagPosts();

	// Services
	private m_apiService = new TrendsService();

	/**
	 * Cache
	 */	
	private _cache: boolean = true;
	private __dateFilter: IDateRange | null = null;
	private __prvDateRange: IDateRange | null = null;

	constructor(){
		console.log('Creating Trends instance')
	}

	get apiService(): TrendsService {
		return this.m_apiService;
	}

	/**
	 * Instagram Rating
	 */
	get instagramRating(): IRelationRating {
		return this.m_instagramRating;
	}
	set instagramRating( p_instagramRating: IRelationRating ){
		this.m_instagramRating = p_instagramRating;
	}

	/**
	 * Previous Instagram Rating
	 */
	get prvInstagramRating(): IRelationRating {
		return this.m_prvInstagramRating;
	}
	set prvInstagramRating( p_prvInstagramRating: IRelationRating ){
		this.m_prvInstagramRating = p_prvInstagramRating;
	}

	/**
	 * Less Used Hashtag Rating
	 */
	get lessUsedHashtags(): ILowerRelationRating {
		return this.m_lessUsedHashtags;
	}
	set lessUsedHashtags( p_lessUsedHashtags: ILowerRelationRating){
		this.m_lessUsedHashtags = p_lessUsedHashtags;
	}
	
	/**
	 * Latest Used Hashtag
	 */
	get latestUsedHashtags(): ILatestRelationRating {
		return this.m_latestUsedHashtags;
	}
	set latestUsedHashtags( p_latestUsedHashtags: ILatestRelationRating){
		this.m_latestUsedHashtags = p_latestUsedHashtags;
	}

	/**
	 * Less Used Hashtag Rating
	 */
	get latestHashtagPosts(): ILatestHashtagPosts {
		return this.m_latestHashtagPosts;
	}
	set latestHashtagPosts( p_latestHashtagPosts: ILatestHashtagPosts){
		this.m_latestHashtagPosts = p_latestHashtagPosts;
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
		if (!this._cache || (!this.__dateFilter || this.__dateFilter !== p_dateFilter) || (!this.__dateFilter || this.__prvDateRange !== p_prvDateRange)){
			this.__dateFilter = p_dateFilter;
			this.__prvDateRange = p_prvDateRange;

			const dateFormattedFilter: IDateFormattedRange = { from: getDateFormatted(p_dateFilter.from), to: getDateFormatted(p_dateFilter.to) }
			const prvDateFormattedFilter: IDateFormattedRange = { from: getDateFormatted(p_prvDateRange.from), to: getDateFormatted(p_prvDateRange.to) }
			const minDateInEpochFormat= convertDateToEpoch(dateFormattedFilter.from)!;
			const officialIgHashtag = appController.user.profile?.client.ig_official_hashtag;
			const officialIgProfileId = appController.user.profile?.client.ig_official_profile!;

			this.m_prvInstagramRating.loading = true;
			this.m_instagramRating.loading = true;
			this.m_lessUsedHashtags.loading = true;
			this.m_latestUsedHashtags.loading = true;
			this.m_latestHashtagPosts.loading = true;

			// Getting Instagram Rating
			this.m_prvInstagramRating = {...(await this.m_apiService.getRelationRating(officialIgHashtag, convertDateToEpoch(prvDateFormattedFilter.from)!)), ...{loading: false}};
			this.m_instagramRating =  {...(await this.m_apiService.getRelationRating(officialIgHashtag, minDateInEpochFormat)), ...{loading: false}};

			// Getting Less Used Hashtag
			this.m_lessUsedHashtags = { data: (await this.m_apiService.getLowerRelationRating(officialIgHashtag, minDateInEpochFormat)), loading: false};

			// Getting Latest Used Hashtag
			this.m_latestUsedHashtags = { data: (await this.m_apiService.getLatestHashtagRelation(officialIgHashtag, minDateInEpochFormat)), loading: false};
			//console.log(this.m_latestUsedHashtags.data.map(e=> e.))

			// Getting Latest Hashtag Posts
			this.m_latestHashtagPosts = { data: (await this.m_apiService.getLatestHashtagPosts(officialIgHashtag,minDateInEpochFormat, officialIgProfileId)), loading: false};
		}
	}
}

const trends = reactive(new Trends());
export default trends