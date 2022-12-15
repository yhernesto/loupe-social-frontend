import { IStatsLogs } from "./../../../services/interfaces/IDashboard";
import { reactive } from "vue";
import DashboardHashtagService, {DashboardProfileService} from "@/services/dashboard.services";
import appController, { IDateFormattedRange, IDateRange } from "@/Controller";
import { getDateOffSet, getDateFormatted } from "@/utils/date";

import {
  ISummaryStats,
  IKeywordsRating,
  ISentimentScore,
  IRivalsStat,
  IPopularPosts,
  ITopInfluencersLite,
  ITopInfluencers,
} from "./IDashboard";
import {
  getCurrentDate,
  getDateCalculatingOffsetDifference,
  getOffsetDifferenceInMinutes,
} from "@/utils/offsetDate";
import { convertDateToEpoch } from "@/utils/epochConverter";

/**
 * Constants
 */
interface PostCounter {
  likes: number;
  post: number;
  comments: number;
  unique_profiles: number;
}

export const ECardTitle = {

	LIKES		: 'global-likes',
	COMMENTS	: 'global-comments',
	POSTS		: 'global-posts',
	PROFILES	: 'global-perfil',
}

export const EInfluencersToggle = {
	USES: 'USES',
	LIKES: 'LIKES',
	COMMENTS: 'global-comments',
}

export const ESentimentToggle = {
	ALL: 'all-posts',
	TOP: 'top-posts',
  TAGGED:"tagged-posts",
}

export const sentimentToggles = [ESentimentToggle.ALL, ESentimentToggle.TOP];

class SummaryStats implements ISummaryStats {
  loading = false;
  likes = 0;
  comments = 0;
  posts = 0;
  unique_profiles = 0;
  stats_logs = [];
}

class KeywordsRating implements IKeywordsRating {
  loading = false;
  max = 0;
  min = 0;
  relation_logs = [];
}

const sentimentPost = {
  score: 0,
  magnitude: 0,
  posts: 0,
  positives: {
    posts: 0,
    score: 0,
    magnitude: 0,
    postList: [
      {
        shortcode: "",
        text: "",
        takenAt: 0,
      },
    ],
  },
  negatives: {
    posts: 0,
    score: 0,
    magnitude: 0,
    postList: [
      {
        shortcode: "",
        text: "",
        takenAt: 0,
      },
    ],
  },
  neutrals: {
    postList: [
      {
        shortcode: "",
        text: "",
        takenAt: 0
      },
    ],
  },
};

class SentimentScore implements ISentimentScore {
  loading = false;
  allPosts = sentimentPost;
  topPosts = sentimentPost;
  taggedPosts = sentimentPost;
}

class TopInfluencers implements ITopInfluencers {
  loading = false;
  byHashtag = [];
  byLikes = [];
  byComments = [];
}

class RivalsStat implements IRivalsStat {
  loading = false;
  data = [];
}

class PopularPosts implements IPopularPosts {
  loading = false;
  data = [];
}

class TopInfluencersLite implements ITopInfluencersLite {
  loading = false;
  data = [];
}

export class Dashboard {
  private m_summaryStats: ISummaryStats = new SummaryStats();
  private m_prvSummaryStats: ISummaryStats = new SummaryStats();

  private m_hashtagSummaryStats: ISummaryStats = new SummaryStats();
  private m_prevHashtagSummaryStats: ISummaryStats = new SummaryStats();

  private m_taggedSummaryStats: ISummaryStats = new SummaryStats();
  private m_prevTaggedSummaryStats: ISummaryStats = new SummaryStats();

  // Keywords Rating
  private m_keywordsRating: IKeywordsRating = new KeywordsRating();

  // Sentiments
  private m_sentiments: ISentimentScore = new SentimentScore();

  // Competitor
  private m_competitors: IRivalsStat = new RivalsStat();

  // Popular Posts
  private m_popularPosts: IPopularPosts = new PopularPosts();

  // Top Influencers Lite; at the moment it is not useful, we should use the topInfluencers instead
  private m_topInfluencersLite: ITopInfluencersLite = new TopInfluencersLite();

  // Top Influencers
  private m_topInfluencers: ITopInfluencers = new TopInfluencers();

  // Services
  private m_apiService = new DashboardHashtagService();
  private m_apiProfileService = new DashboardProfileService();

  /**
   * Cache
   */
  private _cache: boolean = true;
  private __dateFilter: IDateRange | null = null;
  private __prvDateRange: IDateRange | null = null;

  constructor() {
    // Constructor definition
  }

  get apiService(): DashboardHashtagService {
    return this.m_apiService;
  }
  
