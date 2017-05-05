/**
 * Created by WittBulter on 2017/5/6.
 * @description :: 等待一个正则大大
 */
const date = (input, format) => {
  const d = new Date(input)
  if (d === 'Invalid Date') return input
  const makeReg = value => new RegExp(`(${value})`)
  const map = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const key in map) {
    const v = map[key]
    if (makeReg(key).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? v : (('00' + v).substr(('' + v).length)))
    }
  }
  return format
}