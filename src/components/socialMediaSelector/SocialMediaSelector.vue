<template>
  <div class="row justify-start">
    <div class="col self-center text-left">
      <q-btn-toggle
        v-model="socialMedia"
        class="q-mr-sm"
        dense
        toggle-color="amber-5"
        no-caps
        :options="socialMediaList"
        disable
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, WritableComputedRef } from 'vue';
import { injectStrict } from '../../utils/injections'
import { Controller } from '../../Controller';
//import { useI18n } from 'vue-i18n'
import { API_SOCIAL_BASE } from '@/constants';

export default defineComponent({
    name: 'SocialMediaSelector',
    setup () {
//        const { t } = useI18n({ useScope: 'global' })
        const app: Controller = injectStrict('appController');


        const socialMedia:  WritableComputedRef<string|null> = computed({
            get(): string|null {
                return app.socialMedia
            },
            set(newValue: string|null): void {
                if(newValue)
                    app.socialMedia = newValue;
            },
        });

        const socialMediaList = [{label: 'Instagram', value: API_SOCIAL_BASE.INSTAGRAM}, {label: 'Facebook', value: API_SOCIAL_BASE.FACEBOOK}]

        return {
            app,
            socialMedia,
            socialMediaList,
        }
    }
})
</script>