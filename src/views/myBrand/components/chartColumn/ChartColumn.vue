<template>
	<app-card-section-wrapper
		:card-section="cardColumn"
		@selected="reEmit"
	>
		<div
			:id="divId"
			style="height:100%; width:100%; position:relative;"
			class="q-py-xs"
		/>
	</app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, onMounted, /*PropType, toRefs,*/ watch } from 'vue';
import ChartColumn , { ICardColumn /*PointOptionsObject*/ } from './ChartColumn'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';

export default defineComponent({
	name: 'ChartColumn',
	components: {
		'app-card-section-wrapper': CardSectionWrapper
	},
	props:{
		cardColumn: {
			type: Object as () => ICardColumn,
			required: true
		},
		color: {
			type: String,
			required: true
		}
	},
    emits: ['selected'],
	setup( props, { emit } ) {
		const divId: string = '_' + Math.random().toString(36).substr(2, 9)
		const m_column: ChartColumn = new ChartColumn(divId, props.color);

		const reEmit = function (buttonSelected: string):void{
				emit('selected', buttonSelected)
			}

		watch(
			() => props.cardColumn.series,
			() => {
				m_column.series = props.cardColumn.series
			},
			{ immediate: true, deep: true },
		);
		watch(
			() => props.cardColumn.seriesDrillDown,
			() => {
				m_column.seriesDrillDown = props.cardColumn.seriesDrillDown
			},
			{ immediate: true, deep: true },
		);

		onMounted(() => {
			m_column.createChart();
		});
		return {
			divId,
			reEmit
		}
	}
})
</script>