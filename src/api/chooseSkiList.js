
import myRequest from '@/request/request'
export const ajaxVenueLists = (data) => {
  return myRequest({
    url: '/hy/venue/lists',
    method: 'GET',
    data: data
  })
}
