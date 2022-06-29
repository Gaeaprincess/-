
export default {
  path: '/',
  redirect: '/home/index',
  name: 'home',
  meta: {
    title: 'SUSE JUDGE'
  },
  component: () => import('/src/views/Home/index.vue'),
  children: [
    {
      path: '/home/index',
      meta: {
        title: 'SUSE JUDGE'
      },
      component: () => import('/src/views/Home/Home/index.vue')
    },
    {
      path: '/home/info',
      meta: {
        title: 'SUSE JUDGE'
      },
      component: () => import('/src/views/Home/HomeInfo/index.vue')
    },
  ]
}