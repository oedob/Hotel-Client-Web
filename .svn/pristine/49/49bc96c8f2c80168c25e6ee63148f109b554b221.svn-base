<template>
  <div class="header">
    <div class="logo">
      <span>{{hotelName}}</span>
    </div>
    <div class='dropdown-wrapper'>
      <div class="user">
        <el-dropdown @command="handleCommand" class="setting" trigger="hover">
          <span class="el-dropdown-link" style='width:100px;
            padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>
            <i class="iconfont-header">&#xe623;</i>
            {{nickName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='1'>用户信息</el-dropdown-item>
            <el-dropdown-item command='2'>修改密码</el-dropdown-item>
            <el-dropdown-item command='3'>消息提醒</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <a>
          <i class="iconfont-header">&#xe651;</i>
        </a>
        <a>
          <i class="iconfont-header">&#xe627;</i>
        </a> -->
      </div>
      <div class='info-tixin'>
        <el-popover
          ref="popover"
          placement="bottom-end"
          width="300"
          trigger="hover">
          <div class='btn-group'>
            <div v-if='totalNum!=0'>
              <span>新消息提醒</span>
              <el-button
                type="primary"
                v-if='allNotice.newOder>0'
                @click='toOrder(1)'
                >{{allNotice.newOder}}个新订单</el-button>
              <el-button
                type="danger"
                v-if='allNotice.badComm>0'
                @click='tobadComm(4)'
                >{{allNotice.badComm}}个差评</el-button>
              <el-button
                type="primary"
                v-if='allNotice.finance>0'
                @click='toFinan(5)'>{{allNotice.finance}}个财务通知</el-button>
              <el-button
                type="danger"
                v-if='allNotice.refund>0'
                @click='toRefund(2)'>{{allNotice.refund}}个退款申请</el-button>
              <el-button
                type="primary"
                v-if='allNotice.full>0'
                @click='toFull(6)'>{{allNotice.full}}个满房通知</el-button>
              <el-button
                type="info"
                v-if='allNotice.cancel>0'
                @click='toOrder(3)'>{{allNotice.cancel}}个取消订单</el-button>
            </div>
            <div v-else
                 style='width: 100px;margin: 0 auto;'>暂无新信息</div>
          </div>
        </el-popover>
        <div class='tixin-wrapper'>
          <el-badge :value="totalNum" style='margin-left: 15px;'>
            <i class="iconfont-header tixin" v-popover:popover>&#xe651;</i>
          </el-badge>
        </div>
      </div>
    <!-- <el-popover
      ref="message"
      placement="bottom"
      width="340"
      trigger="click">
      <img>
      <span>达西EB手机APP</span>
    </el-popover> -->
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import {getnewMsg, readMessage} from '@/api/getData.js'
  export default {
    data () {
      return {
        hotelName: '',
        shopId: '',
        allNotice: '',
        totalNum: '',
        jiangeTime: 0,
        fulltype: '',
        refund: ''
      }
    },
    computed: {
      nickName () {
        return this.$store.state.user.nickname
      }
    },
    created: function () {
      this.shopId = this.$store.state.hotelId
      let hotelName = this.$store.state.hotelName
      // console.log(hotelName)
      // console.log(this.shopId)
      this.hotelName = hotelName || '酒店运营管理平台'
      setInterval(() => {
        this.jiangeTime++
      }, 5000)
    },
    mounted: function () {
      this.$nextTick(() => {
        this.newMessage()
      })
    },
    methods: {
      newMessage: function () {
        getnewMsg(this.shopId).then(res => {
          this.allNotice = res.data.data
          this.totalNum = res.data.totalNum
        })
      },
      toOrder: function (order) {
        this.$router.push({path: '/manage/orderList', query: {order: order}})
      },
      toFinan: function (finan) {
        this.$router.push({path: '/manage/caiwuguanli', query: {finan: finan}})
      },
      toFull: function (full) {
        this.fulltype = full
      },
      tobadComm: function (badComm) {
        this.$router.push({path: '/manage/pingjia', query: {badComm: badComm}})
      },
      cancel: function (cancel) {
        this.$router.push({path: '/manage/orderList', query: {cancel: cancel}})
      },
      ...mapMutations([
        'LOGIN_OUT'
      ]),
      handleCommand (command) {
        if (command === 'loginOut') {
          this.LOGIN_OUT()
          this.$router.push('/login')
        } else {
          this.$router.push({path: '/manage/aboutuser', query: {num: command}})
        }
      }
    },
    watch: {
      jiangeTime: function () {
        this.newMessage()
      },
      fulltype: function () {
        readMessage(this.shopId, this.fulltype)
      },
      refund: function () {
        readMessage(this.shopId, this.refund)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/mixin.less";
  .header {
    height: 60px;
    padding-left: 50px;
    background-color: #0e6784;
    .slc(24px, 60px, #fff);
    .logo {
      float: left;
    }
    .dropdown-wrapper {
      float: right;
      display: flex;
      margin-right: 20px;
      .user {
        flex: 1;
        height: 60px;
        &:hover {
          background-color: #fff;
          color: #34A5e0;
        };
        .setting {
          /*width: 100px;*/
          height: 60px;
          text-align: center;
          .el-dropdown-link {
            .sc(24px, #fff);
              display: inline-block;
              width: 100%;
            &:hover {
              cursor: pointer;
              color: #34A5e0;
            }
          }
        }
      }
      .info-tixin {
        flex: 1;
        margin-right: 50px;
        &:hover {
          background-color: #fff;
          color: #34A5e0;
        };
        .tixin-wrapper {
          width: 60px;
          height: 60px;
          .tixin {
            display: block;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .btn-group {
    font-size: 20px;
    span {
      display: block;
      width: 100px;
      margin: 0 auto;
      line-height: 40px;
      color: #4c4c4c;
    }
    button {
      width: 45%;
      max-width: 180px;
      margin: 2%;
    }
  }
</style>
