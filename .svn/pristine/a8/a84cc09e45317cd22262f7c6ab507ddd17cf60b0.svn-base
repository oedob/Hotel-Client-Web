<template>
  <div class="hotel-policy">
    <header>酒店政策<span class="text">(<span>*</span>此为必填项)</span></header>
    <el-row>
      <el-form :model="hotelPolicy" :rules="rules" ref="hotelPolicy" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="最早入住时间">
              <el-select v-model="hotelPolicy.earliestCheckinTime">
                <el-option
                  v-for="item in times"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最晚离店时间">
              <el-select v-model="hotelPolicy.lastestLeaveTime">
                <el-option
                  v-for="item in times"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="早餐">
              <el-row>
                <el-col :span="17">
                  <el-radio-group v-model="hotelPolicy.breakfast">
                    <el-radio :label="2">点餐消费</el-radio>
                    <el-radio :label="0">不提供早餐</el-radio>
                    <el-radio :label="1">自助早餐</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="7">
                  <el-input v-model="hotelPolicy.breakfastFee" v-show="hotelPolicy.breakfast === 1">
                    <template slot="append">元/人</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="宠物携带">
              <el-row>
                <el-col :span="18">
                  <el-radio-group v-model="hotelPolicy.petBring">
                    <el-radio :label="2">免费</el-radio>
                    <el-radio :label="0">不可携带宠物</el-radio>
                    <el-radio :label="1">需收费</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="hotelPolicy.petFee" v-show="hotelPolicy.petBring === 1">
                    <template slot="append">元</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="信用卡">
              <el-radio-group v-model="hotelPolicy.creditCard">
                <el-radio :label="1">中国银联</el-radio>
                <el-radio :label="2">其他</el-radio>
                <el-radio :label="0">不支持信用卡</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="其他政策">
              <el-input type="textarea" v-model="hotelPolicy.otherPolicy" :rows="6"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-col>
        <button class="submit" @click="submitForm" v-show="!nextFlag">提交</button>
        <button class="submit" @click="nextStep" v-show="nextFlag">下一步,添加酒店图片</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getHotelPolicy,
    saveHotelPolicy
  } from '@/api/getData'
  export default {
    data () {
      return {
        hotelPolicy: {
          hotelId: '',
          earliestCheckinTime: '',
          lastestLeaveTime: '',
          breakfast: 0,
          breakfastFee: '',
          petBring: 0,
          petFee: '',
          creditCard: 0,
          otherCreditCard: '',
          otherPolicy: ''
        },
        times: [],
        nextFlag: false
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.nextFlag = this.$route.query.flag
        this.times = ['不限', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        this.hotelPolicy.hotelId = this.$store.state.hotelId
        getHotelPolicy(this.hotelPolicy.hotelId).then((res) => {
          if (res.data.state === 1) {
            this.hotelPolicy = res.data.data
          }
        }).catch(e => console.log(e))
      },
      submitForm () {
        delete this.hotelPolicy.createDate
        delete this.hotelPolicy.updateDate
        this.hotelPolicy.creator = this.$store.state.user.nickName
        this.hotelPolicy.updater = this.$store.state.user.nickName
        saveHotelPolicy(this.hotelPolicy).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push({path: 'hotelAlbum', query: {flag: true}})
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(e => console.log(e))
      },
      nextStep () {
        this.submitForm()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/mixin.less";

  .hotel-policy {
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
      border-radius: 3px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: @theme-color;
      .sc(20px, #fff);
      text-align: center;
    }
    #dd {
      height: 140px;
    }
  }
</style>
