import request from '@/utils/request'
// import { random } from 'core-js/core/number'

export const getGoodsList = (data) => {
  return new Promise((resolve, reject) => {
    // const _1 = []
    request({
        url: '/onlinejudge/goods/gets/goodslist',
        method: 'post',
        data: JSON.stringify({
          goods_type: data
        })
      }).then(res => {
        resolve(res.data.data)
      })
    // const _1 = [
    //   {
    //     title: '键盘区',
    //     data: []
    //   },
    //   {
    //     title: '鼠标区',
    //     data: []
    //   },
    //   {
    //     title: '书籍区',
    //     data: []
    //   }
    // ]
    // for (let i = 0; i < 3; i++) {
    //   for (let j = 0; j < 12; j++) {
    //     _1[i].data.push({
    //       title: '罗马',
    //       value: Math.random() % 500,
    //       img: 'https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto'
    //     })
    //   }
    // }
    // console.log(_1);
    // resolve(_1)
    // request({
    //   url: '/onlinejudge/admin/manage/goods/gets/goodslist',
    //   method: 'get'
    // }).then(res => {
    //   // const _1 = []
    //   // res.data.forEach(i => {
    //   //   _1.push({
    //   //     CreatedAt: i.CreatedAt,
    //   //     UpdatedAt: i.UpdatedAt,
    //   //     id: i.id,
    //   //     goods_name: i.goods_name,
    //   //     goods_value: i.goods_value,
    //   //     goods_count: i.goods_count,
    //   //     goods_type: i.goods_type,
    //   //     goods_photo_url: i.goods_photo_url,
    //   //     goods_description: i.goods_description
    //   //   })
    //   // })
    //   if (res.code !== 0) {
    //     reject(res)
    //   }
    //   resolve(res)
    // })
  })
}

export const exchangeGoods = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/goods/buy',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if(res.data.code !== 0) reject(res.data.msg)
      resolve(res.data.msg)
    })
  })
}

export const getOrderList = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/goods/order',
      method: 'post',
      data: JSON.stringify({
        status: data
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data.msg)
      resolve(res.data)
    })
  })
}