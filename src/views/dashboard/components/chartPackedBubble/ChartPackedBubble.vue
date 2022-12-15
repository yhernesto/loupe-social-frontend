<template>
  <app-card-section-wrapper :card-section="cardPackedBubble">
    <div
      :id="divId"
      style="height:100%; width:100%; position:relative;"
      class="q-py-xs"
    />
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import ChartPackedBubble , { ICardPackedBubble } from './ChartPackedBubble'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue'

export default defineComponent({
    name: 'ChartPackedBubble',
    components:{
        'app-card-section-wrapper': CardSectionWrapper
    },
    props:{
        cardPackedBubble: {
            type: Object as () => ICardPackedBubble,
            required: true
        },
    },
    setup( props ) {
        const divId: string = '_' + Math.random().toString(36).substr(2, 9)
        const m_packedBubble: ChartPackedBubble = new ChartPackedBubble(divId);

        watch(
            () => props.cardPackedBubble.series,
            () => {
                m_packedBubble.zMin = props.cardPackedBubble.zMin;
                m_packedBubble.zMax = props.cardPackedBubble.zMax;
                m_packedBubble.threshold = props.cardPackedBubble.labelThreshold;
                m_packedBubble.series = props.cardPackedBubble.series
            },
            { immediate: true, deep: true },
        );

        onMounted(() => {
            m_packedBubble.createChart();
        });
        return {
            divId
        }
    }
})
</script>