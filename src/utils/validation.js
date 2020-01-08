import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'

import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示信息，extend自定义验证规则
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})
