import {setStore, removeStore} from '@/config/mUtils'

const SET_USER = 'SET_USER'
const SET_TOKEN = 'SET_TOKEN'
const LOGIN_OUT = 'LOGIN_OUT'
const SET_HOTELID = 'SET_HOTELID'
const SET_COUNT = 'SET_COUNT'
const SET_STATUS = 'SET_STATUS'
const OLD_ADDRESS = 'OLD_ADDRESS'
const HOTEL_NAME = 'HOTEL_NAME'

export default {
  // 设置当前登录用户
  [SET_USER] (state, user) {
    state.user = {...user}
    setStore('user', user)
  },
  // 设置token
  [SET_TOKEN] (state, token) {
    state.token = token
    setStore('token', token)
  },
  // 设置count
  [SET_COUNT] (state, count) {
    state.count = count
  },
  // 设置token
  [SET_HOTELID] (state, hotelId) {
    state.hotelId = hotelId
  },
  // 设置状态
  [SET_STATUS] (state, status) {
    state.status = status
  },
  // 存储上一次的地址
  [OLD_ADDRESS] (state, oldaddress) {
    state.oldaddress = oldaddress
  },
  // 储存酒店名称
  [HOTEL_NAME] (state, hotelName) {
    state.hotelName = hotelName
  },
  // 退出登录
  [LOGIN_OUT] (state) {
    state.token = ''
    state.hotelId = ''
    state.hotelName = ''
    state.status = ''
    state.user = {}
    removeStore('token')
    removeStore('hotelId')
    removeStore('hotelName')
    removeStore('user')
  }
}
