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
 *    4.创建订单 获取订单编号
 * 
 */


import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js"
import {request} from "../../request/index.js"
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

  // 点击支付
async  handleOrderPay(){
    const token = wx.getStorageSync('token')      // 1. 判断缓存中有无token
    //2.如果没有的话
    if(!token){   
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    } 
    // 3.创建订单
    //3.1 准备请求头参数
    const header = {Authorization:token}
      // 3.2准备请求体参数
    const order_price = this.data.totalMoney
    const consignee_addr = this.data.address.all
    let goods=[]
    const cart = this.data.cart
    cart.forEach(v=>goods.push({
      goods_id: v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderParams = {order_price,consignee_addr,goods}
    // 4.准备发送请求 创建订单 ，获取订单编号 (因为没有后台, 这里就用假数据了, 真数据可以看笔记的截图)
    // const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams,header})
    
    const order_number = "HMDD20200724000000001058"
  }




})