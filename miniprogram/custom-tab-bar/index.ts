// custom-tab-bar/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,//选择的索引
    currentName:"",//选择的名称
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "/pages/index/index",
      "iconPath": "../imgs/tabarImgs/home.png",
      "selectedIconPath": "../imgs/tabarImgs/homeActive.png",
      "text": "首页"
    }, 
    {
      "pagePath": "/pages/order/order",
      "iconPath": "../imgs/tabarImgs/order.png",
      "selectedIconPath": "../imgs/tabarImgs/orderActive.png",
      "text": "购物"
    }, 
    {
      "pagePath": "/pages/message/message",
      "iconPath": "../imgs/tabarImgs/message.png",
      "selectedIconPath": "../imgs/tabarImgs/messageActive.png",
      "text": "信息"
    }, 
    {
      "pagePath": "/pages/mine/mine",
      "iconPath": "../imgs/tabarImgs/mine.png",
      "selectedIconPath": "../imgs/tabarImgs/mineActive.png",
      "text": "我的"
    }]
  },

  switchTab(e:any) {
    const data = e.currentTarget.dataset
    const url = data.path
    wx.switchTab({
      url
    })
    this.setData({
      selected: data.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})