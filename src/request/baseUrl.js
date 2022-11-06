console.log('process', process.env.NODE_ENV)
const baseObj = {
  apiUrl: '',
  appId: 'wxd48e60476848c793',
  appsecret: '750ccc02c3027af11d2f860e76652ce1'
}
if (process.env.NODE_ENV === 'development') {
  baseObj.apiUrl = 'https://api.shanwo.vip'
} else if (process.env.NODE_ENV === 'test') {
  baseObj.apiUrl = 'https://api.shanwo.vip'
} else if (process.env.NODE_ENV === 'production') {
  baseObj.apiUrl = 'https://api.shanwo.cc'
}

export default baseObj

