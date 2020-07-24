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
 *    5.已经完成了微信支付
 *    6.手动删除缓存中，已经被选中了的商品
 *    7.把删除后的购物车数据，填充回缓存
 *    8.再跳转页面
 */



import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
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
  },

  // 点击支付
async  handleOrderPay(){
  try {
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
    // const = {Authorization:token} //已经封装了
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
    // const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams})
    
    const order_number = "HMDD20200724000000001058" //假数据
  
    // 5.发起预支付接口  也假数据
    // const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}})
    const {pay} = {
      "message": {
        "pay": {
          "timeStamp": "1564730510",
          "nonceStr": "SReWbt3nEmpJo3tr",
          "package": "prepay_id=wx02152148991420a3b39a90811023326800",
          "signType": "MD5",
          "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
        },
        "order_number": "HMDD20190802000000000422"
      },
      "meta": {
        "msg": "预付订单生成成功",
        "status": 200
      }
    }
  
    // 6.发起微信支付   
    // await requestPayment(pay)
  
    // 7.查询后台订单数据,以确认是否支付成功
    // const res = await request({url:"/my/orders/chkOrder",method:"POST",data:{order_number}})  

    await showToast({title:"支付成功"})

    // 8.删除缓存中，已经支付的商品
    let newCart = wx.getStorageSync('cart')
    newCart = newCart.filter(v=>!v.isChecked)
    console.log(newCart)
    wx.setStorageSync('cart', newCart)

    wx.navigateTo({
      url: '/pages/order/index',
    })
  } catch (error) {
    await showToast({title:"支付失败"})
  }

}



})