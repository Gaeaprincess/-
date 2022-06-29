
export default {
  path: '/contests',
  redirect: '/contests/index',
  name: 'contests',
  component: () => import('/src/views/Contests/index.vue'),
  children: [
    {
      path: '/contests/index',
      component: () => import('/src/views/Contests/Contests/index.vue')
    },
    {
      path: '/contests/info',
      component: () => import('/src/views/Contests/ContestInfo/index.vue'),
      redirect: '/contests/info/overview',
      children: [
        {
          path: '/contests/info/overview',
          component: () => import('/src/views/Contests/ContestInfo/overView/index.vue')
        },
        {
          path: '/contests/info/problem',
          component: () => import('/src/views/Contests/ContestInfo/problem/index.vue'),
        },
        {
          path: '/contests/info/rank',
          component: () => import('/src/views/Contests/ContestInfo/rank/index.vue'),
        },
        {
          path: '/contests/info/problemInfo',
          component: () => import('/src/views/Contests/ContestInfo/problemInfo/index.vue'),
        },
        {
          path: '/contests/info/status',
          component: () => import('/src/views/Contests/ContestInfo/status/index.vue'),
        },
        {
          path: '/contests/info/comment',
          component: () => import('/src/views/Contests/ContestInfo/comment/index.vue'),
        },
      ]
    },
  ]
}