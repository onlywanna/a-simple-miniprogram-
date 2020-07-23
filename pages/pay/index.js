/**
 * 1. 页面加载需要做的事情
 *    1 从缓存中获取购物车数据，渲染到页面中
 *        这些数据的 isChecked 为 true
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