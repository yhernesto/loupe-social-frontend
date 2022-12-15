<template>
  <q-card
    v-ripple
    :class="cardArea.active ? 'my-card-active cursor-pointer q-hoverable my-card' : 'cursor-pointer q-hoverable my-card'"
    flat
    bordered
    clickable
    @click="$emit('selected', cardArea.title)"
  >
    <q-card-section horizontal>
      <q-card-section
        style="width: 50%; padding-left: 8px; padding-right: 0px"
        class="q-py-xs"
      >
        <div class="row q-gutter-none">
          <p
            class="q-mb-xs"
            disabled
            style="font-weight: bold;"
          >
            {{ cardArea.title }}
          </p>
        </div>
        <div class="row q-gutter-none">
          <span class="app-text-title">{{ cardArea.amount }}</span>
        </div>
        <div class="row q-gutter-none">
          <p :class="cardArea.diffs > 0 ? 'app-greater q-mb-xs' : 'app-less q-mb-xs'">
            {{ cardArea.diffs }}
          </p>
          <q-icon
            name="arrow_right_alt"
            size="22px"
            :class="cardArea.diffs > 0 ? 'rotate-270' : 'rotate-90'"
            :color="cardArea.diffs > 0 ? 'green' : 'red'"
          />
          <span
            class="app-text-subtitle2 q-mt-xs"
            disabled
          >{{ $t('dashboard-than-last-year') }}</span>
        </div>
      </q-card-section>

      <q-card-section
        style="width: 50%"
        class="q-py-xs q-px-xs"
      >
        <div
          :id="divId"
          style="height:100%; width:100%; position:relative;"
          class="q-py-xs"
        />
      </q-card-section>
    </q-card-section>
    <q-inner-loading
      :showing="cardArea.loading"
      label="Please wait..."
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, toRef } from 'vue';
import AreaHighChart, {ICardsArea} from "./AreaHighChart";

export default defineComponent({
    name: 'ChartArea',
    props: {
        cardArea: {
            //type: Object as PropType<ICardsArea>,
            type: Object as () => ICardsArea,
            required: true
        },
    },
    emits: ['selected'],
    setup ( props ) {
        // Generating Unique Id
        // https://gist.github.com/gordonbrander/2230317
        const divId: string = '_' + Math.random().toString(36).substr(2, 9)
        const m_area: AreaHighChart = new AreaHighChart(divId);


        m_area.color =  toRef(props.cardArea, 'color').value;
        m_area.units = toRef(props.cardArea, 'units').value;
        m_area.title = toRef(props.cardArea, 'title').value;

        watch(
            () => props.cardArea.data,
            () => {
                m_area.data = props.cardArea.data
            },
            { immediate: true, deep: true },
        );

        onMounted(() => {
            m_area.createChart();
        });

        return {
          divId,
        }
    },
})
</script>

<style lang="scss" scoped>
.my-card {
  transition: box-shadow .3s;
  border-radius: 8px;
}
.my-card-active {
  box-shadow: 0px 0px 15px rgba(34, 34, 34, 0.2) !important; 
}

.app-less{
    @extend .app-text-subtitle;
    color: red;
}
.app-greater{
    @extend .app-text-subtitle;
    color: green;
}
.app-text-title {
    font-size: 32px ;
    font-weight: bold;
}
.app-text-subtitle {
    font-size: 14px ;
    font-weight: bold;
}
.app-text-subtitle2 {
    font-size: 10px ;
    font-weight: bold;
}
</style>