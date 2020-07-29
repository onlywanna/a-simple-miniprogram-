// pages/feedback/index.js
/*
1.点击 " + " 触发tap点击事件
  1. 调用小程序内置的选择图片的 api
  2  获取到图片的路径 数组格式
  3. 把图片路径存入到data的变量中
  4. 页面就可以根据图片数组进行循环显示 自定义组件

2. 点击 自定义图片  组件
  1.获取被点击的元素的索引
  2 获取data中的图片数组
  3.根据索引删除对应的元素
  4.把数组重新设置会数组中

3. 点击"提交"
  1. 获取文本域的内容  类似 输入框的获取
      1. data中定义变量  表示 输入框内容
      2. 文本域 绑定  输入事件 事件触发的时候,把输入框的值 存入到变量中
  2. 对这些内容 进行合法性验证
  3. 验证通过, 用户选择的图片, 上传到专门的图片的服务器   返回外网的链接
      1. 遍历图片数组
      2. 挨个上传
      3. 
  4. 文本域 和 外网的图片的路径 一起提交到服务器   (这里用前端的模拟,不会真正发送请求)
  5. 清空当前页面
  6. 返回上一页


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
    chooseImgs:[],
    // 文本域的内容
    textValue:"",
    upLoadImgs:[]
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
  },

  // 点击 自定义图片组件
  handleRemoveImg(e){
    // 2.获取被点击的组件的索引
    const {index} = e.currentTarget.dataset
    const {chooseImgs} = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },

  // 文本域的输入事件
  handleTextInput(e){
    this.setData({
      textValue:e.detail.value
    })
  },

  // 提交按钮地点击
  handleFormSubmit(e){
    // 1.获取文本域的内容
    console.log("------------")
    const {textValue,chooseImgs} = this.data
    // 2.如果为空就不合法
    if(!textValue.trim()){
      wx.showToast({
        title:"输入不合法",
        mask:"true"
      })
      return 
    }
    // 3. 准备上传图片 到专门的图片服务器
    //上传文件的api 不支持多个文件同时上传 遍历数组，挨个上传
    
    wx.showLoading({
      title: '正在上传中...',
      mask:true
    })
    // 判断有没有需要上传的图片数组
    if(chooseImgs.length != 0){
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          // 图片上传到哪里
          url: 'https://images.ac.cn/api/upload/upload',
          // 被上传的文件路径
          filePath: v,
          // 上传的文件的名称  后台来获取文件  
          name: 'file',
          // 顺带的文本信息
          formData:{
            "image":new File,//这个我放弃了。实在不知道咋弄。要在这里传一个文件对象。。。
            "token":"242ef5f1ff1874ead0daaa523aea69a",
            "apiType":"Neteasy",
          },
          success:(result) => {
            console.log(result,"sssssss")
            
            if(i === chooseImgs.length-1){
              wx.hideLoading()
  
              console.log("把文本的内容和外网的图片数组， 提交到后台中")
              // 提交都成功了
              // 重置页面
              this.setData({
                textValue:"",
                chooseImgs:[]
              }) 
              wx.navigateBack({
                delta:1
              })  
            }
          }
        })
      })
    }else{
      wx.hideLoading()
      console.log("只是提交了文本...")
      wx.showToast({
        title:"已经上传啦"
      })
      wx.navigateBack({
        delta:1
      })
    }


  }

})