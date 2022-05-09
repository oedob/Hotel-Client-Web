<template>
  <div class="login-box">
    <div class="banner">
      <img src="../img/user.png">
    </div>
    <div class="login-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="static">
          <el-form :model="loginForm" class="login_wrapper" :rules="rules" ref="loginForm">
            <el-form-item prop="phoneNum">
              <el-input placeholder="请输入手机号" v-model="loginForm.phoneNum">
                <template slot="prepend">
                  <i class="iconfont-nav">&#xe623;</i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="loginForm.password" type="password">
                <template slot="prepend">
                  <i class="iconfont-nav">&#xe614;</i>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <span class="msg"
                style='font-size: 13px;'>{{errorMsg}}</span>
          <button class="login-btn" v-on:click="_login('loginForm')">{{loginText}}</button>
          <button class="register-btn" v-on:click="register">申请加盟</button>
          <div class="extend">
            <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
            <a v-on:click="repassword">忘记密码？</a>
          </div>
        </el-tab-pane>
        <el-tab-pane label="手机动态密码登录" name="dynamic">
          <el-form :model="loginFormByCode" :rules="rules" ref="loginFormByCode">
            <el-form-item prop="phoneNum">
              <el-input placeholder="请输入手机号" v-model="loginFormByCode.phoneNum">
                <template slot="prepend">
                  <i class="iconfont-nav">&#xe623;</i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="validateCode">
              <el-input placeholder="请输入验证码" v-model="loginFormByCode.validateCode">
                <template slot="prepend">
                  <i class="iconfont-nav">&#xe614;</i>
                </template>
                <code-item slot="append" class="code-btn" :phoneNum="loginFormByCode.phoneNum" code
                           :isCodeDeynamicLogin="true">
                  获取动态密码

                </code-item>
              </el-input>
            </el-form-item>
          </el-form>
          <button class="login-btn" v-on:click="_loginByCode('loginFormByCode')">{{loginText}}</button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { login, checkOwnerId, loginByCode } from '@/api/getData'
  import { mapMutations } from 'vuex'
  import codeItem from '@/components/code/code'

  export default {
    data () {
      var checkPhoneNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          callback()
        }
        // if (isNaN(value)) {
        //   callback(new Error('请输入正确的手机号'))
        // } else {
        //   if (value.toString().length !== 11) {
        //     callback(new Error('请输入11位手机号'))
        //   } else {
        //     callback()
        //   }
        // }
      }
      return {
        activeName: 'static',
        loginText: '登录',
        loginForm: {
          phoneNum: '',
          password: ''
        },
        loginFormByCode: {
          phoneNum: '',
          validateCode: ''
        },
        errorMsg: '',
        keepPassword: false,
        rules: {
          phoneNum: [
            {validator: checkPhoneNum, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          validateCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      codeItem
    },
    methods: {
      ...mapMutations([
        'SET_USER',
        'SET_TOKEN',
        'SET_HOTELID',
        'SET_COUNT',
        'HOTEL_NAME'
      ]),
      _login (formName) {
        if (this.loginForm.phoneNum === '' || this.loginForm.password === '') {
          return false
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              login(this.loginForm.phoneNum, this.loginForm.password).then(res => {
                if (res.data.state === 1) {
                  this.loginText = '登录中...'
                  let data = res.data.data
                  if (data) {
                    this.SET_USER(data)
                  }
                  if (res.data.token) {
                    this.SET_TOKEN(res.data.token)
                  }
                  this._checkOwnerId(this.$store.state.user.id)
                } else {
                  this.loginText = '登录'
                  this.errorMsg = res.data.message
                  setTimeout(() => {
                    this.errorMsg = ''
                  }, 1000)
                }
              })
            } else {
              return false
            }
          })
        }
      },
      _loginByCode (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            loginByCode(this.loginFormByCode.phoneNum, this.loginFormByCode.validateCode).then(res => {
              let data = res.data.data
              if (res.data.state === 1) {
                this.loginText = '登录中...'
                if (data.info) {
                  let user = JSON.parse(data.info.replace('\\', ''))
                  this.SET_USER(user)
                }
                if (data.token) {
                  this.SET_TOKEN(data.token)
                }
                this._checkOwnerId(this.$store.state.user.id)
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message
                })
                this.loginText = '登录'
                this.errorMsg = res.data.message
                setTimeout(() => {
                  this.errorMsg = ''
                }, 1000)
              }
            })
          } else {
            return false
          }
        })
      },
      _checkOwnerId (ownerId) {
        checkOwnerId(ownerId).then(res => {
          let data = res.data.data
          if (res.data.state === 1) {
            this.SET_HOTELID(data.hotelId)
            this.SET_COUNT(data.count)
            this.HOTEL_NAME(data.hotelName)
            if (data.count === 0) {
              this.$router.push({path: '/manage/hotelInfo/baseInfo'})
            } else {
              this.$router.push('/manage/home')
            }
          } else {
            this.$router.push({path: '/manage/hotelInfo/baseInfo'})
          }
        })
      },
      register () {
        this.$router.push('register')
      },
      repassword () {
        this.$router.push('repassword')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/mixin";

  .login-box {
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
    .login-body {
      padding: 20px 35px;
      font-size: 0;
      .login_wrapper {
        margin-bottom: -20px;
      }
      .msg {
        display: block;
        width: 100%;
        height: 25px;
        line-height: 25px;
        /*margin-top: -20px;*/
        /*margin-bottom: 5px;*/
        text-align: center;
        .sc(12px, red)
      }
      button {
        &.login-btn {
          width: 100%;
          height: 40px;
          border-radius: 3px;
          .sc(20px, #fff);
          background-color: @theme-color;
        }
        &.register-btn {
          width: 100%;
          height: 40px;
          border-radius: 3px;
          .sc(20px, #fff);
          margin-top: 15px;
          background-color: rgb(255, 130, 42);
        }
        &.code-btn {
          width: 100px;
          height: 40px;
          color: #fff;
          background-color: @theme-color;
        }
      }
      .extend {
        width: 100%;
        margin-top: 15px;
        .sc(14px, #919191);
        .el-radio {
          float: left;
        }
        a {
          float: right;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }


</style>
