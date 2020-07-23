import {login} from "../../utils/asyncWx.js"
import {request} from "../../request/index"
Page({
  async handleGetUserInfo(e){
    try {
      // 1. 获取用户信息
    console.log(e)
    const {encryptedData,rawData,iv,signature} = e.detail

    // 2.获取小程序登录成功后的code

    const {code} = await login()
    console.log(code)
    const loginParams = {encryptedData,rawData,iv,signature,code}
    // 3.发送请求获取用户的token值
    // const {token} = await request({
    //   url:"/users/wxlogin",
    //   data:{
    //     loginParams
    //   },
    //   method:"post"
    // })
    console.log("这里无法获取--因为没有后台 ")

    // em.....自己造一个token吧
    const token = "woshijiadetokenya"

    // 4.把token存入到缓存中，同时跳转回上一个页面
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta:1
    })
    } catch (error) {
      console.log(error)
    }
  }
})