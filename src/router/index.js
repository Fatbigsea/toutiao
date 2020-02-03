import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tabbar',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      }, {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }, {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  }, {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  }, {
    // 作品
    name: 'my-like',
    path: '/my-like/:type?',
    component: () => import('@/views/user-like'),
    props: true
  }
  //  {
  // 历史
  //   name: 'my-like-history',
  //   path: '/my-like/history',
  //   component: () => import('@/views/user-like')
  // }, {
  //   // 收藏
  //   name: 'my-like-collect',
  //   path: '/my-like/collect',
  //   component: () => import('@/views/user-like')
  // }
]

const router = new VueRouter({
  routes
})

export default router
