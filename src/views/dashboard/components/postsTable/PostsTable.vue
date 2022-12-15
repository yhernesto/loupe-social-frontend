<template>
  <app-card-section-wrapper :card-section="cardPosts">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleCols"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-italic bg-primary text-white aumentedFontSize"
          >
            {{ col.label }} <q-icon
              size="24px"
              :name="col.icon"
            />
          </q-th>
        </q-tr>
      </template>
      <template #body-cell-score="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            <app-score-component :score-information="{percentageNum:props.row.score_pct, color:getScoreColorByPct(props.row.score_pct) , numDisplayed: props.row.score, iconName:'sports_score' }" />
          </span>
        </q-td>
      </template>
      <template #body-cell-magnitude="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            <app-score-component :score-information="{percentageNum:props.row.magnitude_pct, color:getMagnitudeColorByPct(props.row.score_pct, props.row.magnitude_pct) , numDisplayed: props.row.magnitude, iconName:'thermostat' }" />
          </span>
        </q-td>
      </template>
      <template #body-cell-text="props">
        <q-td :props="props">
          <div
            class="col cursor-pointer" 
            @click="goToInstagramPost(props.row.shortcode)"
          >
            <!-- https://developer.mozilla.org/es/docs/Web/CSS/text-overflow -->
            <span
                class="aumentedFontSize"
                style="white-space: initial; text-align: justify !important;"
                >
              {{ props.row.text }}
            </span>
          </div>
        </q-td>
      </template>
      <template #body-cell-createdAt="props">
        <q-td :props="props">
          <!-- https://developer.mozilla.org/es/docs/Web/CSS/text-overflow -->
          <span
              class="aumentedFontSize"
              style="white-space: initial;"
              >
            {{ getDateTimeFormatted(new Date(props.row.createdAt * 1000)) }}
          </span>
        </q-td>
      </template>
    </q-table>
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, /*onMounted,*/ watch } from 'vue';
import { ICardPosts, IPostsRow } from './PostsTable'
import { getDateTimeFormatted } from '@/utils/date'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue'
import { getScoreColorByPct, getMagnitudeColorByPct } from '@/utils/colors';
import ScoreComponent from "@/components/scoreComponent/ScoreComponent.vue";

import { useI18n } from 'vue-i18n'

export default defineComponent({
	name: 'PostTable',
	components: {
        'app-score-component' : ScoreComponent,
        'app-card-section-wrapper': CardSectionWrapper
    },
	props:{
		cardPosts: {
		type: Object as () => ICardPosts,
		required: true
		},
	},
	setup (props) {
    const { t } = useI18n({ useScope: 'global' })

		const visibleCols = ["score", "magnitude", "text","likes", "comments", "createdAt" ]
		const columns = [
			{ name: 'score', align: 'center', label: t('dashboard-popular-posts-table-score'), field: 'score', visible: true, sortable: true, style: 'font-size: 16px' },
			{ name: 'magnitude', align: 'center', label: t('dashboard-popular-posts-table-strength'), field: 'magnitude', visible: true, sortable: true, style: 'font-size: 16px' },
			{ name: 'text', align: 'center', label: t('dashboard-popular-posts-table-post'), field: 'text', visible: true, style: 'font-size: 16px' }, 
			{ name: 'likes', align: 'center',  label: '', field: 'likes', sortable: true, icon: 'favorite', style: 'font-size: 16px' },
			{ name: 'comments', align: 'center', label: '', field: 'comments', sortable: true, icon: 'textsms', style: 'font-size: 16px'  },
			{ name: 'createdAt', align: 'center', label: t('dashboard-popular-posts-table-date-create'), field: 'createdAt', sortable: true, style: 'font-size: 16px'  }
		]
		
		const rows: Array<IPostsRow> = reactive([]);

		const goToInstagramPost = (postShortcode: string) => {
			window.open(`https://www.instagram.com/p/${postShortcode}/`);
		}

    watch(
        () => props.cardPosts.rows,
        () => {
            const newRows = props.cardPosts.rows
            rows.splice(0, rows.length, ...newRows)
        },
        { immediate: true, deep: true },
    );

		return {
			columns,
			rows,
			visibleCols,
			getDateTimeFormatted,
			goToInstagramPost,
			getScoreColorByPct,
			getMagnitudeColorByPct
		}
	}
	})
</script>
