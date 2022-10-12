import baseUrl from './baseUrl'
let ajaxNumber = 0
const myRequest = ({ url, data, method = 'post', header = {}}) => {
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  ajaxNumber++
  return new Promise((resolve, reject) => {
    const _header = {}
    const myHeader = Object.assign({}, _header, header)
    uni.request({
      url: baseUrl.apiUrl + url, // 仅为示例，并非真实接口地址。
      data,
      header: myHeader,
      success: (res) => {
        console.log('res', res)
        resolve(res)
      },
      fail: (error) => {
        console.log('请求失败', error)
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

