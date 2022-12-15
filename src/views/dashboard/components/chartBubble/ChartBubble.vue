<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <p
        disabled
        style="font-weight: bold;"
      >
        {{ cardBubble.title }}
      </p>
      <div
        :id="divId"
        style="height:100%; width:100%; position:relative;"
        class="q-py-xs"
      />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import ChartBubble ,{ ICardBubble } from './ChartBubble'

export default defineComponent({
    name: 'ChartBubble',
    props:{
        cardBubble: {
            type: Object as () => ICardBubble,
            required: true
        },
    },
    setup( props ) {
        const divId: string = '_' + Math.random().toString(36).substr(2, 9)
        const m_bubble: ChartBubble = new ChartBubble(divId);

        watch(
            () => props.cardBubble.series,
            () => {
                m_bubble.series = props.cardBubble.series
            },
            { immediate: true, deep: true },
        );

        onMounted(() => {
            m_bubble.createChart();
        });
        return {
            divId
        }
    }
})
</script>