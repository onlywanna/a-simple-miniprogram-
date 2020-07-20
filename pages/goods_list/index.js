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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },


  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url: "/goods/search", data: this.QueryParams})
    console.log(res)

    this.setData({
      goodsList:res.goods
    })
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