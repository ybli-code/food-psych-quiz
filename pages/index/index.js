var scalesData = require('../../utils/scales.js')

Page({
  data: {
    categories: scalesData.categories,
    catIndex: 0,
    recommend: {},
    filtered: [],
    total: scalesData.scales.length
  },

  onLoad: function () {
    var day = new Date().getDate() + new Date().getMonth() * 31
    var rec = scalesData.scales[day % scalesData.scales.length]
    this.setData({
      recommend: {
        id: rec.id,
        name: rec.name,
        emoji: rec.emoji,
        desc: rec.desc,
        time: rec.time,
        questions: rec.items.length
      }
    })
    this.applyFilter()
  },

  onCatTap: function (e) {
    this.setData({ catIndex: Number(e.currentTarget.dataset.index) })
    this.applyFilter()
  },

  applyFilter: function () {
    var cat = this.data.categories[this.data.catIndex]
    var list = scalesData.scales.map(function (s) {
      return {
        id: s.id, name: s.name, emoji: s.emoji, category: s.category,
        time: s.time, questions: s.items.length
      }
    })
    if (cat !== '全部') {
      list = list.filter(function (x) { return x.category === cat })
    }
    this.setData({ filtered: list })
  },

  goQuiz: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/quiz/quiz?scaleId=' + id })
  },

  onShareAppMessage: function () {
    return {
      title: '心晴测 · 13 份心理与幸福感自评量表',
      path: '/pages/index/index'
    }
  },

  onShareTimeline: function () {
    return {
      title: '心晴测 · 关注此刻的心情，专业心理测评',
      query: ''
    }
  }
})
