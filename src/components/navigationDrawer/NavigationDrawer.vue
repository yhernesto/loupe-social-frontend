<template>
  <q-drawer
    v-if="app.user.getIsAuthenticated()"
    v-model="app.drawer"
    :width="200"
    :breakpoint="500"
    bordered
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template
          v-for="(route, index) in routes"
          :key="'for_' + index"
        >
          <!-- app.user.getIsAuthenticated() is used here in order to could display some public URL ni the drawer -->
          <q-item
            v-if="(app.user.getIsAuthenticated() ? !route.meta.public : route.meta.public) && !route.meta.hidden"
            v-ripple
            clickable
            :to="route.path"
          >
            <q-item-section avatar>
              <q-icon :name="route.meta.icon" />
            </q-item-section>
            <q-item-section>
              {{ route.name ? $t((route.name).toString()) : '' }}
            </q-item-section>
          </q-item>
          <q-separator
            v-if="false"
            :key="'sep' + index"
          />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref } from 'vue';
import { injectStrict } from '../../utils/injections'
import { RouteLocationNormalizedLoaded, RouteRecordNormalized, useRoute, useRouter } from "vue-router";
import {Controller} from '../../Controller';

export default defineComponent({
    name: 'NavigationDrawer',

    setup () {
        const app: Controller = injectStrict('appController');

        const routes: RouteRecordNormalized[] = useRouter().getRoutes();
        const route: RouteLocationNormalizedLoaded = useRoute();

        const miniState: Ref = ref(false)
        return {
          route,
          routes,
          app,
          miniState
        }
    }
})
</script>