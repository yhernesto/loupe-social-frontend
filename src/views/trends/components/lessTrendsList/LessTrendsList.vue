<template>
  <app-card-section-wrapper :card-section="cardLessTrends">
    <q-markup-table>
      <thead
      class="tableHead"
      >
        <tr>
          <th class="text-left aumentedFontSize">
            Hashtag
          </th>
          <th class="text-left aumentedFontSize">
            {{ $t('global-post') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, idx) in cardLessTrends.rows"
          :key="'row_' + idx"
        >
          <td class="text-left aumentedFontSize">
            {{ row.hashtag }}
          </td>
          <td class="text-center aumentedFontSize">
            {{ row.occurrences }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </app-card-section-wrapper>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import { ICardLessTrends } from './ILessTrendsList';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';

export default defineComponent({
	name: 'LessTrendsList',
	components:{
        'app-card-section-wrapper': CardSectionWrapper
    },
	props: {
		cardLessTrends: {
			type: Object as () => ICardLessTrends,
			required: true
		},
	},
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
