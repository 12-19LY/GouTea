// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
  },
  onLoad() {

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 0
      })
    }
  }

})
