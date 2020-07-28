// pages/feedback/index.js
/*
1.点击 " + " 触发tap点击事件
  1. 调用小程序内置的选择图片的 api
  2  获取到图片的路径 数组格式
  3. 把图片路径存入到data的变量中
  4. 页面就可以根据图片数组进行循环显示 自定义组件
*/


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
    ],
    // 被选中的图片的路径 ，数组
    chooseImgs:[]
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
  },
  
  // 点击 "+"号 选择图片
  handleChooseImg(){
    // 2. 调用小程序内置的选择图片api
    wx.chooseImage({
      //同时选中的图片的数量
      count:9,
      //图片的格式 原图 压缩
      sizeType:["original", "compressed"],
      //图片的来源  相册 照相机
      sourceType:["album","camera"],
      success:(result) => {
        console.log(result)
        this.setData({
          // 图片数组 进行拼接
          chooseImgs: [...result.tempFilePaths,...this.data.chooseImgs]
        })
      }
    })
  }
})