/**
 * 1. 页面加载需要做的事情
 *    1 从缓存中获取购物车数据，渲染到页面中
 *        这些数据的 isChecked 为 true
 * 
 * 2. 微信支付
 *    1. 哪些人 哪些账号 可以实现微信支付
 *        1.企业账号
 *        2.企业账号的小程序后台 必须给开发者 添加上白名单
 *            1.一个appid可以同时绑定多个开发者
 *            2.这些开发者就可以公用这个appid和它的开发权限了
 * 
 * 3. 当点击支付按钮的时候
 *    1. 先判断缓存中有没有token
 *    2.没有跳转到授权页面， 进行获取token
 *    3. 有token...
 */


import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js"
Page({
  /*页面的初始数据*/
  data: {
    address: {},
    cart: [],
    totalMoney: 0
  },
  onShow() {
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
    let cart = wx.getStorageSync('cart') || []

    //  过滤后的购物车数组
    cart = cart.filter(v => v.isChecked)


    // 下面是把setCart代码拿出来单独写了

    // 1. 总价格  总数量
    let totalMoney = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.isChecked) {
        totalMoney += v.num * v.goods_price
        totalNum += v.num
      }
    })
    // 判断数组是否为空？
    this.setData({
      totalMoney,
      totalNum,
    })

    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
  },




})