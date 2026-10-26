/**
 * 冒烟测试：验证量表数据完整性与计分逻辑
 * 运行：node tests/smoke.js
 */
var scalesData = require('../utils/scales.js')

var failures = []

function check(cond, msg) {
  if (!cond) failures.push(msg)
}

scalesData.scales.forEach(function (s) {
  // 每个量表：题目非空、选项非空、levels 覆盖
  check(s.items.length > 0, s.id + ' 无题目')
  check(s.options.length >= 4, s.id + ' 选项不足')
  s.items.forEach(function (it, i) {
    check(typeof it.t === 'string' && it.t.length > 0, s.id + ' 第 ' + (i + 1) + ' 题文本为空')
  })
  if (s.scoring.type !== 'traits') {
    check(s.levels.length > 0, s.id + ' 无分级')
    // 分级区间连续覆盖 [min, max]
    var sorted = s.levels.slice().sort(function (a, b) { return a.min - b.min })
    for (var i = 1; i < sorted.length; i++) {
      check(sorted[i].min === sorted[i - 1].max + 1, s.id + ' 分级区间不连续: ' + sorted[i - 1].max + ' -> ' + sorted[i].min)
    }
  }
  // factors 类量表：因子索引在题目范围内
  if (s.scoring.type === 'factors') {
    var total = 0
    s.scoring.factors.forEach(function (f) {
      f.items.forEach(function (idx) {
        check(idx >= 0 && idx < s.items.length, s.id + ' 因子 ' + f.name + ' 索引越界: ' + idx)
      })
      total += f.items.length
    })
    check(total === s.items.length, s.id + ' 因子题目数(' + total + ')与总题数(' + s.items.length + ')不一致')
  }
  if (s.scoring.type === 'traits') {
    var tt = 0
    s.scoring.traits.forEach(function (tr) {
      tr.items.forEach(function (idx) {
        check(idx >= 0 && idx < s.items.length, s.id + ' 维度 ' + tr.name + ' 索引越界: ' + idx)
      })
      tt += tr.items.length
    })
    check(tt === s.items.length, s.id + ' 维度题目数与总题数不一致')
  }
})

// ---- 计分逻辑验证 ----
function allAnswers(scale, score) {
  var a = []
  for (var i = 0; i < scale.items.length; i++) a.push(score)
  return a
}

// PHQ-9：全 0 → 0 分「情绪平稳」
var phq9 = scalesData.getScaleById('phq9')
var r = scalesData.computeResult(phq9, allAnswers(phq9, 0))
check(r.total === 0 && r.levelLabel === '情绪平稳', 'PHQ-9 全 0 计分错误: ' + r.total + '/' + r.levelLabel)

// PHQ-9：全 3 → 27 分「重度」
r = scalesData.computeResult(phq9, allAnswers(phq9, 3))
check(r.total === 27 && r.levelLabel === '重度抑郁倾向', 'PHQ-9 全 3 计分错误: ' + r.total + '/' + r.levelLabel)

// GAD-7：全 3 → 21 重度
var gad7 = scalesData.getScaleById('gad7')
r = scalesData.computeResult(gad7, allAnswers(gad7, 3))
check(r.total === 21 && r.levelLabel === '重度焦虑', 'GAD-7 计分错误: ' + r.total + '/' + r.levelLabel)

// SDS：全 1 = 正向症状题全有 + 反向积极题全无 → 粗分 50 → 标准分 63（中度）
var sds = scalesData.getScaleById('sds')
r = scalesData.computeResult(sds, allAnswers(sds, 1))
check(r.total === 63 && r.levelLabel === '中度抑郁', 'SDS 全 1 计分错误: ' + r.total + '/' + r.levelLabel)
// SDS：全 4 = 正向症状题高分 + 反向积极题高分 → 对称地粗分 50 → 63
r = scalesData.computeResult(sds, allAnswers(sds, 4))
check(r.total === 63, 'SDS 全 4 反向计分错误: ' + r.total)
// SDS：健康作答（正向题 1 + 反向题 4）→ 粗分 20 → 标准分 25 → 正常
var sdsHealthy = sds.items.map(function (it) { return it.r ? 4 : 1 })
r = scalesData.computeResult(sds, sdsHealthy)
check(r.total === 25 && r.levelLabel === '抑郁水平正常', 'SDS 健康作答计分错误: ' + r.total + '/' + r.levelLabel)

