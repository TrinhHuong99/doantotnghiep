<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            MASTER
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Welcome to MASTER 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent>

            <!-- email -->
            <b-form-group label-for="email" label="Email">
              <validation-provider #default="{ errors }" name="Email" rules="required|email">
                <b-form-input id="email" v-model="userEmail" name="login-email" :state="errors.length > 0 ? false : null"
                  placeholder="john@example.com" autofocus />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <b-link :to="{ name: 'auth-forgot-password-v1' }">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
              <validation-provider #default="{ errors }" name="Password" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-form-input id="password" v-model="password" :type="passwordFieldType" class="form-control-merge"
                    :state="errors.length > 0 ? false : null" name="login-password" placeholder="Password" />

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                Remember Me
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" type="submit" block :disabled="invalid" @click="login()">
              Sign in
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>New on our platform? </span>
          <b-link :to="{ name: 'auth-register-v1' }">
            <span>Create an account</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div>

        <!-- social button -->
        <div class="auth-footer-btn d-flex justify-content-center">
          <b-button href="javascript:void(0)" variant="facebook">
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button href="javascript:void(0)" variant="twitter">
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button href="javascript:void(0)" variant="google">
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button href="javascript:void(0)" variant="github">
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";


export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      password: 'admin',
      userEmail: 'admin@demo.com',
      status: '',
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

      return JSON.parse(jsonPayload);
    },
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // on success do something
          // console.log('GoogleUser', GoogleUser)

          let idToken = ''

          Object.keys(GoogleUser).forEach(key => {
            if (GoogleUser[key].id_token) {
              idToken = GoogleUser[key].id_token
            }
          })

          useJwt.verifyGoogle({
            id_token: idToken
          }).then((res) => {
            if (res.data.code === 1) {
              const playload = this.parseJwt(res.data.data.token)
              useJwt.setToken(res.data.data.token)
              // useJwt.setRefreshToken(res.data.data.refreshToken)
              localStorage.setItem('userData', JSON.stringify(playload.data))
              this.$ability.update(playload.data.ability)
              this.$router.replace(getHomeRouteForLoggedInUser(playload.data.role))
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: `Welcome ${playload.name}`,
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: `You have successfully logged in as ${playload.data.role}. Now you can start to explore!`,
                    },
                  })
                })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Notification",
                  icon: "InfoIcon",
                  text: res.data.message,
                  variant: "danger",
                  position: "bottom-right",
                },
              });
            }
            console.log(res)
          })

          // const userInfo = {
          //   loginType: 'google',
          //   google: GoogleUser
          // }
          // this.$store.commit('setLoginUser', userInfo)
          // this.$router.push('/')
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt.login({
            email: this.userEmail,
            password: this.password,
          })
            .then(response => {
              const { userData } = response.data
              useJwt.setToken(response.data.accessToken)
              useJwt.setRefreshToken(response.data.refreshToken)
              localStorage.setItem('userData', JSON.stringify(userData))
              this.$ability.update(userData.ability)

              //  This is just for demo purpose as well.
              //  Because we are showing eCommerce app's cart items count in navbar
              this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

              //  This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: `Welcome ${userData.fullName || userData.username}`,
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                    },
                  })
                })
            })
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response.data.error)
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
