export const common = {
  showLoading: function(title = '加载中', mask = true) {
    uni.showLoading({
      title: title,
      mask: mask
    })
  },
  hideLoading: function() {
    uni.hideLoading()
  },
  toast: function(title) {
    uni.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  },
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
  isNull(val) {
    return !!(val == null || val === 'null' || val === ' ' || val === undefined || val === 'undefined' || val === '0')
  },
  removeURLParameter(url, parameter) {
    var urlparts = url.split('?')
    if (urlparts.length >= 2) {
      // 参数名前缀
      var prefix = encodeURIComponent(parameter) + '='
      var pars = urlparts[1].split(/[&;]/g)

      // 循环查找匹配参数
      for (var i = pars.length; i-- > 0;) {
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          // 存在则删除
          pars.splice(i, 1)
        }
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
    }
    return url
  },
  getUrlParams: function(k) {
    // #ifdef H5
    const URL = window.location.href
    const url = URL.split('?')[1]
    const urlSearchParams = new URLSearchParams(url)
    const params = Object.fromEntries(urlSearchParams.entries())
    if (this.isNull(params[k])) {
      return ''
    }
    return params[k]
    // #endif
    // #ifdef MP-WEIXIN
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const options = page['options']
    if (this.isNull(options[k])) {
      return ''
    }
    return options[k]
    // #endif
  }
}
