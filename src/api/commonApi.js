
import myRequest from '@/request/request'
export const ajaxProtocol = (data) => {
  return myRequest({
    url: '/base/protocol',
    method: 'GET',
    data: data
  })
}
