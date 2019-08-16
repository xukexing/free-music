// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import store from './store/index'

fastclick.attach(document.body)

import 'assets/stylus/reset.css'
import 'assets/stylus/animate.css'
import 'assets/stylus/border.css'
import 'assets/stylus/icon.styl'
import 'assets/stylus/base.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
