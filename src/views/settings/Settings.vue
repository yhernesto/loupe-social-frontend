<template>
  <q-spinner-hourglass
    v-if="loadingSpinner.loading"
    color="purple"
    size="8em"
    class="loadingSpinnerPosition"
  />
  <app-page-wrapper 
    v-if="!loadingSpinner.loading"
    :socialSelector="false"
  >
    <div
     class="row q-gutter-none q-mb-md"
    >
      <div class="col-12"> 
        <app-card-section-wrapper :card-section="yourProfileCard">
          <q-form
            ref="userForm"
            style="width: 100%"
          >
            <div class="row q-gutter-none">
              <div class="col-12 col-md-6">
                <div class="row q-gutter-none">
                  <div class="col-12">
                    <q-input
                      v-model="userName"
                      :label="$t('settings-form-name') + ' *'"
                      :title="$t('settings-form-name') + ' *'"
                      lazy-rules
                      class="q-mx-xs"
                      :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      disable
                    />
                  </div>
                  <div class="col-12">
                   <q-select
                      v-model="userLang"
                      :options="app.getConfig().languages"
                      emit-value
                      map-options
                      :label="$t('settings-form-language') + ' *'"
                      :title="$t('settings-form-language') + ' *'"
                      class="q-mx-xs"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                    />
                     <!-- <select 
                      v-model="$i18n.locale" 
                      >
                      <option value="en">
                        English
                      </option>
                      <Option value="es">
                        Spanish
                      </Option>
                      <Option value="pt">
                        Português
                      </Option>
                    </select>-->
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="userEmail"
                      type="email"
                      :label="$t('settings-form-email') + ' *'"
                      :title="$t('settings-form-email') + ' *'"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || $t('should-not-be-empty') , val => !!val || 'Email is missing', isValidEmail]"
                      class="q-mx-xs"
                      disable
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="row q-gutter-none q-mx-md q-mb-md imageContainer">
                  <!-- <q-img :src="userIcon" style="max-height: 300px" fit="none"> -->
                  <q-img
                    :src="imageProfile"
                    class="profileImage"
                  >
                    <template #error>
                      <div v-if="userName">
                        {{ userName[0].toLocaleUpperCase() }}
                      </div>
                    </template>
                  </q-img>
                </div>
                <div class="row q-gutter-none justify-center">
                  <input
                    ref="fileInput"
                    type="file"
                    style="display: none"
                    accept=".jpg, .jpeg, .png"
                    @change="onFileSelected"
                  >
                  <q-btn
                      color="secondary"
                      class="btnSelectImage"
                      @click="$refs.fileInput.click()"
                  >
                    {{ $t('setting-select-image') }}
                  </q-btn>
                </div>
              </div>
            </div>
          </q-form>
        </app-card-section-wrapper>
      </div>
    </div>
    <div class="row q-gutter-none">
      <div class="col-12">
        <app-card-section-wrapper :card-section="yourEnterpriseCard">
          <q-form
            style="width: 100%"
          >
            <div class="row q-gutter-none">
              <div class="col-12 col-md-6">
                <div class="row q-gutter-none">
                  <div class="col-12">
                    <q-input
                      v-model="enterpriseName"
                      :label="$t('settings-form-name') + ' *'"
                      :title="$t('settings-form-name') + ' *'"
                      lazy-rules
                      class="q-mx-xs"
                      :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      disable
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="enterpriseHashtag"
                      :label="$t('settings-form-hashtag') + ' *'"
                      :title="$t('settings-form-hashtag') + ' *'"
                      lazy-rules
                      class="q-mx-xs"
                      :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      disable
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="enterpriseSector"
                      :label="$t('settings-form-sector') + ' *'"
                      :title="$t('settings-form-sector') + ' *'"
                      lazy-rules
                      class="q-mx-xs"
                      :rules="[ val => val && val.length > 0 || $t('should-not-be-empty')]"
                      disable
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 ">
                <div class="row q-gutter-none q-mx-md q-mb-md enterpriseSection">
                  <q-img
                    :src="enterpriseImage"
                    class="enterpriseImage"
                  >
                    <template #error>
                      <div v-if="enterpriseName">
                        {{ enterpriseName[0].toLocaleUpperCase() }}
                      </div>
                    </template>
                  </q-img>
                </div>
                <div class="row q-gutter-none justify-center">
                  <p> @{{ enterpriseName }}</p>
                  </div>
              </div>
            </div>
          </q-form>
        </app-card-section-wrapper>
      </div>
    </div>
  </app-page-wrapper>
</template>

<script lang='ts'>
import {defineComponent, reactive, Ref, ref, watch} from 'vue';
import PageWrapper from '@/components/pageWrapper/PageWrapper.vue';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'

import { injectStrict } from '@/utils/injections'
import {Controller} from '@/Controller';
import SettingsService from "@/services/settings.services";
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import i18n from "@/plugins/i18n/i18n";

