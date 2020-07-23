/**
 * promise 形式的getSetting
 * 
 */

export const getSetting = ()=>{
  return new Promise((resolve, reject) =>{
    wx.getSetting({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{}
    })
  })
}

/**
 * promise形式的 chooseAddress
 * 
 */

export const chooseAddress = ()=>{
  return new Promise((resolve, reject) =>{
    wx.chooseAddress({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{}
    })
  })
}

/**
 * promise形式的 openSetting
 * 
 */

export const openSetting = ()=>{
  return new Promise((resolve, reject) =>{
    wx.openSetting({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{}
    })
  })
}


/**
 * promise形式的 showModal
 * 
 */

export const showModal = (params)=>{
  return new Promise((resolve, reject) =>{
    wx.showModal({
      ...params,
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{}
    })
  })
}