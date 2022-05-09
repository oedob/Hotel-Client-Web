<template>
  <div class="order-detail">
    <div class="header">
      <template v-if="orderState === 1">
        <div class="status green">
          <span>新订单</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <button class="refuse" v-on:click="_hotelCancel()">拒单</button>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li style="color: red">未支付</li>
          <li v-if="order.orderMoney">￥{{order.orderMoney}}</li>
        </ul>
      </template>
      <template v-else-if="orderState === 2">
        <div class="status green">
          <span>新订单</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <button class="refuse" v-on:click="_hotelCancel()">拒单</button>
            <button class="sure" v-on:click="_confirmCome()">确认入住</button>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li style="color: green">已支付</li>
          <li v-if="order.orderMoney">￥{{order.orderMoney}}</li>
        </ul>
      </template>
      <template v-else-if="orderState === 3">
        <div class="status gray">
          <span>已拒单</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已拒单</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>经收人: 当前商户</li>
          <li style="color: red">未支付</li>
          <li v-if="order.orderMoney">￥{{order.orderMoney}}</li>
        </ul>
      </template>
      <template v-else-if="orderState === 4">
        <div class="status gray">
          <span>已拒单</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已拒单</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>经收人: 当前商户</li>
          <li>全额退款</li>
        </ul>
      </template>
      <template v-else-if="orderState === 5">
        <div class="status gray">
          <span>已取消</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已取消</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>经收人: 当前商户</li>
          <li>已付: </li>
          <li>应退: </li>
          <li>实退: </li>
        </ul>
      </template>
      <template v-else-if="orderState === 6">
        <div class="status gray">
          <span>已取消</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已取消</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>客人取单</li>
        </ul>
      </template>
      <template v-else-if="orderState === 7">
        <div class="status gray">
          <span>已取消</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已取消</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>超时未支付系统自动取消</li>
        </ul>
      </template>
      <template v-else-if="orderState === 8">
        <div class="status red">
          <span style="font-size: 12px">取消申请</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <button class="agree" v-on:click="changeOrderState(306)">同意取消订单</button>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>已付: </li>
          <li>应退: </li>
        </ul>
      </template>
      <template v-else-if="orderState === 9">
        <div class="status blue">
          <span>已确认</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已确认</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>经手人: 当前商户</li>
          <li>已支付</li>
          <li v-if="order.orderMoney">￥{{order.orderMoney}}</li>
        </ul>
      </template>
      <template v-else-if="orderState === 10">
        <div class="status yellow">
          <span>退款中</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <button class="agree" v-on:click="changeOrderState(302)">同意退款请求</button>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>已付: </li>
          <li>应退: </li>
        </ul>
      </template>
      <template v-else-if="orderState === 11">
        <div class="status red">
          <span style="font-size: 12px">退款失败</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>退款失败</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>失败原因: </li>
        </ul>
      </template>
      <template v-else-if="orderState === 12">
        <div class="status blue">
          <span>已入住</span>
        </div>
        <div class="info">
          <span>订单号:{{order.orderNum}}</span>
          <span>预订时间 {{order.createTime | formatDate}}</span>
        </div>
        <div class="operation">
          <div class="operation-body">
            <span>已入住</span>
          </div>
          <button class="print">打印</button>
          <button class="back" v-on:click="back">返回上一页</button>
        </div>
        <ul>
          <li>经手人: 当前商户</li>
          <li>已支付</li>
          <li v-if="order.orderMoney">￥{{order.orderMoney}}</li>
        </ul>
      </template>
    </div>
    <div class="book-info">
      <header>预订信息</header>
      <ul>
        <li>酒店: {{order.hotelName}}</li>
        <li>房型: {{order.roomTypeName}}</li>
        <li>取消政策: {{hotelGoods.cancelStr}}</li>
        <li>入离日期: {{order.comeTime | formatDate}}至{{order.leaveTime | formatDate}}</li>
        <li>房间数: {{order.goodsNum}}</li>
        <li>预订人: {{order.nickName}}</li>
        <li>特殊要求: {{order.remark}}</li>
      </ul>
    </div>
    <div class="pay-info">
      <header>付款信息</header>
      <ul>
        <li>应收房价 ￥{{order.orderMoney}}</li>
        <li>实收预付 ￥{{order.actualMoney ? order.actualMoney : 0}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getOrderById, changeOrderState, hotelCancel, confirmCome } from '@/api/getData'
  import { formatDate } from '@/config/mUtils'

  export default {
    data () {
      return {
        order: {},
        roomType: {},
        hotelGoods: {}
      }
    },
    computed: {
      /**
       *  1 新订单未支付 2 新订单已支付 3 拒单未支付 4 客户支付取消并退款 5 客户已支付取消未退款 6 客户已支付取消已退款  7 超时取消 8 取消申请 9 已确认
       **/
      orderState () {
        let orderState = this.order.orderState
        let payState = this.order.payState
        if (orderState === 101) {
          return 1
        } else if (orderState === 201) {
          return 2
        } else if (orderState === 406 || orderState === 305) {
          return 3
        } else if ((orderState === 406 || orderState === 305) && payState === 1001) {
          return 4
        } else if (orderState === 302 || orderState === 303 || orderState === 304) {
          return 5
        } else if ((orderState === 302 || orderState === 303 || orderState === 304) && payState === 1) {
          return 6
        } else if (orderState === 405) {
          return 7
        } else if (orderState === 6 && payState === 2) {
          return 8
        } else if (orderState === 202) {
          return 9
        } else if (payState === 1002) {
          return 10
        } else if (payState === 4) {
          return 11
        } else if (orderState === 301) {
          return 12
        }
      }
    },
    methods: {
      setOrder (orderId) {
        getOrderById(orderId).then(res => {
          if (res.data.state === 1) {
            this.roomType = res.data.data.roomType
            this.hotelGoods = res.data.data.hotelGoods
            this.order = res.data.data
          } else {
            throw new Error(res.data.message)
          }
        })
      },
      changeOrderState (orderState) {
        changeOrderState(this.order.orderNum, orderState).then(res => {
          if (res.data.msg === 'success') {
            this.$message({
              type: 'success',
              message: '成功！'
            })
            this.order = res.data.data
          } else {
            this.$message({
              type: 'success',
              message: '失败！'
            })
          }
        })
      },
      back () {
        this.$router.push('orderList')
      },
      _hotelCancel () {
        hotelCancel(this.order.orderId, this.$store.state.user.nickName).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: '成功！'
            })
            this.setOrder(this.order.orderId)
          } else {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          }
        })
      },
      _confirmCome () {
        confirmCome(this.order.orderId, this.$store.state.user.nickName).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: '成功！'
            })
            this.setOrder(this.order.orderId)
          } else {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          }
        })
      }
    },
    filters: {
      formatDate (value) {
        if (value) {
          return formatDate(value, 'YYYY-MM-DD HH:MM:SS')
        } else {
          return ''
        }
      }
    },
    created () {
      if (this.$route.query.orderId) {
        this.setOrder(this.$route.query.orderId)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/mixin.less";

  .order-detail {
    padding: 40px 12px 80px 10px;
    border-radius: 5px;
    .header {
      position: relative;
      width: 100%;
      height: 100px;
      background-color: #fff;
      .status {
        position: absolute;
        top: 0;
        left: 0;
        .sc(14px, #fff);
        width: 0;
        height: 0;
        border-top: solid 60px;
        border-right: solid 60px transparent;
        span {
          display: block;
          width: 60px;
          height: 60px;
          position: absolute;
          left: 13px;
          top: -59px;
          transform: rotate(-45deg);
        }
      }
      .gray {
        border-top-color: rgb(178, 179, 180);
      }
      .green {
        border-top-color: rgb(0, 221, 0);
      }
      .blue {
        border-top-color: rgb(0, 145, 225);
      }
      .red {
        border-top-color: rgb(255, 0, 0);
      }
      .info {
        height: 50px;
        margin-left: 85px;
        line-height: 50px;
        .sc(14px, #000);
        font-weight: bold;
        & > span {
          margin-right: 30px;
        }
      }
      .operation {
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        margin-left: 85px;
        .operation-body {
          display: inline-block;
          span {
            .sc(30px, #000);
            font-weight: bold;
          }
        }
        button {
          height: 25px;
          line-height: 25px;
          text-align: center;
          .sc(14px, #fff);
          background-color: @theme-color;
          border-radius: 3px;
          &.print {
            width: 40px;
            margin-left: 25px;
          }
          &.back {
            width: 85px;
          }
          &.sure {
            width: 40px;
          }
          &.refuse {
            width: 40px;
            background-color: rgb(178, 179, 180);
          }
          &.agree {
            width: 90px;
          }
        }
      }
      & > ul {
        position: absolute;
        top: 0;
        .tb;
        right: 137px;
      }
    }
    .book-info, .pay-info {
      margin-top: 30px;
      padding: 15px 0 20px 45px;
      background-color: #fff;
      color: #4c4c4c;
      header {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
      ul {
        li {
          height: 35px;
          line-height: 35px;
          font-size: 14px;
        }
      }
    }
  }
</style>
