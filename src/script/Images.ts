interface ImagesDir {
  commonImgDir: string[],
  lightImgDir: string[],
  darkImgDir: string[],
}

const defaultImages: ImagesDir = {
  commonImgDir: Array.from({ length: 33 },
    (item, index) => `style/assets/images/bg-${index}.jpg`),
  lightImgDir: ['style/assets/images/bg-32.jpg'],
  darkImgDir: ['style/assets/images/bg-29.jpg']
}


export default class Images {
  customImages: ImagesDir
  imageSwitchedTime: number
  randomSwitchImage: boolean
  showedImageIdx: number
  imageSwitchFrequency: number
  el: HTMLElement
  modeEnable: boolean
  modeSwitchTime: [number, number]

  constructor(el: HTMLElement) {
    this.el = el
    this.showedImageIdx = 0
    this.imageSwitchFrequency = 60 * 60 * 1000
    this.imageSwitchedTime = Date.now()
    this.customImages = { ...defaultImages }
    this.randomSwitchImage = true
    this.modeEnable = false
    this.modeSwitchTime = [6 * 60 * 60, 18 * 60 * 60]

    this.render()
  }

  get defaultImages(): string[] {
    return Array.from({
      length: 33
    }, (item, index) => `style/assets/images/bg-${index}.jpg`)
  }

  setModeEnable(enable: boolean) {
    this.modeEnable = enable
    this.render(true)
  }

  setModeSwitchTime(index: number, time: string) {
    const stamp: number = (new Date('1949-01-01 ' + time)).getTime() - (new Date('1949-01-01 00:00')).getTime()
    this.modeSwitchTime[index] = Math.floor(stamp / 1000)
    console.log(this.modeSwitchTime)
    this.render(true)
  }

  setCustomImages(name: DirNames, value: string[]) {
    const images = value.map(s => 'file:///' + s)
    this.customImages[name] = images.length ? images : defaultImages[name]
    console.log(this.customImages)
    this.render(true)
  }

  get cyclicImages(): string[] {
    if (!this.modeEnable)
      return this.customImages.commonImgDir

    const now = new Date()
    let offset = now.getTime() - new Date(now.toDateString()).getTime()
    offset = Math.floor(offset / 1000)

    if (offset >= this.modeSwitchTime[0] && offset < this.modeSwitchTime[1])
      return this.customImages.lightImgDir

    return this.customImages.darkImgDir
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
