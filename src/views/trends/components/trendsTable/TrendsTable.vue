<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <p
        disabled
        style="font-weight: bold;"
      >
        Trends
      </p>
      <div class="q-pa-md">
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
                class="text-italic bg-primary text-white"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template #body-cell-lastPeriodCol="props">
            <q-td :props="props">
              <div class="row q-gutter-none justify-end">
                <!-- <q-avatar><img :src="props.row.iconProfile"></q-avatar>&nbsp;&nbsp;&nbsp;<span>{{props.row.user}}</span> -->
                <p :class="props.row.lastPeriod > 0 ? 'app-greater q-mb-xs' : 'app-less q-mb-xs'">
                  {{ props.row.lastPeriod }}
                </p>
                <q-icon
                  name="arrow_right_alt"
                  size="22px"
                  :class="props.row.lastPeriod > 0 ? 'rotate-270' : 'rotate-90'"
                  :color="props.row.lastPeriod > 0 ? 'green' : 'red'"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, reactive, /*onMounted,*/ watch } from 'vue';
import { ICardTrends, ITrendsRow } from './TrendsTable'

export default defineComponent({
	name: 'TrendsTable',
	props:{
		cardTrends: {
		type: Object as () => ICardTrends,
		required: true
		},
	},
	setup (props) {
		const visibleCols = [ 'topicCol', 'postsCol', 'lastPeriodCol', 'viewsCol', 'reactionCol', 'commentsCol' ]
		const columns = [
			{
				name: 'topicCol',
				required: true,
				label: 'Topic',
				align: 'left',
				field: (row: ITrendsRow) => row.topic,
				format: (val: string) => `${val}`,
				sortable: true,
			},
			{ name: 'postsCol', label: 'Posts', field: 'posts', sortable: true },
			{ name: 'lastPeriodCol', label: 'Last Period', field: 'lastPeriod', sortable: true },
			{ name: 'viewsCol', label: 'Views', field: 'views', sortable: true },
			{ name: 'reactionCol', label: 'Reaction', field: 'reaction', sortable: true },
			{ name: 'commentsCol', label: 'Comments', field: 'comments', sortable: true },
		]
		
		const rows: Array<ITrendsRow> = reactive([]);

	watch(
		() => props.cardTrends.rows,
		() => {
			const newRows = props.cardTrends.rows
			rows.splice(0, rows.length, ...newRows)
		},
		{ immediate: true, deep: true },
	);

		return {
			columns,
			rows,
			visibleCols
		}
	}
	})
</script>

<style lang="scss" scoped>
// .my-card {
//   transition: box-shadow .3s;
//   border-radius: 8px;
// }
.app-less{
	@extend .app-text-subtitle;
	color: red;
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