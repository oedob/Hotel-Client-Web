<template>
  <div class="entrance">
    <div class="bg">
      <img src="./img/bg.jpg"/>
    </div>
    <div class="footer">
      <div class="msg">
        <div class="header">
          <img src="./img/msg.png">
          <header>消息通知</header>
        </div>
        <ul>
          <li>批量修改房价房态功能上线</li>
          <li>我们的EB修改了一个NB的名字</li>
        </ul>
      </div>
      <div class="service">
        <div class="header">
          <img src="./img/tel.png">
          <header>服务电话：028-12345678</header>
        </div>
        <ul>
          <li>订单问题处理：7*24小时</li>
          <li>对账结算：工作日9:00~18:00</li>
          <li>业务加盟：7*24小时</li>
          <li>系统使用：每天9:00~21:00</li>
        </ul>
      </div>
    </div>
    <div class="box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @import "../../style/mixin";

  .entrance {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .bg {
      width: 100%;
      img {
        width: 100%;
        height: auto;
        max-height: 750px;
      }
    }
    .footer {
      min-width: 1440px;
      height: 160px;
      padding: 10px 90px;
      header {
        margin-left: 55px;
        .sc(20px, @theme-color)
      }
      li {
        margin-top: 10px;
        .sc(16px, #4b4b4b)
      }
      img {
        float: left;
        width: 40px;
        height: 40px;
      }
      .header {
        height: 50px;
        line-height: 50px;
      }
      ul {
        margin-left: 55px;
      }
      .msg {
        float: left;
      }
      .service {
        float: right;
        ul {
          width: 700px;
          li {
            display: inline-block;
            width: 300px;
            text-align: left;
          }
        }
      }
    }
    .box {
      position: absolute;
      top: 100px;
      right: 200px;
      width: 350px;
      height: 460px;
      border-radius: 3px;
    }
  }
</style>
