import axios from 'axios'
var qs = require('qs')

// axios 配置
axios.defaults.baseURL = 'http://120.55.49.68:8085'
// 评论
// axios.defaults.baseURL = '120.55.49.68:9090'
// axios.defaults.withCredentials = true
// axios.interceptors.request.use(addBankDat
//   config => {
//     if (store.state.token) {
//       config.headers.Authorization = store.state.token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )
//
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   err => {
//     if (err.response) {
//       switch (err.response.status) {
//         case 401:
//           // 401 清除token信息并跳转到登录页面
//           store.commit('LOGIN_OUT')
//           router.replace({
//             path: 'entrance',
//             query: {redirect: router.currentRoute.fullPath}
//           })
//       }
//     }
//   }
// )
/**
 * 用户登录
 * */
export const login = (phoneNum, Password) => axios.get('/member-web/user/login', {params: {phoneNum, Password}})
/**
 用户动态登录
 */
export const loginByCode = (phoneNum, validateCode) => axios.get('/member-web/user/loginByCode', {params: {phoneNum, validateCode}})
/**
 * 用户注册
 * */
export const register = (phoneNum, validateCode, password) => axios.post('/member-web/user/register', qs.stringify({
  phoneNum,
  validateCode,
  password
}))

/**
 * 根据userId获取账号信息
 * */
export const infoByUserId = (userId) => axios.post('/member-web/user/infoByUserId', qs.stringify({userId}))

/**
 * 用户相关中修改密码（通过手机验证码）
 * */
export const updatePwdPhone = (phoneNum, password, verificationCode) => axios.post('/member-web/user/updatePassword', qs.stringify({phoneNum, password, verificationCode}))

/**
 * 用户相关中修改密码
 * */
export const updatePwd = (phoneNum, password, oldPwd) => axios.post('/member-web/user/updatePasswordByOldPwd', qs.stringify({phoneNum, password, oldPwd}))

/**
 * 用户头像修改
 * */
export const setHeadImg = (id, headImg) => axios.post('/member-web/user/setHeadImg', qs.stringify({id, headImg}))

/**
*获取用户酒店消息设置
*/
export const getmessageSet = (shopId) => axios.post('/message/list', qs.stringify({shopId}))

/**
*保存用户的消息提醒设置
*/
export const saveOrUpdate = (shopId, messagePhone, messageEmail, messageTel, newOrderMsgs, refundMsgs, cancelOrderMsgs, badCommentMsgs, financialMsgs, fullRoomMsgs) => axios.post('/message/saveOrUpdate', qs.stringify({
  shopId,
  messagePhone,
  messageEmail,
  messageTel,
  newOrderMsgs,
  refundMsgs,
  cancelOrderMsgs,
  badCommentMsgs,
  financialMsgs,
  fullRoomMsgs
}))

/**
 * 获取酒店提醒
 * */

export const getnewMsg = (shopId) => axios.post('/message/newMsg', qs.stringify({shopId}))

/**
 * 点击消息消除提醒数目
 * */

export const readMessage = (shopId, type) => axios.post('/message/readMessage', qs.stringify({shopId, type}))

/**
 * 查询用户下是否有酒店
 * */

export const checkOwnerId = (ownerId) => axios.post('/hotel/checkOwnerId', qs.stringify({ownerId}))
/**
 * 获取验证码
 * params:{phoneNum:用户电话}
 */
export const identifyCode = (phoneNum) => axios.post('/member-web/user/sendRegisterCode', qs.stringify({phoneNum}))

/**
 * 获取设施服务选项
 */
export const getHotelServeList = () => axios.post('/hotelServe/getList')

/**
 * 获取省份列表
 */
export const getProvinceList = () => axios.post('/hotel/getProvinceList')

/**
 * 获取城市列表
 */
export const getCityList = (provinceId) => axios.post('/hotel/getCityList', qs.stringify({provinceId}))

/**
 * 获取地区列表
 */
export const getAreaList = (cityId) => axios.post('/hotel/getAreaList', qs.stringify({cityId}))

/**
 * 获取酒店信息
 */
export const getHotelById = (id, i) => axios.post('/hotel/toView', qs.stringify({id, i}))

/**
 * 酒店注册
 */
export const hotelRegister = (hotel) => axios.post('/hotel/saveOrUpdate', hotel)

/**
 * 更新酒店服务
 */
export const updateHoterServe = (hotelServe) => axios.post('/hotelServe/update', hotelServe)

/**
 * 更新酒店信息
 */
export const updateHotel = (hotel) => axios.post('/hotel/saveOrUpdate', hotel)

/**
 * 获取订单列表
 */
export const getOrderList = (orderState, shopId, startTime, endTime, orderNum, contactMobile, handleMan, checkinPerson, pageNum, pageSize) => axios.post('/order/orderList', qs.stringify({
  orderState,
  shopId,
  startTime,
  endTime,
  orderNum,
  contactMobile,
  handleMan,
  checkinPerson,
  pageNum,
  pageSize
}))

/**
 * 获取订单状态列表
 */
export const getOrderStatusList = () => axios.get('/order/orderLabel')

/**
 * 根据订单ID获取订单详情
 */
export const getOrderById = (orderId) => axios.post('/order/toViewOrder', qs.stringify({orderId}))

/**
 * 获取酒店下所有房型
 */
export const getRoomType = (hotelId) => axios.post('/roomType/getRoomType', qs.stringify({hotelId}))

/**
 * 获取酒店下所有房型
 */
export const deleteRoomType = (id) => axios.post('/roomType/del', qs.stringify({id}))

/**
 * 获取房型详情
 */
export const toRoomTypeView = (id) => axios.post('/roomType/toView', qs.stringify({id}))

/**
 * 获取床型列表
 */
export const getbedType = () => axios.post('/roomType/getSelectList')

/**
 * 上传图片
 */
export const uploadImg = (headImgUp, config) => axios.post('/upload/saveImg', headImgUp, config)

/**
 * 新增或修改房型
 */
export const saveOrUpdateRoomType = (roomtype) => axios.post('/roomType/saveOrUpdate', roomtype)

/**
 * 新增房型房型
 */
export const saveRoomType = (roomtype) => axios.post('/roomType/saveOrUpdate', roomtype)

/**
 * 更新酒店卖点
 */
export const updateDescription = (hotel) => axios.post('/hotel/saveOrUpdateDescription', hotel)

/**
 * 获取酒店政策信息
 */
export const getHotelPolicy = (hotelId) => axios.post('/hotelPolicy/toView', qs.stringify({hotelId}))

/**
 * 保存酒店政策信息
 */
export const saveHotelPolicy = (hotelPolicy) => axios.post('/hotelPolicy/saveOrUpdate', hotelPolicy)

/**
 * 获取酒店下房型列表
 */
export const getRoomtypeList = (hotelId) => axios.post('/roomType/getRoomType', qs.stringify({hotelId}))

/**
 * 新增售卖
 */
export const addHotelGoods = (hotelGoods) => axios.post('/hotelGoods/saveOrUpdate', hotelGoods)

/**
 * 修改列表封面
 */
export const editCoverImg = (hotelId, coverImg, updater) => axios.post('/hotel/editCoverImg', qs.stringify({
  hotelId,
  coverImg,
  updater
}))

/**
 * 修改详情封面图
 */
export const editDetailImg = (hotelId, detailImg, updater) => axios.post('/hotel/editDetailImg', qs.stringify({
  hotelId,
  detailImg,
  updater
}))

/**
 * 修改酒店相册
 */
export const editAlbum = (hotelId, album, updater) => axios.post('/hotel/editAlbum', qs.stringify({
  hotelId,
  album,
  updater
}))

/**
 * 修改房型相册
 */
export const editRoomTypeAlbum = (roomTypeId, imgs, updater) => axios.post('/roomType/editAlbum', qs.stringify({
  roomTypeId,
  imgs,
  updater
}))

/**
 * 根据地址获取坐标
 */
export const getLocation = (city, address) => axios.post('/hotel/parseAddress', qs.stringify({city, address}))

/**
 * 修改订单状态
 */
export const changeOrderState = (orderNum, state) => axios.post('/order/orderState', qs.stringify({
  orderNum,
  state
}))

/**
 * 获取房价管理列表数据
 */
export const getPriceInfo = (hotelId, time) => axios.post('/priceRule/getPriceInfo', qs.stringify({
  hotelId,
  time
}))

/**
 * 获取房态管理列表数据
 */
export const getStockInfo = (hotelId, time) => axios.post('/stockRule/getStockInfo', qs.stringify({
  hotelId,
  time
}))
// 删除酒店商品
export const delGoods = (id) => axios.post('/hotelGoods/del', qs.stringify({id}))
/**
 * 修改房价
 */
export const chuanruPrice = (goodId, startTime, price, type) => axios.post('/priceRule/saveOrUpdate', qs.stringify({
  goodId,
  startTime,
  price,
  type
}))

/**
 * 获取房间库存
 */
export const chuanruStock = (roomtypeId, startTime, stock, type) => axios.post('/stockRule/saveOrUpdate', qs.stringify({
  roomtypeId,
  startTime,
  stock,
  type
}))

/**
 *获取全部评论
 */
export const getAllPinglun = (shopId, pageNum, pageSize) => axios.post('/evaluate/searchEvaluate', qs.stringify({
  shopId,
  pageNum,
  pageSize
}))

/**
 *获取好评/中评/差评
 */
export const getScorePinglun = (shopId, pageNum, pageSize, score) => axios.post('/evaluate/searchEvaluate', qs.stringify({
  shopId,
  pageNum,
  pageSize,
  score
}))

/***
 *获取未回复/已回复评论
 */
export const getReplystatusPinglun = (shopId, pageNum, pageSize, replyStatus) => axios.post('/evaluate/searchEvaluate', qs.stringify({
  shopId,
  pageNum,
  pageSize,
  replyStatus
}))

/**
 *获取有图片评论
 */
export const getImgsPinglun = (shopId, pageNum, pageSize, imgs) => axios.post('/evaluate/searchEvaluate', qs.stringify({
  shopId,
  pageNum,
  pageSize,
  imgs
}))

/**
*获取评论平均星级及评论数量
*/
export const getPingfenNUm = (shopId) => axios.post('/evaluate/evaCount', qs.stringify({shopId}))

/**
 *添加回复
 */
export const addReplay = (id, createrId, content, imgs) => axios.post('/evaluate/saveOrUpdateRely', qs.stringify({
  id,
  createrId,
  content,
  imgs
}))

/**
 *获取批量酒店商品
 */
export const plhotelTree = (id) => axios.get('/priceRule/getInfoTree', {params: {id}})

/**
 *财务管理
 */
export const caiwuGuanli = (sellerId, pageNum, pageSize) => axios.post('/finance/search', qs.stringify({
  sellerId,
  pageNum,
  pageSize
}))

/**
 *获取银行卡列表
 */
export const getBankData = () => axios.get('/account/bankData')

/**
 *添加账户
 */
export const addBankData = (id, creatorId, shopId, payMode, accountName, accountNum, depositBank, subBank, bankCode) => axios.post('/account/saveOrUpdate', qs.stringify({
  id,
  creatorId,
  shopId,
  payMode,
  accountName,
  accountNum,
  depositBank,
  subBank,
  bankCode
}))

/**
 *获取银行卡账户
 */
export const findAccount = (shopId) => axios.post('/account/findAccount', qs.stringify({shopId}))

/**
 *财务详情
 */
export const caiwuDetail = (id, pageNum, pageSize) => axios.post('/finance/billDetail', qs.stringify({
  id,
  pageNum,
  pageSize
}))

/**
 *批量修改酒店商品价格
 */
export const plChangePrice = (data) => axios.post('/priceRule/batchEditPrice', data)

/**
 *框选修改酒店商品价格
 */
export const kxChangePrice = (data) => axios.post('/priceRule/EditPrice', data)

/**
 *框选修改酒店商品价格
 */
export const kxChangeStock = (data) => axios.post('/stockRule/EditStock', data)

/**
 *批量修改酒店库存
 */
export const plChangeStock = (data) => axios.post('/stockRule/batchEditStock', data)

/**
 *批量修改库存发送起止时间
 */
export const plStockDate = (beginDate, endDate, roomTypeIdList) => axios.post('/stockRule/getWeekMinStock', qs.stringify({
  beginDate,
  endDate,
  roomTypeIdList
}))
/**
 *图片删除
 */
export const deleteImg = (url, id) => axios.get('/roomType/delPicture', {params: {url, id}})
/**
 *修改封面
 */
export const changeCover = (id, url) => axios.get('/roomType/changeCover', {params: {id, url}})

/**
 *删除评论
 */
export const deleteEvaluate = (id) => axios.get('/evaluate/del', {params: {id}})

/**
 *修改评论
 */
export const editPinglun = (id, updateId, content) => axios.get('/evaluate/saveOrUpdateRely', {
  params: {
    id,
    updateId,
    content
  }
})

/**
 *今日关注
 */
export const todayAccess = (resourceId, resourceType) => axios.get('/hotel/selectTotalAccess', {
  params: {
    resourceId,
    resourceType
  }
})
/**
 *动态密码登录
 */
export const loginByCodeB = (phoneNum, validateCode) => axios.get('member-web/user/loginByCodeB', {
  params: {
    phoneNum,
    validateCode
  }
})

/**
 *获取动态密码
 */
export const sendLoginCode = (phoneNum) => axios.get('member-web/user/sendLoginCode', {params: {phoneNum}})

/**
 *批量修改房价
 */
export const plChangPrice = (id) => axios.get('/priceRule/getInfoTree', {params: {id}})

/**
 *获取评论星级
 */
export const evaCount = (shopId) => axios.get('/evaluate/evaCount', {params: {shopId}})

/**
 *获取待处理订单
 */
export const susOrder = (shopId) => axios.get('/order/susOrder', {params: {shopId}})

/**
 *获取评论
 */
export const searchEvaluate = (shopId, pageNum, pageSize, replyStatus) => axios.get('/evaluate/searchEvaluate', {
  params: {
    shopId,
    pageNum,
    pageSize,
    replyStatus
  }
})

/**
 *退款
 */
export const refund = (orderId) => axios.get('/order/refund', {params: {orderId}})

/**
 *统计酒店订单信息
 */
export const getOrderCount = (shopId) => axios.get('/order/dailylOrder', {params: {shopId}})

/**
 *获取满房时间
 */
export const getFullTime = (shopId) => axios.get('/hotel/isFullRoom', {params: {shopId}})
/**
 * 用户修改密码
 * */
export const updatePassword = (phoneNum, verificationCode, password) => axios.post('/member-web/user/updatePassword', qs.stringify({
  phoneNum,
  verificationCode,
  password
}))
/**
 * 获取修改密码验证码
 * params:{phoneNum:用户电话}
 */
export const sendUpdatePasswordCode = (phoneNum) => axios.post('/member-web/user/sendUpdatePasswordCode', qs.stringify({phoneNum}))
/**
 * 更新酒店服务
 */
export const parseHoterServe = (hotelServe) => axios.post('/hotelServe/parseStr', hotelServe)

/**
 * 确认入住
 */
export const confirmCome = (orderId, handleMan) => axios.post('/order/confirmCheckIn', qs.stringify({
  orderId,
  handleMan
}))

/**
 * 商家取消订单未支付
 */
export const hotelCancel = (orderId, handleMan) => axios.post('/order/hotelCancel', qs.stringify({
  orderId,
  handleMan
}))
