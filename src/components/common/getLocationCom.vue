
<template>
  <view />
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 初始化页面,执行查看已授权信息
    this.getSettingMess()
  },
  methods: {
    // 执行函数
    getSettingMess() {
      const _this = this
      // 获取已授权类别
      uni.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation']) {
            console.log('userLocation位置功能已授权')
            // 如果已授权,直接获取对应参数
            uni.getLocation({
              type: 'wgs84',
              success(res) {
                console.log('授权成功1', res)
                _this.$emit('successBack', res)
              },
              fail(err) {
                console.log('错误信息1', err)
                uni.showModal({
                  title: '提示',
                  content: '当前位置信息获取失败',
                  confirmText: '重新获取',
                  cancelText: '手动选择',
                  success: function(res) {
                    if (res.confirm) {
                      // _this.wxGetLocation()
                    } else if (res.cancel) {
                      _this.handleLocation()
                      console.log('点击取消了')
                    }
                  }
                })
              }
            })
          } else if (!res.authSetting['scope.userLocation']) {
            // 说明此时要获取的位置功能尚未授权,
            // 则设置进入页面时主动弹出，直接授权
            uni.authorize({
              scope: 'scope.userLocation',
              success(res) {
                // 授权成功
                console.log(res)
                // 成功后获取对应的位置参数
                uni.getLocation({
                  type: 'wgs84',
                  success(res) {
                    console.log('授权成功2', res)
                    _this.$emit('successBack', res)
                  },
                  fail(err) {
                    console.log('错误信息2', err)
                    uni.showModal({
                      title: '提示',
                      content: '当前位置信息获取失败',
                      confirmText: '重新获取',
                      cancelText: '手动选择',
                      success: function(res) {
                        if (res.confirm) {
                          // _this.wxGetLocation()
                        } else if (res.cancel) {
                          _this.handleLocation()
                          console.log('点击取消了')
                        }
                      }
                    })
                  }
                })
              },
              fail(err) {
                uni.showModal({
                  title: '提示',
                  content: '您当前位置信息获取失败了',
                  confirmText: '重新获取',
                  cancelText: '手动选择',
                  success: function(res) {
                    if (res.confirm) {
                      _this.handleLocation()
                    } else if (res.cancel) {
                      console.log('点击取消了')
                    }
                  }
                })
                console.log('位置授权失败2', err)
              }
            })
          }
        },
        fail(err) {
          console.log('获取授权信息授权失败', err)
          _this.handleLocation()
        }
      })
    },
    // 如果初始进入页面时点击了拒绝授权,如需要该权限,需要手动授权
    // 手动授权的触发方法
    handleLocation() {
      const _this = this
      uni.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation']) {
            // 再次判断所需权限是否已授权,如已授权则直接使用
            uni.getLocation({
              type: 'wgs84',
              success(res) {
                console.log('授权成功3', res)
              },
              fail(err) {
                console.log('错误信息3', err)
                uni.showModal({
                  title: '提示',
                  content: '当前位置信息获取失败',
                  confirmText: '重新获取',
                  cancelText: '手动选择',
                  success: function(res) {
                    if (res.confirm) {
                      // _this.wxGetLocation()
                    } else if (res.cancel) {
                      _this.handleLocation()
                      console.log('点击取消了')
                    }
                  }
                })
              }

            })
          } else if (!res.authSetting['scope.userLocation']) {
            // 如未授权则重新打开设置页面,进行授权
            uni.showModal({
              // 弹出提示框
              title: '是否打开设置页？',
              content: '需要在设置中获取位置信息',
              success(res) {
                if (res.confirm) {
                  // 用户点击确定按钮
                  uni.openSetting({
                    // 确认后打开设置页面
                    success(res) {
                      if (res.authSetting['scope.userLocation']) {
                        console.log('手动授权成功8')
                        uni.getLocation({
                          type: 'wgs84',
                          success(res) {
                            _this.$emit('successBack', res)
                            console.log('授权成功8', res)
                          },
                          fail(err) {
                            console.log('错误信息8', err)
                            uni.showModal({
                              title: '提示',
                              content: '当前位置信息获取失败',
                              confirmText: '重新获取',
                              cancelText: '手动选择',
                              success: function(res) {
                                if (res.confirm) {
                                  // _this.wxGetLocation()
                                } else if (res.cancel) {
                                  _this.handleLocation()
                                  console.log('点击取消了')
                                }
                              }
                            })
                          }
                        })
                      } else {
                        console.log('手动授权失败8')
                        uni.showModal({
                          title: '提示',
                          content: '当前位置信息授权失败',
                          confirmText: '重新获取',
                          cancelText: '手动选择',
                          success: function(res) {
                            if (res.confirm) {
                              // _this.wxGetLocation()
                            } else if (res.cancel) {
                              _this.handleLocation()
                              console.log('点击取消了')
                            }
                          }
                        })
                      }
                    },
                    fail() {
                      console.log('打开设置页面失败')
                    }
                  })
                } else if (res.cancel) {
                  // 用户点击取消按钮
                  console.log('用户点击取消')
                }
              },
              fail() {
                console.log('确认取消弹出未弹出')
              }
            })
          }
        },
        fail() {
          console.log('获取已授权信息失败')
        }
      })
    }
  }
}
</script>
