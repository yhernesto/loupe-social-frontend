<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <div class="row justify-between q-my-sm">
        <div class="col">
          <p
            disabled
            style="font-weight: bold;"
          >
            {{ cardHistogram.title }}
          </p>
        </div>
        <div
          v-if="hasToggle"
          class="col text-right"
        >
          <q-btn-toggle
            v-model="activeToggle"
            class="q-mr-sm"
            dense
            toggle-color="primary"
            no-caps
            :options="cardHistogram.toggles"
            @click="$emit('selected', activeToggle)"
          />
        </div>
      </div>
      <div
        :id="divId"
        style="height:100%; width:100%; position:relative;"
        class="q-py-xs"
      />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref, /*PropType, toRefs,*/ watch } from 'vue';
import ChartHistogram , { ICardHistogram, IButtonToggle /*PointOptionsObject*/ } from './ChartHistogram'

export default defineComponent({
	name: 'ChartHistogram',
	props:{
		cardHistogram: {
			type: Object as () => ICardHistogram,
			required: true
		},
	},
    emits: ['selected'],
	setup( props ) {
		const divId: string = '_' + Math.random().toString(36).substr(2, 9)
		const m_histogram: ChartHistogram = new ChartHistogram(divId);
		
		const hasToggle: Ref<boolean> = ref(props.cardHistogram.toggles !== undefined && props.cardHistogram.toggles.length > 0);

		const firstToggle: string | undefined = (props.cardHistogram.toggles !== undefined && props.cardHistogram.toggles.length > 0) ? props.cardHistogram.toggles.find((_row: IButtonToggle) => _row.selected == true)?.label : '';
		const activeToggle: Ref<string> = ref(firstToggle == undefined ? '' : firstToggle)

		watch(
			() => props.cardHistogram.data,
			() => {
				m_histogram.data = props.cardHistogram.data
			},
			{ immediate: true, deep: true },
		);
		watch(
			() => activeToggle,
			() => {
				m_histogram.title = activeToggle.value
			},
			{ immediate: true, deep: true },
		);

		onMounted(() => {
			m_histogram.createChart();
		});
		return {
			divId,
			hasToggle,
            activeToggle
		}
	}
})
</script>