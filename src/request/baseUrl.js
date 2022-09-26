
console.log('process', process.env.NODE_ENV)
const baseUrl = {
  apiUrl: ''
}

if (process.NODE_ENV === 'development') {
  baseUrl.apiUrl = 'http://localhost:3000'
} else if (process.NODE_ENV === 'test') {
  baseUrl.apiUrl = ''
} else if (process.NODE_ENV === 'production') {
  baseUrl.apiUrl = ''
}

export default baseUrl

