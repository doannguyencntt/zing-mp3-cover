import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import VTooltip from 'v-tooltip'
import store from './store/index'
import Bus from './EventBus'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './assets/styles/app.scss'
import VueTippy, { TippyComponent } from "vue-tippy"

Vue.config.productionTip = false
Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);
Vue.use(PerfectScrollbar)
Vue.use(VTooltip)
Vue.use(Bus)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
