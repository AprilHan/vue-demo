import Vue from 'vue'
// 引入 element-ui组件
import ElementUI from 'element-ui'
// 引入组件的样式
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
import detail from './components/detail/detail'
console.log(Vue)
new Vue({
  el: '#app',
  components: {
    detail
  }
})
