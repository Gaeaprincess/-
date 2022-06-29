export default {
  path: '/problem',
  // redirect: '/problem',
  name: 'problem',
  component: () => import('/src/views/Problem/index.vue'),
  children: [
    {
      path: '',
      component: () => import('/src/views/Problem/Problem/index.vue')
    },
    {
      path: 'info',
      component: () => import('/src/views/Problem/ProblemInfo/index.vue')
    },
  ]
}