<template>
  <div class="hotel-info">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="酒店基本信息" name="baseInfo">
        <!-- <router-view v-if="activeName === 'baseInfo'"></router-view> -->
      </el-tab-pane>
      <el-tab-pane label="房型规格" name="roomType">
        <!-- <router-view v-if="activeName === 'roomType'"></router-view> -->
      </el-tab-pane>
      <el-tab-pane label="介绍/卖点" name="introduce">
        <!-- <router-view v-if="activeName === 'introduce'"></router-view> -->
      </el-tab-pane>
      <el-tab-pane label="酒店政策" name="hotelPolicy">
        <!-- <router-view v-if="activeName === 'hotelPolicy'"></router-view> -->
      </el-tab-pane>
      <el-tab-pane label="酒店相册" name="hotelAlbum">
        <!-- <router-view v-if="activeName === 'hotelAlbum'"></router-view> -->
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    watch: {
      linkName () {
        this.activeName = this.$route.name
      }
    },
    computed: {
      linkName () {
        return this.$route.name
      }
    },
    methods: {
      handleClick () {
        this.$router.push('/manage/hotelInfo/' + this.activeName)
      }
    },
    mounted () {
      this.activeName = this.$route.name
    }
  }
</script>

<style>
  .hotel-info {
    background-color: #fff;
    padding: 10px 10px 80px 10px;
    border-radius: 5px;
  }
</style>
