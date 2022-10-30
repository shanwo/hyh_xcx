
import myRequest from '@/request/request'
export const ajaxOrderSend = (data) => {
  return myRequest({
    url: '/hy/pay/send',
    data: data
  })
}
