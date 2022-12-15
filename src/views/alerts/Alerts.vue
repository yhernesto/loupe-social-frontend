<template>
  <q-page class="q-mt-md q-mx-lg">
    <div class="row q-gutter-none q-mb-md">
      <div class="col-12 q-px-xs">
        <q-card
          class="my-card"
          flat
          bordered
        >
          <q-card-section>
            <div class="row justify-start">
              <div class="col">
                <p
                  disabled
                  style="font-weight: bold;"
                >
                  {{ $t('alerts-form-tittle') }}
                </p>
              </div>
            </div>
            <div class="row q-gutter-none">
              <div class="col ">
                <q-form
                  ref="alertForm"
                  class="q-gutter-md"
                  @reset="onReset"
                >
                  <div class="row q-gutter-none q-mb-md justify-start">
                    <div class="col-3">
                      <q-input
                        v-model="alerts.formInputs.name"
                        outlined
                        :label="$t('alerts-form-name') + ' *'"
                        :title="$t('alerts-form-name') + ' *'"
                        lazy-rules
                        class="q-mx-xs"
                        :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-none q-mb-md justify-start">
                    <div class="col-3">
                      <q-select
                        v-model="alerts.formInputs.brand"
                        outlined
                        :options="brands"
                        emit-value
                        map-options
                        :label="$t('alerts-form-brand') + ' *'"
                        :title="$t('alerts-form-brand') + ' *'"
                        class="q-mx-xs"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      />
                    </div>
                    <div class="col-3">
                      <q-select
                        v-model="alerts.formInputs.containing"
                        outlined
                        :label="$t('alerts-form-containing') + ' *'"
                        :title="$t('alerts-form-containing') + ' *'"
                        use-input
                        use-chips
                        multiple
                        hide-dropdown-icon
                        input-debounce="0"
                        new-value-mode="add-unique"
                        class="q-mx-xs"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      />
                    </div>
                    <div class="col-3">
                      <q-select
                        v-model="alerts.formInputs.language"
                        outlined
                        :options="languages"
                        emit-value
                        map-options
                        :label="$t('alerts-form-language') + ' *'"
                        :title="$t('alerts-form-language') + ' *'"
                        class="q-mx-xs"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      />
                    </div>
                    <div class="col-3">
                      <q-field
                        borderless
                        :model-value="alerts.formInputs.viewThreshold"
                        :label="$t('alerts-form-view-threshold') + ' *'"
                        :title="$t('alerts-form-view-threshold') + ' *'"
                        label-always
                        class="q-mx-xs"
                      >
                        <template #control>
                          <q-slider
                            v-model="alerts.formInputs.viewThreshold"
                            :min="0"
                            :max="100"
                            label
                            class="q-mx-xs"
                          />
                        </template>
                      </q-field>
                    </div>
                  </div>

                  <div class="row q-gutter-none q-mb-md justify-start">
                    <div class="col-3">
                      <q-select
                        v-model="alerts.formInputs.sendingType"
                        outlined
                        :options="sendingTypes"
                        emit-value
                        map-options
                        :label="$t('alerts-form-sending-type') + ' *'"
                        :title="$t('alerts-form-sending-type') + ' *'"
                        class="q-mx-xs"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      />
                    </div>
                    <div class="col-3">
                      <!-- <q-input
												outlined
												v-model="alerts.formInputs.hour"
												:label="$t('alerts-form-hour') + ' *'"
												:title="$t('alerts-form-hour') + ' *'"
												lazy-rules
												:rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
												class="q-mx-xs"
											/> -->
                      <q-input
                        v-model="alerts.formInputs.hour"
                        outlined
                        mask="time"
                        :rules="[val => val && val.length > 0 || $t('should-not-be-empty'), 'time']"
                        class="q-mx-xs"
                        :label="$t('alerts-form-hour') + ' *'"
                        :title="$t('alerts-form-hour') + ' *'"
                        lazy-rules
                      >
                        <template #append>
                          <q-icon
                            name="access_time"
                            class="cursor-pointer"
                          >
                            <q-popup-proxy
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="alerts.formInputs.hour">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-3">
                      <q-input
                        v-model="alerts.formInputs.email"
                        outlined
                        type="email"
                        :label="$t('alerts-form-email') + ' *'"
                        :title="$t('alerts-form-email') + ' *'"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('should-not-be-empty') , val => !!val || 'Email is missing', isValidEmail]"
                        class="q-mx-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <q-btn
                      label="Create"
                      color="primary"
                      @click="createAlert"
                    />
                    <q-btn
                      label="Edit"
                      color="secondary"
                      @click="editAlert"
                    />
                    <q-btn
                      label="Reset"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
                    <q-btn
                      label="Test"
                      @click="test"
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 q-px-xs">
        <app-alerts-table :card-alerts="cardAlerts" />
      </div>
    </div>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, reactive, computed } from 'vue'
import alerts from './Alerts'
import AlertsTable from './components/AlertsTable.vue'
import { ICardAlerts } from './components/AlertsTable'

interface ISelectOption {
	label: string;
	value: string;
}

export default defineComponent({
	components: {
		'app-alerts-table': AlertsTable
	},
	setup () {

		const test = async function (){
			console.log('testing1:', alerts.formInputs)
			console.log('testing2:', await alerts.getAlerts())
		}

		const languages: Array<ISelectOption> = [{label: 'Spanish', value: 'es'}, {label: 'English', value: 'en'}]
		const sendingTypes: Array<ISelectOption> = [{label: 'Email', value: 'email'}, {label: 'Notification', value: 'notification'}]
		const brands: Array<ISelectOption> = [{label: 'Nike', value: 'nike'}, {label: 'Reebok', value: 'rebook'}, {label: 'Puma', value: 'puma'}]



		const isValidEmail = function(val: string) {
			const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
			return emailPattern.test(val) || 'Invalid email';
		}


		const editAlert = function (): void{
			console.log('Starting editAlert!!')
			alertForm.value.validate().then(async (success: boolean) => {
				if (success) {
					console.log("Edited");
					await alerts.editAlert();
					alerts.reset();
					alertForm.value.resetValidation()
				}
				else {
					console.log("oh no, user has filled in at least one invalid value")
				}
			})
			console.log('editAlert Done!!')
		}
		
		const createAlert = function (): void{
			console.log('Starting createAlert!!')
			alertForm.value.validate().then( async(success: boolean) => {
				if (success) {
					console.log("Create")
					await alerts.createAlert();
					alertForm.value.resetValidation()
				}
				else {
					console.log("oh no, user has filled in at least one invalid value")
				}
			})
			console.log('createAlert Done!!')
		}

		const alertForm: Ref<any> = ref(null)

		/******************
		 * Alerts Table ***
		 ******************/
		const cardAlerts: ICardAlerts = reactive({
			rows: computed( () => alerts.getAlerts())
		})

		return {
			alertForm,
			alerts,
			languages,
			sendingTypes,
			brands,

			isValidEmail,
			test,

			onSubmit () {
				console.log("All correct")
			},

			editAlert,
			createAlert,

			onReset () {
				alerts.reset();
			},

			cardAlerts
		}
	}
})
</script>