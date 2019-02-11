import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import Vuelidate from 'vuelidate'
// import VeeValidate from 'vee-validate'
// import { ValidationProvider } from 'vee-validate'

import App from './App.vue'

import CommonComponent from './component/common'

// @ bootstrap
// import "bc/normalize-css/normalize.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// @ theme
// import "./theme/material-dashboard-html-v2.1.1/assets/css/material-dashboard.css"
// import "./theme/material-dashboard-html-v2.1.1/assets/demo/demo.css"
import '@adminlte/css/adminlte.css'
import '@adminlte/css/skins/_all-skins.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import 'vuelidate/dist/vuelidate.min.js'

import './scss/main.scss'

// @ Vuex
import store from './store'

//console.log(Vuelidate)

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
// Vue.use(VeeValidate)

Vue.use(CommonComponent.DatePicker)
Vue.use(CommonComponent.Loading)

// Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
