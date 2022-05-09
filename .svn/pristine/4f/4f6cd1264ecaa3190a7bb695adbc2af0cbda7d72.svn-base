<template>
  <div class="introduce">
    <header>介绍/卖点</header>
    <el-form :model="hotel" label-width="150px">
      <el-row>
        <el-col :span="20">
          <el-form-item label="酒店卖点">
            <el-input type="textarea" :rows="8" v-model="hotel.sellingPoint"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="酒店介绍">
            <el-input type="textarea" v-model="hotel.description" :rows="15"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <button class="submit" @click="submit" v-show="!nextFlag">提交</button>
    <button class="submit" @click="nextStep" v-show="nextFlag">下一步,添加酒店政策</button>
  </div>
</template>

<script>
  import {
    getHotelById,
    updateDescription
  } from '@/api/getData'
  export default {
    data () {
      return {
        hotel: {
          id: '',
          description: '',
          sellingPoint: '',
          updater: ''
        },
        nextFlag: false
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.hotel.id = this.$store.state.hotelId
        this.nextFlag = this.$route.query.flag
        this.hotel.updater = '某某'
        getHotelById(this.hotel.id).then((res) => {
          if (res.data.state === 1) {
            this.hotel.sellingPoint = res.data.data.hotel.sellingPoint
            this.hotel.description = res.data.data.hotel.description
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(e => console.log(e))
      },
      submit () {
        updateDescription(this.hotel).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.$router.push({path: 'hotelPolicy', query: {flag: true}})
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(e => console.log(e))
      },
      nextStep () {
        this.submit()
      }
    }
  }
</script>

<style lang="less">
  @import "../../../style/mixin.less";

  .introduce {
    header {
      line-height: 50px;
      .sc(20px, #4c4c4c);
      span.text {
        .sc(15px, #4c4c4c);
        span {
          color: red;
        }
      }
    }
    button.submit {
      display: block;
      margin: 0 auto;
      margin-top: 60px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: @theme-color;
      .sc(20px, #fff);
      text-align: center;
    }
  }
</style>
