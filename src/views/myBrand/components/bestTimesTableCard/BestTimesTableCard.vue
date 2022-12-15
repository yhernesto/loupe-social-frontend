<template>
	<app-card-section-wrapper
		:card-section="bestTimesTableCard"
		@selected="reEmit"
	>
			<q-markup-table>
				<thead>
					<tr>
						<th class="text-left aumentedFontSize">
							{{ $t('global-day') }}
						</th>
						<th class="text-left aumentedFontSize">
							{{ $t('global-hour') }}
						</th>
						<th class="text-right aumentedFontSize">
							{{ $t('global-total') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, idx) in bestTimesTableCard.rows"
						:key="'row_' + idx"
					>
						<td class="text-left aumentedFontSize">
							{{ row.day }}
						</td>
						<td class="text-left aumentedFontSize">
							{{ row.hour }}
						</td>
						<td class="text-right aumentedFontSize">
							{{ row.total }}
						</td>
					</tr>
				</tbody>
			</q-markup-table>
	</app-card-section-wrapper>
</template>

<script lang="ts">
import { defineComponent, /* onMounted, watch, toRef*/ } from 'vue';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'

export interface ITableRow {
	day: string;
	hour: string;
	total: number;
}
export interface IButtonToggle {
	label: string;
	value: string;
	selected: boolean
}
export interface IBestTimeTableCard extends ICardSectionWrapper{
	title: string;
	toggles: Array<IButtonToggle>;
	rows: Array<ITableRow>;
}

export default defineComponent({
	name: 'BestTimesTableCard',
	components: {
			'app-card-section-wrapper': CardSectionWrapper
	},
	props: {
		bestTimesTableCard: {
			type: Object as () => IBestTimeTableCard,
			required: true
		},
	},
	emits: ['selected'],
	setup ( props, { emit } ) {
		const reEmit = function (buttonSelected: string):void{
				emit('selected', buttonSelected)
			}
		return {
			reEmit
		}
	},
})
</script>


<style lang="scss" scoped>
th {
  font-weight: bold;
}

</style>
