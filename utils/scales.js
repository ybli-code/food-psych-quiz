/**
 * 心晴测 - 量表数据库
 * 13 份心理与幸福感自评量表，含题目、计分规则、分级解读与建议
 * 每个量表含题目、计分规则（含反向计分）、分级解读与建议
 */

// ---------- 通用选项 ----------
const OPT_SCL = [
  { label: '没有', score: 1 },
  { label: '很轻', score: 2 },
  { label: '中等', score: 3 },
  { label: '偏重', score: 4 },
  { label: '严重', score: 5 }
]
const OPT_4TIME = [
  { label: '没有或很少时间', score: 1 },
  { label: '少部分时间', score: 2 },
  { label: '相当多时间', score: 3 },
  { label: '绝大部分或全部时间', score: 4 }
]
const OPT_PHQ = [
  { label: '完全没有', score: 0 },
  { label: '有几天', score: 1 },
  { label: '一半以上时间', score: 2 },
  { label: '几乎每天', score: 3 }
]
const OPT_PSS = [
  { label: '从不', score: 0 },
  { label: '偶尔', score: 1 },
  { label: '有时', score: 2 },
  { label: '时常', score: 3 },
  { label: '总是', score: 4 }
]
const OPT_SES = [
  { label: '非常不符合', score: 1 },
  { label: '不符合', score: 2 },
  { label: '符合', score: 3 },
  { label: '非常符合', score: 4 }
]
const OPT_ISI = [
  { label: '无', score: 0 },
  { label: '轻度', score: 1 },
  { label: '中度', score: 2 },
  { label: '重度', score: 3 },
  { label: '极重度', score: 4 }
]
const OPT_BFI = [
  { label: '非常不同意', score: 1 },
  { label: '不同意', score: 2 },
  { label: '不确定', score: 3 },
  { label: '同意', score: 4 },
  { label: '非常同意', score: 5 }
]

