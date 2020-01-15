import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/filter'

// vant组件的全局注册
import './utils/register-vant'

// 加载全局样式
import './styles/index.less'

// 配置REM适配
import 'amfe-flexible'

import './utils/validation'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
