import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/success',
      component: () => import('@/pages/Success')
    },
    {
      path: '/sign',
      component: () => import('@/pages/Sign')
    },
    {
      path: '/control',
      component: () => import('@/pages/Control')
    }
  ]
})
