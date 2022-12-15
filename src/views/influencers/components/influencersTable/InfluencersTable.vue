<template>
  <app-card-section-wrapper :card-section="cardInfluencersTable">
    <div
      class="row q-gutter-none"
      style="min-height: 100vh;"
    >
      <div class="col">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          :visible-columns="visibleCols"
          :dense="$q.screen.lt.md"
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="vertical-middle text-italic bg-primary text-white my-table-details aumentedFontSize"
                style="text-align: center; "
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template #body-cell-usernameCol="props">
            <q-td
              :props="props"
              :auto-width="true"
            >
              <div class="row q-gutter-none q-pr-xl  ">
                <div class="col ">
                  <!-- <div> -->
                  <q-avatar>
                    <!-- <q-img :src="props.row.profile_pic_url">
												<template v-slot:error> -->
                    <div
                      class="row"
                      style="height: 50%;"
                      >
                      {{ props.row.username[0].toLocaleUpperCase() }}
                    </div>
                    <!-- </template>
											</q-img> -->
                  </q-avatar>
                  <!-- </div> -->
                </div>
                <div
                  class="col cursor-pointer"
                  @click="goToInstagram(props.row.username)"
                >
                  <span 
                  class="aumentedFontSize"
                  >
                  {{ props.row.full_name }}
                  </span>
                  <br>
                  <span><i>{{ props.row.username }}</i></span>
                </div>
              </div>
            </q-td>
          </template>
          <template #body-cell-scoreCol="props">
            <q-td :props="props">
              <span style="white-space: normal;">
                <app-score-component :score-information="{percentageNum:props.row.score_pct, color: getScoreColorByPct(props.row.score_pct), numDisplayed: props.row.hashtagScore, iconName:'sports_score' }" />
              </span>
            </q-td>
          </template>
          <template #body-cell-lastTextCol="props">
            <q-td :props="props">
              <div
                  @click="goToInstagramPost(rows.find((e) => props.row.lastText.slice(0,100) === e.lastText.slice(0,100)).shourtCode)"
              >
              <span style="white-space: normal;">
                {{ props.row.lastText }}
              </span>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { ICardInfluencers, IInfluencerRow } from './IInfluencersTable'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue'
import { getScoreColorByPct } from '@/utils/colors';
import ScoreComponent from '@/components/scoreComponent/ScoreComponent.vue';
import i18n from "@/plugins/i18n/i18n"

export default defineComponent({
	name: 'InfluencersTable',
	components: {
		'app-card-section-wrapper': CardSectionWrapper,
    'app-score-component': ScoreComponent
	},
	props:{
		cardInfluencersTable: {
			type: Object as () => ICardInfluencers,
			required: true
		},
	},
	setup (props) {

		const visibleCols = ["usernameCol", "biographyCol", "postsCol", "followersCol", "mentionsCol", "likesCol", "commentsCol", "scoreCol", "lastTextCol"]
		const columns = [
			{
				name: 'usernameCol',
				required: true,
				label: 'Influencer',
				align: 'left',
				field: (row: IInfluencerRow) => row.username,
				format: (val: string) => `${val}`,
				sortable: true,
				icon: '',
			},
			{ name: 'fullnameCol', align: 'center', label: 'Full Name', field: 'full_name', visible: false},
			{ name: 'imageCol', align: 'center', label: 'Icon Profile', field: 'profile_pic_url', visible: false},
			{ name: 'biographyCol', align: 'center', label: i18n.global.t("influencers-column-biography") , field: 'biography', visible: true, style: 'white-space: normal; text-align: justify !important; font-size: 16px'},
			{ name: 'postsCol', align: 'center', label: i18n.global.t("influencers-column-global-posts"), field: 'posts', visible: true, style: 'white-space: normal; text-align: justify !important; font-size: 16px'},
			{ name: 'followersCol',  align: 'center', label: i18n.global.t("influencers-column-global-followers"), field: 'followers', sortable: true , style: 'white-space: normal; text-align: justify !important; font-size: 16px'},
			{ name: 'mentionsCol', align: 'center', label: i18n.global.t("influencers-column-uses"), field: 'hashtagMentions', sortable: true, style: 'white-space: normal; text-align: justify !important; font-size: 16px'},
			{ name: 'likesCol', align: 'center', label: i18n.global.t("influencers-column-likes"), field: 'likesByHashtag', sortable: true, style: 'white-space: normal; text-align: justify !important; font-size: 16px'},
			{ name: 'commentsCol', align: 'center', label: i18n.global.t("influencers-column-comments"), field: 'commentsByHashtag', sortable: true, style: 'white-space: normal; text-align: justify !important; font-size: 16px'},
			{ name: 'scoreCol', align: 'center', label: i18n.global.t("influencers-column-score"), field: 'hashtagScore', sortable: true, style: 'white-space: normal; text-align: justify !important;'},
			{ name: 'lastTextCol', align: 'center', label: i18n.global.t("influencers-column-last-post"), field: 'lastText', sortable: false, style: 'white-space: normal; text-align: justify !important; font-size: 16px'}
		]
	
		const rows: Array<IInfluencerRow> = reactive([]);
    const igRoute: string = 'https://www.instagram.com'

		const goToInstagram = (userName: string) => {
			window.open(`${igRoute}/${userName}/`);
		}

    const goToInstagramPost = (shourtCdoe: string) => {
      window.open(`${igRoute}/p/${shourtCdoe}/`)
    }
    /*const scoreComponent: IScoreModel = reactive({
      score_pct: props.cardInfluencersTable.rows.map(e => e.score_pct),
      color:"3",
      scoreByHashtag: 5
    })*/

    watch(
        () => props.cardInfluencersTable.rows,
        () => {
            const newRows = props.cardInfluencersTable.rows
            rows.splice(0, rows.length, ...newRows)
        },
        { immediate: true, deep: true },
    );

		return {
			columns,
			rows,
			visibleCols,
			getScoreColorByPct,
			/**
			 * Methods 
			 */
			goToInstagram,
      goToInstagramPost
     // scoreComponent
		}
	}
	})
</script>

<style scoped>
.my-table-detaills {
  vertical-align: text-top;
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  color: #555;
  margin-top: 4px;
}
.my-table-details {
  white-space: normal !important;
  vertical-align: middle;
  text-align: center;
  align-items: center !important;
}
</style>