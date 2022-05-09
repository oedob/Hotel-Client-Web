import Vue from 'vue'
import Router from 'vue-router'
import APP from '@/App'

const Entrance = r => require.ensure([], () => r(require('@/pages/entrance/entrance')), 'entrance')
const Login = r => require.ensure([], () => r(require('@/pages/entrance/children/login')), 'entrance')
const Register = r => require.ensure([], () => r(require('@/pages/entrance/children/register')), 'entrance')
const Repassword = r => require.ensure([], () => r(require('@/pages/entrance/children/repassword')), 'entrance')
const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage')
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'manage')
const HotelInfo = r => require.ensure([], () => r(require('@/pages/hotelInfo/hotelInfo')), 'hotelInfo')
const BaseInfo = r => require.ensure([], () => r(require('@/pages/hotelInfo/children/baseInfo')), 'hotelInfo')
const RoomType = r => require.ensure([], () => r(require('@/pages/hotelInfo/children/roomType')), 'hotelInfo')
const Introduce = r => require.ensure([], () => r(require('@/pages/hotelInfo/children/introduce')), 'hotelInfo')
const HotelAlbum = r => require.ensure([], () => r(require('@/pages/hotelInfo/children/hotelAlbum')), 'hotelInfo')
const HotelPolicy = r => require.ensure([], () => r(require('@/pages/hotelInfo/children/hotelPolicy')), 'hotelInfo')
const HotelGoodsAdd = r => require.ensure([], () => r(require('@/pages/price/hotelGoodsAdd')), 'hotelGoodsAdd')
const HotelGoodsList = r => require.ensure([], () => r(require('@/pages/price/hotelGoodsList')), 'hotelGoodsList')
const OrderList = r => require.ensure([], () => r(require('@/pages/order/orderList')), 'order')
const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/orderDetail')), 'order')
const Caiwuguanli = r => require.ensure([], () => r(require('@/pages/finance/caiwuguanli.vue')), 'caiwuguanli')
// const ZhangdanDetail = r => require.ensure([], () => r(require('@/pages/finance/zhangdanDetail.vue')), 'zhangdanDetail')
const Pingjia = r => require.ensure([], () => r(require('@/pages/pingjia/pingjiaguanli.vue')), 'pingjia')
const Fangtai = r => require.ensure([], () => r(require('@/pages/fangtai/fangtaiguanli.vue')), 'fangtai')
const Aboutuser = r => require.ensure([], () => r(require('@/pages/aboutuser/tabs.vue')), 'aboutuser')

Vue.use(Router)

export default new Router({
  base: '/merchant/',
  routes: [
    {
      path: '/',
      component: APP,
      children: [
        {
          path: '',
          component: Entrance,
          children: [
            {
              path: 'login',
              component: Login
            },
            {
              path: 'register',
              component: Register
            },
            {
              path: 'repassword',
              component: Repassword
            }
          ]
        },
        {
          path: '/manage',
          component: manage,
          // meta: {requireAuth: true},
          children: [
            {
              path: 'home',
              component: Home
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'hotelGoodsList',
              component: HotelGoodsList
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'hotelGoodsAdd',
              component: HotelGoodsAdd
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'pingjia',
              component: Pingjia
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'fangtai',
              component: Fangtai
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'hotelInfo',
              component: HotelInfo,
              name: 'hotelInfo',
              // meta: {requireAuth: true},
              children: [
                {
                  path: 'baseInfo',
                  component: BaseInfo,
                  name: 'baseInfo'
                  // meta: {requireAuth: true}
                },
                {
                  path: 'roomType',
                  component: RoomType,
                  name: 'roomType'
                  // meta: {requireAuth: true, requireHotelId: true}
                },
                {
                  path: 'introduce',
                  component: Introduce,
                  name: 'introduce'
                  // meta: {requireAuth: true, requireHotelId: true}
                },
                {
                  path: 'hotelPolicy',
                  component: HotelPolicy,
                  name: 'hotelPolicy'
                  // meta: {requireAuth: true, requireHotelId: true}
                },
                {
                  path: 'hotelAlbum',
                  component: HotelAlbum,
                  name: 'hotelAlbum'
                  // meta: {requireAuth: true, requireHotelId: true}
                }
              ]
            },
            {
              path: 'aboutuser',
              component: Aboutuser
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'orderlist',
              component: OrderList
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'orderDetail',
              component: OrderDetail
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'hotelGoodsAdd',
              component: HotelGoodsAdd
              // meta: {requireAuth: true, requireHotelId: true}
            },
            {
              path: 'caiwuguanli',
              component: Caiwuguanli
              // meta: {requireAuth: true, requireHotelId: true}
            }
          ]
        }
      ]
    }
  ]
})