// SAS：全 4 → 正向 15×4 + 反向 5×1 = 65 → 81
var sas = scalesData.getScaleById('sas')
r = scalesData.computeResult(sas, allAnswers(sas, 4))
check(r.total === 81, 'SAS 反向计分错误: ' + r.total)
// SAS：健康作答（正向 1 + 反向 4）→ 粗分 20 → 25
var sasHealthy = sas.items.map(function (it) { return it.r ? 4 : 1 })
r = scalesData.computeResult(sas, sasHealthy)
check(r.total === 25, 'SAS 健康作答计分错误: ' + r.total)

// PSS-10：全 0（反向=4）→ 反向 4 题 × 4 = 16 → 中等压力
var pss = scalesData.getScaleById('pss10')
r = scalesData.computeResult(pss, allAnswers(pss, 0))
check(r.total === 16 && r.levelLabel === '压力水平中等', 'PSS-10 计分错误: ' + r.total + '/' + r.levelLabel)

// SES：全 4（反向=1）→ 5 正向 × 4 + 5 反向 × 1 = 25 → 中等
var ses = scalesData.getScaleById('ses')
r = scalesData.computeResult(ses, allAnswers(ses, 4))
check(r.total === 25 && r.levelLabel === '自尊水平中等', 'SES 计分错误: ' + r.total + '/' + r.levelLabel)

// ISI：全 0 → 0 分
var isi = scalesData.getScaleById('isi')
r = scalesData.computeResult(isi, allAnswers(isi, 0))
check(r.total === 0 && r.levelLabel === '没有明显失眠', 'ISI 计分错误: ' + r.total + '/' + r.levelLabel)

// SCL-90：全 1 → 总均分 1.0 → 总分 100 → 良好；因子均分均为 1
var scl = scalesData.getScaleById('scl90')
r = scalesData.computeResult(scl, allAnswers(scl, 1))
check(r.total === 100 && r.levelLabel === '心理健康状况良好', 'SCL-90 全 1 计分错误: ' + r.total + '/' + r.levelLabel)
check(r.factors.length === 10, 'SCL-90 因子数错误: ' + r.factors.length)
r.factors.forEach(function (f) {
  check(f.mean === 1, 'SCL-90 因子 ' + f.name + ' 均分错误: ' + f.mean)
})
// SCL-90：全 5 → 总均分 5.0 → 500 → 明显困扰
r = scalesData.computeResult(scl, allAnswers(scl, 5))
check(r.total === 500 && r.levelLabel === '明显困扰', 'SCL-90 全 5 计分错误: ' + r.total + '/' + r.levelLabel)
check(r.posCount === 90, 'SCL-90 阳性项目数错误: ' + r.posCount)

// BFI-10：全 5 → 含反向题的 4 个维度 mean = (5+1)/2 = 3，开放性（无反向）= 5
var bfi = scalesData.getScaleById('bfi10')
r = scalesData.computeResult(bfi, allAnswers(bfi, 5))
check(r.factors.length === 5, 'BFI-10 维度数错误')
var bfiExpect = { '外向性': 3, '宜人性': 3, '尽责性': 3, '神经质': 3, '开放性': 5 }
r.factors.forEach(function (f) {
  check(f.mean === bfiExpect[f.name], 'BFI-10 维度 ' + f.name + ' 计分错误: ' + f.mean)
})

if (failures.length > 0) {
  console.error('FAIL (' + failures.length + '):')
  failures.forEach(function (f) { console.error('  - ' + f) })
  process.exit(1)
} else {
  console.log('OK: 9 个量表数据完整性 + 计分逻辑全部通过')
}
