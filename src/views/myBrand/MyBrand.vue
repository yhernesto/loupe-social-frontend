<template>
  <app-page-wrapper :date-selector="true">
    <div
        class="text-h4"
        style="font-weight: bold; font-size: 32px"
    >
      {{ myBrand.getFullName() }}
      <br>
      <span style="color: #828282;  font-size: 12px">{{ myBrand.getUserName() }}</span>
    </div>

    <div class="row">
      <div class="col col-12 col-md-8">
        <q-card
            class="my-card"
            flat
            bordered
        >
          <q-card-section>
            <div class="row justify-center igStatInfo">
              <!--<div class="col-1 self-left">
                <q-btn
                padding="xl"
                color="primary"
                round
                icon="cloud_upload"
                />
              </div>-->
              <div class="col self-center ">
                <span style="color: #828282">{{ $t('my-brand-information-posts') }}</span>
                <br>
                <span style="font-weight: bold; font-size: 20px">{{ myBrand.getTotalPosts() }}</span>
              </div>

              <div class="col self-center ">
                <span style="color: #828282">{{ $t('my-brand-information-followers') }}</span>
                <br>
                <span style="font-weight: bold; font-size: 20px">{{ myBrand.getFollowers() }}</span>
              </div>

              <div class="col self-center ">
                <span style="color: #828282">{{ $t('my-brand-information-following') }}</span>
                <br>
                <span style="font-weight: bold; font-size: 20px">{{ myBrand.getFollowing() }}</span>
              </div>
              <div class="col self-center ">
                <span style="color: #828282">IGTVs</span>
                <br>
                <span style="font-weight: bold; font-size: 20px">{{ myBrand.getIgtvs() }}</span>
              </div>
              <div class="col self-center ">
                <span style="color: #828282">{{ $t('my-brand-information-tags') }}</span>
                <br>
                <span style="font-weight: bold; font-size: 20px">{{ myBrand.getTags() }}</span>
              </div>
            </div>
            <q-inner-loading
                :showing="myBrand.profileInfo === null || myBrand.profileInfo.loading"
                label="Please wait..."
                label-style="font-size: 1.1em"
            />
          </q-card-section>
        </q-card>

        <div class="row q-gutter-none q-mb-md ">
          <div
              v-for="(ratingCard, idx) in ratingCards"
              :key="'card_' + idx"
              class="col q-px-xs "
          >
            <app-rating-card
                class="cardInfoByPeriod"
                :rating-card="ratingCard"
            />
          </div>
        </div>
        <br>
      </div>
      <div class="col-12 col-md-4 ">
        <app-chart-pie
            class="myChartPie"
            :card-pie="cardPie"
        />
      </div>
    </div>
    <div class="row q-gutter-none q-mb-md">
      <div
          class="q-px-xs"
          style="width: 100%"
      >
        <app-chart-heat-map
            :card-heat-map="cardHeatMap"
            @selected="heatMapChanged"
        />
      </div>
    </div>
    <div class="row q-gutter-none q-mb-md">
      <div class="col-12 col-md-6">
        <div
            class="q-px-xs"
            style="width: 100%; height: 100%;"
        >
          <app-best-times-table-card
              :best-times-table-card="bestTimeTableCard"
              @selected="bestTimeTabSelectedChanged"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div
            class="q-px-xs"
            style="width: 100% ;height: 100%;"
        >
          <app-chart-column
              :card-column="cardViewsColumn"
              color="#1de9b6"
              @selected="viewsColumnChanged"
          />
        </div>
      </div>
    </div>
    <div class="row q-gutter-none q-mb-md">
      <div class="col-12 col-md-6">
        <div
            class="q-px-xs"
            style="width: 100%"
        >
          <app-chart-column
              :card-column="cardHashtag"
              color="#fcc572"
              @selected="hashtagModeChanged"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div
            class="q-px-xs"
            style="width: 100%"
        >
          <app-chart-column
              :card-column="cardLenPost"
              color="#ffe588"
              @selected="lengthPostModeChanged"
          />
        </div>
      </div>
    </div>
    <div class="row q-gutter-none q-pb-md">
      <div
          class="q-px-xs"
          style="width: 100%"
      >
        <app-chart-column
            color="#b39ddb"
            :card-column="cardProgressByWeekDay"
            @selected="progressByWeekDayChanged"
        />
      </div>
    </div>
  </app-page-wrapper>
</template>

