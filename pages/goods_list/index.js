/**
 * 1.用户上滑页面 滚动条触底，开始加载下一页数据
 *    1. 找到滚动条触底事件   (微信小程序官方文档中去找 )
 *    2. 判断还有没有下一页数据， 没有地话就弹出一个提示
 *        1. 获取总页数
 *          总页数 = Math.ceil( 总条数 / 每页的条数 )
 *        2. 获取当前页码
 *        3. 判断一下 当前地页码是都大于等于 总页数
 *            表示 没有下一条数据
 *    3. 假如还有下一页，加载下一页数据
 *        1. 当前页码 ++ 
 *        2. 重新发送请求
 *        3. 数据请求回来。要对data中的数组 进行拼接，而不是全部替换。
 * 
 */


/**2. 下拉刷新页面
 *    1. 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
 *         找到 触发下拉刷新的事件  ( 微信小程序官方文档中去找 )
 *    2. 重置 数据 数组  
 *    3. 重置页码 为1 ,并发送请求
      4. 数据请求回来后，需要手动关闭等待效果
 */



import {request} from "../../request/index.js"
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive: true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
      
    ],
    goodsList:[]
  },
  //接口要的数据
  QueryParams:{
    query:"",
    cid:"",
    pagenum	:1,
    pagesize:10
  },

  // 总页数
  totalPages:1,




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.QueryParams.cid = options.cid
    this.QueryParams = {...this.QueryParams, ...options}
    this.getGoodsList()

   

  
  },

  // 页面上滑 滚动条触底事件
  onReachBottom(){
    // 判断还有没有下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      //没有了  
      wx.showToast({
        title: '没有更多了~ ~ ~',
      })
    }
    else{
      // 还有下一页
      this.QueryParams.pagenum ++
      this.getGoodsList()
    }

  },

  //页面下拉 监听用户的下拉动作
  onPullDownRefresh(){
    // 1.重置数组
    this.setData({
      goodsList:[]
    })
    // 2.重置页码
    this.QueryParams.pagenum = 1

    // 3.发送请求
    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url: "/goods/search", data: this.QueryParams})

    // 获取总条数
    const total = res.total
    // 计算总页数
    this.totalPages = Math.ceil( total / this.QueryParams.pagesize)
    console.log(this.totalPages)
    console.log(res)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新的窗口   如果没有调用下拉刷新的窗口, 直接关闭也不会报错
    wx.stopPullDownRefresh()
  },

  handleTabItemChange(e){
    const CurrentIndex = e.detail.index
    let tabs = this.data.tabs
    tabs.forEach((item,index) =>{
      index === CurrentIndex?item.isActive=true:item.isActive=false
    })
    this.setData({
      tabs
    })   
  }
})