// 1.发送请求，获取数据

/**
 * 2. 点击轮播图, 预览大图
 *     1. 给轮播图绑定点击事件
 *     2. 调用小程序的api previewImage
 * 
 */

import {request} from "../../request/index.js"

Page({
  /*页面的初始数据*/
  data: {
    goodsObj:{}
  },
  QueryParams:{
    goods_id: 0
  },

  // 商品对象  创建的目的是为了构建图片预览的url数组
  GoodsInfo:{},
  
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    const {goods_id} = options
    this.QueryParams.goods_id = goods_id
    this.getGoodsDetail()
  },

  // 获取商品详数据
  async  getGoodsDetail(){
    const result = await request({url:"/goods/detail", data:this.QueryParams})
    this.GoodsInfo = result
    this.setData({
      goodsObj:{
        goods_name:result.goods_name,
        goods_price:result.goods_price,
        //最好是找到后台，让他进行修改。
        //临时自己改  确保后台存在 1. webp 和1.jpg的格式    就批量替换一下。
        goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:result.pics
      }
    })
  },

// 点击轮播图 放大预览
  handlePreviewImage(e){
    console.log(e)

    // 1. 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map((i=>i.pics_mid))
    const tapIndex = e.currentTarget.dataset.index   //也可以直接通过data-url传递url过来
    wx.previewImage({
      current: urls[tapIndex], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }
})
