import { reactive } from "vue";
import FeedsService from '@/services/feeds.services';
import { IReqFeedsInput } from '@/services/interfaces/IFeeds';
import { ICountryLang, ITopics, IFeeds, IFeedsTrending, ITopicPayload } from './IFeeds';

class WebFeeds implements IFeeds{
	news = [];
	loading = false;
}
export class Feeds {
	private m_loadingConfig: boolean = true;

	private m_countriesLang: Array<ICountryLang> = [];
	private m_topics: Array<ITopics> = [];
	private m_feeds: IFeeds = new WebFeeds();

	private m_country: string | null = null;
	private m_language: string | null = null;

	private m_topic: string | null = 'TOP';
	private m_section: string | null = null;


	private m_trendingTopics: Array<IFeedsTrending> = []

	// Services
	private m_apiService = new FeedsService();

	/**
	 * Cache 
	 */
	private _cache: boolean = true;
	private __topicPayload: ITopicPayload | null = null;

	constructor(){
		console.log('Creating Feeds')
	}

	/***************
	 * Getters / Setters
	 ***************/
	
	get countriesLang(): Array<ICountryLang>{
		return this.m_countriesLang
	}
	set countriesLang(p_countriesLang: Array<ICountryLang>) { 
		this.m_countriesLang = p_countriesLang
	}

	get topics(): Array<ITopics>{
		return this.m_topics
	}
	set topics(p_topics: Array<ITopics>) { 
		this.m_topics = p_topics
	}

	get feeds(): IFeeds{
		return this.m_feeds
	}
	set feeds(p_feeds: IFeeds) { 
		this.m_feeds = p_feeds
	}

	get country(): string | null{
		return this.m_country;
	}
	set country(p_country: string | null){
		this.m_country = p_country;
	}

	get language(): string | null{
		return this.m_language;
	}
	set language(p_language: string | null){
		this.m_language = p_language;
	}

	get topic(): string | null{
		return this.m_topic;
	}
	set topic(p_topic: string | null){
		this.m_topic = p_topic;
	}
	get section(): string | null{
		return this.m_section;
	}
	set section(p_section: string | null){
		this.m_section = p_section;
	}

	get loadingConfig(): boolean {
		return this.m_loadingConfig;
	}
	set loadingConfig(p_loadingConfig: boolean) {
		this.m_loadingConfig = p_loadingConfig;
	}

	/***************
	 * Methods
	 ***************/
	public getTrendingTopics(): Array<IFeedsTrending> {
		if(this.m_feeds.trending_topics)
			this.m_trendingTopics = this.m_feeds.trending_topics
		return this.m_trendingTopics;
	}


	/**
	 * 
	 * @param p_dateFilter 
	 */
	async loadInfo(): Promise<void>{
		if(!this._cache || !this.m_countriesLang.length || !this.m_topics.length){
			this.m_countriesLang = await this.m_apiService.getWebFeedsCountriesLang();
			this.m_topics = await this.m_apiService.getWebFeedsTopics();	
		}
	}

	async getTopics(payload: ITopicPayload): Promise<void>{
		if(!this._cache || (!this.__topicPayload || this.__topicPayload !== payload)){
			this.__topicPayload = payload;
			this.m_feeds.loading = true;

			if (this.country && this.language){
				const m_payload: IReqFeedsInput = {
					topic_url: this.m_topics.find((_row: ITopics) => _row.topic == this.m_topic)?.url,     // A Google News Topic url part
					section_url: this.m_topics.find((_row: ITopics) => _row.topic == this.m_topic)?.sections?.find((_row) => _row.name == this.m_section)?.url,   // A Google News Section url part
					direct_url: payload.direct_url,    // A complete url, usually comes from Trending section
					search: payload.search, //    //Is necessary if is a custom search and not through topic/section options
					location: this.country,   //an ISO-2 country code
					language: this.language   //an ISO 639-1 language code
				}

				this.m_feeds = {...(await this.m_apiService.getFeeds(m_payload)), ...{loading: false}}
			} else {
				this.m_feeds = new WebFeeds()
			}
		}
	}
	// public init(){
	// 	(async () =>{
	// 		await this.loadInfo()
	// 	})();
	// 	this.m_loadingConfig = false;
	// 	// this.loadInfo().finally(() => {
	// 	// 	this.m_loadingConfig = false;
	// 	// 	console.log("endFinally")
	// 	// })
	// 	console.log("init finished")
	// }
}

const feeds = reactive(new Feeds());
// feeds.init();
export default feeds