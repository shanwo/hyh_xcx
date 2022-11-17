import baseObj from './baseUrl'
let ajaxNumber = 0
const myRequest = ({ url, data, method = 'POST', header = {}}) => {
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  ajaxNumber++
  return new Promise((resolve, reject) => {
    const _header = {
      appid: baseObj.appId,
      Authorization: 'Bearer ' + uni.getStorageSync('token') || ''
    }
    const myHeader = Object.assign({}, _header, header)
    console.log('baseObj', baseObj, 'url', url)
    uni.request({
      url: baseObj.apiUrl + url, // 仅为示例，并非真实接口地址。
      data,
      method,
      timeout: 8000,
      header: myHeader,
      success: (res) => {
        console.log('res', res)
        resolve(res)
      },
      fail: (error) => {
        console.log('请求失败', error)
        if (error.errMsg == 'request:fail timeout') {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '可能网络不太好，请重试！',
            success: function() {
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }
          })
        }
        reject(error)
      },
      complete: () => {
        ajaxNumber--
        if (ajaxNumber === 0) {
          uni.hideLoading()
        }
      }
    })
  })
}

export default myRequest

