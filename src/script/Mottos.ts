export default class Mottos {
  usingDefaultMottos: boolean
  customMottoEnable: boolean
  customMottos: string[]
  mottoSwitchedTime: number
  randomSwitchMotto: boolean
  showedMottoIdx: number
  mottoSwitchFrequency: number
  el: HTMLElement

  constructor(el: HTMLElement) {
    this.el = el
    this.customMottoEnable = false
    this.usingDefaultMottos = true
    this.showedMottoIdx = 0
    this.mottoSwitchFrequency = 60 * 60 * 1000
    this.mottoSwitchedTime = Date.now()
    this.customMottos = []
    this.randomSwitchMotto = true

    this.render()
  }


  get defaultMottos(): string[] {
    return [
      '不积跬步无以至千里', '北海虽赊，扶摇可接', '欲穷千里目，更上一层楼!', '大鹏一日同风起，扶摇直上九万里',
      '会当凌绝顶，一览众山小', '驽马十驾，功在不舍', '读书不觉已春深，一寸光阴一寸金', '黄沙百战穿金甲，不破楼兰终不还',
      '故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能',
      '鹏北海，凤朝阳。又携书剑路茫茫。明年此日青云去，却笑人间举子忙', '天生我材必有用，千金散尽还复来',
      '穷且益坚，不坠青云之志', '读书之道无他，求其放心而已矣', '学而时习之，不亦说乎', '温故而知新，可以为师矣',
      '士不可以不弘毅，任重而道远', '路漫漫其修远兮，吾将上下而求索', '知之为知之，不知为不知，是知也',
      '学而不思则罔，思而不学则殆', '千淘万漉虽辛苦，吹尽狂沙始到金', '不到长城非好汉，屈指行程二万', '雄关漫道真如铁, 而今迈步从头越',
      '恰同学少年，风华正茂；书生意气，挥斥方遒', '不抚壮而弃秽兮，何不改乎此度？', '天行健，君子以自强不息',
      '君不见黄河之水天上来，奔流到海不复回！', '君不见高堂明镜悲白发，朝如青丝暮成雪！', '行路难！行路难！多歧路，今安在',
      '九万里风鹏正举。风休住，蓬舟吹取三山去！', '乘风破浪会有时，直挂云帆济沧海', '愿乘长风破万里浪',
      '欲渡黄河冰塞川，将登太行雪满山', '自信人生二百年，会当水击三千里', '业精于勤荒于嬉，行成于思毁于随'
    ]
  }

  get cyclicMottos(): string[] {
    const {
      customMottoEnable,
      usingDefaultMottos,
      defaultMottos,
      customMottos
    } = this

    let mottos: string[] = []

    if (!customMottoEnable) {
      mottos = defaultMottos
    } else if (usingDefaultMottos) {
      mottos = defaultMottos.concat(customMottos)
    } else {
      mottos = customMottos
    }

    const cyclicMottos = mottos.filter(item => item != '')

    return cyclicMottos.length > 0 ? cyclicMottos : ['此时无声胜有声']

    // this.refresh(true, false)
  }

  setCustomMottoEnable(value: boolean) {
    this.customMottoEnable = value
    this.render(true)
  }

  setUsingDefaultMottos(value: boolean) {
    this.usingDefaultMottos = value
    this.render(true)
  }

  setCustomMottos(value: string) {
    this.customMottos = value.split('+')
    this.render(true)
  }

  setMottoSwitchFrequency(value: number) {
    this.mottoSwitchFrequency = value * 1000
  }

  setMottoSwitchOrder(value: boolean) {
    console.log(value)
    this.randomSwitchMotto = value
  }

  render(rightnow: boolean = false, timestamp?: number) {
    let mottos = this.cyclicMottos
    const now = Date.now();

    if (rightnow || now >= this.mottoSwitchedTime + this.mottoSwitchFrequency) {
      console.log('change motto')
      const toShowIdx = this.randomSwitchMotto ? Math.floor(mottos.length * Math.random()) : this.showedMottoIdx++ % mottos.length
      this.el.innerText = mottos[toShowIdx];
      this.mottoSwitchedTime = now;
    }

    window.requestAnimationFrame(this.render.bind(this, false))
  }
}
