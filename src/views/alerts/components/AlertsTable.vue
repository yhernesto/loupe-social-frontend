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
        {{ $t('alerts-table-tittle') }}
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
        </q-table>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { ICardAlerts, IAlertsRow } from './AlertsTable'

export default defineComponent({
	name: 'AlertsTable',
	props:{
		cardAlerts: {
		type: Object as () => ICardAlerts,
		required: true
		},
	},
	setup (props) {
		const visibleCols = [ 'nameCol', 'brandCol', 'containingCol', 'languageCol']
		const columns = [
			{
				name: 'nameCol',
				required: true,
				label: 'Name',
				align: 'left',
				field: (row: IAlertsRow) => row.name,
				format: (val: string) => `${val}`,
				sortable: true,
			},
			{ name: 'brandCol', label: 'Brands', field: 'brand', sortable: true },
			{ name: 'containingCol', label: 'Containing', field: (row: IAlertsRow) => row.containing.join(' / '), sortable: true },
			{ name: 'languageCol', label: 'Language', field: 'language', sortable: true },
		]
		
		const rows: Array<IAlertsRow> = reactive([]);

	watch(
		() => props.cardAlerts.rows,
		() => {
			const newRows = props.cardAlerts.rows
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
</style>