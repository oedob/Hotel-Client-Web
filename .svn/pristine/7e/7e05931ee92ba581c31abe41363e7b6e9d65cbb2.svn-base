<template>
  <div>
    <div class='zongtipingjia_wrapper'>
      <div class='zongtipingjia'>
        <span class='us_score'>
          <strong>{{zongfen.avgscore | formatFenshu}}</strong>分/
          <span class='zongfen'>5.0分</span>
        </span>
        <span class='us_pingjia'>体验非常好</span>
      </div>
      <div class='xiangxipingjia'>
        <ul class='each_score'
            v-if="zongfen">
          <li>卫生：<span class='single_score'>{{zongfen.avghealth | formatFenshu}}分</span></li>
          <li>环境：<span class='single_score'>{{zongfen.avgevn | formatFenshu}}分</span></li>
          <li>服务：<span class='single_score'>{{zongfen.avgservice | formatFenshu}}分</span></li>
          <li>设施：<span class='single_score'>{{zongfen.avgfacility | formatFenshu}}分</span></li>
        </ul>
      </div>
    </div>
    <div class='pinglunqu_wrapper'>
      <div class='pinglunqu_inbox'>
        <ul class='pinglun_menu'
            v-if="zongfen"
            id='pinlunList'>
          <li :class='{"xuanzhong": isAll}' @click='allFn'>全部<span class='number'>{{zongfen.alldata}}</span></li>
          <li :class='{"xuanzhong": huifu}' @click='noreplyFn(0)'>未回复<span class='number'>{{zongfen.noreply}}</span>
          </li>
          <li :class='{"xuanzhong": good}' @click='scorecount(0)'>好评<span class='number'>{{zongfen.goodcount}}</span>
          </li>
          <li :class='{"xuanzhong": middle}' @click='scorecount(1)'>中评<span class='number'>{{zongfen.midcount}}</span>
          </li>
          <li :class='{"xuanzhong": bad}' @click='scorecount(2)'>差评<span class='number'>{{zongfen.badcount}}</span></li>
          <li :class='{"xuanzhong": imgcla}' @click='noimg(1)'>有图<span class='number'>{{zongfen.noimg}}</span></li>
        </ul>
        <div class='pinglunqu_item'
             v-if='pinglunContent'
             v-for='(item,index) in pinglunContent'
             :key='index'>
          <div class='yonghu_wrapper'>
            <div class='yonghu'>
              <img class='touxiang'
                   :src="item.headIMG | allUrl"
              >
              <span class='name'>{{item.nickName}}</span>
            </div>
            <div class='datetime'>{{item.comeTime | formatTime}}~{{item.leaveTime | formatTime}}</div>
            <div class='goods'>{{item.goodsName}}</div>
          </div>
          <div class='pinglun_content'>
            <ul class='pingfen_menu'>
              <li class='fenshu'><big>{{item.score}}</big>分</li>
              <li class='fenshu'
                  v-if='item.healthScore'><span class='fenlei'>卫生：</span>{{item.healthScore}}分

              </li>
              <li class='fenshu'
                  v-if='item.evnScore'><span class='fenlei'>环境：</span>{{item.evnScore}}分

              </li>
              <li class='fenshu'
                  v-if='item.serviceScore'><span class='fenlei'>服务：</span>{{item.serviceScore}}分

              </li>
              <li class='fenshu'
                  v-if='item.facilityScore'><span class='fenlei'>设施：</span>{{item.facilityScore}}分

              </li>
            </ul>
            <div class='content'>
              <p class='text'>
                {{item.content}}
              </p>
              <div class='tupian_wrapper'>
                <img class='tupian'
                     style='width: 85px;height: 85px;'
                     v-for='itemimg in item.imgs'
                     :src='itemimg'/>
              </div>
              <div class='huifu_bz pinglun_time'>{{item.createTime | formatTime}}</div>
              <div class='huifu_content'
                   v-if='item.replayState === 1' >
                <p class='text'>
                  {{item.replayContent}}

                </p>
                <div class='huifu_bz who_huifu'>{{item.nickName}}         <span
                  class='huifu_time'>{{item.replayTime | formatTime}}</span>
                  <a class="a" href=" javascript:void(0)" @click="deleteHuifu(item.id)">&nbsp;&nbsp;删除</a><a
                    href=" javascript:void(0)" class="a" @click="editHuifu(item.id)">修改</a></div>
              </div>
              <div class='huifu' v-if='item.replayState === 0'>
                <input type='text'
                       ref='input'
                       v-model='item.replayContent'/>
                <button @click='huifuFn(item.id, item.replayContent)'>回复</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        class='fanye'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next, jumper"
        :page-count="pageCountDetail">
      </el-pagination>
    </div>
    <el-dialog title="修改回复内容" :visible.sync="dialogVisible">
      <el-input type='textarea' ref='input' v-model='editReply'></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button v-on:click="confirm" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    readMessage,
    getPingfenNUm,
    getAllPinglun,
    getReplystatusPinglun,
    getScorePinglun,
    getImgsPinglun,
    addReplay,
    deleteEvaluate,
    editPinglun
  } from '@/api/getData.js'
  import { formatDate } from '@/config/mUtils.js'
  import { imgUrl } from '@/config/env.js'
  export default {
    data () {
      return {
        type: '',
        message: '',
        ishuifuContent: false,
        userId: '',
        parentId: '',
        shopId: '',
        pageNum: 1,
        pageSize: 5,
        zongfen: '',
        replayContent: '',
        // zongfen: {
        //   avgscore: 0,
        //   avghealth: 0,
        //   avgevn: 0,
        //   avgservice: 0,
        //   avgfacility: 0
        // },
        pinglunContent: '',
        arrImg: [],
        huifuText: [],
        showContent: '',
        isAll: true,
        huifu: false,
        good: false,
        middle: false,
        bad: false,
        imgcla: false,
        huifuContent: '',
        currentPage: 1,
        pjfenleibiaoji: 0,
        dialogVisible: false,
        editReply: '',
        editId: ''
      }
    },
    filters: {
      formatTime: function (houtaiTime) {
        return formatDate(houtaiTime, 'MM-DD')
      },
      formatFenshu: function (value) {
        return ('' + value).substring(0, 3)
      },
      allUrl: function (value) {
        return imgUrl + value
      }
    },
    created () {
      this.shopId = this.$store.state.hotelId
      this.userId = this.$store.state.user.id
    },
    mounted: function () {
      this.$nextTick(() => {
        this.getValue()
        this.getZongfen()
        this.getAllPingJiaFn(this.shopId, this.pageNum, this.pageSize)
      })
    },
    methods: {
      getValue: function () {
        this.type = this.$route.query.badComm
        // console.log(this.type)
      },
      handleSizeChange: function (val) {
        // console.log('每页 ${val} 条');
        // console.log(val)
      },
      // 封装获取评价的方法
      // 获取全部
      getAllPingJiaFn: function (shopId, pageNum, pageSize) {
        getAllPinglun(shopId, pageNum, pageSize).then(res => {
          this.pinglunContent = res.data.data
          this.pageCountDetail = res.data.pageCount
          this.chaifenImg()
          console.log(res.data)
        })
      },
      // 获取其它(中差评)评论类别
      getScoreFn: function (shopId, pageNum, pageSize, num) {
        getScorePinglun(shopId, pageNum, pageSize, num).then(res => {
          this.pinglunContent = res.data.data
          this.pageCountDetail = res.data.pageCount
          // console.log()
          this.chaifenImg()
        })
      },
      // 获取其它(未回复)评论类别
      getNoreplyFn: function (shopId, pageNum, pageSize, num) {
        getReplystatusPinglun(shopId, pageNum, pageSize, num).then(res => {
          this.pinglunContent = res.data.data
          this.pageCountDetail = res.data.pageCount
          this.chaifenImg()
        })
      },
      // 获取其它（有图片）评论
      getHaveImgFn: function (shopId, pageNum, pageSize, num) {
        getImgsPinglun(shopId, pageNum, pageSize, num).then(res => {
          this.pinglunContent = res.data.data
          this.pageCountDetail = res.data.pageCount
          this.chaifenImg()
        })
      },
      // 点击页数进行切换
      handleCurrentChange: function (val) {
        // console.log('当前页: ${val}');
        this.pageNum = val
        if (this.pjfenleibiaoji === 0) {
          this.getAllPingJiaFn(this.shopId, val, this.pageSize)
        } else if (this.pjfenleibiaoji === 1) {
          this.getNoreplyFn(this.shopId, val, this.pageSize, 0)
        } else if (this.pjfenleibiaoji === 2) {
          this.getScoreFn(this.shopId, val, this.pageSize, 0)
        } else if (this.pjfenleibiaoji === 3) {
          this.getScoreFn(this.shopId, val, this.pageSize, 1)
        } else if (this.pjfenleibiaoji === 4) {
          this.getScoreFn(this.shopId, val, this.pageSize, 2)
        } else if (this.pjfenleibiaoji === 5) {
          this.getHaveImgFn(this.shopId, val, this.pageSize, 1)
        }
      },
      // 评论回复
      huifuFn: function (id, replayContent) {
        addReplay(id, this.shopId, replayContent).then(res => {
          this.getAllPingJiaFn(this.shopId, this.pageNum, this.pageSize)
        })
      },
      // 修改回复
      editHuifu: function (id) {
        this.dialogVisible = true
        this.editId = id
      },
      // 确认删除或取消按钮
      confirm: function () {
        let id = this.editId
        let updateId = this.$store.state.user.id
        editPinglun(id, updateId, this.editReply).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.editReply = ''
            this.dialogVisible = false
            this.getAllPingJiaFn(this.shopId, this.pageNum, this.pageSize)
          } else {
            this.$message({
              type: 'success',
              message: '修改回复失败'
            })
          }
        })
      },
      // 删除回复
      deleteHuifu: function (id) {
        deleteEvaluate(id).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getAllPingJiaFn(this.shopId, this.pageNum, this.pageSize)
          } else {
            this.$message({
              type: 'success',
              message: '删除失败'
            })
          }
        })
      },
      getZongfen: function () {
        getPingfenNUm(this.shopId).then(res => {
          this.zongfen = res.data.data
        })
      },
      // 点击全部
      allFn: function () {
        this.pjfenleibiaoji = 0
        this.chageColor()
        this.isAll = true
        this.getAllPingJiaFn(this.shopId, this.pageNum, this.pageSize)
      },
      // 点击未回复
      noreplyFn: function (num) {
        this.pjfenleibiaoji = 1
        this.chageColor()
        this.huifu = true
        this.getNoreplyFn(this.shopId, this.pageNum, this.pageSize, num)
      },
      // 点击中差评
      scorecount: function (num) {
        this.chageColor()
        if (num === 0) {
          this.pjfenleibiaoji = 2
          this.good = true
        } else if (num === 1) {
          this.pjfenleibiaoji = 3
          this.middle = true
        } else {
          this.pjfenleibiaoji = 4
          this.bad = true
        }
        this.getScoreFn(this.shopId, this.pageNum, this.pageSize, num)
      },
      // 点击有图片
      noimg: function (num) {
        this.pjfenleibiaoji = 5
        this.chageColor()
        this.imgcla = true
        this.getHaveImgFn(this.shopId, this.pageNum, this.pageSize, num)
      },
      // 把图片拆分成数组
      chaifenImg: function () {
        for (let i = 0; i < this.pinglunContent.length; i++) {
          if (this.pinglunContent[i].hasOwnProperty('imgs') && this.pinglunContent[i].imgs) {
            this.pinglunContent[i].imgs = this.pinglunContent[i].imgs.split(',')
          }
        }
      },
      // 改变导航的底部颜色
      chageColor: function () {
        this.isAll = false
        this.huifu = false
        this.good = false
        this.middle = false
        this.bad = false
        this.imgcla = false
      }
    },
    watch: {
      type: function () {
        readMessage(this.shopId, this.type).then(res => {})
      }
    }
  }
