var store = require('../../utils/store.js')

Page({
  data: { list: [] },

  onShow: function () {
    this.setData({ list: store.getHistory() })
  },

  goDetail: function (e) {
    wx.navigateTo({ url: '/pages/result/result?rid=' + e.currentTarget.dataset.id })
  },

  goHome: function () {
    wx.switchTab({ url: '/pages/index/index' })
  },

  onDelete: function (e) {
    var id = e.currentTarget.dataset.id
    var self = this
    wx.showModal({
      title: '删除记录',
      content: '删除后无法恢复，确定删除这条记录吗？',
      confirmText: '删除',
      cancelText: '取消',
      confirmColor: '#D9634E',
      success: function (res) {
        if (res.confirm) {
          store.removeRecord(id)
          self.setData({ list: store.getHistory() })
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '心晴测 · 记录每一次情绪的晴雨变化',
      path: '/pages/index/index'
    }
  }
})
