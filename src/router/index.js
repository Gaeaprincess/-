import { createRouter, createWebHashHistory } from 'vue-router'
// import Problem from '../views/Problem.vue'
// import Contests from '../views/Contests.vue'
// import Status from '../views/Status.vue'
import Rank from '../views/rank'
// import Market from '../views/Market'
import Profile from '../views/profile'
import Index from '../views/index.vue'

import Contests from './modules/Contests.js'
import Home from './modules/Home.js'
import Market from './modules/Market.js'
import Status from './modules/Status.js'
import Problem from './modules/Problem.js'

const routes = [
  Home,
  // { path: '/',name: 'Home',component: Home},
  Problem,
  Contests,
  // { path: '/Contests',name: 'Contests',component: Contests},
  Status,
  { path: '/Rank',name: 'Rank',component: Rank},
  Market,
  // { path: '/Market',name: 'Market',component: Market},
  { path: '/Profile',name: 'Profile',component: Profile},
  { 
    path: '/leader',
    name: 'leader',
    component: Index, 
    children: [
      {
        path: '/leader',
        meta: {
          title: 'SUSE JUDGE'
        },
        component: Index
      },
    ]
  }
]

const router = createRouter({
  // mode:'history', 
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  // base:process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if(to.meta.content){
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});
export default router