</script>
<style scoped>
  .zongtipingjia_wrapper {
    height: 100px;
    margin-bottom: 20px;
    font-size: 16px;
  }

  .zongtipingjia_wrapper, .pinglunqu_wrapper {
    width: 98%;
    min-width: 1100px;
    background-color: #fff;
  }

  .pinglunqu_wrapper .pinglunqu_inbox {
    margin: 0 34px;
  }

  .zongtipingjia_wrapper .zongtipingjia {
    float: left;
    height: 70px;
    margin: 15px 0 0 34px;
    line-height: 70px;
    border-right: 1px solid #b3b3b3;
  }

  .zongtipingjia_wrapper .us_score, .zongtipingjia_wrapper .single_score {
    color: #ffa200;
  }

  .zongtipingjia_wrapper .zongtipingjia strong {
    font-size: 36px;
  }

  .zongtipingjia_wrapper .zongtipingjia .zongfen, .zongtipingjia_wrapper .us_pingjia {
    color: #4c4c4c;
  }

  .zongtipingjia_wrapper .us_pingjia {
    margin: 0 27px;
    font-size: 24px;
  }

  .zongtipingjia_wrapper .xiangxipingjia {
    float: right;
  }

  .zongtipingjia_wrapper .xiangxipingjia ul {
    margin-right: 49px;
    font-size: 16px;
  }

  .zongtipingjia_wrapper .xiangxipingjia li {
    display: inline-block;
  }

  .zongtipingjia_wrapper .each_score li {
    height: 54px;
    line-height: 54px;
  }

  .zongtipingjia_wrapper .each_biaoqian li {
    width: 125px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #3797db;
    border: 1px solid #3797db;
    border-radius: 3px;
  }

  .zongtipingjia_wrapper .each_biaoqian li:last-child {
    color: #ffa200;
    border: 1px solid #ffa200;
  }

  .pinglunqu_wrapper .pinglun_menu {
    width: 70%;
    padding: 10px 0 30px 0;
  }

  .pinglunqu_wrapper .pinglun_menu li, .pinglunqu_wrapper .pinglunqu_item .fenshu, .pinglunqu_wrapper .content .tupian {
    display: inline-block;
  }

  .pinglunqu_wrapper .pinglun_menu li {
    height: 30px;
    margin-right: 50px;
    line-height: 30px;
    font-size: 16px;
    cursor: pointer;
  }

  .pinglunqu_wrapper .pinglunqu_item .pingfen_menu {
    margin-bottom: 10px;
  }

  .pinglunqu_wrapper .pinglunqu_item .fenshu {
    margin-right: 48px;
    color: #ffa200;
  }

  .pinglunqu_wrapper .pinglunqu_item .fenlei {
    color: #999;
  }

  .pinglunqu_wrapper .pinglun_menu .xuanzhong {
    color: #3797db;
    border-bottom: 2px solid #3797db;
  }

  .pinglunqu_wrapper .pinglunqu_item {
    display: flex;
    margin-bottom: 60px;
  }

  .pinglunqu_wrapper .yonghu_wrapper {
    flex: 0 0 150px;
    height: 100px;
    padding-right: 34px;
    border-right: 1px solid #b2b2b2;
  }

  .pinglunqu_wrapper .yonghu {
    margin-bottom: 8px;
  }

  .pinglunqu_wrapper .datetime, .pinglunqu_wrapper .goods {
    height: 25px;
    line-height: 25px;
    color: #3797db;
  }

  .pinglunqu_wrapper .touxiang {
    display: inline-block;
    width: 35px;
    height: 35px;
    margin-right: 14px;
    vertical-align: middle;
    background-color: #bebebe;
    border-radius: 50%;
  }

  .pinglunqu_wrapper .pinglun_content {
    flex: 1;
    padding-left: 30px;
  }

  .pinglunqu_wrapper .content .text {
    margin: 10px 0 11px 0;
  }

  .pinglunqu_wrapper .content .tupian_wrapper {
    font-size: 0;
    margin-bottom: 5px;
  }

  .pinglunqu_wrapper .content .tupian {
    width: 85px;
    height: 85px;
    margin-right: 25px;
    background-color: #bebebe;
  }

  .pinglunqu_wrapper .huifu_content, .pinglunqu_wrapper .content .huifu input {
    border: 1px solid #a0a0a0;
  }

  .pinglunqu_wrapper .huifu_content {
    margin: 10px 0;
    padding: 0 29px 0 17px;
    background-color: #eee;
  }

  .pinglunqu_wrapper .huifu_content .text {
    margin: 8px 0;
    line-height: 20px;
    color: #4c4c4c;
  }

  .pinglunqu_wrapper .content .huifu {
    position: relative;
    width: 80%;
    height: 35px;
    min-width: 730px;
  }

  .pinglunqu_wrapper .content .huifu_bz {
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
    color: #b2b2b2;
  }

  .pinglunqu_wrapper .content .huifu input {
    width: 100%;
    height: 35px;
  }

  .pinglunqu_wrapper .content .huifu button {
    position: absolute;
    top: 0;
    right: -1px;
    width: 85px;
    height: 37px;
    color: #fff;
    background-color: #3797db;
    border-radius: 3px;
  }

  .pinglunqu_wrapper .fanye {
    padding: 30px 15px 20px 0;
    text-align: right;
  }

  .a {
    display: block;
    float: right;
  }
</style>
