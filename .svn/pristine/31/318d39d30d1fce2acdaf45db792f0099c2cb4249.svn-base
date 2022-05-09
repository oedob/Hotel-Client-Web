<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    // created () {
    //   window.onbeforeunload = function () {
    //     //你想干的事,比如删localStorage
    //     // vuex-persistedstate默认会将所有的state保存在key为vuex的字符串中
    //     localStorage.removeItem('vuex')
    //     return '真的要关掉页面吗'
    //     //return "真的要关掉页面吗";
    //     //这一句如果写了，会弹窗提示是否要关掉页面，如果没这个需求，可以不写
    //   }
    // },
    mounted () {
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) {
          if (this.$store.state.user.id) {
            if (to.meta.requireHotelId) {
              if (this.$store.state.hotelId) {
                next()
              } else {
                this.$confirm('请先完善酒店信息!', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push('/manage/hotelInfo/baseInfo')
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  })
                })
              }
            } else {
              next()
            }
          } else {
            next({path: '/login'})
          }
        } else {
          next()
        }
      })
    }
  }
</script>

<style lang="less">
  @import "./style/common.less";
</style>
