<template>
  <div class="kefangpingjia">
    <div class="title">
      <div class="title_text">客房评价</div>
      <el-button type="text" class="more" v-on:click="seeMore()">查看全部></el-button>
    </div>
    <div class='pingjia_score'>
      <ul>
        <li>卫生
          <Star :size="36" :score="eva.avghealth" class="star"></Star>
        </li>
        <li>环境
          <Star :size="36" :score="eva.avgevn" class="star"></Star>
        </li>
        <li>服务
          <Star :size="36" :score="eva.avgservice" class="star"></Star>
        </li>
        <li>设施
          <Star :size="36" :score="eva.avgfacility" class="star"></Star>
        </li>
      </ul>
      <div class="score_out" v-if='eva.avgscore>0'>
        <div class='score_in'>
          <span class='num'>{{eva.avgscore.toFixed(1)}}</span>
          <span class='text'>{{pj}}</span>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="evaluate in evaluateList" class="pingjia_list">
        <div class="score_num">{{evaluate.score}}</div>
        <div class="score_content">
          <p class="yonghuxinxi">
            <span class="username">{{evaluate.nickName}}</span>
            <span class="date">{{evaluate.createTime}}</span>
          </p>
          <div class="pingjia">
            <p>{{evaluate.content}}</p>
            <div v-if="evaluate.arrayImgs" class='img_wrapper'>
              <img v-for="(img,index) in evaluate.arrayImgs" :src="img" v-show="index < 3"
                   style="width: 100px; height: 80px;">
              <span v-if="evaluate.arrayImgs.length>3">....</span>
            </div>
          </div>
          <div><input type="textarea" class="shuru" v-model="evaluate.reply"><span class="btn"
                                                                                   @click="fReply(evaluate.id,evaluate.reply)">回复</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Star from './star/star.vue'
  import { formatDate } from '@/config/mUtils'
  import {
    evaCount,
    searchEvaluate,
    addReplay
  } from '@/api/getData'
  export default {
    components: {
      Star
    },
    data () {
      return {
        eva: {
          avgscore: 4,
          avgservice: '',
          avgfacility: '',
          avgevn: '',
          avghealth: ''
        },
        evaluateList: [],
        arrayImgs: [],
        reply: '',
        replyStatus: 0
      }
    },
    created () {
      this.initData()
    },
    computed: {
      pj () {
        if (this.eva.avgscore >= 4) {
          return '好'
        } else if (this.eva.avgscore >= 3 && this.eva.avgscore < 4) {
          return '中'
        } else {
          return '差'
        }
      }
    },
    methods: {
      initData () {
        let shopId = this.$store.state.hotelId
        evaCount(shopId).then((res) => {
          if (res.data.state === 1) {
            if (res.data.data) {
              this.eva = res.data.data
            }
          }
        })
        this.getEvaluate(shopId, this.replyStatus)
      },
      getEvaluate (shopId, replyStatus) {
        searchEvaluate(shopId, 1, 50, replyStatus).then((res) => {
          if (res.data.state === 1) {
            this.evaluateList = res.data.data
            for (var i in this.evaluateList) {
              this.evaluateList[i].createTime = formatDate(this.evaluateList[i].createTime, 'YYYY-MM-DD')
            }
          }
        })
      },
      fReply (id, reply) {
        let shopId = this.$store.state.hotelId
        let userId = this.$store.state.id
        addReplay(id, userId, reply).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.getEvaluate(shopId, this.replyStatus)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      seeMore () {
        this.$router.push({path: 'Pingjia', query: {}})
      }
    }
  }
</script>
<style scoped>
  .kefangpingjia {
    width: 460px;
    margin: 40px 0;
    padding: 0 35px;
    background-color: #fff;
  }

  .kefangpingjia .title {
    height: 60px;
    line-height: 60px;
  }

  .kefangpingjia .pingjia_score {
    position: relative;
  }

  .kefangpingjia .pingjia_score .score_out {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 2;
    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    background-color: #ffa200;
    border-radius: 50%;
  }

  .kefangpingjia .pingjia_score .score_in {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
  }

  .kefangpingjia .pingjia_score .num {
    font-size: 30px;
  }

  .kefangpingjia .pingjia_score .text {
    display: block;
    font-size: 24px;
  }

  .kefangpingjia .title .title_text {
    float: left;
    font-size: 24px;
  }

  .kefangpingjia .title .more {
    float: right;
    font-size: 16px;
    color: #00bad6;
  }

  .kefangpingjia .star {
    display: inline-block;
    margin: 5px 0 5px 40px;
    vertical-align: middle;
  }

  .kefangpingjia .pingjia_list {
    display: flex;
    padding: 36px 0;
    border-top: 1px solid #E4E2E2;
  }

  .kefangpingjia .score_num {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    background-color: #ffa200;
    border-radius: 50%;
  }

  .kefangpingjia .score_content {
    flex: 1;
    font-size: 16px;
  }

  .kefangpingjia .yonghuxinxi {
    height: 35px;
    line-height: 35px;
    color: #b2b2b2;
  }

  .kefangpingjia .pingjia {
    margin-bottom: 16px;
  }

  .kefangpingjia .img_wrapper {
    margin: 15px 0 16px 0;
  }

  .kefangpingjia .shuru {
    width: 280px;
    height: 35px;
    line-height: 35px;
    vertical-align: top;
    border: 1px solid #3797DB;
  }

  .kefangpingjia .btn {
    display: inline-block;
    width: 70px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    color: #fff;
    background-color: #3797DB;
  }
</style>