  get apiProfileService(): DashboardProfileService {
    return this.m_apiProfileService;
  }

  get summaryStats(): ISummaryStats {
    return this.m_summaryStats;
  }

  set summaryStats(p_val: ISummaryStats) {
    this.m_summaryStats = p_val;
  }

  get prvSummaryStats(): ISummaryStats {
    return this.m_prvSummaryStats;
  }

  set prvSummaryStats(p_val: ISummaryStats) {
    this.m_prvSummaryStats = p_val;
  }

  /**
   * Keywords Rating
   */
  get keywordsRating(): IKeywordsRating {
    return this.m_keywordsRating;
  }

  set keywordsRating(p_keywordsRating: IKeywordsRating) {
    this.m_keywordsRating = p_keywordsRating;
  }

  /**
   * Sentiments
   */
  get sentiments(): ISentimentScore {
    return this.m_sentiments;
  }

  set sentiments(p_sentiments: ISentimentScore) {
    this.m_sentiments = p_sentiments;
  }

  /**
   * Competitors
   */
  get competitors(): IRivalsStat {
    return this.m_competitors;
  }

  set competitors(p_competitors: IRivalsStat) {
    this.m_competitors = p_competitors;
  }

  /**
   * Popular Posts
   */
  get popularPosts(): IPopularPosts {
    return this.m_popularPosts;
  }

  set popularPosts(p_popularPosts: IPopularPosts) {
    this.m_popularPosts = p_popularPosts;
  }

  /**
   * Top Influencers Lite
   */
  get topInfluencersLite(): ITopInfluencersLite {
    return this.m_topInfluencersLite;
  }

  set topInfluencersLite(p_topInfluencersLite: ITopInfluencersLite) {
    this.m_topInfluencersLite = p_topInfluencersLite;
  }

  /**
   * Top Influencers
   */
  get topInfluencers(): ITopInfluencers {
    return this.m_topInfluencers;
  }

  set topInfluencers(p_topInfluencers: ITopInfluencers) {
    this.m_topInfluencers = p_topInfluencers;
  }