// ---------- 量表定义 ----------
const scales = [
  // ============ PHQ-9 ============
  {
    id: 'phq9',
    name: '抑郁自评量表（PHQ-9）',
    short: 'PHQ-9',
    category: '抑郁',
    emoji: '🌧️',
    desc: '国际通用的抑郁快速筛查工具，仅需 9 题，被广泛应用于医院与体检场景。',
    time: '约 3 分钟',
    options: OPT_PHQ,
    items: [
      { t: '做事时提不起劲或没有兴趣' },
      { t: '感到心情低落、沮丧或绝望' },
      { t: '入睡困难、睡不安稳或睡眠过多' },
      { t: '感觉疲倦或没有活力' },
      { t: '食欲不振或吃太多' },
      { t: '觉得自己很糟，或觉得自己很失败，或让自己或家人失望' },
      { t: '对事物专注有困难，例如阅读报纸或看电视时' },
      { t: '动作或说话速度缓慢到别人已经察觉？或正好相反——烦躁或坐立不安、动来动去的情况更胜于平常' },
      { t: '有不如死掉或用某种方式伤害自己的念头' }
    ],
    scoring: { type: 'sum' },
    levels: [
      { min: 0, max: 4, label: '情绪平稳', emoji: '🌤️', color: '#5DBB97', desc: '你的抑郁症状并不明显，情绪状态整体良好。', advice: '保持规律作息与适度运动，继续关照自己的情绪即可。' },
      { min: 5, max: 9, label: '轻度抑郁倾向', emoji: '☁️', color: '#F2B04E', desc: '你存在一些轻度抑郁症状，可能与近期压力事件有关。', advice: '建议增加社交与户外活动，记录情绪变化；若持续两周以上，可考虑寻求心理咨询。' },
      { min: 10, max: 14, label: '中度抑郁倾向', emoji: '🌧️', color: '#E8845C', desc: '你的抑郁症状已达到中度水平，正在影响日常生活。', advice: '建议前往精神科或心理科就诊评估，专业帮助能显著改善状态。' },
      { min: 15, max: 19, label: '中重度抑郁倾向', emoji: '⛈️', color: '#D9634E', desc: '你的症状较为明显，建议尽快获得专业支持。', advice: '请尽快到医院精神科/心理科就诊，必要时告知信任的家人或朋友。' },
      { min: 20, max: 27, label: '重度抑郁倾向', emoji: '🌩️', color: '#B94A48', desc: '你的症状达到重度水平，请务必重视。', advice: '请立即寻求精神科专业帮助。若出现伤害自己的念头，请拨打心理援助热线 12356 或前往医院急诊。' }
    ],
    note: '第 9 题为自伤风险条目，若该项得分 ≥ 1，无论总分如何都建议尽快寻求专业帮助。'
  },

  // ============ GAD-7 ============
  {
    id: 'gad7',
    name: '焦虑自评量表（GAD-7）',
    short: 'GAD-7',
    category: '焦虑',
    emoji: '🌊',
    desc: '国际广泛使用的焦虑快速筛查量表，评估过去两周的焦虑体验。',
    time: '约 2 分钟',
    options: OPT_PHQ,
    items: [
      { t: '感觉紧张、焦虑或急切' },
      { t: '不能停止或控制担忧' },
      { t: '对各种各样的事情担忧过多' },
      { t: '很难放松下来' },
      { t: '由于不安而无法静坐' },
      { t: '变得容易烦恼或急躁' },
      { t: '感到似乎将有可怕的事情发生而害怕' }
    ],
    scoring: { type: 'sum' },
    levels: [
      { min: 0, max: 4, label: '焦虑水平正常', emoji: '🌤️', color: '#5DBB97', desc: '你几乎没有明显的焦虑症状。', advice: '继续保持当下的生活节奏，规律运动是缓解焦虑的良方。' },
      { min: 5, max: 9, label: '轻度焦虑', emoji: '🍃', color: '#F2B04E', desc: '你有一些焦虑症状，多与近期压力相关。', advice: '尝试腹式呼吸、正念冥想等放松练习，减少咖啡因摄入。' },
      { min: 10, max: 14, label: '中度焦虑', emoji: '🌊', color: '#E8845C', desc: '你的焦虑症状已达中度，可能影响睡眠与工作状态。', advice: '建议寻求心理咨询师的帮助，学习系统的情绪调节方法。' },
      { min: 15, max: 21, label: '重度焦虑', emoji: '🌀', color: '#D9634E', desc: '你的焦虑症状明显且强烈，请重视。', advice: '建议尽快前往精神科/心理科就诊，焦虑障碍通过规范治疗预后良好。' }
    ],
    note: ''
  },

  // ============ SDS ============
  {
    id: 'sds',
    name: '抑郁自评量表（SDS）',
    short: 'SDS',
    category: '抑郁',
    emoji: '🍂',
    desc: '由 Zung 编制的经典抑郁自评工具，使用广泛、结果稳定，按标准分换算严重程度。',
    time: '约 5 分钟',
    options: OPT_4TIME,
    items: [
      { t: '我觉得闷闷不乐，情绪低沉' },
      { t: '我觉得一天之中早晨最好', r: true },
      { t: '我一阵阵哭出来或觉得想哭' },
      { t: '我晚上睡眠不好' },
      { t: '我吃得跟平常一样多', r: true },
      { t: '我与异性亲密接触时和以往一样感到愉快', r: true },
      { t: '我发觉我的体重在下降' },
      { t: '我有便秘的烦恼' },
      { t: '我心跳比平常快' },
      { t: '我无缘无故地感到疲乏' },
      { t: '我的头脑跟平常一样清楚', r: true },
      { t: '我觉得经常做的事情并没有困难', r: true },
      { t: '我觉得不安而平静不下来' },
      { t: '我对未来抱有希望', r: true },
      { t: '我比平常容易生气激动' },
      { t: '我觉得作出决定是容易的', r: true },
      { t: '我觉得自己是个有用的人，有人需要我', r: true },
      { t: '我的生活过得很有意思', r: true },
      { t: '我认为如果我死了别人会生活得更好些' },
      { t: '平常感兴趣的事我仍然照样感兴趣', r: true }
    ],
    scoring: { type: 'index', factor: 1.25 },
    levels: [
      { min: 25, max: 52, label: '抑郁水平正常', emoji: '🌤️', color: '#5DBB97', desc: '标准分低于 53 分，你的情绪状态在正常范围内。', advice: '继续保持，注意劳逸结合。' },
      { min: 53, max: 62, label: '轻度抑郁', emoji: '☁️', color: '#F2B04E', desc: '标准分 53~62 分，提示轻度抑郁状态。', advice: '关注情绪变化，增加令自己愉悦的活动，必要时进行心理咨询。' },
      { min: 63, max: 72, label: '中度抑郁', emoji: '🌧️', color: '#E8845C', desc: '标准分 63~72 分，提示中度抑郁状态。', advice: '建议到医院精神科/心理科就诊，配合专业评估与干预。' },
      { min: 73, max: 100, label: '重度抑郁', emoji: '⛈️', color: '#B94A48', desc: '标准分超过 72 分，提示重度抑郁状态。', advice: '请尽快寻求专业医疗帮助，不要独自硬扛。' }
    ],
    note: '标准分 = 各题得分之和 × 1.25（四舍五入取整）。'
  },

  // ============ SAS ============
  {
    id: 'sas',
    name: '焦虑自评量表（SAS）',
    short: 'SAS',
    category: '焦虑',
    emoji: '💨',
    desc: 'Zung 编制的经典焦虑自评量表，从躯体与心理两方面评估焦虑水平。',
    time: '约 5 分钟',
    options: OPT_4TIME,
    items: [
      { t: '我觉得比平常容易紧张和着急' },
      { t: '我无缘无故地感到害怕' },
      { t: '我容易心里烦乱或觉得惊恐' },
      { t: '我觉得我可能将要发疯' },
      { t: '我一切都好，也不觉得有什么不幸', r: true },
      { t: '我手脚发抖打颤' },
      { t: '我因为头痛、头颈痛和背痛而苦恼' },
      { t: '我感觉容易衰弱和疲乏' },
      { t: '我觉得心平气和，并且容易安静坐着', r: true },
      { t: '我觉得心跳得很快' },
      { t: '我因为一阵阵头晕而苦恼' },
      { t: '我有晕倒发作，或觉得要晕倒似的' },
      { t: '我呼气吸气都感到很容易', r: true },
      { t: '我手脚麻木和刺痛' },
      { t: '我因为胃痛和消化不良而苦恼' },
      { t: '我常常要小便' },
      { t: '我的手脚常常是干燥温暖的', r: true },
      { t: '我脸红发热' },
      { t: '我容易入睡并且一夜睡得很好', r: true },
      { t: '我做噩梦' }
    ],
    scoring: { type: 'index', factor: 1.25 },
    levels: [
      { min: 25, max: 49, label: '焦虑水平正常', emoji: '🌤️', color: '#5DBB97', desc: '标准分低于 50 分，焦虑症状不明显。', advice: '继续保持良好的作息与心态。' },
      { min: 50, max: 59, label: '轻度焦虑', emoji: '🍃', color: '#F2B04E', desc: '标准分 50~59 分，提示轻度焦虑状态。', advice: '适当运动、规律作息，学习放松训练；必要时寻求心理咨询。' },
      { min: 60, max: 69, label: '中度焦虑', emoji: '💨', color: '#E8845C', desc: '标准分 60~69 分，提示中度焦虑状态。', advice: '建议前往精神科/心理科就诊评估，规范干预效果良好。' },
      { min: 70, max: 100, label: '重度焦虑', emoji: '🌀', color: '#D9634E', desc: '标准分 70 分及以上，提示重度焦虑状态。', advice: '请尽快寻求专业医疗帮助。' }
    ],
    note: '标准分 = 各题得分之和 × 1.25（四舍五入取整）。'
  },

  // ============ SCL-90 ============
  {
    id: 'scl90',
    name: '症状自评量表（SCL-90）',
    short: 'SCL-90',
    category: '综合',
    emoji: '🧭',
    desc: '世界上最著名的心理健康测评量表之一，从 10 个维度全面评估近期心理状态。',
    time: '约 15 分钟',
    options: OPT_SCL,
    items: [
      { t: '头痛' }, { t: '神经过敏，心中不踏实' }, { t: '头脑中有不必要的想法或字句盘旋' }, { t: '头昏或昏倒' },
      { t: '对异性的兴趣减退' }, { t: '对旁人责备求全' }, { t: '感到别人能控制您的思想' }, { t: '责怪别人制造麻烦' },
      { t: '忘性大' }, { t: '担心自己的衣饰整齐及仪态的端正' }, { t: '容易烦恼和激动' }, { t: '胸痛' },
      { t: '害怕空旷的场所或街道' }, { t: '感到自己的精力下降，活动减慢' }, { t: '想结束自己的生命' }, { t: '听到旁人听不到的声音' },
      { t: '发抖' }, { t: '感到大多数人都不可信任' }, { t: '胃口不好' }, { t: '容易哭泣' },
      { t: '同异性相处时感到害羞不自在' }, { t: '感到受骗、中了圈套或有人想抓住您' }, { t: '无缘无故地突然感到害怕' }, { t: '自己不能控制地大发脾气' },
      { t: '怕单独出门' }, { t: '经常责怪自己' }, { t: '腰痛' }, { t: '感到难以完成任务' },
      { t: '感到孤独' }, { t: '感到苦闷' }, { t: '过分担忧' }, { t: '对事物不感兴趣' },
      { t: '感到害怕' }, { t: '您的感情容易受到伤害' }, { t: '旁人能知道您的私下想法' }, { t: '感到别人不理解您、不同情您' },
      { t: '感到人们对您不友好、不喜欢您' }, { t: '做事必须做得很慢以保证做得正确' }, { t: '心跳得很厉害' }, { t: '恶心或胃部不舒服' },
      { t: '感到比不上他人' }, { t: '肌肉酸痛' }, { t: '感到有人在监视您、谈论您' }, { t: '难以入睡' },
      { t: '做事必须反复检查' }, { t: '难以作出决定' }, { t: '怕乘电车、公共汽车、地铁或火车' }, { t: '呼吸有困难' },
      { t: '一阵阵发冷或发热' }, { t: '因为感到害怕而避开某些东西、场合或活动' }, { t: '脑子变空了' }, { t: '身体发麻或刺痛' },
      { t: '喉咙有梗塞感' }, { t: '感到前途没有希望' }, { t: '不能集中注意力' }, { t: '感到身体的某一部分软弱无力' },
      { t: '感到紧张或容易紧张' }, { t: '感到手或脚发重' }, { t: '想到死亡的事' }, { t: '吃得太多' },
      { t: '当别人看着您或谈论您时感到不自在' }, { t: '有一些不属于您自己的想法' }, { t: '有想打人或伤害他人的冲动' }, { t: '醒得太早' },
      { t: '必须反复洗手、点数目或触摸某些东西' }, { t: '睡得不稳不深' }, { t: '有想摔坏或破坏东西的冲动' }, { t: '有一些别人没有的想法或念头' },
      { t: '感到对别人神经过敏' }, { t: '在商店或电影院等人多的地方感到不自在' }, { t: '感到任何事情都很困难' }, { t: '一阵阵恐惧或恐慌' },
      { t: '感到在公共场合吃东西很不舒服' }, { t: '经常与人争论' }, { t: '单独一人时神经很紧张' }, { t: '别人对您的成绩没有作出恰当的评价' },
      { t: '即使和别人在一起也感到孤单' }, { t: '感到坐立不安、心神不定' }, { t: '感到自己没有什么价值' }, { t: '感到熟悉的东西变得陌生或不像是真的' },
      { t: '大叫或摔东西' }, { t: '害怕会在公共场合昏倒' }, { t: '感到别人想占您的便宜' }, { t: '为一些有关性的想法而很苦恼' },
      { t: '您认为应该因为自己的过错而受到惩罚' }, { t: '感到要很快把事情做完' }, { t: '感到自己的身体有严重问题' }, { t: '从未感到和其他人很亲近' },
      { t: '感到自己有罪' }, { t: '感到自己的脑子有毛病' }
    ],
    scoring: {
      type: 'factors',
      factors: [
        { name: '躯体化', items: [0, 3, 11, 26, 39, 41, 47, 48, 51, 52, 55, 57] },
        { name: '强迫症状', items: [2, 8, 9, 27, 37, 44, 45, 50, 54, 64] },
        { name: '人际关系敏感', items: [5, 20, 33, 35, 36, 40, 60, 68, 72] },
        { name: '抑郁', items: [4, 13, 14, 19, 21, 25, 28, 29, 30, 31, 53, 70, 78] },
        { name: '焦虑', items: [1, 16, 22, 32, 38, 56, 71, 77, 79, 85] },
        { name: '敌对', items: [10, 23, 62, 66, 73, 80] },
        { name: '恐怖', items: [12, 24, 46, 49, 69, 74, 81] },
        { name: '偏执', items: [7, 17, 42, 67, 75, 82] },
        { name: '精神病性', items: [6, 15, 34, 61, 76, 83, 84, 86, 87, 89] },
        { name: '其他（睡眠饮食）', items: [18, 43, 58, 59, 63, 65, 88] }
      ]
    },
    levels: [
      { min: 100, max: 149, label: '心理健康状况良好', emoji: '🌤️', color: '#5DBB97', desc: '总均分低于 1.5，各维度均未见明显症状。', advice: '保持当前的生活状态，定期自查即可。' },
      { min: 150, max: 199, label: '需要关注', emoji: '☁️', color: '#F2B04E', desc: '部分维度得分偏高，提示轻度困扰。', advice: '留意得分较高的维度，调整生活节奏，必要时进行心理咨询。' },
      { min: 200, max: 249, label: '中度困扰', emoji: '🌧️', color: '#E8845C', desc: '多个维度症状明显，心理健康需要重视。', advice: '建议寻求专业心理咨询或医院心理科评估。' },
      { min: 250, max: 500, label: '明显困扰', emoji: '⛈️', color: '#B94A48', desc: '总均分超过 2.5，提示症状较为明显。', advice: '请尽快前往精神科/心理科就诊，获得系统的专业帮助。' }
    ],
    note: '各维度分 = 该维度题目总分 ÷ 题目数；总均分 = 总分 ÷ 90。单项 ≥ 2 分即为「阳性症状」，可重点查看得分较高的维度。'
  },

  // ============ PSS-10 ============
  {
    id: 'pss10',
    name: '压力知觉量表（PSS-10）',
    short: 'PSS-10',
    category: '压力',
    emoji: '⚖️',
    desc: '应用最广的压力感知测评工具，评估过去一个月你对生活压力的感受。',
    time: '约 4 分钟',
    options: OPT_PSS,
    items: [
      { t: '因为意外发生的事情，我感到心烦意乱' },
      { t: '我感到不能控制生活中的重要事情' },
      { t: '我感到自信，能有效地应对处理个人的问题', r: true },
      { t: '我感到事情顺利发展', r: true },
      { t: '我感到紧张不安和有压力' },
      { t: '我发现自己不能应付所有自己不得不做的事情' },
      { t: '我能够控制生活中令人恼火的事情', r: true },
      { t: '我感到自己能掌控事情的发展', r: true },
      { t: '我因为一些超出自己控制范围的事情而生气' },
      { t: '我感到困难积累得太多，以致无法克服' }
    ],
    scoring: { type: 'sum' },
    levels: [
      { min: 0, max: 13, label: '压力水平较低', emoji: '🌤️', color: '#5DBB97', desc: '你对生活的掌控感良好，压力在可承受范围内。', advice: '继续保持，别忘了给生活留一点松弛的空间。' },
      { min: 14, max: 26, label: '压力水平中等', emoji: '🍃', color: '#F2B04E', desc: '你正承受着中等程度的压力，属于常见范围。', advice: '尝试时间管理、运动减压；安排固定的休息与爱好时间。' },
      { min: 27, max: 40, label: '压力水平较高', emoji: '⚖️', color: '#D9634E', desc: '你的压力知觉偏高，可能已影响到身心状态。', advice: '优先处理核心压力源，主动向亲友倾诉，必要时寻求专业心理支持。' }
    ],
    note: ''
  },

  // ============ SES ============
  {
    id: 'ses',
    name: '自尊量表（SES）',
    short: 'SES',
    category: '自我',
    emoji: '🪞',
    desc: 'Rosenberg 编制的经典自尊测量工具，评估整体自我价值感。',
    time: '约 3 分钟',
    options: OPT_SES,
    items: [
      { t: '总的来说，我对自己是满意的' },
      { t: '有时我会觉得自己一无是处', r: true },
      { t: '我觉得自己有许多优点' },
      { t: '我和大多数人一样能把事情做好' },
      { t: '我觉得自己没有什么值得自豪的地方', r: true },
      { t: '有时我确实感到自己很没用', r: true },
      { t: '我觉得自己是个有价值的人，至少与其他人在同一水平上' },
      { t: '我希望我能更看得起自己', r: true },
      { t: '我总是倾向于觉得自己是个失败者', r: true },
      { t: '我对自己持积极的态度' }
    ],
    scoring: { type: 'sum' },
    levels: [
      { min: 10, max: 24, label: '自尊水平偏低', emoji: '🪞', color: '#E8845C', desc: '总分低于 25 分，提示自我价值感有待提升。', advice: '尝试记录每天做到的三件小事，练习自我肯定；若长期低落可寻求心理咨询支持。' },
      { min: 25, max: 32, label: '自尊水平中等', emoji: '🌿', color: '#F2B04E', desc: '你的自我评价处于中等水平，多数时候能接纳自己。', advice: '继续发挥优势领域，自我关怀是可以练习的能力。' },
      { min: 33, max: 40, label: '自尊水平较高', emoji: '🌻', color: '#5DBB97', desc: '你对自己有稳定而积极的评价，自我价值感良好。', advice: '很好，这份自我接纳是你应对压力的重要资源。' }
    ],
    note: ''
  },

  // ============ ISI ============
  {
    id: 'isi',
    name: '失眠严重程度指数（ISI）',
    short: 'ISI',
    category: '睡眠',
    emoji: '🌙',
    desc: '国际标准的失眠评估工具，从入睡、维持睡眠到日间影响全面评估睡眠困扰。',
    time: '约 2 分钟',
    options: OPT_ISI,
    items: [
      { t: '入睡困难的严重程度' },
      { t: '维持睡眠困难的严重程度（如夜间易醒、早醒后难以再入睡）' },
      { t: '早醒的严重程度' },
      { t: '你对当前睡眠模式的满意/不满意程度' },
      { t: '你认为睡眠问题在多大程度上影响了日常功能（如日间疲劳、情绪、工作、注意力等）' },
      { t: '别人能观察到你在多大程度上因睡眠问题而受损' },
      { t: '你对当前睡眠问题的担忧/苦恼程度' }
    ],
    scoring: { type: 'sum' },
    levels: [
      { min: 0, max: 7, label: '没有明显失眠', emoji: '🌙', color: '#5DBB97', desc: '总分 0~7 分，你的睡眠状况良好。', advice: '保持规律作息即可。' },
      { min: 8, max: 14, label: '轻度失眠', emoji: '🌥️', color: '#F2B04E', desc: '总分 8~14 分，存在轻度睡眠困扰。', advice: '注意睡眠卫生：固定起床时间、睡前少看手机、午后限咖啡因。' },
      { min: 15, max: 21, label: '中度失眠', emoji: '🌌', color: '#E8845C', desc: '总分 15~21 分，失眠已达临床关注水平。', advice: '建议就诊评估，失眠认知行为治疗（CBT-I）是首选的非药物方案。' },
      { min: 22, max: 28, label: '重度失眠', emoji: '🌑', color: '#B94A48', desc: '总分 22~28 分，提示严重的睡眠困扰。', advice: '请尽快到医院睡眠专科/精神科就诊。' }
    ],
    note: ''
  },

  // ============ BFI-10 ============
  {
    id: 'bfi10',
    name: '大五人格简式量表（BFI-10）',
    short: 'BFI-10',
    category: '人格',
    emoji: '🎭',
    desc: '国际通行的大五人格 10 题简版，快速描绘你在五个维度上的人格倾向。人格没有好坏之分。',
    time: '约 2 分钟',
    options: OPT_BFI,
    items: [
      { t: '我觉得自己是个健谈的人' },
      { t: '我倾向于挑剔别人的毛病', r: true },
      { t: '我做事认真、一丝不苟' },
      { t: '我常常感到情绪低落、忧郁' },
      { t: '我有独创性，总能想出新点子' },
      { t: '我比较内向、安静、寡言', r: true },
      { t: '我乐于助人、不自私' },
      { t: '我做事有时比较马虎粗心', r: true },
      { t: '我心态放松，能从容应对压力', r: true },
      { t: '我对许多事物都充满好奇' }
    ],
    scoring: {
      type: 'traits',
      traits: [
        { name: '外向性', emoji: '☀️', items: [0, 5], low: '偏内向：喜欢安静独处，社交消耗能量，擅长深度思考。', mid: '内外平衡：既能享受独处，也能自如社交。', high: '偏外向：热情主动，从人际互动中获得能量。' },
        { name: '宜人性', emoji: '🤝', items: [1, 6], low: '直接坦率：坚持己见，不易妥协，注重事实与逻辑。', mid: '温和有度：能共情也保有原则。', high: '温暖体贴：善解人意，重视和谐关系。' },
        { name: '尽责性', emoji: '📋', items: [2, 7], low: '灵活随性：不喜欢被计划束缚，适应力强。', mid: '张弛有度：需要时能认真投入。', high: '严谨可靠：目标感强，做事有条理。' },
        { name: '神经质', emoji: '🌡️', items: [3, 8], low: '情绪稳定：抗压能力强，心态平和。', mid: '情绪适中：能感知压力但总体可控。', high: '情绪敏感：对压力与负面情绪的感受更强烈，需注意情绪保养。' },
        { name: '开放性', emoji: '💡', items: [4, 9], low: '务实传统：偏好熟悉的事物与经验。', mid: '好奇适度：对新事物持开放态度。', high: '充满好奇：想象力丰富，乐于探索新观念与体验。' }
      ]
    },
    levels: [],
    note: '各维度得分 2~10 分，反映你在该人格维度上的相对位置，无优劣之分。'
  },

  // ============ WHO-5 ============
  {
    id: 'who5',
    name: '世界卫生组织五项幸福感指数（WHO-5）',
    short: 'WHO-5',
    category: '幸福感',
    emoji: '🌱',
    desc: '5 题了解过去两周的主观幸福感，聚焦积极情绪与精力状态。',
    time: '约 2 分钟',
    options: [
      { label: '所有时间', score: 5 },
      { label: '大部分时间', score: 4 },
      { label: '超过一半时间', score: 3 },
      { label: '少于一半时间', score: 2 },
      { label: '有时', score: 1 },
      { label: '从未', score: 0 }
    ],
    items: [
      { t: '过去两周，我感到快乐和心情愉快' },
      { t: '过去两周，我感到平静和放松' },
      { t: '过去两周，我感到积极而充满活力' },
      { t: '过去两周，我醒来时感到清新和休息充分' },
      { t: '过去两周，我的日常生活充满令我感兴趣的事情' }
    ],
    scoring: { type: 'sum', maxTotal: 25 },
    levels: [
      { min: 0, max: 12, label: '幸福感值得关注', emoji: '🌧️', color: '#E8845C', desc: 'WHO-5 原始分低于 13 分，可作为进一步了解心理状态的提示；这不是诊断结论。', advice: '如果这种状态持续或影响生活，可以和信任的人聊聊，也可考虑寻求专业心理支持。' },
      { min: 13, max: 25, label: '完成幸福感自评', emoji: '🌤️', color: '#5DBB97', desc: '当前得分未低于 WHO-5 文献中建议进一步评估的提示值。自评只反映近两周的主观体验。', advice: '继续留意哪些活动和关系让你感到有活力、平静或愉快。' }
    ],
    note: '总分 0~25 分，分数越高表示主观幸福感越好。WHO 文献提出原始分低于 13 分可提示进一步评估可能性，但不能据此诊断。中文题目采用官方中文版本表达；翻译并非 WHO 新制，WHO 不对翻译内容背书。来源与许可见 README。'
  },

  // ============ UCLA-3 ============
  {
    id: 'ucla3',
    name: 'UCLA 三题孤独感量表（UCLA-3）',
    short: 'UCLA-3',
    category: '人际',
    emoji: '🤝',
    desc: '以 3 个简短问题了解陪伴感、被排斥感和与他人疏离的体验。',
    time: '约 1 分钟',
    options: [
      { label: '几乎没有或从不', score: 1 },
      { label: '有时', score: 2 },
      { label: '经常', score: 3 }
    ],
    items: [
      { t: '你有多常觉得缺少陪伴？' },
      { t: '你有多常觉得被冷落？' },
      { t: '你有多常觉得与他人隔绝？' }
    ],
    scoring: { type: 'sum', maxTotal: 9 },
    levels: [
      { min: 3, max: 9, label: '完成自我了解', emoji: '🤝', color: '#F2B04E', desc: '总分越高，表示这三类感受出现得越频繁。该量表没有公认的个人诊断界值，分数不用于给个人贴标签。', advice: '可以留意自己最希望获得哪种连接，并尝试向信任的人发出一个具体的小邀请。' }
    ],
    note: '三题分别计 1~3 分，总分 3~9 分；较高分表示相关感受出现更频繁。没有统一公认的个人诊断分界值。本量表的中文题目为依据英国国家统计局成人条目所作的翻译。来源见 README。'
  },

  // ============ K6 ============
  {
    id: 'k6',
    name: 'Kessler 六项心理困扰量表（K6）',
    short: 'K6',
    category: '情绪',
    emoji: '🧭',
    desc: '回顾过去 30 天的紧张、无望、低落等非特异性心理困扰，帮助判断是否值得进一步评估。',
    time: '约 2 分钟',
    options: [
      { label: '从不', score: 0 },
      { label: '很少', score: 1 },
      { label: '有时', score: 2 },
      { label: '大多数时候', score: 3 },
      { label: '总是', score: 4 }
    ],
    items: [
      { t: '过去 30 天，你有多常感到紧张？' },
      { t: '过去 30 天，你有多常感到绝望？' },
      { t: '过去 30 天，你有多常感到坐立不安或烦躁？' },
      { t: '过去 30 天，你有多常感到如此低落，以至于没有什么能让你振作？' },
      { t: '过去 30 天，你有多常觉得做任何事都很费劲？' },
      { t: '过去 30 天，你有多常觉得自己毫无价值？' }
    ],
    scoring: { type: 'sum', maxTotal: 24 },
    levels: [
      { min: 0, max: 7, label: '困扰程度较低', emoji: '🌤️', color: '#5DBB97', desc: '本次回答显示，过去 30 天这些困扰感受出现较少。它不代表没有压力，也不能排除其他需要帮助的情况。', advice: '继续维持有助于休息、连接他人和恢复精力的日常安排。' },
      { min: 8, max: 12, label: '困扰程度值得留意', emoji: '☁️', color: '#F2B04E', desc: '部分困扰体验出现得较频繁。不同人群和研究采用的界值可能不同，此区间仅作自我观察，不是诊断分级。', advice: '可以记录近期最费力的情境，并和信任的人或专业咨询人员讨论。' },
      { min: 13, max: 24, label: '建议进一步评估', emoji: '🌧️', color: '#E8845C', desc: 'K6 常用研究界值提示较高心理困扰可能，建议由专业人士结合持续时间、生活影响和其他情况评估；量表不能诊断具体疾病。', advice: '若困扰已影响生活，建议预约心理/精神卫生专业人员评估。若你此刻有伤害自己的风险，请立即联系当地急救或可信任的人陪伴。' }
    ],
    note: '六题回顾过去 30 天，逐题计 0~4 分，总分 0~24；分数越高表示非特异性心理困扰越多。13 分是常见筛查研究界值，不是个人诊断标准。中文题目为便于阅读的翻译，未声称完成本土化验证。来源与使用说明见 README。'
  },

  // ============ GSES ============
  {
    id: 'gses',
    name: '一般自我效能感量表（GSES）',
    short: 'GSES',
    category: '自我',
    emoji: '🪴',
    desc: '了解你对自己应对困难、解决问题和达成目标的总体信心。',
    time: '约 3 分钟',
    options: [
      { label: '完全不正确', score: 1 },
      { label: '有点正确', score: 2 },
      { label: '多数正确', score: 3 },
      { label: '完全正确', score: 4 }
    ],
    items: [
      { t: '即使有人反对，我仍能找到办法实现自己的目标。' },
      { t: '我有信心坚持到底，达成重要目标。' },
      { t: '我相信自己能有效应对意料之外的事件。' },
      { t: '面对突发情况，我通常能想出可行办法。' },
      { t: '遇到麻烦时，我通常能依靠自己的能力处理。' },
      { t: '只要认真投入，我通常能解决棘手问题。' },
      { t: '遇到困难时，我能保持冷静，因为我相信自己能应对。' },
      { t: '面对问题时，我通常能想到不止一种解决办法。' },
      { t: '遇到阻碍时，我通常能找到继续前进的办法。' },
      { t: '无论发生什么，我通常都能处理。' }
    ],
    scoring: { type: 'sum', maxTotal: 40 },
    levels: [
      { min: 10, max: 19, label: '效能信心较低', emoji: '🌱', color: '#E8845C', desc: '本次回答显示，你对自己应对困难的信心偏低。自我效能感会随任务、支持条件和近期状态变化，不是固定人格标签。', advice: '从一个小而具体、可完成的目标开始，回顾曾经奏效的办法，并把复杂任务拆成几步。' },
      { min: 20, max: 29, label: '效能信心中等', emoji: '🪴', color: '#F2B04E', desc: '你对部分挑战有信心，也可能在不确定或压力较大时感到犹豫。分数用于自我观察，不代表能力上限。', advice: '尝试记录完成过的步骤和可求助的资源，逐步积累应对经验。' },
      { min: 30, max: 40, label: '效能信心较强', emoji: '🌿', color: '#5DBB97', desc: '本次回答显示，你普遍相信自己能找到办法应对问题。信心高低不等同于实际能力，也不需要事事独自承担。', advice: '继续运用有效策略，同时在需要时主动寻求合作和支持。' }
    ],
    note: '10 题各计 1~4 分，总分 10~40；分数越高表示一般自我效能信念越强。区间仅为便于理解的描述，量表本身不提供通用临床诊断分界值。中文措辞为易读性翻译，未声称完成本土化验证。来源与使用说明见 README。'
  }
]

