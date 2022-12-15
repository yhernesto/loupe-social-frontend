<template>
  <app-card-section-wrapper :card-section="cardLatestTrends">
    <q-markup-table>
      <thead class="tableHead">
        <tr>
          <th class="text-left aumentedFontSize">
            Hashtag
          </th>
          <th class="text-center aumentedFontSize">
            {{ $t('global-posts') }}
          </th>
          <th class="text-center aumentedFontSize">
            {{ $t('trends-latest-used-hashtag-date') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, idx) in cardLatestTrends.rows"
          :key="'row_' + idx"
        >
          <td class="text-left aumentedFontSize">
            {{ row.hashtag }}
          </td>
          <td class="text-center aumentedFontSize">
            {{ row.occurrences }}
          </td>
          <td class="text-center aumentedFontSize">
            {{ getDateTimeFormatted(new Date(row.takenAt)) }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </app-card-section-wrapper>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import { ICardLatestTrends } from './ILatestTrendsList';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import { getDateTimeFormatted } from '@/utils/date'


export default defineComponent({
	name: 'LessTrendsList',
	components:{
        'app-card-section-wrapper': CardSectionWrapper
    },
	props: {
		cardLatestTrends: {
			type: Object as () => ICardLatestTrends,
			required: true
		},
	},
  setup(){
    return{
      getDateTimeFormatted
    }
  }

})
</script>


<style lang="scss" scoped>
th {
  font-weight: bold;
}
.tableHead{
  background-color: #621aee;
  color: white;
}
</style>
