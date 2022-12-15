<template>
  <app-page-wrapper :date-selector="true">
    <app-influencers-table :card-influencers-table="cardInfluencersTable" />
  </app-page-wrapper>
</template>

<script lang='ts'>
import { defineComponent, reactive, onBeforeMount, computed, watch } from 'vue';
import { Controller } from '../../Controller';
import { injectStrict } from '@/utils/injections';
import PageWrapper from '@/components/pageWrapper/PageWrapper.vue'
import InfluencersTable from '@/views/influencers/components/influencersTable/InfluencersTable.vue';
import { ICardInfluencers } from '@/views/influencers/components/influencersTable/IInfluencersTable'

import influencers from '@/views/influencers/Influencers'

export default defineComponent({
	name: 'Influencers',
	components: {
		'app-page-wrapper': PageWrapper,
		'app-influencers-table': InfluencersTable
	},
	setup () {
		const app: Controller = injectStrict('appController');

		const cardInfluencersTable: ICardInfluencers = reactive({
			title: "Influencers",
			loading: computed(() => influencers.topInfluencers.loading),
			rows: computed(() => {
							return influencers.topInfluencers.data.map((row) => {
								return {
									username: row.username,
									full_name: row.full_name.length > 15 ? row.full_name.substr(0,14) + '...' : row.full_name,
									biography: row.biography,
									profile_pic_url: row.profile_pic_url,
									posts: row.posts,							//global profile stat
									followers: row.followers,					//global profile stat
									hashtagMentions: row.hashtagMentions,		//posts using hashtag name
									likesByHashtag: row.likesByHashtag,			//likes of posts using hashtag
									commentsByHashtag: row.commentsByHashtag,	//comments of posts using hashtag
									hashtagScore: row.scoreByHashtag,				//AVG score of posts using hashtag
									score_pct: row.score_pct,
									lastText: (row.LastHashtagPost?.text.length! < 150? row.LastHashtagPost?.text :row.LastHashtagPost?.text.substr(0,150) ) || "",
                  shourtCode: row.LastHashtagPost?.shortcode
								}
							})
						})
		})

		watch(
			() => [app.dateFilter,  app.socialMedia],
			() => {
				influencers.loadInfo(app.dateFilter);
			},
			{ immediate: false, deep: true },
		);

		onBeforeMount(() => {
			console.log('Dashboard OnMounted')
			influencers.loadInfo(app.dateFilter);
		})

		return {
			cardInfluencersTable
		}
	},
})
</script>
