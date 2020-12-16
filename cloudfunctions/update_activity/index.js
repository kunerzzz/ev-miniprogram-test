// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let targetState = 0
  if(event.member_count >= 5)
    targetState = 1

  const r = await cloud.openapi.updatableMessage.setUpdatableMsg({
    activityId: event.activity_id,
    targetState,
    templateInfo: {
      parameterList: [{
        name: 'member_count',
        value: event.member_count.toString()
      },{
        name: 'room_limit',
        value: '5'
      },{
        name: 'path',
        value: `pages/share/share?activity_id=${event.activity_id}&member_count=${event.member_count}`
      },{
        name: 'version_type',
        value: event.version_type
      }]}
  })

  return {
    ...r
  }
}