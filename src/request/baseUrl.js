console.log('process', process.env.NODE_ENV)
const baseObj = {
  apiUrl: 'https://api.shanwo.cc',
  appId: 'wxd48e60476848c793'
}
if (process.env.NODE_ENV === 'production') {
  baseObj.apiUrl = 'https://api.chillman.cc'
  baseObj.appId = 'wx95a9b9e995351a26'
}

export default baseObj

