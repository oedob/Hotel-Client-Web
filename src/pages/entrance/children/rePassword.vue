<template>
  <div class="repassword-box">
    <div class="banner">
      <img src="../img/user.png">
    </div>
    <div class="repassword-body">
      <header>找回密码</header>
      <ul class="progress">
        <li :class="{current:currentStep>=1?true:false}">手机验证</li>
        <div class="triangle-right" :class="{current:currentStep>=1?true:false}"></div>
        <li :class="{current:currentStep>=2?true:false}">设置新密码</li>
        <div class="triangle-right" :class="{current:currentStep>=2?true:false}"></div>
        <li :class="{current:currentStep===3?true:false}">完成</li>
        <div class="triangle-right" :class="{current:currentStep===3?true:false}"></div>
      </ul>
      <template v-if="stepOne">
        <el-form :model="rePasswordForm">
          <el-form-item>
            <el-input placeholder="请输入手机号" v-model="rePasswordForm.phoneNum">
              <template slot="prepend">
                <i class="iconfont-nav">&#xe623;</i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入验证码" v-model="rePasswordForm.verificationCode">
              <template slot="prepend">
                <i class="iconfont-nav">&#xe614;</i>
              </template>
              <code-item slot="append" class="code-btn" :phoneNum="rePasswordForm.phoneNum" :isCodeRepassword="true">
                获取动态密码
              </code-item>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-else-if="stepTwo">
        <el-form :model="rePasswordForm" ref="rePasswordForm" :rules="rules">
          <el-form-item prop="phoneNum">
            <el-input placeholder="请输入手机号" v-model="rePasswordForm.phoneNum">
              <template slot="prepend">
                <i class="iconfont-nav">&#xe623;</i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="rePasswordForm.password">
              <template slot="prepend">
                <i class="iconfont-nav">&#xe614;</i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input placeholder="请确认密码" v-model="rePasswordForm.checkPass">
              <template slot="prepend">
                <i class="iconfont-nav">&#xe614;</i>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-else="">
        <p class="repassword-success">修改成功！</p>
      </template>
      <button class="sure-btn" v-on:click="nextStep('rePasswordForm')" v-if="stepOne || stepTwo">确认</button>
      <button class="fanhui-btn" @click="toLogin">返回</button>
    </div>
  </div>
</template>

<script>
  import codeItem from '@/components/code/code'
  import { updatePassword } from '@/api/getData'

  export default {
    data () {
      var checkPhoneNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        if (isNaN(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          if (value.toString().length !== 11) {
            callback(new Error('请输入11位手机号'))
          } else {
            callback()
          }
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.rePasswordForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        rePasswordForm: {
          phoneNum: '',
          verificationCode: '',
          password: '',
          checkPass: ''
        },
        currentStep: 1,
        rules: {
          phoneNum: [
            {validator: checkPhoneNum, trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          verificationCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      codeItem
    },
    computed: {
      stepOne () {
        return this.currentStep === 1
      },
      stepTwo () {
        return this.currentStep === 2
      }
    },
    methods: {
      toLogin: function () {
        this.$router.push({path: '/login'})
      },
      handleClick () {
      },
      nextStep (formName) {
        if (this.currentStep === 1) {
          if (this.rePasswordForm.phoneNum && this.rePasswordForm.verificationCode) {
            this.currentStep = 2
          }
        } else if (this.currentStep === 2) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              updatePassword(this.rePasswordForm.phoneNum, this.rePasswordForm.verificationCode, this.rePasswordForm.password).then(res => {
                if (res.data.state === 0) {
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  })
                } else {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.currentStep = 3
                  setTimeout(() => {
                    this.$router.push('/login')
                  }, 1000)
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '请完善表单',
                duration: 1000,
                position: 'bottom-right'
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/mixin";

  .repassword-box {
    width: 100%;
    background-color: #fff;
    .banner {
      position: relative;
      width: 100%;
      height: 100px;
      .bis('../pages/entrance/img/login-bg.png');
      img {
        .lr;
        width: 70px;
        height: 70px;
        bottom: -10px;
      }
    }
    .repassword-body {
      padding: 20px 35px;
      header {
        width: 100%;
        margin-bottom: 30px;
        .sc(20px, @theme-color);
        text-align: center;
      }
      ul {
        width: 100%;
        .fj();
        li {
          width: 74px;
          height: 30px;
          margin-bottom: 10px;
          line-height: 30px;
          .sc(14px, #fff);
          text-align: center;
          background-color: rgb(217, 217, 217);
          &:last-child {
            border-radius: 5px;
          }
          &.current {
            background-color: @theme-color;
          }
        }
        .triangle-right {
          width: 0;
          height: 0;
          margin-left: -15px;
          border-top: 15px solid transparent;
          border-left: 10px solid rgb(217, 217, 217);
          border-bottom: 15px solid transparent;
          &.current {
            border-left: 10px solid @theme-color;
          }
        }

      }
      p.repassword-success {
        height: 100px;
        line-height: 100px;
        width: 100%;
        text-align: center;
        color: @theme-color;
        font-size: 30px;
      }
      button {
        &.sure-btn {
          width: 280px;
          height: 40px;
          border-radius: 3px;
          .sc(20px, #fff);
          background-color: @theme-color;
        }
        &.fanhui-btn {
          width: 280px;
          height: 40px;
          margin-top: 10px;
          border-radius: 3px;
          .sc(20px, #fff);
          background-color: #ccc;
        }
        &.code-btn {
          width: 100px;
          height: 40px;
          color: #fff;
          background-color: @theme-color;
        }
      }
    }
  }
</style>
