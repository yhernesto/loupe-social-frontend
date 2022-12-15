<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <div class="row justify-start q-my-sm">
        <div class="col">
          <p
            disabled
            style="font-weight: bold;"
            class="aumentedFontSize"
          >
            {{ cardSection.title }}
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
            :options="cardSection.toggles"
            @click="$emit('selected', activeToggle)"
          />
        </div>
      </div>

      <div
        class="row q-gutter-none"
        style="width: 100%"
      >
        <div class="col-12">
          <slot />
        </div>
        <q-inner-loading
          :showing="cardSection.loading"
          label="Please wait..."
          label-style="font-size: 1.1em"
        >
              <q-spinner-bars color="purple" />
        </q-inner-loading>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { ICardSectionWrapper, IButtonToggle } from '@/components/cardSectionWrapper/ICardSectionWrapper'

export default defineComponent({
	name: 'CardSectionWrapper',
	props:{
		cardSection: {
			type: Object as () => ICardSectionWrapper,
			required: true
		},
	},
    emits: ['selected'],
	setup( props ) {

		const hasToggle: Ref<boolean> = ref(props.cardSection.toggles !== undefined && props.cardSection.toggles.length > 0);

		const firstToggle: string | undefined = (props.cardSection.toggles !== undefined && props.cardSection.toggles.length > 0) ? props.cardSection.toggles.find((_row: IButtonToggle) => _row.selected == true)?.value : '';
		const activeToggle: Ref<string> = ref(firstToggle == undefined ? '' : firstToggle)

		return {
			hasToggle,
            activeToggle
		}
	}
})
</script>