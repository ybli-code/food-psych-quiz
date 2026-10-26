/** 本地测评记录存储（wx storage） */
var KEY = 'xqc_history'

function getHistory() {
  try {
    var list = wx.getStorageSync(KEY)
    return list || []
  } catch (e) {
    return []
  }
}

function saveRecord(record) {
  var list = getHistory()
  list.unshift(record)
  // 最多保留 200 条
  if (list.length > 200) list = list.slice(0, 200)
  wx.setStorageSync(KEY, list)
  return record
}

function getRecord(id) {
  var list = getHistory()
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i]
  }
  return null
}

function removeRecord(id) {
  var list = getHistory()
  var next = []
  for (var i = 0; i < list.length; i++) {
    if (list[i].id !== id) next.push(list[i])
  }
  wx.setStorageSync(KEY, next)
}

function formatDate(ts) {
  var d = new Date(ts)
  var p = function (n) { return n < 10 ? '0' + n : '' + n }
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes())
}

module.exports = {
  getHistory: getHistory,
  saveRecord: saveRecord,
  getRecord: getRecord,
  removeRecord: removeRecord,
  formatDate: formatDate
}
