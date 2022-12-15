<template>
  <!-- TODO: poner min-width intead of width--> 
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section horizontal>
      <q-card-section
        style="padding-left: 8px; padding-right: 0px"
        class="q-py-xs"
      >
        <div class="row q-gutter-none">
          <p
            class="q-mb-xs"
            disabled
            style="font-weight: bold;"
          >
            {{ ratingCard.title }}
          </p>
        </div>
        <div class="row q-gutter-none">
          <span class="app-text-title">{{ ratingCard.amount }}</span>
        </div>
        <div class="row q-gutter-none">
          <p :class="setLightStyle(ratingCard.diffs)">
            {{ ratingCard.diffs }}
          </p>
          <q-icon
            :name="setIcon(ratingCard.diffs)"
            size="22px"
            :color="setLightColor(ratingCard.diffs)"
          />
          <span
            class="app-text-subtitle2 q-mt-xs"
            disabled
          >{{ $t('dashboard-than-last-year') }}</span>
        </div>
      </q-card-section>
      <q-inner-loading
        :showing="ratingCard.loading"
        label="Please wait..."
        label-style="font-size: 1.1em"
      />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent,/* onMounted, watch, toRef*/ } from 'vue';
import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'

export interface IRatingCard extends ICardSectionWrapper {
    title: string,
    amount: number,
    diffs: number,
}

export default defineComponent({
    name: 'RatingCards',
    props: {
        ratingCard: {
            type: Object as () => IRatingCard,
            required: true
        },
    },
    setup () {
      const setLightStyle = function(difference: number): string {
          if(difference < 0){
              return 'app-less q-mb-xs'
          }else if(difference > 0){
              return 'app-greater q-mb-xs'
          }else{
              return 'app-middle q-mb-xs'
          }
      }

      const setIcon = function(difference: number): string {
          if(difference < 0){
              return 'keyboard_arrow_down'
          }else if(difference > 0){
              return 'keyboard_arrow_up'
          }else{
              return 'fiber_manual_record'
          }
      }

      const setLightColor = function(difference: number): string {
          if(difference < 0){
              return 'red'
          }else if(difference > 0){
              return 'green'
          }else{
              return 'yellow'
          }
      }

      return {
        setLightStyle,
        setIcon,
        setLightColor
      }
  }
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

.app-middle{
    @extend .app-text-subtitle;
    color: rgb(255,211,51);
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