export default defineComponent({
	name: 'Settings',
	components: {
		'app-page-wrapper': PageWrapper,
		'app-card-section-wrapper': CardSectionWrapper
	},
	setup () {
    const app: Controller = injectStrict('appController');

    const { t, locale } = useI18n({ useScope: 'global' })
    
    const userForm: Ref<any> = ref(null)
    const userName: Ref<string | null> = ref(app.user.profile?.user_name || null)
    const userLang: Ref<string | null> = ref(app.user.profile?.language || null)
    const userEmail: Ref<string | null> = ref(app.user.profile?.email || null)
    const userIcon: Ref<string> = ref("https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png")

    const enterpriseName: Ref<string | null> = ref(app.user.profile?.client.name || null)
    const enterpriseHashtag: Ref<string | null> = ref(app.user.profile?.client.ig_official_hashtag || null)
    const enterpriseSector: Ref<string | null> = ref(app.user.profile?.client.sector || null)
    //const enterpriseIcon: Ref<string> = ref("https://shop.stfx.ca/wp-content/uploads/2018/04/adidas-black-vector-logo-400x400.png")

    const settingsService = new SettingsService();

    let loadingSpinner = reactive({loading: false})
    const $q = useQuasar()
    const imageProfile :Ref<string | null> = ref(app.user.profile?.photo_url || null)
    const enterpriseImage: string = app.user.profile?.client.photo_url!;
    const yourProfileCard: ICardSectionWrapper = {
      title: t('settings-form-profile-section-name')
    }

    const yourEnterpriseCard: ICardSectionWrapper = {
      title: i18n.global.t('settings-form-enterprise-section-name')
    }

    let selectedFile: string | Blob = new Blob();
    let formData = new FormData();
    const isValidEmail = function (val: string) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }

    const onFileSelected = function (event: any) {
      'use strict';
      loadingSpinner.loading = true;
      selectedFile = event.target.files[0];
      formData = new FormData();
      formData.append('image', selectedFile);
      settingsService.postSelectedImage(formData, app.user.profile?.email!)
        .then((r) => {
          console.log("-> r", r);
          loadingSpinner.loading = false;
          showNotification( i18n.global.t('settings-change-image-successfully'), 'green-6');
          location.reload();
        })
        .catch((e) => {
          console.log("-> e", e);
          loadingSpinner.loading = false;
          showNotification( i18n.global.t('settings-change-image-error'), 'negative');
        });
    }

    const showNotification = function (message: string, color: string) {
      $q.notify({
        message:  message,
        color: color
      })
    }

    const handle = (promise: any, goodNotificationMessage: string, goodColorMessage: string, badNotificationMessage: string, badColorMessage: string) => {
      return promise
          .then((data: any) =>{
            showNotification(goodNotificationMessage, goodColorMessage);
            [data, undefined];
          })
          .catch((error: any) => {
            showNotification(badNotificationMessage, badColorMessage);
            Promise.resolve([undefined, error]);
          });
    };

  watch(userLang,  async (current) => {
    await handle(settingsService.changeUserLang(current!, app.user.profile?.email!), t('settings-change-language-successfully'), 'green-6', t('settings-change-language-error'), 'negative')
    //TODO: check for backend is returns 'en'  or 'en-419'
    const languageSplited = current?.split('-')[0];
    locale.value = languageSplited!!;
    await app.user.getProfile();
  });


		// const editUser = function (): void{
		// 	userForm.value.validate().then(async (success: boolean) => {
		// 		if (success) {
		// 			console.log("Edited");
		// 			await alerts.editAlert();
		// 			alerts.reset();
		// 			userForm.value.resetValidation()
		// 		}
		// 		else {
		// 			console.log("oh no, user has filled in at least one invalid value")
		// 		}
		// 	})
		// 	console.log('editAlert Done!!')
		// }

        return {
				app,
				yourProfileCard,
				yourEnterpriseCard,

				userForm,
				userName,
				userLang,
				userEmail,
				userIcon,
				isValidEmail,
				// editUser

				enterpriseName,
				enterpriseHashtag,
				enterpriseSector,
				//enterpriseIcon,

        selectedFile,
        onFileSelected,
        loadingSpinner,
        imageProfile,
        enterpriseImage
    }
  }
})
</script>

<style lang="scss">
.loadingSpinnerPosition{
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 -50% 0 0;
  transform: translate(-50%, -50%)
}
.profileImage{
  object-fit: cover;
  margin-left: 5%;
  margin-right: 5%;
  max-width: 30%;
  max-height: 300px;
  border-radius: 5%;
}

.btnSelectImage{
  alignment: center;
}
.imageContainer{
  align-items: center;
  justify-content: center;
}
.enterpriseImage{
  max-height: 40%;
  max-width: 40%;
  object-fit: cover;
  border-radius: 5%;
}
.enterpriseSection{
  align-items: center !important;
  justify-content: center !important;
}
</style>