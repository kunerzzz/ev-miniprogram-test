// miniprogram/pages/subscribe/subscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: ''
  },

  onRequestTap: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['wI8nr01hBcKL3t6-acQc5GXPYUSrVxlqN5EK8ve-osk',
                'QAvkh3v8H5oSuZXk0TLL32JVHX-0kCkukiJsv4SkVYA'],
        
      success: (e) => {
        console.log(e);
        let l = 0;
        for(let id in e) {
          if(id != 'errMsg' && e[id] == 'accept')
            l++;
        }
        wx.showToast({
          title: `订阅了${l}条消息`,
          duration: 1000
        })
      },
      fail: (e) => {
        console.log(e)
        wx.showToast({
          title: '申请权限异常，请检查网络后重试',
          icon:'none'
        })
      }
    })
  },

  onSendDakaTap: async function() {
    let id = Math.round(Math.random() * 10000).toString()
    let msg = '发送的打卡消息ID是' + id + '\n'
    this.setData({msg})

    const r = await wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        id,
        name: 'daka',
        state: 'trial'
      }
    })
    console.log(r)
    msg += r.result.message
    this.setData({msg})
  },

  onSendHomeworkTap: async function() {
    let id = Math.round(Math.random() * 10000).toString()
    let msg = '发送的作业消息ID是' + id + '\n'
    this.setData({msg})

    const r = await wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        id,
        name: 'homework',
        state: 'trial'
      }
    })
    console.log(r)
    msg += r.result.message
    this.setData({msg})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const template_name = {
      'daka': '打卡',
      'homework': '作业'
    }

    if('template' in options) {
      this.setData({
        msg: `来自${template_name[options.template]}消息，ID是${options.id}\n`
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})