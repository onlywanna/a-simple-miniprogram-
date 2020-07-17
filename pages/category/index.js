import {request} from "../../request/index.js"
Page({
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的商品数据
    rightContent:[],
    // 选中的菜单项的索引
    currentIndex:0
  },

  // 接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
  },

  // 获取分类数据
  getCates(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then((res) =>{ 
    
      console.log(res)
      this.Cates = res.data.message
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
    })
  },

  // 左侧菜单的点击事件
  handleItemTap(e){
    console.log(e)
    // 1.获取被点击的标题上的索引
    // 2.给data中的currentIndex赋值
    // 3.根据不同的索引来渲染右侧的商品内容

    const tapIndex = e.currentTarget.dataset.index 

    let rightContent = this.Cates[this.data.currentIndex].children
    this.setData({
      currentIndex : tapIndex,
      rightContent
    })
  }
 
})