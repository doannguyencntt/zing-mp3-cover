export function displayDuration(sec, type = 1) {
  const format = (val) => `0${Math.floor(val)}`.slice(-2)
  const hours = sec / 3600
  const minutes = (sec % 3600) / 60
  const seconds = sec % 60
  if (type === 1) {
    if (format(hours) !== '00') {
      return `${format(hours)} giờ ${format(minutes)} phút`
    } else {
      return `${format(minutes)} phút`
    }
  }
  if (type === 2) {
    return [format(minutes), format(seconds)].join(':')
  }
}
