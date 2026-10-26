var scalesData = require('../../utils/scales.js')
var store = require('../../utils/store.js')

Page({
  data: {
    scale: null,
    count: 0,
    idx: 0,
    percent: 0,
    current: '',
    options: [],
    answers: [],
    finishing: false
  },

  onLoad: function (query) {
    var scale = scalesData.getScaleById(query.scaleId)
    if (!scale) {
      wx.showToast({ title: '量表不存在', icon: 'none' })
      setTimeout(function () { wx.navigateBack() }, 800)
      return
    }
    var answers = []
    for (var i = 0; i < scale.items.length; i++) answers.push(null)
    this.setData({
      scale: scale,
      count: scale.items.length,
      options: scale.options,
      answers: answers,
      current: scale.items[0].t
    })
    this.updateProgress()
  },

  updateProgress: function () {
    this.setData({
      percent: Math.round((this.data.idx / this.data.count) * 100)
    })
  },

  onSelect: function (e) {
    if (this.data.finishing) return
    var score = Number(e.currentTarget.dataset.score)
    var idx = this.data.idx
    var key = 'answers[' + idx + ']'
    var patch = {}
    patch[key] = score
    this.setData(patch)

    var self = this
    if (idx === this.data.count - 1) {
      // 最后一题 → 完成
      this.setData({ finishing: true })
      setTimeout(function () { self.finish() }, 250)
    } else {
      setTimeout(function () {
        self.setData({
          idx: idx + 1,
          current: self.data.scale.items[idx + 1].t
        })
        self.updateProgress()
      }, 160)
    }
  },

  onPrev: function () {
    if (this.data.idx === 0) return
    this.setData({
      idx: this.data.idx - 1,
      current: this.data.scale.items[this.data.idx - 1].t
    })
    this.updateProgress()
  },

  onQuit: function () {
    var self = this
    wx.showModal({
      title: '退出测评',
      content: '当前的作答记录将不会被保存，确定退出吗？',
      confirmText: '继续作答',
      cancelText: '退出',
      confirmColor: '#F08E6E',
      success: function (res) {
        if (res.cancel) {
          wx.navigateBack()
        }
      }
    })
  },

  finish: function () {
    var scale = this.data.scale
    var answers = this.data.answers
    // 校验是否全部作答
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] === null) {
        this.setData({ finishing: false })
        wx.showToast({ title: '第 ' + (i + 1) + ' 题还未作答', icon: 'none' })
        this.setData({ idx: i, current: scale.items[i].t })
        this.updateProgress()
        return
      }
    }
    var result = scalesData.computeResult(scale, answers)
    var id = 'r' + Date.now()
    store.saveRecord({
      id: id,
      scaleId: scale.id,
      scaleName: scale.name,
      scaleEmoji: scale.emoji,
      date: store.formatDate(Date.now()),
      ts: Date.now(),
      total: result.total,
      levelLabel: result.levelLabel,
      levelEmoji: result.levelEmoji,
      levelColor: result.levelColor,
      desc: result.desc,
      advice: result.advice,
      factors: result.factors
    })
    wx.redirectTo({ url: '/pages/result/result?rid=' + id })
  }
})
