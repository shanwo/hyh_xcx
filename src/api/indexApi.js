import myRequest from '@/request/request'
export const ajaxVenueDay = (data) => {
  return myRequest({
    url: '/hy/venue/day',
    method: 'GET',
    data: data
  })
}
