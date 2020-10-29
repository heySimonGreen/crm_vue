import crypto from 'crypto'
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function cryptTokenf(uuid) {
  const list = [
    [0, 5, 9, 15, 22, 28],
    [2, 8, 19, 25, 30, 31],
    [20, 25, 31, 3, 4, 8],
    [25, 31, 0, 9, 13, 17],
    [29, 2, 11, 17, 21, 26],
    [10, 15, 18, 29, 2, 3],
    [5, 10, 15, 17, 18, 22],
    [8, 20, 22, 27, 19, 21]
  ]
  const char = '0x' + uuid.charAt(2) + uuid.charAt(5) + uuid.charAt(8)
  let result = ''
  const array = list[parseInt(char) % 8]
  for (let i = 0; i < array.length; i++) {
    result = result + '' + uuid.charAt(array[i])
  }
  return result
}
export function signatureMD5(time, path, guid, param, cryptToken) {
  let s = time + '' + path + '' + guid + '' + param + '' + cryptToken
  console.log('s:...' + s)
  const md5 = crypto.createHash('md5')
  md5.update(s)
  s = md5.digest('hex')
  return s
}
