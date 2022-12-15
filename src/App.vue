<template>
  <q-layout
    view="hHh LpR fFf"
    class="shadow-2 rounded-borders"
  >
    <q-header
      elevated
      class="primary"
    >
      <app-toobar v-if="app.user.getIsAuthenticated()" />
    </q-header>

    <app-navigation-drawer />

    <q-page-container>
      <router-view v-if="!app.loadingConfig" />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent, watch } from 'vue';
import { injectStrict } from './utils/injections'
import { Controller } from './Controller';

import Toolbar2 from "./components/toolbar/Toolbar2.vue";

import NavigationDrawer from "./components/navigationDrawer/NavigationDrawer.vue"
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',

  components:{
    'app-toobar': Toolbar2,
    'app-navigation-drawer' : NavigationDrawer
  },

  setup () {
    const $q = useQuasar();

    console.log('Setup Ini')
    const app: Controller = injectStrict('appController');

    const { t,} = useI18n({
          inheritLocale: true,
        })

    watch(
			() => app.loadingConfig,
			() => {
          if(app.loadingConfig){
            $q.loading.show({
                message: 'Loading config...'
              })
          } else {
            $q.loading.hide()
          }
        }
      ,
			{ immediate: true},
		);  

    return {
      t,
      app,
    }
  }
})
</script>