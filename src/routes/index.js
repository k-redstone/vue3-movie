import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'

export default createRouter({
  // 2가지 모드 있음 Hash, History
  // 여기서는 hash
  history: createWebHashHistory(),
  // 페이지 구분
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})