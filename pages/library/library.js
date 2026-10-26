var scalesData = require('../../utils/scales.js')

Page({
  data: {
    categories: scalesData.categories,
    catIndex: 0,
    filtered: [],
    total: scalesData.scales.length
  },

  onLoad: function () { this.applyFilter() },

  onCatTap: function (e) {
    this.setData({ catIndex: Number(e.currentTarget.dataset.index) })
    this.applyFilter()
  },

  applyFilter: function () {
    var cat = this.data.categories[this.data.catIndex]
    var list = scalesData.scales.map(function (s) {
      return {
        id: s.id, name: s.name, emoji: s.emoji, category: s.category,
        desc: s.desc, time: s.time, questions: s.items.length
      }
    })
    if (cat !== '全部') {
      list = list.filter(function (x) { return x.category === cat })
    }
    this.setData({ filtered: list })
  },

  goQuiz: function (e) {
    wx.navigateTo({ url: '/pages/quiz/quiz?scaleId=' + e.currentTarget.dataset.id })
  },

  onShareAppMessage: function () {
    return {
      title: '心晴测量表库 · SCL-90、PHQ-9、GAD-7 等专业量表免费测',
      path: '/pages/library/library'
    }
  },

  onShareTimeline: function () {
    return {
      title: '心晴测量表库 · 9 份国际通行专业心理量表',
      query: ''
    }
  }
})
