<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <q-scroll-area
        :delay="1200"
        style="height: 600px;"
      >
        <div class="q-pa-md">
          <div class="row q-gutter-none q-mb-md">
            <div
              v-for="numCol in Math.max(...(cardFeedsArea.rows.map((_row) => _row.col)), 0)"
              :key="numCol"
              class="col q-ma-xs"
            >
              <div class="column">
                <div
                  v-for="(feedRow, _idx) in cardFeedsArea.rows.filter(_row => _row.col === numCol)"
                  :key="_idx"
                  class="col-3 q-ma-xs"
                  tabindex="0"
                >
                  <q-card
                    v-ripple
                    clickable
                    class="cursor-pointer q-hoverable"
                    @click="openInNewTab(feedRow.source.url)"
                  >
                    <span class="q-focus-helper" />
                    <q-card-section
                      v-if="feedRow.image_url"
                      class="text-center"
                    >
                      <div>
                        <img
                          :src="feedRow.image_url"
                          style="width: 100%"
                        >
                      </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="col flex-center">
                      <div
                        class="text-weight-bold"
                      >
                        {{ feedRow.title }}
                      </div>
                      <div class="row justify-between q-my-xs">
                        <div class="col-6 text-caption">
                          {{ feedRow.source.name }}
                        </div>
                        <div
                          class="col-6 text-caption"
                          style="text-align: right;"
                        >
                          {{ feedRow.source.date }}
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
      <q-inner-loading
        :showing="cardFeedsArea.loading"
        label="Please wait..."
        label-style="font-size: 1.1em"
      />
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import { ICardFeedsArea } from './IFeedsArea'

export default defineComponent({
	name: 'FeedsArea',
	props:{
		cardFeedsArea: {
		type: Object as () => ICardFeedsArea,
		required: true
		}
	},
	setup () {
        const openInNewTab = function(p_url: string) {
			window.open('https://news.google.com/' + p_url, "_blank");
		}

		return {
			openInNewTab
        }
    }
    })
</script>

<style lang="sass" scoped>
.card-new:hover
  color: orange

</style>
