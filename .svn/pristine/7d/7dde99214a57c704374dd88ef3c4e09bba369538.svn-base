<template>
  <div class="manage">
    <header-top></header-top>
    <el-row class="container">
      <el-col :span="3" class="navgation">
        <nav-bar></nav-bar>
      </el-col>
      <el-col :span="21" class="wrapper">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import headerTop from '@/components/header/header'
  import navBar from '@/components/nav/nav'

  export default {
    data () {
      return {}
    },
    components: {
      headerTop,
      navBar
    }
  }
</script>

<style lang="less">
  @import "../style/common.less";

  .manage {
    height: 100%;
    .container {
      height: 100%;
      .navgation {
        height: 100%;
      }
      .el-menu {
        height: 100%;
      }
      .wrapper {
        height: 100%;
        background-color: rgb(228, 228, 228);
        padding: 20px 20px 85px 20px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
  }

</style>

