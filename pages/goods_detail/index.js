// 1.发送请求，获取数据

/**
 * 2. 点击轮播图, 预览大图
 *     1. 给轮播图绑定点击事件
 *     2. 调用小程序的api previewImage
 * 
 */


 /**
  * 3. 点击 加入购物车
  *     1.先绑定点击事件
  *     2.获取缓存中的购物车数据，数组格式，对象格式也行
  *     3.先判断当前的商品是否已经存在于购物车中
  *     4.已经存在， 修改商品数据， 执行购物车数量++, 重新把购物车数组 填充到缓存中
  *     5. 不存在于购物车的数组中， 直接给购物车数组添加一个新元素， 带上购买数量属性 num， 重新把购物车数组填充到缓存当中。
  *     6.弹出提示
  * 
  * 4. 商品收藏
  *     1. 页面onShow的时候，加载缓存中的商品收藏的数据
  *     2.判断当前商品是不是被收藏，
  *         1. 是 改变页面的的图标
  *         2.不是
  *     3.点击商品收藏按钮
  *         1.判断该商品是否存在于缓存数组中
  *         2.已经存在 把该商品删除
  *         3. 没有存在 把商品添加到收藏数组中  存入缓存中即可
  * 
  */



import {request} from "../../request/index.js"

Page({
  /*页面的初始数据*/
  data: {
    goodsObj:{},
    isCollect:false
  },
  QueryParams:{
    goods_id: 0
  },

  // 商品对象(包含了当前商品的商品信息)  创建的目的是为了构建图片预览的url数组
  GoodsInfo:{},
  
  /* 生命周期函数--监听页面加载*/
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    let options = currentPage.options

    const {goods_id} = options
    this.QueryParams.goods_id = goods_id
    this.getGoodsDetail()  


  },

  // 获取商品详数据
  async  getGoodsDetail(){
    const result = await request({url:"/goods/detail", data:this.QueryParams})
    this.GoodsInfo = result

    // 1. 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync('collect')||[]
    // 2. 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_id)

    this.setData({
      isCollect,
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
  },

  // 点击加入购物车
  handleCartAdd(e){
    // 1. 获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart') || []
    // 2.判断
    let index = cart.findIndex(i=>i.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      this.GoodsInfo.num = 1 //这个num是新加进去的属性，代表着商品的购买数

      this.GoodsInfo.isChecked = true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
    }

    // 把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入购物车成功',
      icon:"success",
      // true 防止用户 手抖疯狂点击按钮
      mask:true
    })
  },

  // 点击 商品收藏图标
  handleCollect(){
    let isCollect = false
    // 1.获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect')||[]
    // 2. 判断是否被收藏过
    let index = collect.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
    // 3.当index != -1表示 已经收藏过了
    if(index !== -1){
      //能找到,  收藏过了，在数组中删除该商品
      collect.splice(index, 1)
      isCollect - false
      wx.showToast({
        title:"取消成功",
        icon:"success",
        mask:true
      })
    }else{
      // 没有收藏
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title:"收藏成功",
        icon:"success",
        mask:true
      })
    }
    // 4.把数组存入到缓存中
    wx.setStorageSync('collect', collect)
    // 5.修改data中的属性 isCollect
    this.setData({
      isCollect
    })
  }
})