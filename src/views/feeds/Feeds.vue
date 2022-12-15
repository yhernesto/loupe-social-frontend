<template>
	<app-page-wrapper :socialSelector="false">
    <!-- Searcher area -->
    <div class="row q-gutter-none justify-center">
      <!-- <div class="col-12 col-sm-5">
				<q-input
					rounded
					outlined
					bg-color="grey-3"
					v-model="textFilter"
					label="Search"
					@keyup.enter="feeds.getTopics(textFilter)"
				>
					<template v-slot:prepend>
						<q-icon name="search" />
					</template>
					<template v-slot:append>
						<q-icon name="close" @click="textFilter = ''" class="cursor-pointer" />
					</template>
				</q-input>
			</div> -->
      <div class="col-12 col-sm-8">
        <div class="row q-gutter-none q-mb-md justify-center">
          <div class="col-12 col-sm-5 q-ma-xs aumentedFontSize">
            <q-select
              v-model="feeds.country"
              filled
              :options="countries"
              label="Country"
              emit-value
              map-options
              @update:model-value="topicSectionChange('TOP')"
            />
          </div>
          <div class="col-12 col-sm-5 q-mx-xs q-mt-xs">
            <q-select
              v-model="feeds.language"
              filled
              :options="languages"
              label="Language"
              emit-value
              map-options
              @update:model-value="topicSectionChange('TOP')"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Trending -->
    <div class="row q-gutter-none q-mb-md">
      <div class="col">
        <q-card
          class="my-card"
          flat
          bordered
        >
          <q-card-section>
            <div class="row justify-between">
              <div class="col">
                <p
                  disabled
                  style="font-weight: bold;"
                >
                  {{ $t('feeds-trending-news') }}
                </p>
              </div>
            </div>
            <div
              v-if="feeds.getTrendingTopics().length"
              class="row justify-between"
            >
              <div class="col truncate-chip-labels">
                <q-chip
                  v-for="(trend, _idx) in feeds.getTrendingTopics()"
                  :key="'trend_' + _idx"
                  outline
                  color="primary"
                  text-color="white"
                  clickable
                  :title="trend.name"
                  :label="trend.name"
                  :selected="chipSelected === trend.name"
                  :class="chipSelected === trend.name ? 'select-chip': ''"
                  @click="toTrend(trend)"
                >
                  <!-- {{ trend.name }} -->
                </q-chip>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-gutter-none q-mb-md">
      <!-- Navitagor -->
      <div class="col-3">
        <q-card
          class="q-mr-md"
          flat
          bordered
        >
          <q-card-section>
            <div class="row justify-center q-my-sm">
              <div class="col">
                <q-list
                  padding
                  class="rounded-borders text-primary"
                >
                  <template
                    v-for="(topic, idx) in topics"
                    :key="'topic_' + idx"
                  >
                    <q-item
                      v-if="topic.sections === undefined || topic.sections.length === 0"
                      v-ripple
                      clickable
                      :active="feeds.topic === topic.topic"
                      active-class="my-menu-link"
                      @click="topicSectionChange(topic.topic)"
                    >
                      <q-item-section avatar>
                        <q-icon :name="topic.gf_icon" />
                      </q-item-section>
                      <q-item-section>{{ $t('feeds-topic-' + topic.topic) }}</q-item-section>
                    </q-item>
										
                    <q-expansion-item
                      v-else
                      expand-separator
                      icon="live_tv"
                      :label="topic.topic"
                    >
                      <q-item
                        v-for="(section, _idx) in topic.sections.sort((_prv, _next) => _prv.order < _next.order ? -1 : 1 )"
                        :key="'section_' + _idx"
                        v-ripple
                        clickable
                        :active="feeds.topic === topic.topic && feeds.section === section.name"
                        active-class="my-menu-link"
                        class="q-ml-lg"
                        @click="topicSectionChange(topic.topic, section.name)"
                      >
                        <q-item-section avatar>
                          <q-icon :name="section.gf_icon" />
                        </q-item-section>
                        <q-item-section>{{ $t('feeds-section-' + section.name) }}</q-item-section>
                      </q-item>
                    </q-expansion-item>
                  </template>
                </q-list>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- Feeds Area -->
      <div class="col-9">
        <div
          class="q-px-xs"
          style="width: 100%;"
        >
          <app-feeds-area :card-feeds-area="cardFeedsArea" />
        </div>
      </div>
    </div>
  </app-page-wrapper>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, computed, onMounted, Ref, ComputedRef } from 'vue'
import PageWrapper from '@/components/pageWrapper/PageWrapper.vue';
import feeds from '@/views/feeds/Feeds';
import { ITopics, ISelectOption, IWeightCol, IFeedsTrending } from './IFeeds'

