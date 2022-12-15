<template>
  <app-card-section-wrapper :card-section="cardPie">
    <!-- <div class="row justify-between q-my-sm">
        <div class="col text-right" >
            <q-btn-toggle
                v-model="activeToggle"
                class="q-mr-sm"
                dense
                toggle-color="primary"
                no-caps
                :options="cardPie.toggles"
                @click="$emit('selected', activeToggle)"
            />
        </div>
    </div> -->
    <div
      :id="divId"
      style="height:100%; width:100%; position:relative;"
      class="q-py-xs"
      :class="{chartPieSize:!booleanSize}"
    />
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from "vue";
import ChartPie, { IButtonToggle, ICardPie } from "./ChartPie";
import CardSectionWrapper from "@/components/cardSectionWrapper/CardSectionWrapper.vue";

export default defineComponent({
  name: "ChartPie",
  components: {
    "app-card-section-wrapper": CardSectionWrapper,
  },
  props: {
    cardPie: {
      type: Object as () => ICardPie,
      required: true,
    },
  },
  setup(props) {
    const booleanSize: boolean = props.cardPie.toggles != null;
    const getRandomIdToRendChart = function() {
      const randomIdString: string =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      return randomIdString;
    };

    const divId: string = getRandomIdToRendChart();
    const m_pie: ChartPie = new ChartPie(divId);
    const firstToggle = props.cardPie.toggles?.find(
      (_row: IButtonToggle) => _row.selected == true
    )?.label;
    const activeToggle: Ref<string> = ref(
      firstToggle == undefined ? "" : firstToggle
    );

    watch(
      () => props.cardPie.data,
      () => {
        m_pie.data = props.cardPie.data;
      },
      { immediate: true, deep: true }
    );
    watch(
      () => props.cardPie.score,
      () => {
        m_pie.score = props.cardPie.score;
      },
      { immediate: true, deep: true }
    );

    onMounted(() => {
      m_pie.createChart();
    });
    return {
      divId,
      activeToggle,
      booleanSize
    };
  },
});
</script>

<style lang="scss">
.post-information-line-positive .q-item__section--avatar {
  color: #21d59b;
}

.post-information-line-positive .q-item__section--main {
  color: rgb(0, 0, 0);
}

.post-information-line-neutral .q-item__section--avatar {
  color: #ffc700;
}
.post-information-line-neutral .q-item__section--main {
  color: rgb(0, 0, 0);
}

.post-information-line-negative .q-item__section--avatar {
  color: #f99600;
}
.post-information-line-negative .q-item__section--main {
  color: rgb(0, 0, 0);
}
.chartPieSize{
  height: 260px !important;
}
</style>
