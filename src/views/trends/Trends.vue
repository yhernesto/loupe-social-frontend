<template>
	<app-page-wrapper :date-selector="true">
		<div class="row q-gutter-none q-mb-md">
			<div class="col-12 col-sm-12 q-px-xs">
				<app-chart-packed-bubble :card-packed-bubble="instagramCardPackedBubble" />
			</div>
		</div>
	<div class="row q-gutter-none q-pb-md">
		<div class="col-12 col-sm-12 q-px-xs">
			<app-top-trends-table :card-top-trends="cardTopTrends" />
		</div>
	</div>		
	<div class="row q-gutter-none q-pb-md">
	<!-- <div class="col-12 col-sm-8 q-px-xs">
		<app-top-trends-table :card-top-trends="cardTopTrends" />
	</div> -->
	<div class="col-12 col-sm-4 q-px-xs">
		<app-less-trends-list :card-less-trends="cardLessTrends" />
	</div>
	<div class="col-12 col-sm-8 q-px-xs">
		<app-latest-trends-list :card-latest-trends="cardLatestTrends" />
	</div>
	</div>
	<div class="row q-gutter-none q-pb-md">
	<div class="col-12 col-sm-12 q-px-xs">
		<app-posts-table :card-posts="cardLatestPosts" />
	</div>
	</div>
  </app-page-wrapper>
</template>

<script lang='ts'>
import { defineComponent, reactive, computed, watch, ComputedRef } from 'vue';
import { Controller } from '../../Controller';
import { injectStrict } from '../../utils/injections';

import trends from './Trends';
import PageWrapper from '@/components/pageWrapper/PageWrapper.vue';

import ChartPackedBubble from './components/chartPackedBubble/ChartPackedBubble.vue';
import { ICardPackedBubble } from './components/chartPackedBubble/ChartPackedBubble';

import TopTrendsTable from './components/topTrendsTable/TopTrendsTable.vue';
import { ICardTrends } from './components/topTrendsTable/ITopTrendsTable';

import LessTrendsList from './components/lessTrendsList/LessTrendsList.vue';
import { ICardLessTrends } from './components/lessTrendsList/ILessTrendsList'
import LatestTrendsList from './components/latestTrendsList/LatestTrendsList.vue';
import { ICardLatestTrends } from './components/latestTrendsList/ILatestTrendsList';
import { percentageDifference } from '../../utils/mathUtils';
import { ICardPosts } from './components/postsTable/PostsTable';
import PostsTable from './components/postsTable/PostsTable.vue'
import i18n from '@/plugins/i18n/i18n';

export default defineComponent({
	name: 'Trends',
	components: {
		'app-page-wrapper': PageWrapper,
		'app-chart-packed-bubble': ChartPackedBubble,
		'app-top-trends-table': TopTrendsTable,
		'app-less-trends-list': LessTrendsList,
		'app-latest-trends-list': LatestTrendsList,
		'app-posts-table': PostsTable,
	},
	setup () {
		const app: Controller = injectStrict('appController');

		/***************************
		 * Instagram PackedBubble ***
		 ***************************/
		const instagramCardPackedBubble: ICardPackedBubble = reactive({
			title: 'Instagram',
			loading: computed(() => trends.instagramRating.loading),
			zMin: computed(() => trends.instagramRating.min),
			zMax: computed(() => trends.instagramRating.max),
			labelThreshold: computed(() => Math.floor((trends.instagramRating.max - trends.instagramRating.min) * 0.85)),
			series: computed(() =>
					trends.instagramRating.relation_logs.map( (row) => {
						return {
							type: "packedbubble" as 'packedbubble',
							name: row.hashtag,
							data: [{
								name: row.hashtag,
								value: row.occurrences
							}]
						}
					})
					)
		})

		/******************
		 * Trends Table ***
		 ******************/
		const cardTopTrends: ICardTrends = reactive({
			title: i18n.global.t('trends-top-trends-tittle'),
			loading: computed(() => trends.instagramRating.loading || trends.prvInstagramRating.loading),
			rows: computed(() =>  trends.instagramRating.relation_logs.map( (_row) => {
				let lastOccurrence: number = trends.prvInstagramRating.relation_logs.find( (_relation) => _relation.hashtag.normalize("NFD") === _row.hashtag.normalize("NFD"))?.occurrences || 0

				return {
					topic: _row.hashtag,
					posts: _row.occurrences,
					lastPosts: lastOccurrence,
					lastPeriod: percentageDifference({prev: lastOccurrence, current: _row.occurrences}),
				}
			}))
		})

		/**********************
		 * Less Used Trends ***
		 **********************/
		const cardLessTrends: ComputedRef<ICardLessTrends> = reactive(computed(() => {
			return {
				title: i18n.global.t('trends-less-used-hashtag-tittle'),
				rows: trends.lessUsedHashtags.data,
				loading: trends.lessUsedHashtags.loading
			}
		}))

		/**************************
		 *** Latest Used Trends ***
		 **************************/
		const cardLatestTrends: ComputedRef<ICardLatestTrends> = reactive(computed(() => {
			return {
				title: i18n.global.t('trends-latest-used-hashtag-tittle'),
				rows: trends.latestUsedHashtags.data,
				loading: trends.latestUsedHashtags.loading
			}
		}))

		/**************************
		 *** Latest Hashtag Posts ***
		 **************************/
		const cardLatestPosts: ICardPosts = reactive({
			title: i18n.global.t('trends-latest-post-using-tittle'),
			loading: computed(() => trends.latestHashtagPosts.loading),
			rows: computed(() =>  trends.latestHashtagPosts.data.map( row => {
				return {
					shortcode: row.shortcode,
					is_top: row.is_top,	//profile real name
					text: row.text,	//
					score: row.score,		//
					magnitude: row.magnitude,		//quantity of likes received by post
					likes: row.likes,   //quantity of comments received by post
					comments: row.comments,   //quantity of comments received by post
					createdAt: row.takenAt,
          score_pct: row.score_pct,
          magnitude_pct: row.magnitude_pct
				}
			}) )
		})

		watch(
			() => [app.dateFilter,  app.socialMedia],
			() => {
				trends.loadInfo(app.dateFilter, app.prvDateRange);
			},
			{ immediate: true, deep: true },
		);

		return {
			instagramCardPackedBubble,
			cardTopTrends,
			cardLessTrends,
			cardLatestTrends,
			cardLatestPosts
		}
	},
})
</script>
