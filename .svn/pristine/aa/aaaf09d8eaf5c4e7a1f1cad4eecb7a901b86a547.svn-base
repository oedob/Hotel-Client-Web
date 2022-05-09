/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 借助JSON进行对象深拷贝
 * */
export const jsonClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const fmtDate = (date) => {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
/**
 * 将后台的时间戳转化为
 * params: timeStamp(ms)后台返回的时间戳
 * */
export const formatDate = (timeStamp, format) => {
  let date = new Date(timeStamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  month = month < 10 ? ('0' + month) : month
  day = day < 10 ? ('0' + day) : day
  hour = hour < 10 ? ('0' + hour) : hour
  minutes = minutes < 10 ? ('0' + minutes) : minutes
  seconds = seconds < 10 ? ('0' + seconds) : seconds
  switch (format) {
    case 'YYYY-MM-DD HH:MM:SS':
      return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    case 'YYYY-MM-DD HH:MM':
      return `${year}-${month}-${day} ${hour}:${minutes}`
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'MM-DD':
      return `${month}-${day}`
    case 'MM月DD日 HH:MM':
      return `${month}月${day}日 ${hour}:${minutes}`
    case 'MM月DD日':
      return `${month}月${day}日`
    case 'HH:MM':
      return `${hour}:${minutes}`
    default:
      return {
        year,
        month,
        day,
        hour,
        minutes,
        seconds
      }
  }
}
// 将星期字符串转化为数字
export const transfToNumFn = (str) => {
  switch (str) {
    case '周一':
      return '1'
    case '周二':
      return '2'
    case '周三':
      return '3'
    case '周四':
      return '4'
    case '周五':
      return '5'
    case '周六':
      return '6'
    case '周日':
      return '7'
  }
}
// 将星期数字转化为字符串
export const transforStrFn = (n) => {
  switch (n) {
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    case 7:
      return '周日'
  }
}
