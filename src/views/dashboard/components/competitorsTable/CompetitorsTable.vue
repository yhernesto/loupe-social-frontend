<template>
  <app-card-section-wrapper :card-section="cardCompetitors">
    <q-table
      v-model:pagination="pagination"
      :rows="shownRows"
      :columns="columns"
      :visible-columns="visibleCols"
      class="my-header-table"
      @request="onRequest"
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

      <template #body-cell-current_score="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            <app-score-component :score-information="{percentageNum:props.row.current_score_pct, color: getScoreColorByPct(props.row.current_score_pct), numDisplayed: props.row.current_score, iconName:'sports_score' }" />
          </span>
        </q-td>
      </template>
      <template #body-cell-prev_score="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            <app-score-component :score-information="{percentageNum:props.row.prev_score_pct, color: getScoreColorByPct(props.row.prev_score_pct), numDisplayed: props.row.prev_score, iconName:'sports_score' }" />
          </span>
        </q-td>
      </template>
      <template #body-cell-virtual="props">
        <q-td :props="props">
          <div
            :id="props.row.virtual"
            style="height:100px; width:400px; position:relative;"
          />
        </q-td>
      </template>
    </q-table>
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, watch, nextTick} from 'vue';
import { ICompetitorsRow, ICardCompetitors } from './CompetitorsTable'
import AreaHighChart, {/*ITimeSeries*/} from '../chartArea/AreaHighChart'
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue'
import { getScoreColorByPct } from '../../../../utils/colors';
import ScoreComponent from "@/components/scoreComponent/ScoreComponent.vue";
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'CompetitorsTable',
    components: {
        'app-score-component' : ScoreComponent,
        'app-card-section-wrapper': CardSectionWrapper
    },
    props:{
        cardCompetitors: {
            type: Object as () => ICardCompetitors,
            required: true
        },
    },
    setup (props) {
        const { t } = useI18n({ useScope: 'global' })
        const pagination = ref({
            sortBy: 'competitor',
            descending: false,
            page: 1,
            rowsPerPage: 5,
            rowsNumber: 10
        })

        const visibleCols: Array<string> = ['competitor', "prev_score", "current_score" , "prev_posts", "current_posts", "diff_period", "virtual" ]
        const columns = [
            {
                name: 'competitor',
                required: true,
                label: t('dashboard-competitors-tittle'),
                align: 'left',
                // field: 'competitor',
                field: (row: ICompetitorsRow ) => '#' + row.competitor,
                format: (competitorVal: string ) => `${competitorVal}`,
                sortable: true,
                style: 'font-size: 16px'
            },
            { name: 'prev_score', label: t('dashboard-competitors-table-previous-score'),  align: 'center', field: 'prev_score', sortable: true,style: 'font-size: 12px'},
            { name: 'current_score', label: t('dashboard-competitors-table-score'), align: 'center', field: 'current_score', sortable: true, style: 'font-size: 12px' },
            { name: 'prev_posts', label: t('dashboard-competitors-table-previous-posts'),  align: 'center', field: 'prev_posts', sortable: true, style: 'font-size: 16px' },
            { name: 'current_posts', label: t('dashboard-competitors-table-posts'), align: 'center', field: 'current_posts', sortable: true, style: 'font-size: 16px' },
            { name: 'diff_period', label: t('dashboard-competitors-table-current-vs-previous'),  align: 'center', 
                field: (row: ICompetitorsRow ) => row.diff_period + '%', sortable: true, style: 'font-size: 16px'  },
            { name: 'virtual', label: '',  align: 'right', field: 'virtual', style: 'font-size: 16px' }
        ]

        const getNewDivId = function() : string{
            return '_' + Math.random().toString(36).substr(2, 9)
        }

        const shownRows: Array<ICompetitorsRow> = reactive([]);
        const rawRows: Array<ICompetitorsRow> = reactive([]);

        function fetchFromServer (startRow: number, count: number, sortBy: string, descending: boolean) {
            const data = rawRows.slice()

            // handle sortBy
            if (sortBy) {
                const sortFn = sortBy === 'competitor'
                ? (descending
                    ? (a: any, b: any) => (a.competitor > b.competitor ? -1 : a.competitor < b.competitor ? 1 : 0)
                    : (a: any, b: any) => (a.competitor > b.competitor ? 1 : a.competitor < b.competitor ? -1 : 0)
                    )
                : (descending
                    ? (a: any, b: any) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
                    : (a: any, b: any) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
                    )
                data.sort(sortFn)
            }

            return data.slice(startRow, startRow + count)
        }

        const onRequest = function(props: any):void{
            console.log('Change onRequest!!!')
            const { page, rowsPerPage, sortBy, descending } = props.pagination

            // loading.value = true

            // update rowsCount with appropriate value
            pagination.value.rowsNumber = rawRows.length

            // get all rows if "All" (0) is selected
            const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

            // calculate starting row of data
            const startRow = (page - 1) * rowsPerPage

            // fetch data from "server"
            const returnedData = fetchFromServer(startRow, fetchCount, sortBy, descending)

            // clear out existing data and add new
            shownRows.splice(0, shownRows.length, ...returnedData)

            // don't forget to update local pagination object
            pagination.value.page = page
            pagination.value.rowsPerPage = rowsPerPage
            pagination.value.sortBy = sortBy
            pagination.value.descending = descending;

            nextTick(() => {
								shownRows.forEach((row: ICompetitorsRow) => {
										if(row.virtual !== undefined && row.time_series !== undefined) {
												const m_area: AreaHighChart = new AreaHighChart(row.virtual)
												m_area.autoTrendColor = true;
												m_area.applyOffset = true;
												m_area.data = row.time_series.map((_row: number /*ITimeSeries*/, _idx: number) => [_idx, _row]);
												m_area.createChart();
										}
								})
            });
        }

        watch(
            () => props.cardCompetitors.rows,
            () => {
                const newRows = props.cardCompetitors.rows.map(( row: ICompetitorsRow) => {
                    row.virtual = getNewDivId();
                    return row
                })

                rawRows.splice(0, rawRows.length, ...newRows)

                onRequest({
                    pagination: pagination.value,
                })
            },
            { immediate: true, deep: true },
        );
        onMounted(() => {
            // get initial data from server (1st page)
            onRequest({
                pagination: pagination.value,
            })
        })
    return {
      columns,
      shownRows,
      visibleCols,
      pagination,
      onRequest,
      getScoreColorByPct
    }
  }
})
</script>