<script lang='ts'>
import { defineComponent, reactive, computed, Ref, ref, watch } from 'vue';
import { Controller } from '../../Controller';
import { injectStrict } from '../../utils/injections';
import PageWrapper from '@/components/pageWrapper/PageWrapper.vue';
import myBrand, { EHeatMapToggle } from './MyBrand';
import { getWeekday } from '@/utils/date'
import RatingCard, { IRatingCard } from './components/ratingCard/RatingCard.vue';
import ChartHeatMap from './components/chartHeatMap/ChartHeatMap.vue'
import { IHeatMapData } from '@/views/myBrand/components/chartHeatMap/IChartHeatMap'
import { ICardHeatMap } from './components/chartHeatMap/ChartHeatMap'
import BestTimesTableCard, { IBestTimeTableCard } from './components/bestTimesTableCard/BestTimesTableCard.vue';
import ChartColumn from './components/chartColumn/ChartColumn.vue'
import { ICardColumn } from './components/chartColumn/ChartColumn'
import { ICardPie } from '@/components/chartPie/ChartPie';
import ChartPie from "@/components/chartPie/ChartPie.vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: 'MyBrand',
  components: {
    'app-page-wrapper': PageWrapper,
    'app-rating-card': RatingCard,
    'app-chart-pie': ChartPie,
    'app-chart-heat-map': ChartHeatMap,
    'app-best-times-table-card': BestTimesTableCard,
    'app-chart-column': ChartColumn,
  },
  setup () {
    const { t } = useI18n({ useScope: 'global' })
    const app: Controller = injectStrict('appController');
    /**
     * Ratings
     */
    const ratingCards: IRatingCard[] = reactive([
      {
        title:"Media",
        amount: computed(() => myBrand.getMediaInfo().amount),
        diffs: computed(() => myBrand.getMediaInfo().diff),
        loading: computed(() => myBrand.profileInfo === null || myBrand.profileInfo.loading)
      },
      {
        title: t('my-brand-information-followers'),
        amount: computed(() => myBrand.getFollowersInfo().amount),
        diffs: computed(() => myBrand.getFollowersInfo().diff),
        loading: computed(() => myBrand.profileInfo === null || myBrand.profileInfo.loading)
      },
      {
        title: t('my-brand-information-following'),
        amount: computed(() => myBrand.getFollowingInfo().amount),
        diffs: computed(() => myBrand.getFollowingInfo().diff),
        loading: computed(() => myBrand.profileInfo === null || myBrand.profileInfo.loading)
      },
      {
        title: 'Igtvs',
        amount: computed(() => myBrand.getIgtvsInfo().amount),
        diffs: computed(() => myBrand.getIgtvsInfo().diff),
        loading: computed(() => myBrand.profileInfo === null || myBrand.profileInfo.loading)
      },
      {
        title: t('my-brand-information-tags'),
        amount: computed(() => myBrand.getTagsInfo().amount),
        diffs: computed(() => myBrand.getTagsInfo().diff),
        loading: computed(() => myBrand.profileInfo === null || myBrand.profileInfo.loading)
      },
    ])
    /**
     * Chart Pie -> Sentiments
     */
    const cardPie: ICardPie = reactive(
        {
          title:  t('dashboard-sensation-tittle'),
          score: computed( ()=> myBrand.sentiments.allComments.score),
          data: computed(()=>[
            {
              name: t('chart-pie-positive'),
              y: myBrand.sentiments.allComments.positives.posts,
              color: "#7dec7c",
              positiveList: myBrand.sentiments.allComments.positives.postList
            },
            {
              name: t('chart-pie-neutral'),
              y: (myBrand.sentiments.allComments.posts -(myBrand.sentiments.allComments.negatives.posts + myBrand.sentiments.allComments.positives.posts)),
              color: "#eceb7c",
              positiveList: myBrand.sentiments.allComments.neutrals.postList
            },
            {
              name: t('chart-pie-negative'),
              y: myBrand.sentiments.allComments.negatives.posts,
              color: "#ec7c7d",
              positiveList: myBrand.sentiments.allComments.negatives.postList
            }
          ]),
          loading: computed(() => myBrand.sentiments.loading)
        }
    )

    /**
     * Heat Map
     */
    let heatMapSelected: Ref<string> = ref(EHeatMapToggle.LIKES);
    const heatMapChanged = function(heatMapTitle : string): void{
      heatMapSelected.value = heatMapTitle
    }
    const cardHeatMap: ICardHeatMap = reactive({
      title: t('my-brand-optimal-post-time-tittle'),
      toggles: [
        {label: t(EHeatMapToggle.LIKES), value: EHeatMapToggle.LIKES, selected: true},
        {label: t(EHeatMapToggle.COMMENTS), value: EHeatMapToggle.COMMENTS, selected: false}
      ],
      loading: computed(() => myBrand.bestTimeToPost.loading),
      data: computed(() => {
        const bestTimeToPost: Array<IHeatMapData> = myBrand.bestTimeToPost.days.reduce( (acc, currDay) =>
                [...acc, ...(currDay.hoursStats.map( (hour) => {
                  return {
                    weekDay: currDay.day_number,
                    hour: hour.hour,
                    total: heatMapSelected.value === EHeatMapToggle.LIKES ? hour.diffLikes || 0 : hour.diffComments || 0
                  }
                }))]
            ,[] as Array<IHeatMapData>)

        const days: Array<number> = Array.from({length: 7}, (_, i) => i + 0);
        const hours: Array<number> = Array.from({length: 24}, (_, i) => i + 0);
        // Nested array copy
        const copyBestTimeToPost: Array<IHeatMapData> = JSON.parse(JSON.stringify(bestTimeToPost));
        days.forEach((day: number) => {
          hours.forEach((hour: number) => {
            if(!copyBestTimeToPost.find((_row: IHeatMapData) => _row.weekDay === day && _row.hour === hour)){
              copyBestTimeToPost.push({weekDay: day, hour: hour, total: 0});
            }
          })
        })
        return copyBestTimeToPost.map((_row: IHeatMapData) => {
          return [_row.hour, _row.weekDay, _row.total]
        })
      })
    })
    /**
     * Best time to post
     */
    const bestTimeTabSelected: Ref<string> = ref(EHeatMapToggle.LIKES);
    const bestTimeTabSelectedChanged = function(bestTimeTabSelectedTabTitle : string): void{
      bestTimeTabSelected.value = bestTimeTabSelectedTabTitle
    }
    const bestTimeTableCard: IBestTimeTableCard = reactive({
      title: t('my-brand-best-time-post-tittle'),
      toggles: [
        {label: "Likes", value: EHeatMapToggle.LIKES, selected: true},
        {label: t('global-comments'), value: EHeatMapToggle.COMMENTS, selected: false},
      ],
      loading: computed(() => myBrand.topTimeToPost.loading),
      rows: computed(() => {
        if (bestTimeTabSelected.value === EHeatMapToggle.LIKES)
          return myBrand.topTimeToPost.likes.map((elem) => {
            return {
              day: `${t(getWeekday(elem.day_number === 7 ? 0 :elem.day_number, true))}`,
              hour: `${elem.day_hour}`,
              total: elem.likes
            }
          })
        return myBrand.topTimeToPost.comments.map((elem) => {
          return {
            day: `${t(getWeekday(elem.day_number === 7 ? 0 : elem.day_number, true))}`,
            hour: `${elem.day_hour}`,
            total: elem.comments
          }
        })
      })
    })
    /**
     * Columns Views
     */

    let viewsColumnSelected: Ref<string> = ref(EHeatMapToggle.LIKES);
    const viewsColumnChanged = function(columnTitle : string): void{
      viewsColumnSelected.value = columnTitle
    }
    const cardViewsColumn: ICardColumn = reactive({
      title: t('my-brand-uses-of-hashtag-tittle'),
      loading: computed(() => myBrand.hashtagStats.loading),
      toggles: [
        {label: t(EHeatMapToggle.LIKES), value: EHeatMapToggle.LIKES, selected: true},
        {label: t(EHeatMapToggle.COMMENTS), value: EHeatMapToggle.COMMENTS, selected: false},
      ],
      series:  [{
        type: 'column',
        name: 'Average stats',
        data: computed(() => {
          return myBrand.hashtagStats.data.map((stat) => {
            return [stat.hashtag, viewsColumnSelected.value === EHeatMapToggle.LIKES ? stat.avgLikes : stat.avgComments]
          })
        })
      }]
    })
    /**
     * Number of Hashtag Histogram
     */

    let hashtagModeSelected: Ref<string> = ref(EHeatMapToggle.LIKES);
    const hashtagModeChanged = function(hashtagModeTitle : string): void{
      hashtagModeSelected.value = hashtagModeTitle
    }
    const cardHashtag: ICardColumn = reactive({
      title: t('my-brand-number-hashtag-tittle'),
      loading: computed(() => myBrand.postsTextStats.loading),
      toggles: [
        {label: t(EHeatMapToggle.LIKES), value: EHeatMapToggle.LIKES, selected: true},
        {label: t(EHeatMapToggle.COMMENTS), value: EHeatMapToggle.COMMENTS, selected: false},
        {label: t(EHeatMapToggle.FREQUENCY), value: EHeatMapToggle.FREQUENCY, selected: false},
      ],
      series:  [{
        type: 'column',
        name: 'Hashtag number',
        data: computed(() => {
          return myBrand.postsTextStats.numberOfHashtagStats.map(( stat ) => {
            return {
              name: stat.range,
              y: hashtagModeSelected.value === EHeatMapToggle.LIKES ? stat.stats.avgLikes : hashtagModeSelected.value === EHeatMapToggle.COMMENTS ? stat.stats.avgComments : stat.stats.times,
            }
          })
        })
      }],
    })
    /**
     * Length of Posts Histogram
     */

    let lengthPostModeSelected: Ref<string> = ref(EHeatMapToggle.LIKES);
    const lengthPostModeChanged = function(lengthPostModeTitle : string): void{
      lengthPostModeSelected.value = lengthPostModeTitle
    }
    const cardLenPost: ICardColumn = reactive({
      title: t('my-brand-length-post-tittle'),
      loading: computed(() => myBrand.postsTextStats.loading),
      toggles: [
        {label: t(EHeatMapToggle.LIKES), value: EHeatMapToggle.LIKES, selected: true},
        {label: t(EHeatMapToggle.COMMENTS), value: EHeatMapToggle.COMMENTS, selected: false},
        {label: t(EHeatMapToggle.FREQUENCY), value: EHeatMapToggle.FREQUENCY, selected: false},
      ],
      series:  [{
        type: 'column',
        name: 'Length characters',
        data: computed(() => {
          return myBrand.postsTextStats.postsLengthStats.map(( stat ) => {
            return {
              name: stat.range,
              y: lengthPostModeSelected.value === EHeatMapToggle.LIKES ? stat.stats.avgLikes : lengthPostModeSelected.value === EHeatMapToggle.COMMENTS ? stat.stats.avgComments : stat.stats.times,
            }
          })
        })
      }],
    })

    /**
     * Likes by Day / Hour
     */
    const progressByWeekDaySelected: Ref<string> = ref(EHeatMapToggle.LIKES);
    const progressByWeekDayChanged = function(progressByWeekDayTitle : string): void{
      progressByWeekDaySelected.value = progressByWeekDayTitle
    }
    const cardProgressByWeekDay: ICardColumn = reactive({
      title: t('my-brand-by-week-day-tittle'),
      loading: computed(() => myBrand.statsProgressByWeekDay.loading),
      toggles: [
        {label: t(EHeatMapToggle.LIKES), value: EHeatMapToggle.LIKES, selected: true},
        {label: t(EHeatMapToggle.COMMENTS), value: EHeatMapToggle.COMMENTS, selected: false},
      ],
      series:  [{
        type: 'column',
        name: t('my-brand-week-days'),
        data: computed(() => {
          return myBrand.statsProgressByWeekDay.data.map(( stat ) => {
            return {
              name: t(`${getWeekday(stat.day_number === 7 ? 0 : stat.day_number )}`),
              y: progressByWeekDaySelected.value === EHeatMapToggle.LIKES ? stat.likes : stat.comments,
              //drilldown: `${getWeekday(stat.day_number === 7 ? 0 : stat.day_number)}`
            }
          })
        })
      }],
      // seriesDrillDown: computed(() => {
      // 					return groupBy(myBrand.getHeatMapData( EHeatMapToggle.LIKES ), ['weekDay'])
      // 						.sort((a: IHeatMapData, b: IHeatMapData) => a.weekDay > b.weekDay ? 1 : -1)
      // 						.map((_row: IHeatMapData)  => {
      // 							return {
      // 										type: 'column' as 'column',
      // 										name: `${getWeekday(_row.weekDay)}`,
      // 										id: `${getWeekday(_row.weekDay)}`,
      // 										data: myBrand.getHeatMapData( EHeatMapToggle.LIKES )
      // 												.filter((_rowDay: IHeatMapData) =>_rowDay.weekDay === _row.weekDay)
      // 												.sort((a: IHeatMapData, b: IHeatMapData) => a.hour > b.hour ? 1 : -1)
      // 												.map((_rowHour: IHeatMapData) => {
      // 													return [
      // 														_rowHour.hour,
      // 														_rowHour.total
      // 													]
      // 												})

      // 									}
      // 						})
      // 				})
    })
    watch(
        () => app.dateFilter,
        () => {
          myBrand.loadInfo(app.dateFilter, app.prvDateRange);
        },
        { immediate: true, deep: true },
    );
    return {
      myBrand,
      cardPie,
      ratingCards,
      cardHeatMap,
      heatMapChanged,
      bestTimeTableCard,
      bestTimeTabSelectedChanged,
      cardViewsColumn,
      viewsColumnChanged,
      cardHashtag,
      hashtagModeChanged,
      cardLenPost,
      lengthPostModeChanged,
      cardProgressByWeekDay,
      progressByWeekDayChanged,
      t
    }
  },
})
</script>

<style scoped>
.myChartPie{
  margin-left: 40px;
  margin-right: 8px;
}
.igStatInfo{
  height: 155px;
  padding-left: 5%;
  border-bottom: 100px;
}
.cardInfoByPeriod{
  margin-top: 10px;
  height: 150px;
  display: grid;
  place-items: center;
  align-items: center;
}
</style>
