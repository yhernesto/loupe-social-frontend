<template>
  <q-knob
      :model-value="scoreInformation.percentageNum"
      readonly
      :min="0"
      :max="1"
      show-value
      class="text-white q-ma-md"
      size="70px"
      :thickness="0.2"
      :color="scoreInformation.color"
      center-color="blue-grey-8"
      track-color="grey-3"
  >
    <q-icon
        :name="scoreInformation.iconName"
        class="q-mr-xs"
        style="margin-right: 0; padding-right: 0"
    />
    <p style="margin-top: 20%; font-size: 14px; padding-left: 0; margin-left: 0">
      {{ scoreInformation.numDisplayed }}
    </p>
  </q-knob>
</template>

<script lang="ts">
import { IScoreModel } from "@/components/scoreComponent/IScoreModel";
import {getScoreColorByPct} from "@/utils/colors";

export default {
  name: "ScoreComponent",
  props: {
    scoreInformation: {
      type: Object as () => IScoreModel,
      required: true,
    },
  },
  setup(){
    return{
      getScoreColorByPct
    }
  }
};
</script>

<style scoped></style>
