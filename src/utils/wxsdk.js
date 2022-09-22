// #ifdef H5
import wx from 'weixin-js-sdk'

export default {
    // 请求分享校验参数
    initWxSdk(success, fail) {
        let shareUrl = window.location.href.split('#')[0]
        if (navigator.userAgent.indexOf('iPhone') !== -1) {
            shareUrl = uni.getStorageSync('localShareUrl') || shareUrl
        }
        const reqData = {
            url: shareUrl
        }
        // httpsRequest.$ajax(reqUrl.wxShare, reqData, res => {
        //     console.log('res--------', res)
        //     wx.config({
        //         debug: false,
        //         appId: res.appId, // 必填，公众号的唯一标识
        //         timestamp: res.timestamp, // 必填，生成签名的时间戳
        //         nonceStr: res.nonceStr, // 必填，生成签名的随机串
        //         signature: res.signature, // 必填，签名
        //         jsApiList: [
        //             'chooseImage',
        //             'getLocalImgData',
        //             'hideMenuItems',
        //             'showMenuItems',
        //             'updateTimelineShareData',
        //             'onMenuShareAppMessage',
        //             'onMenuShareTimeline',
        //             'updateAppMessageShareData',
        //             'scanQRCode',
        //             'wx-open-launch-weapp',
        //             'chooseWXPay'
        //         ], // 必填，需要使用的JS接口列表
        //         openTagList: ['wx-open-launch-weapp']
        //     })
        //     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //     wx.ready(success)
        //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //     wx.error(fail)
        // })
    },
    // 获取base64图片数据
    wxGetLocalImgData(id, callBack) {
        // this.initWxSdk(() => {
        // 		wx.getLocalImgData({
        // 			localId: id, // 图片的localID
        // 			success: imageData => {
        // 				console.log('imageData', imageData.localData)
        // 				if (imageData.localData.substr(0, 5) != 'data:') {
        // 					imageData.localData = 'data:image/jpeg;base64,' + imageData.localData
        // 				}
        // 				callBack(imageData.localData)
        // 			}
        // 		})
        // 	})
    },
    // 选择图片
    wxChooseImage(count = 1, callBack, errorCallBack) {
        // this.initWxSdk(() => {
        // 	wx.chooseImage({
        // 		count: count > 9 ? 9 : count, // 默认9
        // 		sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        // 		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        // 		success: function(res) {
        // 			callBack(res.localIds)
        // 		},
        // 		fail: function(err) {
        // 			console.log('执行失败sdk', err)
        // 			errorCallBack(err)
        // 		},
        // 		complete: function(res) {
        // 		}
        // 	})
        // })
    },
    // 隐藏菜单
    hideOptionMenu() {
        return new Promise((reolve, reject) => {
            this.initWxSdk(() => {
                // 默认隐藏所有
                wx.hideOptionMenu('hideOptionMenu')
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:refresh',
                        'menuItem:share:appMessage',
                        'menuItem:share:timeline',
                        'menuItem:share:weiboApp',
                        'menuItem:share:facebook',
                        'menuItem:share:qq',
                        'menuItem:favorite',
                        'menuItem:share:QZone',
                        'menuItem:openWithQQBrowser',
                        'menuItem:openWithSafari',
                        'menuItem:share:email',
                        'menuItem:share:brand',
                        'menuItem:refresh',
                        'menuItem:exposeArticle',
                        'menuItem:setFont'
                    ]
                })
                reolve()
            })
        })
    },
    wxShare(data, callback) {
        this.initWxSdk(() => {
            // 打开分享菜单
            const menuList = [
                'menuItem:share:appMessage',
                // 'menuItem:share:timeline', // 去掉分享朋友圈的功能
                'menuItem:favorite'
            ]
            wx.showMenuItems({
                menuList: menuList
            })
            // 分享的方法
            var shareData = {
                ...data,
                success: function(res) {
                    callback(res)
                    // 分享后的一些操作
                },
                cancel: function(res) {}
            }
            console.log('shareData：：：：：显示部分分享按钮', shareData)
            // 分享给朋友
            wx.updateAppMessageShareData(shareData)
            // 分享到朋友圈
            // wx.updateTimelineShareData(shareData)
        })
    },
    // 二维码扫描h5
    scanQRCode(callback) {

    }
}

// #endif
