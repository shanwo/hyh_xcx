import myRequest from '@/request/request'
export const ajaxOrderList = (data) => {
  return myRequest({
    url: '/hy/order/lists',
    method: 'GET',
    data: data
  })
}