const categories = ['全部', '抑郁', '焦虑', '情绪', '压力', '睡眠', '自我', '幸福感', '人际', '人格', '综合']

/** 反向题计分：按选项分值区间翻转（兼容 0~4 与 1~4 / 1~5 量表） */
function reverseScore(scale, s) {
  var minS = scale.options[0].score
  var maxS = scale.options[scale.options.length - 1].score
  return minS + maxS - s
}

/** 由题目得分（原始选项分）计算最终得分与解读 */
function computeResult(scale, answers) {
  const st = scale.scoring
  let total = 0
  let factors = null

  if (st.type === 'index') {
    let raw = 0
    scale.items.forEach(function (it, i) {
      let s = answers[i]
      if (it.r) s = reverseScore(scale, s)
      raw += s
    })
    total = Math.round(raw * st.factor)
  } else if (st.type === 'sum') {
    scale.items.forEach(function (it, i) {
      let s = answers[i]
      if (it.r) s = reverseScore(scale, s)
      total += s
    })
  } else if (st.type === 'factors') {
    const maxScore = scale.options.length
    const posCount = answers.filter(function (a) { return a >= 2 }).length
    let sum = 0
    scale.items.forEach(function (it, i) { sum += answers[i] })
    total = Math.round(sum / scale.items.length * 100) // 总均分*100，便于区间判断
    factors = st.factors.map(function (f) {
      let fs = 0
      f.items.forEach(function (idx) { fs += answers[idx] })
      const mean = Math.round(fs / f.items.length * 100) / 100
      return { name: f.name, mean: mean, percent: Math.min(100, Math.round(mean / maxScore * 100)) }
    })
    return resolveLevel(scale, total, factors, { posCount: posCount })
  } else if (st.type === 'traits') {
    const maxScore = scale.options.length
    factors = st.traits.map(function (tr) {
      let ts = 0
      tr.items.forEach(function (idx) {
        let s = answers[idx]
        if (scale.items[idx].r) s = reverseScore(scale, s)
        ts += s
      })
      const mean = ts / tr.items.length
      let levelText = tr.mid
      if (mean <= 2.5) levelText = tr.low
      else if (mean >= 3.5) levelText = tr.high
      return {
        name: tr.name,
        emoji: tr.emoji,
        mean: Math.round(mean * 10) / 10,
        percent: Math.round(mean / maxScore * 100),
        text: levelText
      }
    })
    return { total: null, levelLabel: '人格画像', levelEmoji: '🎭', levelColor: '#F08E6E', desc: '以下是你在五个维度上的倾向分布。', advice: '', factors: factors, posCount: null }
  }

  return resolveLevel(scale, total, factors, {})
}

function resolveLevel(scale, total, factors, extra) {
  let lv = scale.levels[scale.levels.length - 1]
  for (var i = 0; i < scale.levels.length; i++) {
    if (total >= scale.levels[i].min && total <= scale.levels[i].max) {
      lv = scale.levels[i]
      break
    }
  }
  return {
    total: total,
    levelLabel: lv.label,
    levelEmoji: lv.emoji,
    levelColor: lv.color,
    desc: lv.desc,
    advice: lv.advice,
    factors: factors,
    posCount: extra.posCount || null
  }
}

module.exports = {
  scales: scales,
  categories: categories,
  computeResult: computeResult,
  getScaleById: function (id) {
    for (var i = 0; i < scales.length; i++) {
      if (scales[i].id === id) return scales[i]
    }
    return null
  }
}
