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
          >
            Titulooooooo
            <!-- {{ cardHistogram.title }} -->
          </p>
        </div>
      </div>
      <div
        class="q-pa-md"
        style="max-width: 350px"
      >
        <q-list padding>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                {{ $t('global-day') }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label overline>
                {{ $t('global-hour') }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section>Monday</q-item-section>
            <q-item-section side>
              6AM
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section>
              Saturday
            </q-item-section>

            <q-item-section side>
              5AM
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section>
              Wednesday
            </q-item-section>

            <q-item-section side>
              4AM
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent,/* onMounted, watch, toRef*/ } from 'vue';

// export interface IRatingCard {
//	 title: string,
//	 amount: number,
//	 diffs: number,
// }

export default defineComponent({
	name: 'ListCard',
	// props: {
	//	 ratingCard: {
	//		 type: Object as () => IRatingCard,
	//		 required: true
	//	 },
	// },
	// setup ( props ) {
	//	 // console.log(props)
	// },
})
</script>