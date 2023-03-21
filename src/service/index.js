import jsRequest from './request'

// api data数据方法获取接口

export function getPwerScreenData() {
  return jsRequest.get({
    url: '/powerscreen'
  })
}
