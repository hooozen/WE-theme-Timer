export default class Images {
  customImages: string[]
  imageSwitchedTime: number
  randomSwitchImage: boolean
  showedImageIdx: number
  imageSwitchFrequency: number
  el: HTMLElement
  maskEl: HTMLElement

  constructor(el: HTMLElement, maskEl: HTMLElement) {
    this.el = el
    this.maskEl = maskEl
    this.showedImageIdx = 0
    this.imageSwitchFrequency = 60 * 60 * 1000
    this.imageSwitchedTime = Date.now()
    this.customImages = []
    this.randomSwitchImage = true

    this.render()
  }

  get defaultImages(): string[] {
    return Array.from({
      length: 33
    }, (item, index) => `style/assets/images/bg-${index}.jpg`)
  }


  setCustomImages(value: string[]) {
    this.customImages = value
  }

  get cyclicImages(): string[] {
    return this.customImages.length ? this.customImages : this.defaultImages
    // this.refresh(false, true)
  }

  setMaskTransparency(value: number) {
    const text = `.bg::after {background:rgba(0,0,0,${value / 100})}`
    this.maskEl.innerText = text
  }

  setImageSwitchFrequency(value: number) {
    this.imageSwitchFrequency = value * 1000
  }


  render(rightnow: boolean = false, timestamp?: number) {
    const images = this.cyclicImages
    const now = Date.now();

    if (rightnow || now >= this.imageSwitchedTime + this.imageSwitchFrequency) {
      console.log('change image')
      const toShowIdx = this.randomSwitchImage ? Math.floor(images.length * Math.random()) : this.showedImageIdx++ % images.length
      this.el.style.backgroundImage = `url(${images[toShowIdx]})`
      this.imageSwitchedTime = now
    }

    window.requestAnimationFrame(this.render.bind(this, rightnow))
  }
}
