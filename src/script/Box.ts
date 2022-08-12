export default class Box {
  el: HTMLElement
  mainEl: HTMLElement
  maskEl: HTMLElement
  scale: number
  translateY: number

  constructor(el: HTMLElement, maskEl: HTMLElement) {
    this.el = el
    this.maskEl = maskEl
    this.mainEl = el.querySelector('#main') as HTMLElement
    this.scale = 100
    this.translateY = 0
  }

  setScale(value: number) {
    this.scale = value / 100
    this.setTransform()
  }

  setTranslateY(value: number) {
    this.translateY = -value
    this.setTransform()
  }

  setTransform() {
    const transform = `scale(${this.scale}) translateY(${this.translateY}%)`
    this.mainEl.style.transform = transform
  }

  setMaskTransparency(value: number) {
    const text = `.bg::after {background:rgba(0,0,0,${value / 100})}`
    this.maskEl.innerText = text
  }
}