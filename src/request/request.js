import baseUrl from './baseUrl'

const myRequest = ({ url, data, method = 'post', header = {}}) => {
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
            }
        })
    })
}

export default myRequest

