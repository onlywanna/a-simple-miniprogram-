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


/**
 * promise形式的 showToast
 * 
 */

export const showToast = (params)=>{
  return new Promise((resolve, reject) =>{
    wx.showToast({
      ...params,
      icon:"none",
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
 * promise形式的 login
 * 
 */

export const login = ()=>{
  return new Promise((resolve, reject) =>{
    wx.login({
      timeout:10000,
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
 * promise形式的小程序的微信支付
 * @param {object} pay 支付所必要的参数 
 */
export const requestPayment = (pay)=>{
  return new Promise((resolve, reject) =>{
    wx.requestPayment({
      ...pay,
      success:(result)=>{
        resolve(result)
      },
      fail:(err) =>{
        reject(err)
      }
    })

  })
}