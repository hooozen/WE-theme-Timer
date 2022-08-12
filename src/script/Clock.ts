import { formatNumber, weekday } from "../utils.js"

export default class Clock {
  outerEl: HTMLElement
  clockNum: HTMLElement
  secondHand: HTMLElement
  minuteHand: HTMLElement
  hourHand: HTMLElement
  clockNumH: HTMLElement
  clockNumM: HTMLElement
  clockNumS: HTMLElement
  clockNumD: HTMLElement
  clockVisible: boolean
  numVisible: boolean

  constructor(outer: HTMLElement) {
    this.outerEl = outer
    this.hourHand = this._$('#hourHand')
    this.minuteHand = this._$('#minuteHand')
    this.secondHand = this._$('#secondHand')
    this.clockNum = this._$('#clockNum')
    this.clockNumH = this._$('#clockNumH')
    this.clockNumM = this._$('#clockNumM')
    this.clockNumS = this._$('#clockNumS')
    this.clockNumD = this._$('#clockNumD')

    this.clockVisible = false
    this.numVisible = false

    this.render()
  }

  _$(id: string): HTMLElement {
    return this.outerEl.querySelector(id) as HTMLElement
  }

  setClockVisible(value: boolean) {
    this.clockVisible = value
    if (value) this.outerEl.style.display = 'block'
    else this.outerEl.style.display = 'none'
  }

  setNumVisible(value: boolean) {
    this.numVisible = value
    if (value) this.clockNum.style.visibility = 'visible'
    else this.clockNum.style.visibility = 'hidden'
  }

  run() {
    const now = new Date()
    const dataStamp = now.getTime()
    const s = dataStamp / 1000 % 60
    const m = dataStamp / 60000 % 60
    const h = now.getHours() + m / 60

    this.secondHand.style.transform = `rotate(${(s * 6 - 90) % 360}deg)`
    this.minuteHand.style.transform = `rotate(${(m * 6 - 90) % 360}deg)`
    this.hourHand.style.transform = `rotate(${(h * 30 - 90) % 360}deg)`
    if (!this.numVisible) return
    this.clockNumH.innerText = formatNumber(Math.floor(h), 2)
    this.clockNumM.innerText = formatNumber(Math.floor(m), 2)
    this.clockNumS.innerText = formatNumber(Math.floor(s), 2)
    this.clockNumD.innerText = weekday[now.getDay() - 1]
  }

  render() {
    this.run()
    window.requestAnimationFrame(this.render.bind(this))
  }
}