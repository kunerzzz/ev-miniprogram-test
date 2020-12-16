// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  cloud.openapi.customerServiceMessage.setTyping({
    touser: event.FromUserName,
    command: 'Typing'
  })

  setTimeout(() => {
    if(event.MsgType == "text") {     
      cloud.openapi.customerServiceMessage.send({
        touser: event.FromUserName,
        msgtype: 'text',
        text: {
          content: `收到“${event.Content}”`
        }
      })
    } else if(event.MsgType == 'image') {
      cloud.openapi.customerServiceMessage.send({
        touser: event.FromUserName,
        msgtype: 'image',
        image: {
          media_id: event.MediaId
        }
      })
    } else if(event.MsgType == 'miniprogrampage') {
      cloud.openapi.customerServiceMessage.send({
        touser: event.FromUserName,
        msgtype: 'text',
        text: {
          content: `收到小程序页面${event.PagePath}`
        }
      })
    }
  }, 1000)

  return 'success'
}