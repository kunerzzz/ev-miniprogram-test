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
    const r = await wx.cloud.callFunction({
      name: 'hello',
      data: {
        name: 'World',
      }
    })
    this.setData({
      appid: 'error',
      openid: 'error',
      ...r.result
    })
  },

  onPostTap: async function() {
    const r = await wx.cloud.callFunction({
      name: 'hello',
      data: {
        name: this.data.name,
      }
    })
    this.setData({
      appid: 'error',
      openid: 'error',
      ...r.result
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