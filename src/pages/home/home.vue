<template>
  <div class="home">
    <Contactkefu></Contactkefu>
    <Today></Today>
    <div class="wrapper">
      <div class="home_left">
        <Xitonggonggao></Xitonggonggao>
        <Kefangpingjia></Kefangpingjia>
      </div>
      <div class="home_right">
        <Dingdan></Dingdan>
      </div>
    </div>
  </div>
</template>

<script>
  import Contactkefu from './children/contactkefu.vue'
  import Today from './children/today.vue'
  import Xitonggonggao from './children/xitonggonggao.vue'
  import Kefangpingjia from './children/kefangpingjia.vue'
  import Dingdan from './children/dingdan.vue'
  export default {
    components: {
      Contactkefu,
      Today,
      Xitonggonggao,
      Kefangpingjia,
      Dingdan
    }
  }
</script>

<style scoped>
  .home {
    width: 96%;
    margin: 0 auto;
  }
  .wrapper {
    width: 1100px;
    margin: -18px;
    margin: 0 auto;
  }
  .home .home_left {
    float: left;
  }
  .home .home_right {
    float: right;
    /*margin-left: 40px;*/
  }
</style>
