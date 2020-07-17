import {request} from "../../request/index.js"
Page({
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的商品数据
    rightContent:[],
    // 选中的菜单项的索引
    currentIndex:0,

    // 右侧内容的滚动条距离顶部的距离
    scrollTop:0

  },

  // 接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // // 0. web中的本地存储和小程序中的本地存储的区别
  //       1.写代码的方式不一样了
  //          web:localStorage.setItem("key","value")  localStorage.getItem("key")
  //          小程序中:wx.setStorageSync("key", "value")  wx.getStrorageSync("key")
          //  2. 存的时候，有没有做类型转换
              // web: 不管存入的是什么类型的数据， 最终都会先调用下toString(),把数据变成了字符串再存进去
              // 小程序：不存在类型转换的操作, 存什么数据进去，获取的时候就是什么类型 

    /*
    1. 先判断一下本地存储中有没有旧的数据
      {time:Data.now(),data:[...]}
    2. 没有旧数据 直接发送新的请求
    3. 有旧数据, 同时旧的数据也没有过期，就使用本地存储中得旧数据即可。
    */


    // this.getCates()

    // 1.获取本地存储的数据(小程序中也是存在本地存储技术的)
    const alreadyStorageCates = wx.getStorageSync("cates");
    // 2. 判断
    if(!alreadyStorageCates){
      // 不存在 则发送请求获取数据
      this.getCates()
    }else{
      // 有旧的数据，定义过期时间， 10s改成5分钟
      if(Date.now() - alreadyStorageCates.time > 1000 *60*5){
        // 重新发送请求
        this.getCates()
      }
      else{
        console.log("可以使用缓存，并且它没有过期")
        this.Cates = alreadyStorageCates.data
        this.constructFirstPage()
      }
    }

      

  },

  // // 获取分类数据
  // getCates(){
  //   request({
  //     url:"/categories"
  //   }).then((res) =>{ 
  //     console.log(res)
  //     this.Cates = res.data.message
      
  //     // 把接口的数据存入到本地存储中
  //     wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});
  //     //展示页面
  //     this.constructFirstPage()

  //     // 页面展示一定要在这里放一个的。
  //     // 原因：假如换一种写法，在外面先统一获取数据(函数1 --抽象了一下)，然后统一页面展示(函数2)的话，
  //       // 因为获取数据这个request是个异步的操作，所以是先调用函数1 ,然后就直接执行函数2了，函数2中的数据是依赖于函数1的，就会报错。
  //       //调这个bug调了四十多分钟
  //   })
  // },

  
  // 获取分类数据(使用了async await的方法)
  async getCates(){  
    const res = await request({url:"/categories"}) 
    // 看起来是同步操作，实则是异步操作，下面的代码要等这行代码执行完才能够执行
  
    console.log(res)
    this.Cates = res
    
    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});
    //展示页面
    this.constructFirstPage()

    // 页面展示一定要在这里放一个的。
    // 原因：假如换一种写法，在外面先统一获取数据(函数1 --抽象了一下)，然后统一页面展示(函数2)的话，
      // 因为获取数据这个request是个异步的操作，所以是先调用函数1 ,然后就直接执行函数2了，函数2中的数据是依赖于函数1的，就会报错。
      //调这个bug调了四十多分钟
    
  },

  // 构造第一个可见页面
  constructFirstPage(){
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(function(item){
      return item.cat_name
    })

    // 构造右侧的商品数据, 这里只是第一个主页面
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })

  },

  // 左侧菜单的点击事件
  handleItemTap(e){
    console.log(e)
    // 1.获取被点击的标题上的索引
    // 2.给data中的currentIndex赋值
    // 3.根据不同的索引来渲染右侧的商品内容

    const tapIndex = e.currentTarget.dataset.index 

    let rightContent = this.Cates[tapIndex].children
    this.setData({
      currentIndex : tapIndex,
      rightContent,
      // 重新设置右侧内容的scroll-view标签的距离顶部的距离
      scrollTop :0
    })
  }
 
})