const path = require('path')
const fs = require('fs')

const handleChangeAppid = () => {
  const currentPath = path.resolve('/Users/xlt/skiproject/src/manifest.json')
  console.log('临时路径', currentPath)
  const result = fs.readFileSync(currentPath, 'utf-8')
  const data = eval('(' + result + ')')
  // console.log('data', data)
  let newResult = data
  for (const k in data) {
    // console.log('data,k', data[k])
    if (k === 'mp-weixin') {
      newResult[k].appid = 'wxd48e60476848c793'
    }
  }
  newResult = JSON.stringify(newResult)
  fs.writeFile('/Users/xlt/skiproject/src/manifest.json', newResult, 'utf8', () => {
    console.log('写入完成')
  })
}
handleChangeAppid()