  countPosts(postMap: Map<string, PostCounter>, postArray: Array<IStatsLogs>) {
    if (postArray.length > 0) {
      postArray.forEach((e) => {
        if (postMap.has(e.time)) {
          const counter = postMap.get(e.time)!!;
          postMap.set(e.time, {
            likes: counter.likes + e.likes,
            post: counter.post + e.posts,
            comments: counter.comments + e.comments,
            unique_profiles: counter.unique_profiles+ e.unique_profiles,
          });
        } else {
          postMap.set(e.time, {
            likes: e.likes,
            post: e.posts,
            comments: e.comments,
            unique_profiles: e.unique_profiles,
          });
        }
      });
    }
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
   * @param p_prvDateRange
   */
  async loadInfo(p_dateFilter: IDateRange, p_prvDateRange: IDateRange) {
    if (
      !this._cache ||
      !this.__dateFilter ||
      this.__dateFilter !== p_dateFilter ||
      !this.__dateFilter ||
      this.__prvDateRange !== p_prvDateRange
    ) {
      this.__dateFilter = p_dateFilter;
      this.__prvDateRange = p_prvDateRange;

      // // Current range
      const dateFormattedFilter: IDateFormattedRange = {
        from: getDateFormatted(p_dateFilter.from),
        to: getDateFormatted(p_dateFilter.to),
      };
      const prvDateFormattedFilter: IDateFormattedRange = {
        from: getDateFormatted(p_prvDateRange.from),
        to: getDateFormatted(p_prvDateRange.to),
      };

      const minDateInEpochFormat = convertDateToEpoch(
        dateFormattedFilter.from
      )!;
      console.log({minDateInEpochFormat})
      const officialIgHashtag =
        appController.user.profile?.client.ig_official_hashtag;
      const prevMinDateInEpochFormat = convertDateToEpoch(
        prvDateFormattedFilter.from
      )!;
      console.log({prevMinDateInEpochFormat})
      const officialIgProfileId = appController.user.profile?.client
        .ig_official_profile!;

      this.m_summaryStats.loading = true;
      this.m_prvSummaryStats.loading = true;
      this.m_keywordsRating.loading = true;
      this.m_sentiments.loading = true;
      this.m_competitors.loading = true;
      this.m_popularPosts.loading = true;
      this.m_topInfluencers.loading = true;

      this.m_hashtagSummaryStats = {
        ...(await this.m_apiService.getHashtagSummaryStats(
          officialIgHashtag,
          minDateInEpochFormat
        )),
        ...{ loading: false },
      };
      // Previous range
      this.m_prevHashtagSummaryStats = {
        ...(await this.m_apiService.getHashtagSummaryStats(
          officialIgHashtag,
          prevMinDateInEpochFormat
        )),
        ...{ loading: false },
      };

      this.m_taggedSummaryStats = {
        ...(await this.m_apiProfileService.getTaggedSummaryStats(
          officialIgProfileId,
          minDateInEpochFormat
        )),
        ...{ loading: false },
      };
      // Previous range
      this.m_prevTaggedSummaryStats = {
        ...(await this.m_apiProfileService.getTaggedSummaryStats(
          officialIgProfileId,
          prevMinDateInEpochFormat
        )),
        ...{ loading: false },
      };



      this.m_summaryStats.comments =
        this.m_taggedSummaryStats.comments +
        this.m_hashtagSummaryStats.comments;
      this.m_summaryStats.likes =
        this.m_taggedSummaryStats.likes + this.m_hashtagSummaryStats.likes;
      this.m_summaryStats.posts =
        this.m_taggedSummaryStats.posts + this.m_hashtagSummaryStats.posts;
      this.m_summaryStats.unique_profiles = this.m_hashtagSummaryStats.unique_profiles + this.m_taggedSummaryStats.unique_profiles;

      this.m_prvSummaryStats.comments =
        this.m_prevTaggedSummaryStats.comments +
        this.m_prevHashtagSummaryStats.comments;
      this.m_prvSummaryStats.likes =
        this.m_prevTaggedSummaryStats.likes +
        this.m_prevHashtagSummaryStats.likes;
      this.m_prvSummaryStats.posts =
        this.m_prevTaggedSummaryStats.posts +
        this.m_prevHashtagSummaryStats.posts;
      this.m_prvSummaryStats.unique_profiles = this.m_prevHashtagSummaryStats.unique_profiles + this.m_prevTaggedSummaryStats.unique_profiles;

      //NOTE: to get current summaryStats
      const postCounter = new Map<string, PostCounter>();
      this.countPosts(postCounter, this.m_hashtagSummaryStats.stats_logs);
      if (this.m_taggedSummaryStats.stats_logs.length > 0) {
        this.countPosts(postCounter, this.m_taggedSummaryStats.stats_logs);
      }
      //NOTE: to get prev summaryStats
      const prevPostCounter = new Map<string, PostCounter>();
      this.countPosts(
        prevPostCounter,
        this.m_prevHashtagSummaryStats.stats_logs
      );
      this.countPosts(
        prevPostCounter,
        this.m_prevTaggedSummaryStats.stats_logs
      );

      this.m_summaryStats.stats_logs = Array.from(
        postCounter,
        ([key, value]) => ({
          time: key,
          likes: value.likes,
          comments: value.comments,
          posts: value.post,
          unique_profiles: value.unique_profiles,
        })
      );
      this.m_prvSummaryStats.stats_logs = Array.from(
        prevPostCounter,
        ([key, value]) => ({
          time: key,
          likes: value.likes,
          comments: value.comments,
          posts: value.post,
          unique_profiles: value.unique_profiles,
        })
      );
      this.m_summaryStats.loading = false;
      this.m_prvSummaryStats.loading = false;

            // Getting keywordsRating
            this.m_keywordsRating = {
              ...(await this.m_apiService.getKeywordsRating(
                officialIgHashtag,
                minDateInEpochFormat
              )),
              ...{ loading: false },
            };
      
            // Getting Sentiments
            this.m_sentiments = {
              ...(await this.m_apiService.getSentiments(
                officialIgHashtag,
                minDateInEpochFormat,
                officialIgProfileId
              )),
              ...{ loading: false },
            };
      
            // Getting competitors
            this.m_competitors = {
              data: await this.m_apiService.getCompetitors(
                officialIgHashtag,
                dateFormattedFilter
              ),
              loading: false,
            };
      
            // Getting Popular Post
            this.m_popularPosts = {
              data: await this.m_apiService.getPopularPosts(
                officialIgHashtag,
                minDateInEpochFormat,
                officialIgProfileId
              ),
              loading: false,
            };
      
            // Getting Top Influencers Lite; At the moment it is not useful, we should use the topInfluencers instead
            // this.m_topInfluencersLite = await this.m_apiService.getTopInfluencersLite(dateFormattedFilter);
      
            // Getting Top Influencers
            this.m_topInfluencers = {
              ...(await this.m_apiService.getTopInfluencers(
                appController.user.profile?.client.ig_official_hashtag,
                convertDateToEpoch(dateFormattedFilter.from)!
              )),
              ...{ loading: false },
            };
    }
  }
}

const dashboard = reactive(new Dashboard());
export default dashboard;
