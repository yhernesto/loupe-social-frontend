<template>
  <app-card-section-wrapper :card-section="cardTopTrends">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleCols"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-italic bg-primary text-white aumentedFontSize"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template #body-cell-lastPeriodCol="props">
        <q-td :props="props">
          <div class="row q-gutter-none justify-end">
            <!-- <q-avatar><img :src="props.row.iconProfile"></q-avatar>&nbsp;&nbsp;&nbsp;<span>{{props.row.user}}</span> -->
            <!-- <p :class="props.row.lastPeriod > 0 ? 'app-greater q-mb-xs' : 'app-less q-mb-xs'"> -->
            <p :class="setLightStyle(props.row.lastPeriod)">
              {{ props.row.lastPeriod }}%
            </p>
            <q-icon
              :name="setIcon(props.row.lastPeriod)"
              size="22px"
              :color="setLightColor(props.row.lastPeriod)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, /*onMounted,*/ watch } from 'vue';
import { ICardTrends, ITrendsRow } from './ITopTrendsTable'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import i18n from '@/plugins/i18n/i18n';

export default defineComponent({
	name: 'TopTrendsTable',
	components:{
        'app-card-section-wrapper': CardSectionWrapper
    },
	props:{
		cardTopTrends: {
		type: Object as () => ICardTrends,
		required: true
		},
	},
	setup (props) {
		const visibleCols = [ 'topicCol', 'lastPostsCol', 'postsCol', 'lastPeriodCol' ]
		const columns = [
			{
				name: 'topicCol',
				required: true,
				label: 'Hashtag',
				align: 'left',
				field: (row: ITrendsRow) => row.topic,
				format: (val: string) => `${val}`,
				sortable: true,
				style: 'font-size: 16px'
			},
			{ name: 'lastPostsCol', label: i18n.global.t('trends-top-trends-previous-period'), field: 'lastPosts', sortable: true, style: 'font-size: 16px' },
			{ name: 'postsCol', label: i18n.global.t('trends-top-trends-selected-period'), field: 'posts', sortable: true, style: 'font-size: 16px' },
			{ name: 'lastPeriodCol', label: i18n.global.t('trends-top-trends-vs-previous'), field: 'lastPeriod', sortable: true, style: 'font-size: 16px' },
		]
		
		const rows: Array<ITrendsRow> = reactive([]);

		watch(
			() => props.cardTopTrends.rows,
			() => {
				const newRows = props.cardTopTrends.rows
				rows.splice(0, rows.length, ...newRows)
			},
			{ immediate: true, deep: true },
		);

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
			columns,
			rows,
			visibleCols,
			setLightStyle,
			setIcon,
			setLightColor
		}
	}
	})
</script>

<style lang="scss" scoped>
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