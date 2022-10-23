
import myRequest from '@/request/request'
export const ajaxVenueHour = (data) => {
  return myRequest({
    url: '/hy/venue/hour',
    method: 'GET',
    data: data
  })
}
