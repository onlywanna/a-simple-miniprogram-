// 0 引入用来发送请求的方法
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    cateList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.发送异步请求获取轮播图数据， 优化的手段可以通过es6的promise来解决这个问题
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result)
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
      
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()

  },
  



  //  获取轮播图数据
  getSwiperList(){
    request({
      url:"/home/swiperdata"
    }).then((result) =>{
      console.log(result)
      result.forEach(v => {
        v.navigator_url = v.navigator_url.replace('main','index')
      });

      this.setData({
        swiperList: result
      })
    })

  },
  
  // 获取分类导航数据
  getCateList(){
    request({
      url:"/home/catitems"
    }).then((result) =>{
      console.log(result)
      result[0].navigator_url = result[0].navigator_url.replace('main','index') //只有第一个元素有url，其它的没带，这里为了不麻烦就写第一个了
      this.setData({
        cateList: result
      })
    })

  },

  // 获取楼层数据
  getFloorList(){
    request({
      url:"/home/floordata"
    }).then((result) =>{
      console.log(result,"--------------")
      result.forEach(v1 => {
        v1.product_list.forEach(v2=>{
            v2.navigator_url = v2.navigator_url.replace('?','/index?')
        })
      })
      this.setData({
        floorList: result
      })
    })

  }
})