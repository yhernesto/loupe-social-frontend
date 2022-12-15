<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <p>{{ cardLessTrends.title }}</p>
      <div class="row q-gutter-none q-mb-md">
        <div class="col q-px-xs">
          <q-list
            bordered
            style="height: 400px"
          >
            <!-- <q-item-label header>{{ cardLessTrends?.title }}</q-item-label> -->
            <q-scroll-area
              :delay="1200"
              style="height: 80%;"
            >
              <q-item
                v-for="(trend, _idx) in cardLessTrends.rows"
                :key="`trend_${_idx}`"
                v-ripple
                class="q-mb-sm"
                clickable
              >
                <q-item-section>
                  <q-item-label>{{ trend.hashtag }}</q-item-label>
                </q-item-section>
                <q-item-section
                  side
                  class="q-mr-md"
                >
                  <q-item-label lines="1">
                    {{ trend.occurrences }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-scroll-area>
          </q-list>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ICardLessTrends } from './ILessTrendsList'

export default defineComponent({
	name: 'LessTrendsList',
	props:{
		cardLessTrends: {
		type: Object as () => ICardLessTrends,
		required: true
		},
	},
	setup () {
        return {
        }
    }
})
</script>