<template>
  <div class='menu_wrapper'>
    <div class='mask'
         v-show='isHomeMask'>
    </div>
    <el-menu :default-active="defaultActive" background-color="#333" text-color="#fff" active-text-color="#3797db" router>
      <el-menu-item
        class='nav_wrapper'
        index="/manage/home">
        <div>
          <i class="iconfont-nav">&#xe604;</i>
          <span>首页</span>
        </div>
        <img  class='img_wrapper'
              v-show='isHome'
              @click.stop='homeNext'
              src="./4.png">
      </el-menu-item>
      <el-menu-item index="/manage/orderList">
        <i class="iconfont-nav">&#xe71e;</i>
        <span>订单管理</span>
      </el-menu-item>
      <el-menu-item
        class='nav_wrapper'
        index="/manage/fangtai">
       <div>
          <i class="iconfont-nav">&#xe70e;</i>
          <span>房态管理</span>
        </div>
        <img  class='img_wrapper'
              v-show='isRoomNum'
              @click.stop='roomNumNext'
              src="./3.png">
      </el-menu-item>
      <el-menu-item
        class='nav_wrapper'
        index="/manage/hotelGoodsList">
        <div>
          <i class="iconfont-nav">&#xe603;</i>
          <span>房价管理</span>
        </div>
        <img  class='img_wrapper'
              v-show='isRoomPrice'
              @click.stop='roomPriceNext'
              src="./2.png">
      </el-menu-item>
      <el-menu-item index="/manage/caiwuguanli">
        <i class="iconfont-nav">&#xe605;</i>
        <span>财务管理</span>
      </el-menu-item>
      <el-menu-item
        class='nav_wrapper'
        index="/manage/hotelInfo/baseInfo">
        <div>
          <i class="iconfont-nav">&#xe63e;</i>
          <span>酒店信息</span>
        </div>
        <img  class='img_wrapper'
              v-show='isHotel'
              @click.stop='hotelNext'
              src="./1.png">
      </el-menu-item>
      <el-menu-item>
        <i class="iconfont-nav">&#xe624;</i>
        <span>营销助手</span>
      </el-menu-item>
      <el-menu-item index="/manage/pingjia">
        <i class="iconfont-nav">&#xe613;</i>
        <span>评论管理</span>
      </el-menu-item>
      <el-menu-item>
        <span>酒+</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        lastOnlyTime: '',
        isHomeMask: false,
        isHotel: false,
        isRoomPrice: false,
        isRoomNum: false,
        isHome: false,
        status: 1,
        statu: ''
      }
    },
    created: function () {
      this.statu = this.$store.state.status
    },
    mounted: function () {
      this.$nextTick(() => {
        this.showMask()
        this.hiddenMask()
      })
    },
    methods: {
      ...mapMutations([
        'SET_STATUS'
      ]),
      showMask: function () {
        this.lastOnlyTime = this.$store.state.user.lastLoginTime
        if (!this.statu && !this.lastOnlyTime) {
          this.isHomeMask = true
          this.isHotel = true
          this.SET_STATUS(this.status)
        }
      },
      hiddenMask: function () {
        if (this.statu) {
          this.isHomeMask = false
          this.isHotel = false
        }
      },
      hotelNext: function () {
        this.isHotel = false
        this.isRoomPrice = true
      },
      roomPriceNext: function () {
        this.isRoomPrice = false
        this.isRoomNum = true
      },
      roomNumNext: function () {
        this.isRoomNum = false
        this.isHome = true
      },
      homeNext: function () {
        this.isHome = false
        this.isHomeMask = false
      }
    },
    computed: {
      defaultActive () {
        return this.$route.fullPath
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/mixin.less";

  .el-menu {
    height: 100%;
    li {
      height: 50px;
      line-height: 50px;
      i {
        margin-right: 10px;
        color: #fff;
      }
      &:hover {
        background-color: #1a1a1a;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          height: 100%;
          border-left: 5px @theme-color solid;
        }
      }
    }
  }
  .menu_wrapper {
    height: 100%;
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
    .nav_wrapper {
      position: relative;
      .img_wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
      }
    }
  }
</style>
