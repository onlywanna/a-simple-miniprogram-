/* 1. 获取用户的收获地址
//       1.绑定点击事件
//       2.调用小程序内置 api 获取用户的收货地址 wx.chooseAddress
        上边这样直接调用，假如用户第一次获取地址时需要授权选择了取消，则后边点击获取地址时就不会再弹出授权消息了，也就不能继续操作了
    
  2. 获取用户对小程序所授予 获取地址的权限状态 scope
    1. 假设用户 点击获取收获地址的提示框为  确定 
        scope 值为true时，可直接调用 获取收获地址
    2.假如用户从来没有调用过wx.chooseAddress
        scope的值为undefined 可以调用，弹出单个授权消息框
    3.假设用户 点击获取单个授权消息框 点击了取消
      scope的值为false
      1. 则需要用户 自己打开 总的授权设置页面( wx.openSetting)  让用户选中对应按钮，让图标边绿，scope的值也会相应的改变。
      2. 然后再调用wx.chooseAddress

    4.把获取到的收货地址存入到本地存储中

2. 页面加载完毕
  1 获取本地存储中的地址数据
  2 把数据设置给data中的一个变量

3. onShow
   0 回到了商品详情页面， 第一次添加商品的时候 手动添加了属性
    1 num = 1
    2 checked = true
  1 获取缓存中的购物车数组
  2 把购物车数据填充到data中



4. 全选的实现，数据的展示
  1 onShow 获取缓存中的购物车数组
  2 根据购物车中的商品数据来进行计算， 所有的商品全被选中即 checked 为true 全选才被选中

5. 总价格和总数量
  1. 都需要商品被选中， 才参与计算
  2. 获取购物车数组
  3. 遍历
  4. 判断商品是否被选中
  5. 总价格和总数量算一下，并设置会data中

  */

import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js"

Page({
  /*页面的初始数据*/
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalMoney:0
  },
  onShow(){
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
    const cart = wx.getStorageSync('cart') ||[]

    // 1.计算全选
    // const allChecked = cart.every(v => v.isChecked)
    let allChecked = true

    // 1. 总价格  总数量
    let totalMoney = 0
    let totalNum = 0
    cart.forEach(v=>{
      if(v.isChecked){
        totalMoney += v.num * v.goods_price
        totalNum += v.num
      }else{
        allChecked=false
      }
    })
    // 判断数组是否为空？
    allChecked = cart.length===0?false:allChecked
    this.setData({
      cart,
      allChecked,
      totalMoney,
      totalNum
    })


  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {

  },



  // 1.点击获取地址
  async handleChooseAddress(){
    try {
      // 1. 获取权限状态  
      const res1 = await getSetting()
      const scopeOfAddress = res1.authSetting["scope.address"]
      if(scopeOfAddress === false){    // 2.判断权限状态
        await openSetting()       
      }
      // 4.调用获取收货地址的api
      const res2 = await chooseAddress()
      res2.all = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
      // 5.存入到缓存中
      wx.setStorageSync('address', res2) 
      console.log(res2)
    }catch(error) {
      console.log(error)
    }
  }
})