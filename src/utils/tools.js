export const common = {
    push: function(obj) {
        const url = obj.url
        const params = obj.params
        if (params) {
            let paramsString = ''
            for (const k in params) {
                paramsString += `&${k}=${params[k]}`
            }
            paramsString = paramsString.replace(/&/, '')
            uni.navigateTo({ url: url + '?' + paramsString })
        } else {
            uni.navigateTo({ url: url })
        }
    },
    redirect: function(obj) {
        const url = obj.url
        const params = obj.params
        if (params) {
            let paramsString = ''
            for (const k in params) {
                paramsString += `&${k}=${params[k]}`
            }
            paramsString = paramsString.replace(/&/, '')
            uni.redirectTo({ url: url + '?' + paramsString })
        } else {
            uni.redirectTo({ url: url })
        }
    },
    getUrlParams: function(k) {
        const URL = window.location.href
        const url = URL.split('?')[1]
        const urlSearchParams = new URLSearchParams(url)
        const params = Object.fromEntries(urlSearchParams.entries())
        return params[k]
    }

}
