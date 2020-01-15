import moment from 'moment'
import Vue from 'vue'

moment.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return moment(value).startOf('second').fromNow()
})

Vue.filter('datatime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
