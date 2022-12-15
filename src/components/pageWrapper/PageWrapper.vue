<template>
<div class="containerBackground">
  <q-page class="q-py-md q-mx-lg ">
    <!-- Header -->
    <div
      class="row q-gutter-none q-mb-md"
    >
      <div
        v-if="socialSelector"
        class="col items-start"
      >
        <app-social-media-selector />
      </div>
      <div
        v-if="dateSelector" 
        class="col items-end"
      >
        <app-date-selector />
      </div>
    </div>
    <!-- Body -->
    <div class="q-mb-md">
      <slot />
    </div>
    <!-- Footer -->
  </q-page>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import DateSelector from '@/components/dateSelector2/DateSelector.vue';
import SocialMediaSelector from '@/components/socialMediaSelector/SocialMediaSelector.vue'

export default defineComponent({
	name: 'PageWrapper',
	components: {
		'app-date-selector': DateSelector,
    'app-social-media-selector': SocialMediaSelector
	},
	props:{
		dateSelector: {
			type: Boolean,
			default: false
		},
    socialSelector: {
			type: Boolean,
			default: true
		}
	},
	setup () {
		return {
		}
	}
})
</script>
<style scoped>
.containerBackground{
  background-color: #F6F6F6;
}
</style>
