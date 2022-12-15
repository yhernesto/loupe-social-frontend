<template>
  <div class="row principalRow">
    <div class="col-12 col-md-4 loginFormm">
      <q-card 
        class="loginCard" 
        flat
      >
        <q-form 
          ref="loginForm" 
          class="q-gutter-md" 
          @submit="doLogin"
        >
          <div class="column items-center ">
            <div class="col ">
              <q-img
                src="../../assets/img/login/Logo_Original.png"
                height="80px"
                width="300px"
              />
              <div class="text-h6 txtLogin">
                {{ $t('login-tittle') }}
              </div>
            </div>
            <div class="col">
              <q-input
                v-model="login.email"
                class="frmInput"
                outlined
                color="primary"
                label="Email"
                label-color="primary"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || $t('should-not-be-empty'),
                ]"
              />
            </div>
            <div class="col">
              <q-input
                v-model="login.password"
                class="frmInput"
                outlined
                color="primary"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                label-color="primary"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || $t('should-not-be-empty'),
                ]"
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col">
              <div class="row q-gutter-none justify-center">
                <div class="col-12">
                  <q-btn
                    class="btnLongin"
                    :label="$t('login-btn-enter')"
                    type="submit"
                    color="primary"
                    style="width: 100%"
                    @click="doLogin"
                  />
                  <!-- <q-btn
										label="Test"
										@click="test()"
									/> -->
                </div>
              </div>
              <br>
              <q-banner 
                v-if="wrongCredentials" 
                inline-actions 
                class="text-red"
              >
                {{ $t("login-invalid-credentials") }}
              </q-banner>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
    <div class="col-12 col-md-8 loginImage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, reactive } from "vue";

import { Login } from "@/views/login/Login";
import { useRouter } from "vue-router";
import { Controller } from "../../Controller";
import { injectStrict } from "../../utils/injections";

export default defineComponent({
  setup() {
    const app: Controller = injectStrict("appController");

    const login: Login = reactive(new Login());
    const wrongCredentials: Ref<boolean> = ref(false);
    const router = useRouter();

    const isPwd: Ref<boolean> = ref(true); // TODO: add a timer

    const doLogin = function(): void {
      console.log("doingLogin!!!");
      loginForm.value.validate().then(async (success: boolean) => {
        if (success) {
          let successfulLogin: boolean = false;
          if (login.email !== null && login.password !== null) {
            successfulLogin = await handle(
              app.user.doLogin({
                email: login.email,
                password: login.password,
              })
            );
          }

          wrongCredentials.value = !successfulLogin;
          loginForm.value.resetValidation();
          router.push("/");
        } else {
          console.log("oh no, user has filled in at least one invalid value");
        }
      });
    };

    const test = function() {
      console.log("login!!!:", login);
    };
    const handle = (promise: any) => {
      return promise
        .then((data: any) => [data, undefined])
        .catch((error: any) => {
          Promise.resolve([undefined, error]);
          wrongCredentials.value = true
        });
    };

    const loginForm: Ref<any> = ref(null);
    return {
      loginForm,
      login,
      doLogin,
      test,
      wrongCredentials,
      isPwd,
    };
  },
});
</script>

<style lang="scss" scoped>
.loginImage {
  background: url("../../assets/img/login/login_wallpaper.png") no-repeat;
  background-size: 100% 100%;
}
.principalRow {
  height: 100vh;
}
@media (min-width: 1024px) {
  .loginCard {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 40%;
  }
}
@media (max-width: 1023px) {
  .loginCard {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10%;
  }
  .loginFormm {
    max-height: 200px;
  }
}

@media (min-width: 1250px) {
  .frmInput {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
@media (min-width: 800px) and (max-width: 1249) {
  .frmInput {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.txtLogin {
  text-align: center;
  margin-top: 5% !important;
  margin-bottom: 10%;
}

.q-field--outlined .q-field__control:before {
  border: 1px solid rgb(162, 10, 200);
}
</style>
