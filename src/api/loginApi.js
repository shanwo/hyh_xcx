import myRequest from '@/request/request'
export const ajaxLogin = (data) => {
  return myRequest({
    url: '/user/applets',
    method: 'GET',
    data: data
  })
}
