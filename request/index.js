export const request = function(params){
    // 定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    console.log("111111")
    return new Promise((resolve, reject) => {
        wx.request({
            // ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
          
    })


}