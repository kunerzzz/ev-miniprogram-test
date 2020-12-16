// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const template = {
    "daka": {
      id: "QAvkh3v8H5oSuZXk0TLL32JVHX-0kCkukiJsv4SkVYA",
      data: {
        "thing1": {value: "thing1"},
        "name6": {value: "name six"},
        "thing15": {value: "thing15"},
        "thing5": {value: "thing5"},
        "thing18": {value: "thing18"},
      }
    },
    "homework": {
      id: 'wI8nr01hBcKL3t6-acQc5GXPYUSrVxlqN5EK8ve-osk',
      data: {
        "thing9": {value: 'thing9'},
        "name10": {value: 'name ten'},
        "thing12": {value: 'thing12'},
        "date14": {value: '2020-12-16'},
        "time20": {value: '2020-12-16 10:58'},
      }
    }
  }

  if(!(event.name in template)) {
    return {
      message: "Template not found"
    }
  }

  try {
    const r = await cloud.openapi.subscribeMessage.send({
        touser: wxContext.OPENID,
        templateId: template[event.name].id,
        page: `pages/subscribe/subscribe?template=${event.name}&id=${event.id}`,
        data: template[event.name].data,
        miniprogramState: event.state
    })
  
    return {
      message: 'OK'
    }
  } catch (err) {
    return {
      message: `[${err.errCode}]${err.errMsg}`
    }
  }
}