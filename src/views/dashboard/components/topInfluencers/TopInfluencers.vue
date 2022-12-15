<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <p>Top Influencers</p>
      <div class="row q-gutter-none q-mb-md">
        <div
          v-for="(cardTopInfluencers, idx) in cardsTopInfluencers"
          :key="'card_' + idx"
          class="col q-px-xs"
        >
          <q-list
            bordered
            style="height: 400px"
          >
            <q-item-label header>
              {{ cardTopInfluencers?.title }}
            </q-item-label>
            <q-scroll-area
              :delay="1200"
              style="height: 80%;"
            >
              <q-item
                v-for="contact in cardTopInfluencers.rows"
                :key="contact.id"
                v-ripple
                class="q-mb-sm"
                clickable
              >
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="contact.avatar">
                      <template #error>
                        <div>{{ contact.name[0].toLocaleUpperCase() }}</div>
                      </template>
                    </q-img>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.name }}</q-item-label>
                  <q-item-label
                    caption
                    lines="1"
                  >
                    {{ contact.email }}
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
import { defineComponent, /*reactive, onMounted, watch*/ } from 'vue';
import { /*ICardsTopInfluencers,*/ ICardTopInfluencers } from './TopInfluencers'

export default defineComponent({
	name: 'TopInfluencers',
	props:{
		cardsTopInfluencers: {
		type: Object as () => Array<ICardTopInfluencers>,
		required: true
		},
	},
	setup () {
        return {
        }
    }
    })
</script>