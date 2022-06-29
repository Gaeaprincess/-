
export default {
  path: '/market',
  redirect: '/market/index',
  name: 'market',
  component: () => import('/src/views/Market/index.vue'),
  children: [
    {
      path: '/market/index',
      component: () => import('/src/views/Market/Market/index.vue'),
      redirect: '/market/home',
      children: [
        {
          path: '/market/home',
          component: () => import('/src/views/Market/Market/navbar/index.vue')
        },
        {
          path: '/market/paylist',
          component: () => import('/src/views/Market/Market/payList/index.vue')
        },
        {
          path: '/market/bill',
          component: () => import('/src/views/Market/Market/check/index.vue')
        },
        {
          path: '/market/order',
          component: () => import('/src/views/Market/Market/order/index.vue'),
          redirect: '/market/order/all',
          children: [
            {
              path: '/market/order/all',
              component: () => import('/src/views/Market/Market/order/allOrder/index.vue')
            },
            {
              path: '/market/order/wait',
              component: () => import('/src/views/Market/Market/order/waitOrder/index.vue'),
            },
            {
              path: '/market/order/got',
              component: () => import('/src/views/Market/Market/order/getOrder/index.vue'),
            },
          ]
        },
      ]
    },
  ]
}