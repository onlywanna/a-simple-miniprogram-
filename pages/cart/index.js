/* 1. 获取用户的收获地址
//       1.绑定点击事件
//       2.调用小程序内置 api 获取用户的收货地址 wx.chooseAddress
        上边这样直接调用，假如用户第一次获取地址时需要授权选择了取消，则后边点击获取地址时就不会再弹出授权消息了，也就不能继续操作了
    
  2. 获取用户对小程序所授予 获取地址的权限状态 scope
    1. 假设用户 点击获取收获地址的提示框为  确定 
        scope 值为true时，可直接调用 获取收获地址
    2.假如用户从来没有调用过wx.chooseAddress
        scope的值为undefined 可以调用，弹出单个授权消息框
    3.假设用户 点击获取单个授权消息框 点击了取消
      scope的值为false
      1. 则需要用户 自己打开 总的授权设置页面( wx.openSetting)  让用户选中对应按钮，让图标边绿，scope的值也会相应的改变。
      2. 然后再调用wx.chooseAddress
*/

Page({
// 点击收货地址 



  /*页面的初始数据*/
  data: {

  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {

  },


  // 1.点击获取地址
  handleChooseAddress(){
    // 1.获取 权限状态
    wx.getSetting({
      success: (result) => {
          // 2.获取权限状态 要是发现一些 属性名很怪异的时候， 都要使用 [] 形式来获取属性值
        const scopeOfAddress = result.authSetting["scope.address"]

        if(scopeOfAddress === true || scopeOfAddress === undefined){
          wx-wx.chooseAddress({
            success: (result1) => {
              console.log(result1)
            }
          })
        }
        else{
          // 3. 用户 以前拒绝过授予权限 先诱导用户 打开授权页面
          wx.openSetting({
            success: (result2) => {   //当点击返回按钮的时候,触发success
              // 4. 可以调用 获取收获地址代码
              wx.chooseAddress({  //只有当权限被授予，也就是上面的scopeOfAddress的值为true的时候，调用这个才会有反应。   上面哪个页面的按钮选中，就可以将scopeOfAddress弄为true
                success: (result3) => {
                },
              })
            }
          })
        }
      },
    })

  }
})