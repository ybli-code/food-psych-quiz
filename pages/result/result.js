var scalesData = require('../../utils/scales.js')
var store = require('../../utils/store.js')

var HERO_BG = {
  green: ['#DDF5EC', '#C9EDDE'],
  yellow: ['#FFF1DC', '#FFE6C7'],
  orange: ['#FFE8DC', '#FFD9C8'],
  red: ['#FBE3E1', '#F7D3D0']
}

function heroPair(color) {
  if (!color) return HERO_BG.orange
  if (color.indexOf('#5DBB97') === 0) return HERO_BG.green
  if (color.indexOf('#F2B04E') === 0) return HERO_BG.yellow
  if (color.indexOf('#D9634E') === 0 || color.indexOf('#B94A48') === 0) return HERO_BG.red
  return HERO_BG.orange
}

Page({
  data: {
    record: null,
    maxTotal: '',
    note: '',
    isTrait: false,
    heroBg1: '#FFE8DC',
    heroBg2: '#FFD9C8'
  },

  onLoad: function (query) {
    var record = store.getRecord(query.rid)
    if (!record) {
      wx.showToast({ title: '记录不存在', icon: 'none' })
      setTimeout(function () { wx.switchTab({ url: '/pages/index/index' }) }, 800)
      return
    }
    var scale = scalesData.getScaleById(record.scaleId)
    var pair = heroPair(record.levelColor)
    var maxTotal = ''
    if (record.total !== null && record.total !== undefined && scale) {
      if (scale.scoring.type === 'sum') {
        maxTotal = String(scale.scoring.maxTotal || scale.options.length * scale.items.length)
      } else if (scale.scoring.type === 'index') {
        maxTotal = '100'
      } else if (scale.scoring.type === 'factors') {
        maxTotal = ''
      }
    }
    this.setData({
      record: record,
      maxTotal: maxTotal,
      note: scale ? scale.note : '',
      isTrait: scale ? scale.scoring.type === 'traits' : false,
      heroBg1: pair[0],
      heroBg2: pair[1]
    })
  },

  goScale: function () {
    wx.navigateTo({ url: '/pages/library/library' })
  },

  goHistory: function () {
    wx.switchTab({ url: '/pages/history/history' })
  },

  retest: function () {
    var record = this.data.record
    wx.redirectTo({ url: '/pages/quiz/quiz?scaleId=' + record.scaleId })
  },

  onShareAppMessage: function () {
    var record = this.data.record
    return {
      title: record ? '我在心晴测完成了「' + record.scaleName + '」' : '心晴测 · 我的心理测评报告',
      path: '/pages/index/index'
    }
  },

  onShareTimeline: function () {
    return {
      title: '心晴测 · 3 分钟了解自己的情绪状态',
      query: ''
    }
  }
})
