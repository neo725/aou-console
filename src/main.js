import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./theme/material-dashboard-html-v2.1.1/assets/css/material-dashboard.css"
// import "./theme/material-dashboard-html-v2.1.1/assets/demo/demo.css"

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
