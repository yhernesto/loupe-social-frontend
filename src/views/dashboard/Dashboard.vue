<template>
	<app-page-wrapper :date-selector="true">
		<div class="row q-gutter-none q-mb-md">
			<div
				v-for="(cardArea, idx) in cardsArea"
				:key="'card_' + idx"
				class="col-12 col-sm-3 q-px-xs"
			>
				<app-chart-area  
					:card-area="cardArea"
					@selected="cardSelected"
				/>
			</div>
		</div>
		<div class="row q-gutter-none q-mb-md">
			<div
				class="q-px-xs"
				style="width: 100%"
			>
				<app-chart-timeseries 
					:card-time-series="cardTimeSeries"
				/>
			</div>
		</div>
		<div class="row q-gutter-none q-mb-md">
			<div class="col-12 col-sm-6">
				<div
					class="q-px-xs"
					style="width: 100%;"
				>
					<app-chart-packed-bubble :card-packed-bubble="cardPackedBubble" />
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div
					class="q-px-xs"
					style="width: 100%;"
				>
					<app-chart-pie 
						:card-pie="cardPie"
						@selected="sentimentTabChanged" 
					/>
				</div>
			</div>
		</div>
		<div class="row q-gutter-none q-mb-md">
			<div
				class="q-px-xs"
				style="width: 100%"
			>
				<app-competitors-table :card-competitors="cardCompetitors" />
			</div>
		</div>
		<div class="row q-gutter-none q-mb-md">
			<div
				class="q-px-xs"
				style="width: 100%"
			>
				<app-posts-table :card-posts="cardPopularPosts" />
			</div>
		</div>
		<div class="row q-gutter-none q-mb-md">
			<div
				class="q-px-xs"
				style="width: 100%"
			>
				<app-influencers-table
					:card-influencers-table="cardInfluencersTable"
					@selected="influencersTabChanged"  
				/>
			</div>
		</div>
		<!-- <div class="row q-gutter-none q-pb-md">
			<div
				class="q-px-xs"
				style="width: 100%"
			>
				<app-top-influencers :cards-top-influencers="cardsTopInfluencers" />
			</div>
		</div> -->
	</app-page-wrapper>
</template>

<script lang='ts'>
import { defineComponent, reactive, computed, /*ComputedRef,*/ watch, onMounted, Ref, ref } from 'vue';
import PageWrapper from '@/components/pageWrapper/PageWrapper.vue';
import { Controller } from '../../Controller';
import { injectStrict } from '../../utils/injections';
import { EPeriod, PeriodList } from '@/utils/date';
import dashboard, { ECardTitle, EInfluencersToggle, ESentimentToggle } from './models/Dashboard';
import { ICardsArea } from './components/chartArea/AreaHighChart';
import ChartArea from './components/chartArea/ChartArea.vue';
import ChartTimeSeries from './components/chartTimeSeries/ChartTimeSeries.vue';
import { ICardTimeSeries } from './components/chartTimeSeries/ChartTimeSeries';
import ChartPackedBubble from './components/chartPackedBubble/ChartPackedBubble.vue';
import { ICardPackedBubble } from './components/chartPackedBubble/ChartPackedBubble';
import ChartPie from '../../components/chartPie/ChartPie.vue';
import { ICardPie } from '../../components/chartPie/ChartPie';
import CompetitorsTable from './components/competitorsTable/CompetitorsTable.vue'
import { ICardCompetitors } from './components/competitorsTable/CompetitorsTable'
import PostsTable from './components/postsTable/PostsTable.vue'
import { ICardPosts } from './components/postsTable/PostsTable'
// import { percentageDifference } from '../../utils/mathUtils'
// import TopInfluencers from './components/topInfluencers/TopInfluencers.vue'
// import { ICardTopInfluencers } from './components/topInfluencers/TopInfluencers'

import InfluencersTable from './components/influencersTable/InfluencersTable.vue'
import { ICardInfluencers } from './components/influencersTable/InfluencersTable'
import { percentageDifference } from '../../utils/mathUtils'

