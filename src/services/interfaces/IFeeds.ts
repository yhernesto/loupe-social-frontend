/**
 * Web Feeds Countries Lang Interfaces
 */
export interface IResCountryLang {
	country: string
	languages: Array<string>
}

/**
 * Web Feeds Topics Interfaces
 */
export interface ITopicSection {
	name: string
	gf_icon: string		//Google Font icon
	order: number     //order to be displayed inside topic
	url?:  string     //a Google News Section url part
}

export interface IResTopics {
	lang: string;
	country: string;
	gf_icon: string				//Google Font icon
	topic: string;        //Topic name
	url: string;          //A Google News Topic url part
	order: number;        //order to be displayed in page
	sections?: Array<ITopicSection>;
}

/**
 * Feeds Interfaces
 */
export interface IReqFeedsInput {
	topic_url?: string;     // A Google News Topic url part
	section_url?: string;   // A Google News Section url part
	direct_url?: string;    // A complete url, usually comes from Trending section
	search?: string;    //Is necessary if is a custom search and not through topic/section options
	location: string;   //an ISO-2 country code
	language: string;   //an ISO 639-1 language code
}

export interface IFeedsNews {
	title: string;         //news title
	image_url: string;     //news url image
	source: {
		date: string;        //time(string) since the news was published
		name: string;        //name of source (newspaper, radio, etc)
		url: string;         //url to news in source page
	}
}

export interface IFeedsTrending {
	name: string;
	url: string;
}

export interface IResFeeds {
	news: Array<IFeedsNews>;
	trending_topics?: Array<IFeedsTrending>
}