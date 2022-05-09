<template>
  <div class="wenda">
    <div class="title">
      <div class="title_text">问答</div>
      <div class="more">查看全部></div>
    </div>
    <ul>
      <li class="wenda_list">
        <div class="score_content">
          <p class="yonghuxinxi">
            <span class="username">F0038****</span>
            <span class="date">2017-10-20</span>
          </p>
          <div class="pingjia">
            请问酒店离成都奥特莱斯近不近，谢谢!

          </div>
          <div><input type="text" class="shuru"><span class="btn">回复</span></div>
        </div>
      </li>
    </ul>
    <div class="more_huifu">暂无待回复问答</div>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>
  .wenda {
    width: 530px;
    height: auto;
    margin: 40px 0;
    padding: 0 50px;
    background-color: #fff;
  }

  .wenda .title {
    height: 80px;
    line-height: 80px;
  }

  .wenda .title .title_text {
    float: left;
    font-size: 36px;
  }

  .wenda .title .more {
    float: right;
    font-size: 24px;
    color: #00bad6;
  }

  .wenda .wenda_list {
    display: flex;
    height: 220px;
    border-top: 1px solid #E4E2E2;
  }

  .wenda .yonghuxinxi {
    height: 35px;
    line-height: 35px;
    color: #b2b2b2;
  }

  .wenda .pingjia {
    line-height: 58px;
  }

  .wenda .shuru {
    width: 400px;
    height: 48px;
    line-height: 48px;
    vertical-align: top;
    border: 1px solid #3797DB;
  }

  .wenda .btn {
    display: inline-block;
    width: 100px;
    height: 50px;
    line-height: 52px;
    text-align: center;
    color: #fff;
    background-color: #3797DB;
  }

  .wenda .more_huifu {
    height: 75px;
    line-height: 75px;
    color: #888;
    text-align: center;
    border-top: 1px solid #B5B3B3;
  }
</style>
