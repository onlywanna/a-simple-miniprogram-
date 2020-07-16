export const request = function(params){
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },

        });
          
    })


}