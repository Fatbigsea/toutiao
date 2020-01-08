import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'

import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示信息，
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// extend添加自定义验证规则
extend('mobile', {
  validate: value => {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  message: '{_field_}格式错误'
})

extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式错误'
})
