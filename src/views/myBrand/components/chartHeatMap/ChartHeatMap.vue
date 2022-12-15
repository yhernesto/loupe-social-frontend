<template>
  <app-card-section-wrapper
    :card-section="cardHeatMap"
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
import ChartHeatMap , { ICardHeatMap, /*PointOptionsObject*/ } from './ChartHeatMap'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';

export default defineComponent({
	name: 'ChartHeatMap',
	components: {
		'app-card-section-wrapper': CardSectionWrapper
	},
	props:{
		cardHeatMap: {
			type: Object as () => ICardHeatMap,
			required: true
		},
	},
	emits: ['selected'],
	setup( props, { emit } ) {
		const divId: string = '_' + Math.random().toString(36).substr(2, 9)
		const m_heatMap: ChartHeatMap = new ChartHeatMap(divId);

		const reEmit = function (buttonSelected: string):void{
			emit('selected', buttonSelected)
		}

		watch(
			() => props.cardHeatMap.data,
			() => {
				m_heatMap.data = props.cardHeatMap.data
			},
			{ immediate: true, deep: true },
		);

		onMounted(() => {
			m_heatMap.createChart();
		});
		return {
			divId,
			reEmit
		}
	}
})
</script>