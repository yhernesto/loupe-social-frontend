<template>
  <app-card-section-wrapper :card-section="cardTimeSeries">
    <div
      :id="divId"
      style="height:100%; width:100%; position:relative;"
      class="q-py-xs"
    />
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import ChartTimeSeries, {ICardTimeSeries} from './ChartTimeSeries'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue'


export default defineComponent({
    name: 'ChartTimeSeries',
    components:{
        'app-card-section-wrapper': CardSectionWrapper
    },
    props:{
        cardTimeSeries: {
            type: Object as () => ICardTimeSeries,
            required: true
        },
    },
    setup( props ) {
        const divId: string = '_' + Math.random().toString(36).substr(2, 9)
        const m_timeSeries: ChartTimeSeries = new ChartTimeSeries(divId);

        watch(
            () => props.cardTimeSeries.series,
            () => {
                m_timeSeries.series = props.cardTimeSeries.series
            },
            { immediate: true, deep: true },
        );

        watch(
            () => props.cardTimeSeries.xAxis,
            () => {
                m_timeSeries.renderDateRange = props.cardTimeSeries.xAxis
            },
            { immediate: true, deep: true },
        );
        watch(
            () => props.cardTimeSeries.xAxisPrv,
            () => {
                m_timeSeries.renderPrvDateRange = props.cardTimeSeries.xAxisPrv
            },
            { immediate: true, deep: true },
        );

        onMounted(() => {
            m_timeSeries.createChart();
        });
        return {
            divId,
        }
    }
})
</script>