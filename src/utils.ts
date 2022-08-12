export function formatNumber(number: number, length: number = 2): string {
  const _number = '' + number;
  if (_number.length >= length) return _number.substring(0, length);
  return '0000000000'.substring(0, length - _number.length) + _number;
}

export function $(id: string): HTMLElement | null {
  return document.querySelector(id)
}

export const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']