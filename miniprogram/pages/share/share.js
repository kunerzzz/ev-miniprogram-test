// miniprogram/pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUpdatableMessage: false,
    isPrivateMessage: false,
    todoActivityId: 'NULL',
    activityId: 'NULL',
    member_count: 0
  },

  updateShare: function() {
    if(this.data.isUpdatableMessage)
        wx.updateShareMenu({
          activityId: this.data.activityId,
          isUpdatableMessage: true,
          templateInfo: {
            parameterList: [{
              name: 'member_count',
              value: '0'
            },{
              name: 'room_limit',
              value: '5'
            },{
              name: 'path',
              value: `pages/share/share?activity_id=${this.data.activityId}&member_count=${this.data.member_count}`
            },{
              name: 'version_type',
              value: 'trial'
            }]
          },
          targetState: 0,
          // toDoActivityId: this.data.todoActivityId,
          // isPrivateMessage: this.data.isPrivateMessage,
          withShareTicket: true,
          success: (res) => {console.log(res)},
          fail: (res) => {console.log(res)},
        })
    else {
      wx.updateShareMenu({
        activityId: this.data.activityId,
        isUpdatableMessage: false,
        targetState: 0,
        toDoActivityId: this.data.todoActivityId,
        withShareTicket: true,
        success: (res) => {console.log(res)},
        fail: (res) => {console.log(res)},
      })
    } 
  },

  onSetUpdatable: async function () {
    this.setData({
      isUpdatableMessage: !this.data.isUpdatableMessage
    })
    console.log(this.data)
    if(this.data.isUpdatableMessage && this.data.activityId == 'NULL') {
      this.onNewUpdatableId()
    } else {
      this.updateShare()
    }
  },

  // onSetPrivate: async function () {
    
  // },

  onNewTodoId: async function () {
    const r = await wx.cloud.callFunction({
      name: 'new_activityid'
    })
    console.log(r)
    this.setData({
      todoActivityId: r.result.activity_id
    })
    this.updateShare()
  },

  onNewUpdatableId: async function () {
    const r = await wx.cloud.callFunction({
      name: 'new_activityid'
    })
    console.log(r)
    this.setData({
      activityId: r.result.activity_id,
      member_count: 0
    })
    this.updateShare()
  },

  onAddMember: async function () {
    if(this.data.member_count == 5) {
      wx.showModal({
        title: '人数已满'
      })
      return
    }
    this.setData({
      member_count: this.data.member_count + 1
    })
    const r = await wx.cloud.callFunction({
      name: 'update_activity',
      data: {
        activity_id: this.data.activityId,
        member_count: this.data.member_count,
        version_type: 'trial'
      }
    })
    console.log(r.result)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.activity_id) {
      this.data.activityId = options.activity_id
    }
    if(options.member_count) {
      this.data.member_count = parseInt(options.member_count)
    }
    this.setData({
      activityId: this.data.activityId,
      member_count: this.data.member_count
    })
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