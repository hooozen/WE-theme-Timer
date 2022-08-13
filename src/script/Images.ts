export default class Images {
  customImages: string[]
  imageSwitchedTime: number
  randomSwitchImage: boolean
  showedImageIdx: number
  imageSwitchFrequency: number
  el: HTMLElement

  constructor(el: HTMLElement) {
    this.el = el
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
    this.customImages = value.map(s => 'file:///' + s)
    this.render(true)
  }

  get cyclicImages(): string[] {
    return this.customImages.length ? this.customImages : this.defaultImages
    // this.refresh(false, true)
  }

  setImageSwitchFrequency(value: number) {
    this.imageSwitchFrequency = value * 1000
  }

  setImageSwitchOrder(value: boolean) {
    this.randomSwitchImage = value
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

    window.requestAnimationFrame(this.render.bind(this, false))
  }
}
