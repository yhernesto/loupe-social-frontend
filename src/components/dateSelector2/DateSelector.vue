<template>
  <div class="row justify-end">
    <div class="col self-center text-right">
      <q-btn-toggle
        v-model="period"
        class="q-mr-sm"
        dense
        toggle-color="amber-5"
        no-caps
        :options="periodList"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Ref, defineComponent, ref, computed, WritableComputedRef } from 'vue';
import { injectStrict } from '../../utils/injections'
import { Controller, IDateFormattedRange } from '../../Controller';
import { getDateOffSet, getDateFormatted, getMonth, PeriodList, EPeriod } from "../../utils/date";
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'Toolbar',
    setup () {
        const { t } = useI18n({ useScope: 'global' })
        const app: Controller = injectStrict('appController');

        const _dateFilter: IDateFormattedRange|string = (app.dateFormattedFilter.from == app.dateFormattedFilter.to) ? app.dateFormattedFilter.from : app.dateFormattedFilter

        const dateFilter: Ref<IDateFormattedRange|string|null> = ref(_dateFilter);

        const dateFilterText = computed(() => {
            return app.dateFilter.from.getDate()+ ', ' + t(getMonth(app.dateFilter.from)) + ", " + app.dateFilter.from.getFullYear() + ' - ' + app.dateFilter.to.getDate() + ", " + t(getMonth(app.dateFilter.to)) + ", " + app.dateFilter.to.getFullYear();
        })

        const saveDateRange = function(evt: MouseEvent){
            console.log('evt', evt);

            period.value = null;

            if (dateFilter.value === null){
                dateFilter.value = (app.dateFormattedFilter.from == app.dateFormattedFilter.to) ? app.dateFormattedFilter.from : app.dateFormattedFilter;
            } else if (typeof dateFilter.value == 'string'){
                app.dateFormattedFilter = {from: dateFilter.value, to: dateFilter.value}
            } else{        
                app.dateFormattedFilter = dateFilter.value;
            }
        }

        const period:  WritableComputedRef<number|null> = computed({
            get(): number|null {
                return app.period
            },
            set(newValue: number|null): void {
                app.period = newValue;
                switch ( app.period ) {
                    case EPeriod.TODAY:
                        dateFilter.value = getDateFormatted(getDateOffSet(0, 0, 0));
                        app.dateFormattedFilter = {from: dateFilter.value, to: dateFilter.value};
                        break;
                    case EPeriod.WEEK:
                        dateFilter.value = {from: getDateFormatted(getDateOffSet(-6, 0, 0)), to: getDateFormatted(getDateOffSet(0, 0, 0))};
                        app.dateFormattedFilter = {from: dateFilter.value.from, to: dateFilter.value.to};
                        break;
                    case EPeriod.MONTH:
                        dateFilter.value = {from: getDateFormatted(getDateOffSet(0, -1, 0)), to: getDateFormatted(getDateOffSet(0, 0, 0))};
                        app.dateFormattedFilter = {from: dateFilter.value.from, to: dateFilter.value.to};
                        break;
                    case EPeriod.MONTH3:
                        dateFilter.value = {from: getDateFormatted(getDateOffSet(0, -3, 0)), to: getDateFormatted(getDateOffSet(0, 0, 0))};
                        app.dateFormattedFilter = {from: dateFilter.value.from, to: dateFilter.value.to};
                        break;
                    case EPeriod.MONTH6:
                        dateFilter.value = {from: getDateFormatted(getDateOffSet(0, -6, 0)), to: getDateFormatted(getDateOffSet(0, 0, 0))};
                        app.dateFormattedFilter = {from: dateFilter.value.from, to: dateFilter.value.to};
                        break;
                    case EPeriod.YEAR:
                        dateFilter.value = {from: getDateFormatted(getDateOffSet(0, 0, -1)), to: getDateFormatted(getDateOffSet(0, 0, 0))};
                        app.dateFormattedFilter = {from: dateFilter.value.from, to: dateFilter.value.to};
                        break;
                }
            },
        });

        const periodList = PeriodList.map((period) => { return {label: t(period.label), value: period.value}})

        return {
            app,
            saveDateRange,
            dateFilter,
            dateFilterText,
            periodList,
            period
        }
    }
})
</script>