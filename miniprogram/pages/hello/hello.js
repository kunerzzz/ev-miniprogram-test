// miniprogram/pages/hello/hello.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    message: '',
    appid: '',
    openid: '',
  },

  onNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  onGetTap: async function() {
    const c = new wx.cloud.Cloud({
      resourceEnv: 'test-0gnhz97mc874f295'
    })
    await c.init()
    const r = await c.callContainer({
      path: '/hello',
    })
    this.setData({
      appid: 'error',
      openid: 'error',
      ...r.data
    })
  },

  onPostTap: async function() {
    const c = new wx.cloud.Cloud({
      resourceEnv: 'test-0gnhz97mc874f295'
    })
    await c.init()
    const r = await c.callContainer({
      path: '/hello',
      method: 'POST',
      data: {
        name: this.data.name
      }
    })
    this.setData({
      appid: 'error',
      openid: 'error',
      ...r.data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(wx.getSystemInfoSync().SDKVersion)
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