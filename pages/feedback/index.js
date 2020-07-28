// pages/feedback/index.js
Page({
  /**页面的初始数据 */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive: true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ]
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