import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Dashboard',
  components: {
    'app-page-wrapper': PageWrapper,
    'app-chart-area': ChartArea,
    'app-chart-timeseries': ChartTimeSeries,
    'app-chart-packed-bubble': ChartPackedBubble,
    'app-chart-pie': ChartPie,
    'app-competitors-table': CompetitorsTable,
    'app-posts-table': PostsTable,
    // 'app-top-influencers': TopInfluencers,
    'app-influencers-table': InfluencersTable,
  },
  setup () {
    const { t } = useI18n({ useScope: 'global' })

    const app: Controller = injectStrict('appController');

    /*************
    Cards Area ***
    **************/
    const cardsArea: ICardsArea[] = reactive([
      {
        title: t(ECardTitle.LIKES),
        amount: computed(() => dashboard.summaryStats.likes),
        diffs: computed(() => dashboard.summaryStats.likes - (dashboard.prvSummaryStats.likes - dashboard.summaryStats.likes)),
        data: computed(() => dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.likes]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) ),
        color: "#7cb5ec",
        units: "",
        active: false,
        loading: computed(() => dashboard.summaryStats.loading )
      },
      {
        title: t(ECardTitle.COMMENTS),
        amount: computed(() => dashboard.summaryStats.comments),
        diffs: computed(() => dashboard.summaryStats.comments - (dashboard.prvSummaryStats.comments - dashboard.summaryStats.comments)),
        data: computed(() => dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.comments]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) ),
        color: "#a0e0b6",
        units: "",
        active: false,
        loading: computed(() => dashboard.summaryStats.loading )
      },
      {
        title: t(ECardTitle.POSTS),
        amount: computed(() => dashboard.summaryStats.posts),
        diffs: computed(() => dashboard.summaryStats.posts - (dashboard.prvSummaryStats.posts - dashboard.summaryStats.posts)),
        data: computed(() => dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.posts]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) ),
        color: "#7cb5ec",
        units: "",
        active: true,
        loading: computed(() => dashboard.summaryStats.loading )
      },
      {
        title: t(ECardTitle.PROFILES),
        amount: computed(() => dashboard.summaryStats.unique_profiles),
        diffs: computed(() => dashboard.summaryStats.unique_profiles! - (dashboard.prvSummaryStats.unique_profiles! - dashboard.summaryStats.unique_profiles!)),
        data: computed(() => dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.unique_profiles!]).sort((a: number[] , b: number[]) => a[0] > b[0] ? 1 : -1) ),
        color: "#a0e0b6",
        units: "",
        active: false,
        loading: computed(() => dashboard.summaryStats.loading )
      },
    ])

    const cardSelected = function(cardTitle : string): void{
      cardsArea.forEach((card: ICardsArea) => card.active = card.title === cardTitle)
    }

    const activeCard = computed(() => {
      return cardsArea.find((card: ICardsArea) => card.active)?.title;
    })
    
    /****************
     * TimeSeries ***
     ****************/
    const cardTimeSeries: ICardTimeSeries = reactive({
      title: computed(() => { return cardsArea.find((card: ICardsArea) => card.active)?.title || '' }),
      loading: computed(() => dashboard.summaryStats.loading || dashboard.prvSummaryStats.loading),
      series: [{
        type: 'spline',
        name: computed(() => cardsArea.find((card: ICardsArea) => card.active)?.title || '' ),
        // data:  computed(() => dashboard.likes.rows)
        data:  computed(() => {
          switch(cardsArea.find((card: ICardsArea) => card.active)?.title) { 
            case t(ECardTitle.POSTS): { 
              return dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.posts]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
            } 
            case t(ECardTitle.LIKES): {
              return dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.likes]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
            }

            case t(ECardTitle.PROFILES): { 
              return dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.unique_profiles]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]

            }
            case t(ECardTitle.COMMENTS): { 
              return dashboard.summaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.comments]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
            }
            default: { 
              return [[]]
            } 
          }
        }),
        xAxis: 0
      },
      {
        type: 'spline',
        name: computed(() => (cardsArea.find((card: ICardsArea) => card.active)?.title || '') + ' ( ' + (EPeriod.TODAY === app.period ? t('yesterday') + ' )' : (t('previous') + ' '+ (t(PeriodList.find((period) => period.value === app.period)?.label || '').toLowerCase() || '') + ' )'))),
        // data: computed(() => dashboard.prvLikes.rows),
        data:  computed(() => {
          switch(cardsArea.find((card: ICardsArea) => card.active)?.title) { 
            case t(ECardTitle.POSTS): { 
              return dashboard.prvSummaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.posts]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
            } 
            case t(ECardTitle.LIKES): {
              return dashboard.prvSummaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.likes]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
            }
            case t(ECardTitle.PROFILES): { 
              return dashboard.prvSummaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.unique_profiles]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]

            }
            case t(ECardTitle.COMMENTS): { 
              return dashboard.prvSummaryStats.stats_logs.map( log => [new Date(log.time).getTime(), log.comments]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
            }
            default: { 
              return [[]]
            } 
          }
        }),
        xAxis: 1
      },
      ],
      xAxis: computed(() => {
        // console.log('app.dateFilter:', app.dateFilter);
        return app.dateFilter
      }),
      xAxisPrv: computed(() => {
        // console.log('app.prvDateRange:', app.prvDateRange);
        return app.prvDateRange
      })
    })

    /******************
     * PackedBubble ***
     ******************/
    const cardPackedBubble: ICardPackedBubble = reactive(
      {
        title: t('dashboard-keywords-tittle'),
        zMin: computed(() => dashboard.keywordsRating.min),
        zMax: computed(() => dashboard.keywordsRating.max),
        labelThreshold: computed(() => Math.floor((dashboard.keywordsRating.max - dashboard.keywordsRating.min) * 0.85)),
        series: computed(() =>
                  dashboard.keywordsRating.relation_logs.map( (row) => {
                    return {
                        type: "packedbubble" as 'packedbubble',
                        name: row.hashtag,
                        data: [{
                            name: row.hashtag,
                            value: row.occurrences
                        }]
                    }
                  })
                ),
        loading: computed( () => dashboard.keywordsRating.loading)
      }
    )

    /*********
     * Pie ***
     *********/
    let scoreTabSlctd: Ref<string> = ref(ESentimentToggle.ALL);
		const sentimentTabChanged = function(sentimentTabTitle : string): void{
			scoreTabSlctd.value = sentimentTabTitle
		}
    const cardPie: ICardPie = reactive(
      {

        title: t('dashboard-sensation-tittle'),
        score: computed(() => scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.score : ( scoreTabSlctd.value === ESentimentToggle.TAGGED ?  dashboard.sentiments.taggedPosts.score :  dashboard.sentiments.topPosts.score )),
        toggles: [
          {label: t('all-posts'), value: ESentimentToggle.ALL, selected: true},
          {label: t('top-posts'), value: ESentimentToggle.TOP, selected: false},
          {label: t('tagged-posts'), value: ESentimentToggle.TAGGED, selected: false}
        ],
        data: computed(() => [{
              name: t('chart-pie-positive'),
              y: scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.positives.posts : (scoreTabSlctd.value === ESentimentToggle.TAGGED  ?  dashboard.sentiments.taggedPosts.positives.posts : dashboard.sentiments.topPosts.positives.posts),
              score: scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.positives.score : (scoreTabSlctd.value === ESentimentToggle.TAGGED ? dashboard.sentiments.taggedPosts.positives.score : dashboard.sentiments.topPosts.positives.score) ,
              color: "#7dec7c",
              positiveList: scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.positives.postList : (scoreTabSlctd.value === ESentimentToggle.TAGGED ? dashboard.sentiments.taggedPosts.positives.postList : dashboard.sentiments.topPosts.positives.postList)
            },
              {
                name: t('chart-pie-neutral'),
                y: scoreTabSlctd.value === ESentimentToggle.ALL ?
                    (dashboard.sentiments.allPosts.posts - (dashboard.sentiments.allPosts.negatives.posts + dashboard.sentiments.allPosts.positives.posts)) :
                    (scoreTabSlctd.value === ESentimentToggle.TOP ? dashboard.sentiments.topPosts.posts - (dashboard.sentiments.topPosts.negatives.posts + dashboard.sentiments.topPosts.positives.posts) : dashboard.sentiments.taggedPosts.posts - (dashboard.sentiments.taggedPosts.negatives.posts + dashboard.sentiments.taggedPosts.positives.posts)),
                score: 0,
                color: "#eceb7c",
                positiveList: scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.neutrals.postList : (scoreTabSlctd.value === ESentimentToggle.TAGGED ? dashboard.sentiments.taggedPosts.neutrals.postList : dashboard.sentiments.topPosts.neutrals.postList)
              },
              {
                name: t('chart-pie-negative'),
                y: scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.negatives.posts : (scoreTabSlctd.value === ESentimentToggle.TOP ? dashboard.sentiments.topPosts.negatives.posts : dashboard.sentiments.taggedPosts .negatives.posts ),
                score:  scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.negatives.score : (scoreTabSlctd.value === ESentimentToggle.TAGGED ? dashboard.sentiments.taggedPosts.negatives.score : dashboard.sentiments.topPosts.negatives.score),
                color: "#ec7c7d",
                positiveList: scoreTabSlctd.value === ESentimentToggle.ALL ? dashboard.sentiments.allPosts.negatives.postList :(scoreTabSlctd.value === ESentimentToggle.TAGGED ? dashboard.sentiments.taggedPosts.negatives.postList : dashboard.sentiments.topPosts.negatives.postList)
              }]

        ),
        loading: computed( () => dashboard.sentiments.loading)
      }
    )


    /*****************
     * Competitors ***
     *****************/
    const cardCompetitors: ICardCompetitors = reactive(
      {
        title: t('dashboard-competitors-tittle'),
        loading: computed(() => dashboard.competitors.loading),
        rows: computed(() =>  dashboard.competitors.data.map( (row) => {
            return {
              competitor: row.hashtag,
              current_score: row.current_score || 0,
              current_score_pct: row.current_score_pct || 0,
              current_posts: row.current_posts || 0,
              prev_score: row.prev_score || 0,
              prev_score_pct: row.prev_score_pct || 0,
              prev_posts: row.prev_posts || 0,
              diff_period: percentageDifference({prev: row.prev_posts, current: row.current_posts}),
              time_series: row.posts_logs
            }
          })
        )
      }
    )

    /*******************
     * Popular Posts ***
     *******************/
    const cardPopularPosts: ICardPosts = reactive(
      {
        title: t('dashboard-popular-posts-tittle'),
        loading: computed(() => dashboard.popularPosts.loading),
        rows: computed(() =>  dashboard.popularPosts.data.map( row => {
          return {
              shortcode: row.shortcode,
              is_top: row.is_top,	//profile real name
              text: row.text,	//
              score: row.score,		//
              score_pct: row.score_pct,
              magnitude: row.magnitude,		//quantity of likes received by post
              magnitude_pct: row.magnitude_pct,		
              likes: row.likes,   //quantity of comments received by post
              comments: row.comments, //quantity of comments received by post
              createdAt: row.takenAt
            }
        }) )
      }
    )

    /*********************
     * Top Influencers ***
     *********************/
    // const cardsTopInfluencers: ComputedRef<Array<ICardTopInfluencers>> = reactive(computed(() => {
    //     return [{
    //       title: "instagram",
    //       rows: dashboard.topInfluencersLite.filter((row) => row.social === "instagram").map( (row) => {
    //         return {
    //           id: row.ig_id,
    //           name: row.username,
    //           email: row.full_name,
    //           avatar: row.profile_pic_url
    //         }
    //       })
    //     }]
    //   }))

    /*******************
     * Influencers ***
     *******************/
    let influencersTabSelected: Ref<string> = ref(EInfluencersToggle.USES);
		const influencersTabChanged = function(influencersTabTitle : string): void{
			influencersTabSelected.value = influencersTabTitle
		}

    const cardInfluencersTable: ICardInfluencers = reactive(
      {
        title: t('dashboard-top-influencers-tittle'),
        loading: computed(() => dashboard.topInfluencers.loading),
        rows: computed(() => {
          return ( influencersTabSelected.value === EInfluencersToggle.USES ? dashboard.topInfluencers.byHashtag : influencersTabSelected.value === EInfluencersToggle.LIKES ? dashboard.topInfluencers.byLikes : dashboard.topInfluencers.byComments).map( row => {
              return {
                username: row.username,
                fullname: row.full_name,
                profile_pic_url: row.profile_pic_url,
                posts: row.posts,
                followers: row.followers,
                hashtagMentions: row.hashtagMentions,
                likesByHashtag: row.likesByHashtag,
                commentsByHashtag: row.commentsByHashtag,
                }
            }) }
          )
      }
    )

    watch(
			() => [app.dateFilter,  app.socialMedia],
			() => {
        console.log('Dashboard Watch')
        dashboard.loadInfo(app.dateFilter, app.prvDateRange);
			},
			{ immediate: false, deep: true },
		);
    // watch(
		// 	() => app.socialMedia,
		// 	() => {
    //     dashboard.loadInfo(app.dateFilter, app.prvDateRange);
		// 	},
		// 	{ immediate: false, deep: true },
		// );

    onMounted(() => {
      console.log('Dashboard OnMounted')
      dashboard.loadInfo(app.dateFilter, app.prvDateRange);
    })

    return {
      dashboard,
      app,
      cardsArea,
      cardSelected,
      activeCard,
      cardTimeSeries,
      cardPackedBubble,
      cardCompetitors,
      cardPie,
      cardPopularPosts,
      // cardsTopInfluencers,
      cardInfluencersTable,
      influencersTabChanged,
      sentimentTabChanged
    }
  },
})
</script>
