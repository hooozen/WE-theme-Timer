
export default class Timer {
  outEl: HTMLElement
  deadline: Date

  constructor(outEl: HTMLElement) {
    this.outEl = outEl
    this.deadline = this._getDefaultDeadline()

    this.render()
  }

  _getDefaultDeadline(): Date {
    const now = new Date();

    const y = now.getFullYear();
    const m = 11;
    const roughDate = new Date(y, m, 20);
    const d = roughDate.getDay();
    return d === 6 ? roughDate : new Date(y, m, 20 + 6 - d)
  }

  _formatNumber(number: number, length: number = 2): string {
    const _number = '' + number;
    if (_number.length >= length) return _number.substring(0, length);
    return '0000000000'.substring(0, length - _number.length) + _number;
  }

  setDeadline(value: string) {
    this.deadline = new Date(value)
  }

  setPrecision(precision: number) {
    precision *= 2
    for (let i = 0; i < this.outEl.children.length; i++) {
      const el = this.outEl.children[i] as HTMLElement
      if (i >= precision)
        el.style.display = 'none'
      else
        el.style.display = 'block'
    }
  }

  getTimerNumbers() {
    const remainingTime = (this.deadline.getTime() - Date.now());
    return [
      Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
      Math.floor(remainingTime / (1000 * 60 * 60) % 24),
      Math.floor(remainingTime / (1000 * 60) % 60),
      Math.floor(remainingTime / 1000 % 60),
      Math.floor(remainingTime % 1000),
    ]
  }

  render() {
    const numbers = this.getTimerNumbers()
    const children = this.outEl.children
    children[0].innerHTML = numbers[0] as unknown as string
    for (let i = 2; i < children.length; i += 2) {
      children[i].innerHTML = this._formatNumber(numbers[i / 2])
    }
    window.requestAnimationFrame(this.render.bind(this))
  }
}