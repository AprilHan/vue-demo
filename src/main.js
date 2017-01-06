// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入 element-ui组件
import ElementUI from 'element-ui'
// 引入组件的样式
import 'element-ui/lib/theme-default/index.css'

import Active from './Index'
import Info from './Info'
import Movie from './Movie'
import Manage from './components/active/Manage'
import step1 from './components/active/step1'
import step2 from './components/active/step2'
import step3 from './components/active/step3'
import step4 from './components/active/step4'
Vue.use(ElementUI)
Vue.use(VueRouter)
const routes = [
  {
    // 以 / 开头的会被当做根路径
    path: '/activeCenter',
    component: Active,
    children: [
      {
        path: 'publish/1',
        component: step1
      },
      {
        path: 'publish/2',
        component: step2
      },
      {
        path: 'publish/3',
        component: step3
      },
      {
        path: 'publish/4',
        component: step4
      },
      {
        path: 'manage',
        component: Manage
      },
      {
        path: '',
        component: step1
      }
    ]
  },
  {
    path: '/infoCenter/:tab',
    component: Info
  },
  {
    path: '/infoCenter',
    redirect: '/infoCenter/ask'
  },
  {path: '/movieList', component: Movie},
  {path: '', redirect: '/activeCenter/publish/1'}
  // {path: '*', redirect: '/activeCenter/publish/1'}
]
const router = new VueRouter({routes})
/* eslint-disable no-new */
new Vue({
  router: router,
  watch: {
    '$route' (to, from) {
    }
  }
}).$mount('#app')
