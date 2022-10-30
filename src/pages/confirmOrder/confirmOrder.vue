<template>
  <div class="body_bg">
    <skiHeader />
    <div class="main_box">
      <div class="hea">订单金额</div>
      <div class="mid">
        <div class="list">
          <div class="fl">照片数量</div>
          <div class="fr">{{ idArr.length }}</div>
        </div>
        <div class="list">
          <div class="fl">订单金额</div>
          <div class="fr">
            <span class="txt1">(￥ {{ skiObj.price/100 }}  /张)</span>
            <span class="txt2">￥</span>
            <span>{{ totalPrice }}</span>
          </div>
        </div>
        <div class="line" />
        <div class="list" style="margin-top: 30rpx">
          <div class="fl" style="font-size: 32rpx">合计</div>
          <div class="fr">
            <span class="txt2" style="font-size: 28rpx">￥</span>
            <span style="font-size: 43rpx">{{ hjPrice }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_box">
      <div class="footer_box_2">
        <div class="fl">
          <div style="width: 100%;">
            <span>已选</span>
            <span style="color: #ff253a;margin: 0 8rpx">{{ idArr.length }}</span>
            <span>张，</span>
            <span>合计<span style="color: #ff253a;margin: 0 2rpx">￥{{ hjPrice }}</span>
            </span>
          </div>
        </div>
        <div class="fr" @click="handlePay">
          <div class="btn cancel">微信支付</div>
        </div>
      </div>
      <safeAreaCom />
    </div>
  </div>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
import baseUrl from '@/request/baseUrl'
import { ajaxOrderSend } from '@/api/orderApi'
export default {
  name: 'ConfirmOrder',
  components: {
    skiHeader,
    safeAreaCom
  },
  data() {
    return {
      totalPrice: 0,
      hjPrice: 0,
      options: '',
      skiObj: {},
      idArr: []
    }
  },
  onLoad(options) {
    this.options = options
    this.idArr = this.options.idArr.split(',')
    this.skiObj = uni.getStorageSync('skiObj')
    this.totalPrice = (this.skiObj.price * this.idArr.length / 100).toFixed(2)
    this.hjPrice = this.totalPrice
    console.log('idArr', this.idArr)
  },
  mounted() {

  },
  methods: {
    handlePay() {
      const that = this
      this.$common.showLoading('支付中')
      const skid = uni.getStorageSync('skid')
      const params = {
        venue_id: skid,
        ids: this.idArr
      }
      ajaxOrderSend(params).then(res => {
        const payInfo = res.data.data
        console.log('支付信息', payInfo)
        console.log('订单号', payInfo.order_sn)

        wx.requestPayment({
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: payInfo.signType,
          paySign: payInfo.paySign,
          success(res) {
            console.log('支付成功', res)
            that.$common.redirect({
              url: '/pages/payResult/payResult?order_sn=' + payInfo.order_sn
            })
          },
          fail(res) {
            console.log('支付失败', res)
          }
        })
      })
    },
    getTimeStamp() {
      var timestamp = Date.parse(new Date())
      timestamp = timestamp / 1000
      return timestamp
    },
    getAppId() {
      return baseUrl.appId
    },
    getNoceStr() {
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = $chars.length
      var pwd = ''
      for (let i = 0; i < 32; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd.toString()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/static/theme";
  .main_box{
    margin: 30rpx auto;
    width: 686rpx;
    height: 386rpx;
    background: #FFFFFF;
    box-shadow: 0 16rpx 32rpx 0px rgba(138,149,158,0.1);
    border-radius: 16rpx;
    overflow: hidden;
    .hea{
      width: 100%;
      height: 104rpx;
      line-height: 104rpx;
      background: #F8B800;
      border-radius: 16rpx 16rpx 0px 0px;
      font-size: 32rpx;
      font-weight: 600;
      color: #1E2128;
      padding-left: 28rpx;
      box-sizing: border-box;
    }
    .mid{
      padding-top: 20rpx;
      box-sizing: border-box;
      .list{
        display: flex;
        justify-content: space-between;
        padding: 0 32rpx 0 28rpx;
        box-sizing: border-box;
        line-height: 70rpx;
        .fl{
          font-size: 28rpx;
          font-weight: 400;
          color: #1E2128;
        }
        .fr{
          font-size: 32rpx;
          font-weight: 600;
          color: #1E2128;
          .txt1{
            font-size: 24rpx;
            font-weight: 400;
            color: #88909B;
            margin-right: 8rpx;
          }
          .txt2{
            font-size: 20rpx;
          }
        }
      }
    }
  }
  .line{
    width: 630rpx;
    height: 2rpx;
    margin: 0 auto;
    box-shadow: inset 0px 1rpx 0px 0px rgba(202,205,211,1);
  }
  .footer_box_2{
    display: flex;
    justify-content: space-between;
    .fl{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: 32rpx;
      font-weight: 600;
      color: #FFFFFF;
      .icon{
        width: 40rpx;
        height: 40rpx;
      }
    }
    .fr{
      display: flex;
    }
    .btn{
      width: 154rpx;
      height: 68rpx;
      line-height: 68rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #ffffff;
      background: #ff253a;
      text-align: center;
      border-radius: 34rpx;
    }
    .del{
      color: #fff;
      background: #ff253a;
    }
  }
.footer_box {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 15rpx 24rpx;
  box-sizing: border-box;
}
</style>
