export default class Title {
  text: string
  el: HTMLElement

  constructor(el: HTMLElement) {
    this.el = el
    this.text = ((new Date()).getFullYear() + 1).toString()

    this.render()
  }

  setText(value: string) {
    this.text = value
    this.render()
  }

  render() {
    this.el.innerText = this.text
  }
}