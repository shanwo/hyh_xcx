var numArr = []
function downloadFiles(urls) {
  checkAuth(() => {
    wx.showLoading({
      title: '正在下载',
      mask: true
    })
    for (let i = 0; i < urls.length; i++) {
      downloadSaveFile(urls[i], i)
    }
  })
}

// 下载文件
function downloadSaveFile(url, k) {
  // 如果是图片类型
  console.log('----------------')
  wx.downloadFile({
    url: url,
    success: res => {
      if (res.statusCode === 200) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            wx.showToast({
              title: '保存成功',
              icon: 'none'
            })
          },
          fail: res => {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      }
    }
  }).onProgressUpdate(res => {
    numArr[k] = res.progress / 100
    // console.log(`第${k}张照片的下载进度`, res.progress / 100)
    // console.log('照片进度', numArr)
    let val = 0
    for (let i = 0; i < numArr.length; i++) {
      val += numArr[i]
      // console.log('总进度', val / 6)
    }
  })
}

// 保存临时文件的图片路径到相册
function saveImgFile(urls, callback) {

}

// 检查权限
function checkAuth(gotc) {
  // 查询权限
  wx.showLoading({
    title: '检查授权情况',
    mask: true
  })
  wx.getSetting({
    success(res) {
      wx.hideLoading()
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 请求授权
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            // 获得授权，开始下载
            gotc && gotc()
          },
          fail() {
            wx.showModal({
              title: '',
              content: '保存到系统相册需要授权',
              confirmText: '授权',
              success(res) {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                      if (res.authSetting['scope.writePhotosAlbum'] === true) {
                        gotc && gotc()
                      }
                    }
                  })
                }
              },
              fail() {
                wx.showToast({
                  title: '打开设置页失败',
                  icon: 'none'
                })
              }
            })
          }
        })
      } else {
        // 已有授权
        gotc && gotc()
      }
    },
    fail() {
      wx.hideLoading()
      wx.showToast({
        title: '获取授权失败',
        icon: 'none'
      })
    }
  })
}
// 下载视频
function downloadVideos(urls) {
  checkAuth(() => {
    wx.showLoading({
      title: '正在下载',
      mask: true
    })

    for (let i = 0; i < urls.length; i++) {
      downloadSaveVideo(
        urls[i],
        i
      )
    }
  })
}

function downloadSaveVideo(url, k) {
  // 如果是视频类型
  wx.downloadFile({
    url: url,
    success: res => {
      if (res.statusCode === 200) {
        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            // successc && successc();
            wx.showToast({
              title: '保存成功',
              icon: 'none'
            })
          },
          fail: res => {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      }
    }
  })
}

module.exports = {
  downloadFiles,
  saveImgFile,
  checkAuth,
  downloadVideos
}
