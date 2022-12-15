import ApiService from './api.services'
import {IDateFormattedRange} from '@/Controller'
import { API_SOCIAL_BASE } from '@/constants';

import {
    IResSummaryStats,
    IResRelationRatio,
    IResSentimentScore,
    IResRivalsStat,
    IResPopularPosts,
    IResTopInfluencersLite,
    IResTopInfluencers
} from './interfaces/IDashboard'
import {convertDateToEpoch} from "@/utils/epochConverter";

export default class DashboardHashtagService extends ApiService {

    constructor() {
        super({baseURL: '/hashtag', socialApiBase: API_SOCIAL_BASE.INSTAGRAM})
    }

    /**
     *
     * @param p_hashtag
     * @param p_minDate
     * @returns
     */
    async getHashtagSummaryStats(p_hashtag: string = "", p_minDate: number): Promise<IResSummaryStats> {
        const config = {
            params: {
                "hashtag": p_hashtag,			//Hashtag name. Required
                "min_date": p_minDate,	//date in epoch format: e.g: 1611446400
            }
        }
        return (await this.get('/hashtagSummaryStats', config)).data
    }

    /**
     *
     * @returns
     * @param p_hashtag
     * @param p_minDate
     */
    async getKeywordsRating(p_hashtag: string = "", p_minDate: number): Promise<IResRelationRatio> {
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
     * @param p_hashtag
     * @param p_minDate
     * @returns
     */
    async getSentiments(p_hashtag: string = "", p_minDate: number, p_profileId: string): Promise<IResSentimentScore> {
        const config = {
            params: {
                "hashtag": p_hashtag,			//Hashtag name. Required
                "min_date": p_minDate,  //date in string format: yyyy-mm-dd
                "_profile_id": p_profileId
            }
        }
        return (await this.get('/sentimentScore', config)).data
    }

    /**
     *
     * @param p_hashtag
     * @param p_dateFilter
     * @returns
     */
    async getCompetitors(p_hashtag: string = "", p_dateFilter: IDateFormattedRange): Promise<Array<IResRivalsStat>> {
        const config = {
            params: {
                "hashtag": p_hashtag,			//Hashtag name. Required
                "min_date": p_dateFilter.from, //date in string format: yyyy-mm-dd
                "max_date": p_dateFilter.to
            }
        }
        return (await this.get('/hashtagRivalsStats', config)).data
    }

    /**
     *
     * @param p_hashtag
     * @param p_minDate
     * @returns
     */
    async getPopularPosts(p_hashtag: string = "", p_minDate: number, p_profileId: string): Promise<Array<IResPopularPosts>> {
        const config = {
            params: {
                "hashtag": p_hashtag,			//Hashtag name. Required
                "min_date": p_minDate,  //date in epoch format format
                "top": 50,
                "_profile_id": p_profileId
            }
        }
        return (await this.get('/popularPosts', config)).data

    }

    /**
     *
     * @param p_hashtag
     * @param p_dateFilter
     * @returns
     */
    async getTopInfluencersLite(p_hashtag: string = "", p_dateFilter: IDateFormattedRange): Promise<Array<IResTopInfluencersLite>> {
        const config = {
            params: {
                "hashtag": p_hashtag,			//Hashtag name. Required
                "min_date": p_dateFilter.from,	//required. Formatte required: yyyy-mm-dd.
                "max_date": p_dateFilter.to		//optional. If is null then will take the same value
                // that prev_per_min_date but with hours at the end of a day
                // Formatte required: yyyy-mm-dd.
            }
        }
        const rs: Array<IResTopInfluencersLite> = (await this.get('/topInfluencersLite', config)).data

        return rs.map((row) => {
            row.social = "instagram";
            return row;
        })
    }

    /**
     *
     * @param p_hashtag
     * @param p_minDate
     * @returns
     */
    async getTopInfluencers(p_hashtag: string = "", p_minDate: number): Promise<IResTopInfluencers> {

        const config = {
            params: {
                "hashtag": p_hashtag,			// required. Hashtag name
                "min_date": p_minDate,	// required. Formatted required: yyyy-mm-dd.
            }
        }
        return (await this.get('/topInfluencers', config)).data
    }
}

export class DashboardProfileService extends ApiService {

    constructor() {
        super({baseURL: '/profile', socialApiBase: API_SOCIAL_BASE.INSTAGRAM})
    }

    /**
     *
     * @param p_profileId
     * @param p_minDate
     * @returns
     */
    async getTaggedSummaryStats(p_profileId: string, p_minDate: number): Promise<IResSummaryStats> {
        const config = {
            params: {
                "_profile_id": p_profileId,
                "min_date": p_minDate,	//date in epoch format: e.g: 1611446400
            }
        }
        return (await this.get('/taggedSummaryStats', config)).data
    }

}


// class _DashboardService {}
// interface _DashboardService extends HashtagService, ProfileService {}

// applyMixins(_DashboardService, [HashtagService, ProfileService]);

// export default class DashboardService extends _DashboardService{}

// // This can live anywhere in your codebase:
// function applyMixins(derivedCtor: any, constructors: any[]) {
//     constructors.forEach((baseCtor) => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//         Object.defineProperty(
//             derivedCtor.prototype,
//             name,
//             Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
//             Object.create(null)
//         );
//         });
//     });
// }