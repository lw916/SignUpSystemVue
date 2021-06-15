// 本地mock
import Mock from 'mockjs'

// 传入本地数据
import test from './test'

const mocks = [
  ...test
]

// 用于本地mock服务器返回数据
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response (req, res) {
      console.log('访问了:' + req.path)
      // 此处返回function，详情可看https://github.com/nuysoft/Mock/wiki/Mock.mock()
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
