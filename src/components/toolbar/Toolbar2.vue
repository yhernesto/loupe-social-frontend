<template>
  <div>
    <q-toolbar>
      <q-btn
          v-if="app.user.getIsAuthenticated()"
          flat
          round
          dense
          icon="menu"
          @click="app.drawer = !app.drawer"
      />
      <q-toolbar-title> {{ route.name ? $t((route.name).toString()): '' }}</q-toolbar-title>
      <q-space />
      <!-- <q-btn @click="app.user.getProfile()">
        GetProfile
      </q-btn> -->
      <!-- <q-space /> -->
      <template v-if="app.user.getIsAuthenticated()">
        <div
            class="cursor-pointer"
            style="height: 100% !important;"
            clickable
        >
          <q-avatar
              size="56px"
              class="q-mb-sm q-mr-sm q-mt-sm"
              style="display: inline-block;"
          >
            <img
                :src="app.user.profile?.photo_url"
                style="height: 65px; width: 95px; border-radius: 5px;"
            >
          </q-avatar>
          <div
              style="display: inline-block;"
              class="informationContainer"
          >
            <div
                class="informationItems"
            >
              <div 
                  v-if="app.user.profile?.first_name.length + app.user.profile?.last_name.length <15"
                  class="text-weight-bold "
              >
                {{ app.user.profile?.first_name + ' '+app.user.profile?.last_name }}
              </div>
              <div
                  v-if="app.user.profile?.first_name.length + app.user.profile?.last_name.length >=15"
                   class="text-weight-bold "
              >
                {{ (app.user.profile?.first_name + ' '+app.user.profile?.last_name).substring(0,15) + '..' }}
              </div>
              <div
                  v-if="app.user.profile?.client.name.length <10"
              >
                {{ app.user.profile?.client.name }}
              </div>
              <div
                  v-if="app.user.profile?.client.name.length >=10"
              >
                {{ app.user.profile?.client.name.substring(0,9) + '..' }}
              </div>
            </div>
          </div>

          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                  v-if="getSettingRoute()"
                  clickable
                  :to="getSettingRoute()?.path"
              >
                <q-item-section>{{ getSettingRoute()?.name }}</q-item-section>
              </q-item>
              <q-item
                  clickable
                  @click="doLogout()"
              >
                <q-item-section>{{ $t('toolbar-logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </template>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {injectStrict} from '@/utils/injections'
import {Controller} from '@/Controller';
import {RouteLocationNormalizedLoaded, RouteRecord, useRoute, useRouter} from "vue-router";
import router from "@/plugins/router/router";

export default defineComponent({
  name: 'Toolbar',
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const routes = useRouter().getRoutes();

    const app: Controller = injectStrict('appController');

    const getSettingRoute = function (): RouteRecord | undefined {
      return routes.find((route) => route.name === "Settings")
    }

    const doLogout = async function (): Promise<void> {
      await app.user.logout();
      router.push({name: 'Login'})
    }

    return {
      app,
      route,
      getSettingRoute,
      doLogout,
    }
  }
})
</script>

<style scoped>
/* .center {
  justify-content: center !important;
  align-items: center !important;
	} */
.informationContainer {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.informationItems{
  display: inline-block;
  text-align: center;
}
</style>