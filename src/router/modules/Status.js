export default {
  path: '/status',
  // redirect: '/home',
  name: 'status',
  component: () => import('/src/views/Status/index.vue'),
  children: [
    {
      path: '',
      component: () =>  import('/src/views/Status/index.vue'),
    },
    {
      path: 'all',
      component: () => import('/src/views/Status/all/index.vue')
    },
    {
      path: 'mine',
      component: () => import('/src/views/Status/mine/index.vue')
    },
  ]
}