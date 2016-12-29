// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入 element-ui组件
import ElementUI from 'element-ui'
// 引入组件的样式
import 'element-ui/lib/theme-default/index.css'

import Index from './Index'
import step1 from './components/step1'
// import step2 from './components/step2'
const demo2 = { template: '<div>demo2</div>' }
const demo3 = { template: '<div>demo3</div>' }
Vue.use(ElementUI)
Vue.use(VueRouter)
const routes = [
  { path: '/activeCenter', component: step1 },
  { path: '/infoCenter', component: demo2 },
  {path: '/movieList', component: demo3}
]
const router = new VueRouter({routes})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Index></Index>',
  components: { Index },
  router: router
}).$mount('#app')
