<template>
  <div class="register-box">
    <div class="banner">
      <img src="../img/user.png">
    </div>
    <div class="register-body">
      <header>账号注册</header>
      <el-form :rules="rules" ref="registerForm" :model="registerForm">
        <el-form-item prop="phoneNum">
          <el-input placeholder="请输入手机号" v-model="registerForm.phoneNum">
            <template slot="prepend">
              <i class="iconfont-nav">&#xe623;</i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="validateCode">
          <el-input placeholder="请输入验证码" v-model="registerForm.validateCode">
            <template slot="prepend">
              <i class="iconfont-nav">&#xe614;</i>
            </template>
            <code-item slot="append" class="code-btn" :phoneNum="registerForm.phoneNum" isCodeRegister="true">
              获取动态密码
            </code-item>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="registerForm.password" type="password">
            <template slot="prepend">
              <i class="iconfont-nav">&#xe614;</i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input placeholder="请确认密码" v-model="registerForm.checkPass" type="password">
            <template slot="prepend">
              <i class="iconfont-nav">&#xe614;</i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <button class="sure-btn" v-on:click="_register('registerForm')">确认</button>
      <button class="fanhui-btn" @click="toLogin">返回</button>
    </div>
  </div>
</template>

<script>
  import codeItem from '@/components/code/code'
  import { register } from '@/api/getData'
  import { mapMutations } from 'vuex'

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
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'static',
        registerForm: {
          phoneNum: '',
          password: '',
          checkPass: '',
          validateCode: ''
        },
        rules: {
          phoneNum: [
            {validator: checkPhoneNum, trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          validateCode: [
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
    methods: {
      toLogin: function () {
        this.$router.push({path: '/login'})
      },
      ...mapMutations([
        'SET_USER',
        'SET_TOKEN',
        'SET_COUNT'
      ]),
      _register (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            register(this.registerForm.phoneNum, this.registerForm.validateCode, this.registerForm.password).then(res => {
              let data = res.data.data
              if (res.data.state === 1) {
                this.$message({
                  type: 'success',
                  message: '注册成功'
                })
                if (data) {
                  this.SET_USER(data)
                }
                if (res.data.token) {
                  this.SET_TOKEN(res.data.token)
                }
                this.SET_COUNT(0)
                this.$router.push({path: '/manage/hotelInfo/baseInfo'})
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/mixin";

  .register-box {
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
    .register-body {
      padding: 20px 35px;
      header {
        width: 100%;
        margin-bottom: 30px;
        .sc(20px, @theme-color);
        text-align: center;
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
