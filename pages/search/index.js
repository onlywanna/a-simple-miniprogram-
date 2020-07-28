// 1. 输入框绑定 值改变事件 input事件
//     1. 获取到输入框的值
//     2.合法性判断
//     3. 检验通过 把输入框的值 发送到后台
//     4. 返回的数据打印到页面上

import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_goods: []
  },
  // 输入框的值改变, 就会触发的事件
  handleInput(e){
    // 1.获取输入框的值
    const {value} = e.detail
    // 2. 检测合法性
    if(!value.trim())
      // 值不合法
      return
    // 3. 准备发送请求，获取数据
    this.qsearch(value)
    },

  // 发送请求获取搜索建议  数据
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      search_goods:res
    })
  }
    
})