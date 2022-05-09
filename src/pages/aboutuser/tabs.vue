<template>
  <div class='tabs_wrapper'>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name='1'>
        <p class='biaoti'>用户信息</p>
        <div class='change-avtar'>
          <el-upload
              class="avatar-uploader"
              :action="imgUploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="headImgUp"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus"></i>
          </el-upload>
          <div class='yonghu-info'>
            {{infoUser.nickname}}
            <p><span>手机：</span>{{infoUser.account}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name='2'>
        <p class='biaoti'>修改密码</p>
        <div  v-show='isChangePwd'
              class='change-pwd'>
          <el-radio v-model="radio" label="1">使用手机验证</el-radio>
          <el-radio v-model="radio" label="2">使用密码验证</el-radio>
          <div class='phone-yz'
               v-show='radio === "1"'>
            <el-input class='shuru'
                      placeholder="手机号"
                      :value="phonenum"
                      readonly>
              <template slot="prepend"><i class="iconfont-nav">&#xe623;</i></template>
            </el-input>
            <el-input class='shuru'
                      placeholder="动态密码"
                      v-model="changePwd2">
              <template slot="prepend"><i class="iconfont-nav">&#xe614;</i></template>
              <el-button slot="append"
                         @click='getPhoneCode'>获取动态密码</el-button>
            </el-input>
            <el-input class='shuru'
                      placeholder="设置新密码"
                      v-model="changePwd3">
              <template slot="prepend"><i class="iconfont-nav">&#xe614;</i></template>
            </el-input>
            <button class='btn btn-tijiao'
                    @click='changePwdPhone'>提交</button>
          </div>
          <div class='pwd-yz'
               v-show='radio === "2"'>
            <el-input class='shuru'
                      placeholder="原密码"
                      v-model="changePhoneOld">
              <template slot="prepend"><i class="iconfont-nav">&#xe623;</i></template>
            </el-input>
            <el-input class='shuru'
                      placeholder="设置新密码"
                      v-model="changePhoneNew">
              <template slot="prepend"><i class="iconfont-nav">&#xe614;</i></template>
            </el-input>
            <button class='btn btn-tijiao'
                    @click='changePwd'>提交</button>
          </div>
        </div>
        <div v-show='pwdSuccess'
             class='chengepwd-success'>
          <div class='success-tishi'><i class="el-icon-circle-check"></i>新密码设置成功</div>
          <div class='infomation'>账号：<span>{{phonenum}}</span></div>
          <div class='infomation'>密码：
          <span v-if='changePwd3'>{{changePwd3}}</span>
          <span v-else>{{changePhoneNew}}</span></div>
          <button class='btn success-btn-tijiao'
                  @click='reLogin'>重新登陆</button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息提醒" name='3'>
        <p class='biaoti'>消息提醒设置</p>
        <div class='tixin-set'>
          <div class='new-order'>
            <span class='info-fenlei'>新订单提醒: </span>
            <el-checkbox-group
              class='info-list'
              v-model="newOrderMsgs">
              <el-checkbox v-for='(item,index) in tixin_info'
                           :key='index'
                           :label="item">
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class='tuikuan'>
            <span class='info-fenlei'>退款提醒: </span>
            <el-checkbox-group
              class='info-list'
              v-model="refundMsgs">
              <el-checkbox v-for='(item,index) in tixin_info'
                           :key='index'
                           :label="item">
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class='qudan'>
            <span class='info-fenlei'>取单提醒: </span>
            <el-checkbox-group
              class='info-list'
              v-model="cancelOrderMsgs">
              <el-checkbox v-for='(item,index) in tixin_info'
                           :key='index'
                           :label="item">
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class='chapin'>
            <span class='info-fenlei'>差评提醒: </span>
            <el-checkbox-group
              class='info-list'
              v-model="badCommentMsgs">
              <el-checkbox v-for='(item,index) in tixin_info'
                           :key='index'
                           :label="item">
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class='cwapin'>
            <span class='info-fenlei'>财务提醒: </span>
            <el-checkbox-group
              class='info-list'
              v-model="financialMsgs">
              <el-checkbox v-for='(item,index) in tixin_info'
                           :key='index'
                           :label="item">
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class='cwapin'>
            <span class='info-fenlei'>满房提醒: </span>
            <el-checkbox-group
              class='info-list'
              v-model="fullRoomMsgs">
              <el-checkbox v-for='(item,index) in tixin_info'
                           :key='index'
                           :label="item">
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <p class='biaoti'>消息接收设置</p>
        <form class='jieshou-set'>
          <span class='must'
                ref='must'
                v-show='ismustPhone'>*</span>手机号： <input type="number" v-model="messagePhone" />
          <span style='margin-left: 50px;'>
          <span class='must'
                ref='must'
                v-show='ismustEmail'>*</span>邮箱： <input type="email" v-model="messageEmail" /></span>
          <p>前台电话： <input type="number" v-model="messageTel" placeholder="028-12345678" /></p>
        </form>
        <div class='save-wrapper'>
        <button class='btn'
                @click='saveSet'>提交</button></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {imgUploadUrl, imgUrl} from '@/config/env'
  import {
    infoByUserId,
    sendUpdatePasswordCode,
    updatePwdPhone,
    updatePwd,
    setHeadImg,
    getmessageSet,
    saveOrUpdate
  } from '@/api/getData.js'
  export default {
    data () {
      return {
        activeName: '',
        infoUser: {},
        imgUploadUrl,
        // imgAvatarUrl: 'http://119.23.242.151:7080/hotel-web/upload/saveImg',
        imageUrl: '',
        changePhone1: '',
        changePhone2: '',
        radio: '1',
        changePwd2: '',
        changePwd3: '',
        changePhoneOld: '',
        changePhoneNew: '',
        messageinfo: '',
        isChangePwd: true,
        pwdSuccess: false,
        ismustPhone: false,
        ismustEmail: false,
        tixin_info: ['站内提醒', '短信通知', '邮件通知', '电话通知'],
        tishiList: {},
        newOrderMsgs: [],
        refundMsgs: [],
        cancelOrderMsgs: [],
        badCommentMsgs: [],
        financialMsgs: [],
        fullRoomMsgs: [],
        phonenum: '',
        shopId: '',
        messagePhone: '',
        messageEmail: '',
        messageTel: '',
        id: ''
      }
    },
    created: function () {
      this.phonenum = this.$store.state.user.phoneNum
      this.shopId = this.$store.state.hotelId
      this.id = this.$store.state.user.id
    },
    mounted: function () {
      this.$nextTick(() => {
        this.getactive()
        this.getinfoByUserId()
        this.getmessageinfo()
      })
    },
    methods: {
      reLogin: function () {
        this.$router.push('/login')
      },
      getactive: function () {
        this.activeName = this.$route.query.num
      },
      getinfoByUserId: function () {
        infoByUserId(this.id).then(res => {
          this.infoUser = res.data.data
          this.imageUrl = imgUrl + this.infoUser.headImg
        })
      },
      saveSet: function () {
        this.saveeverSetFn(this.newOrderMsgs)
        this.saveeverSetFn(this.refundMsgs)
        this.saveeverSetFn(this.cancelOrderMsgs)
        this.saveeverSetFn(this.badCommentMsgs)
        this.saveeverSetFn(this.financialMsgs)
        this.saveeverSetFn(this.fullRoomMsgs)
        saveOrUpdate(this.shopId, this.messagePhone, this.messageEmail, this.messageTel, this.newOrderMsgs, this.refundMsgs, this.cancelOrderMsgs, this.badCommentMsgs, this.financialMsgs, this.fullRoomMsgs
          ).then(res => {
            if (res.data.state === 1) {
              this.$message({
                type: 'success',
                message: '发送成功'
              })
              this.getmessageinfo()
            }
          })
      },
      handleAvatarSuccess: function (res, file) {
        this.imageUrl = res.imgUrl
        // console.log(this.imageUrl)
        let sentPathImg = this.imageUrl.slice(26)
        setHeadImg(this.id, sentPathImg).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
        })
      },
      beforeAvatarUpload: function (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      getmessageinfo: function () {
        getmessageSet(this.shopId).then(res => {
          this.tishiList = res.data.data
          this.messagePhone = this.tishiList.messagePhone
          this.messageEmail = this.tishiList.messageEmail
          this.messageTel = this.tishiList.messageTel
          if (this.tishiList.hasOwnProperty('newOrderMsgs')) {
            this.newOrderMsgs = this.tishiList.newOrderMsgs
            this.geteverSetFn(this.newOrderMsgs)
          }
          if (this.tishiList.hasOwnProperty('refundMsgs')) {
            this.refundMsgs = this.tishiList.refundMsgs
            this.geteverSetFn(this.refundMsgs)
          }
          if (this.tishiList.hasOwnProperty('cancelOrderMsgs')) {
            this.cancelOrderMsgs = this.tishiList.cancelOrderMsgs
            this.geteverSetFn(this.cancelOrderMsgs)
          }
          if (this.tishiList.hasOwnProperty('badCommentMsgs')) {
            this.badCommentMsgs = this.tishiList.badCommentMsgs
            this.geteverSetFn(this.badCommentMsgs)
          }
          if (this.tishiList.hasOwnProperty('financialMsgs')) {
            this.financialMsgs = this.tishiList.financialMsgs
            this.geteverSetFn(this.financialMsgs)
          }
          if (this.tishiList.hasOwnProperty('fullRoomMsgs')) {
            this.fullRoomMsgs = this.tishiList.fullRoomMsgs
            this.geteverSetFn(this.fullRoomMsgs)
          }
        })
      },
      // 获取用户的分类消息提醒
      geteverSetFn: function (element) {
        if (element) {
          for (var i = 0; i < element.length; i++) {
            element[i] = this.transfTostrFn(element[i])
          }
        }
      },
      // 保存用户的分类消息提醒
      saveeverSetFn: function (element) {
        if (element) {
          for (var i = 0; i < element.length; i++) {
            element[i] = this.transfToNumFn(element[i])
          }
        }
      },
      // 把提醒数字转换为需要的字符
      transfTostrFn: function (n) {
        switch (n) {
          case '1':
            return '站内提醒'
          case '2':
            return '短信通知'
          case '3':
            return '邮件通知'
          case '4':
            return '电话通知'
        }
      },
      // 把提醒字符转换为数字
      transfToNumFn: function (n) {
        switch (n) {
          case '站内提醒':
            return '1'
          case '短信通知':
            return '2'
          case '邮件通知':
            return '3'
          case '电话通知':
            return '4'
        }
      },
      getPhoneCode: function () {
        sendUpdatePasswordCode(this.phonenum).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '发送失败'
            })
          }
        })
      },
      changePwdPhone: function () {
        updatePwdPhone(this.phonenum, this.changePwd3, this.changePwd2).then(res => {
          if (res.data.state === 1) {
            this.isChangePwd = false
            this.pwdSuccess = true
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      },
      changePwd: function () {
        updatePwd(this.phonenum, this.changePhoneNew, this.changePhoneOld).then(res => {
          if (res.data.state === 1) {
            this.isChangePwd = false
            this.pwdSuccess = true
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      },
      getFile: function () {
        // console.log(this.$refs.file.files)
      },
      handleClick: function (tab, event) {
        // console.log(tab, event)
      }
    }
  }
</script>
<style scoped>
  .tabs_wrapper {
    height: 100vh;
    padding: 0 20px;
    background-color: #fff;
  }
  .tabs_wrapper .biaoti {
    margin: 10px 20px;
  }
  .tabs_wrapper .change-avtar {
    display: flex;
    width: 40%;
    margin: 10vh auto 0 auto;
  }
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-plus {
    display: block;
    font-size: 28px;
    /*color: #8c939d;*/
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border-radius: 50%;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tabs_wrapper .yonghu-info {
    flex: 1;
    margin: 50px 0 0 20px;
  }
  .tabs_wrapper .yonghu-info p {
    height: 35px;
    line-height: 35px;
    font-size: 18px;
  }
  .tabs_wrapper .change-pwd {
    width: 30%;
    max-width: 300px;
    margin: 10vh auto 0 auto;
  }
  .tabs_wrapper .chengepwd-success {
    width: 20%;
    max-width: 200px;
    margin: 18vh auto 0 auto;
  }
  .tabs_wrapper .shuru {
    margin: 15px 0;
  }
  .tabs_wrapper h3 {
    font-weight: normal;
    margin-bottom: 15px;
  }
  .tabs_wrapper .btn {
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #fff;
    background-color: #3897D8;
  }
  .tabs_wrapper .btn-tijiao {
    margin-top: 15px;
  }
  .tabs_wrapper .change-phone button {
    color: #fff;
    background-color: #3897D8;
  }
  .tabs_wrapper .chengepwd-success .success-tishi {
    font-size: 18px;
    color: #00c007;
    text-align: center;
  }
  .tabs_wrapper .chengepwd-success .success-tishi i {
    margin-right: 8px;
    font-size: 25px;
    vertical-align: middle;
  }
  .tabs_wrapper .chengepwd-success .infomation {
    height: 40px;
    line-height: 40px;
    color: #ACABAB;
    text-align: center;
  }
  .tabs_wrapper .chengepwd-success .infomation span {
    color: #222;
  }
  .tabs_wrapper .stopZhanghu {
    position: relative;
    margin-top: 30px;
  }
  .tabs_wrapper .stopZhanghu .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .tabs_wrapper .tixin-set, .tabs_wrapper .jieshou-set  {
    width: 60%;
    margin: 0 auto;
  }
  .tabs_wrapper .info-fenlei {
    display: inline-block;
    width: 100px;
    height: 40px;
    margin-right: 10px;
    line-height: 40px;
    text-align: right;
  }
  .tabs_wrapper .info-list {
    display: inline-block;
  }
  .jieshou-set input {
    width: 200px;
    height: 30px;
    margin: 10px 0;
    padding-left: 5px;
    border: 1px solid #BABABA;
    border-radius: 4px;
  }
  .tabs_wrapper .save-wrapper {
    width: 20%;
    max-width: 200px;
    margin: 40px auto;
  }
</style>