import FeedsArea from './components/feedsArea/FeedsArea.vue'
import { ICardFeedsArea, IFeedsNewsRow } from './components/feedsArea/IFeedsArea'
import { useQuasar } from 'quasar'
import { Controller } from '../../Controller';
import { injectStrict } from '../../utils/injections';
import i18n from '@/plugins/i18n/i18n';

export default defineComponent({
	name: 'Feeds',

	components: {
    'app-page-wrapper': PageWrapper,
		'app-feeds-area': FeedsArea
	},

	setup() {
		console.log("setupFeeds!")
		const app: Controller = injectStrict('appController');

    const { t } = i18n.global;
	
		// Setting Default values
		feeds.country = app.user.profile?.country || null;
		feeds.language = app.user.profile?.language || null;
		feeds.topic = "TOP";

		const $q = useQuasar()
		/**
		 * Filter Search
		 */
		const textFilter: Ref<string> = ref('');

		// console.log('*************feeds.countriesLang:', feeds.countriesLang.map((_row: ICountryLang) => { return {label: _row.country, value: _row.country} }))
		const countries: ComputedRef<Array<ISelectOption>> = computed( () => feeds.countriesLang.map((_row) => { return {label: t('C-' + _row.country), value: _row.country} }) );
		
		const languages: ComputedRef<Array<ISelectOption>> = computed( () => feeds.countriesLang.find((_row) => _row.country == feeds.country )?.languages
																								.map((_language: string) => { return {label: t('L-' + _language), value: _language} }) || [])
		const chipSelected: Ref<string> = ref("");

		// watch(
		// 	() => languages,
		// 	() => {
		// 		// if (!languages.value.find((_row: ISelectOption) => _row.value == feeds.language))
		// 		// 	feeds.language = null
		// 	},
		// 	{ immediate: true, deep: true },
		// );

		/**
		 * 
		 */

		const toTrend = function(p_trend: IFeedsTrending) {
			chipSelected.value = p_trend.name;
			feeds.getTopics({direct_url : p_trend.url})
//			window.open('https://news.google.com/' + p_url, "_blank");
		}

		/**
		 * Topics Submenu
		 */

		const topics: ComputedRef<Array<ITopics>> = computed(() => feeds.topics.filter((_row) => _row.topic == 'TOP' || (_row.country == feeds.country && _row.lang == feeds.language))
																				.sort((_prv, _next) => _prv.order < _next.order ? -1 : 1))

		const topicSectionChange = function(p_topic: string | null, p_section: string | null = null): void {
			if(!feeds.language || !feeds.country){
				$q.notify({
					message: "Country and Language are required !",
					position: "top",
					timeout: 3000
				})
			} else {
				feeds.topic = p_topic;
				feeds.section = p_section;
				// Request for feeds
				if (textFilter.value)
					feeds.getTopics({search: textFilter.value});
				else
					feeds.getTopics({});
			}
		}


		/**
		 * Feeds area
		 */

		
		const cardFeedsArea: ICardFeedsArea = reactive({
				loading: computed(() => feeds.feeds.loading),
				rows: computed(() => {
					if (feeds.feeds.news){

						let weightColArr: Array<IWeightCol> = [];
						let numCols: number = 4; // real columns + 1
						let ratioSizeImg: number = 5;

						let _idx: number = 1;
						while (_idx < numCols) {
							weightColArr.push({col: _idx, weight: 0})
							_idx++;
						}

						return feeds.feeds.news.map((_row, _idx: number) => {

							let _currWeight: number = _row.image_url ? ratioSizeImg : 1;

							const _smallestCol = weightColArr.sort( (_prv: IWeightCol, _next: IWeightCol) => _prv.col < _next.col ? -1 : 1)
															.sort( (_prv: IWeightCol, _next: IWeightCol) => _prv.weight < _next.weight ? -1 : 1)

							_smallestCol[0].weight += _currWeight
							return {
								index: _idx,
								col: _smallestCol[0].col,
								title: _row.title,
								image_url: _row.image_url,
								source: _row.source
							}
						})
					}
					return []}
				)
			})

		cardFeedsArea.rows.map((_row: IFeedsNewsRow) => _row.col)

		onMounted(() => {
			feeds.loadInfo().then(() => feeds.getTopics({}));
		})

		return {
			feeds,
			textFilter,
			
			countries,
			languages,

			chipSelected,
			toTrend,

			topics,
			topicSectionChange,

			cardFeedsArea,
		}
	},
})
</script>
<style lang="sass" scoped>
.my-menu-link
  color: white
  background: #F2C037

.truncate-chip-labels > .q-chip
  max-width: 200px

.select-chip
  background-color: #E5D9FC !important
</style>