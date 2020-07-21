// 1.发送请求，获取数据
import {request} from "../../request/index.js"

Page({
  /*页面的初始数据*/
  data: {
    goodsObj:{}
  },
  QueryParams:{
    goods_id: 0
  },
  
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    const {goods_id} = options
    this.QueryParams.goods_id = goods_id
    this.getGoodsDetail()
  },

  // 获取商品详数据
async  getGoodsDetail(){
  const result = await request({url:"/goods/detail", data:this.QueryParams})
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
}
})
