<template>
  <div class="hotel-goods-add">
    <header>新增售卖规则<span class="text">(<span>*</span>此为必填项)</span></header>
    <el-form :model="hotelGoods" :rules="rules" ref="hotelGoods" label-width="150px" :inline="true">
      <el-row>
        <el-col :span="20">
          <el-form-item prop="roomtypeId" label="基础房型">
            <el-select v-model="hotelGoods.roomtypeId" @change="change">
              <el-option
                v-for="item in roomtypeList"
                :key="item.id"
                :label="item.apartmentName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="description" label="售卖描述">
            <el-input type="textarea" v-model="hotelGoods.description" autosize placeholder="60字以内，非必填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="breakfast" label="是否含早">
            <el-radio-group v-model="hotelGoods.breakfast">
              <el-radio :label="1">双早</el-radio>
              <el-radio :label="2">单早</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="cancel" label="取消政策">
            <el-radio-group v-model="hotelGoods.cancel">
              <el-radio :label="1">随时</el-radio>
              <el-radio :label="0">不能取消</el-radio>
              <el-radio :label="2">入住前</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="hotelGoods.cancelTime" v-show="hotelGoods.cancel === 2">
              <template slot="append">小时可取消</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="confirm" label="确认时间">
            <el-radio-group v-model="hotelGoods.confirm">
              <el-radio :label="1">付款自动确认</el-radio>
              <el-radio :label="2">30分钟内确认</el-radio>
              <el-radio :label="0">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="hotelGoods.confirmTime" v-show="hotelGoods.confirm === 0">
              <template slot="append">小时内确认</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="separe"></div>
      <div class="biaoti">价格信息</div>
      <el-row v-show="hotelGoods.special === 0">
        <el-col :span="8">
          <el-form-item label="适用时间">
            <el-radio-group v-model="type">
              <el-radio :label="'1'">所有日期</el-radio>
              <!-- <el-radio :label="'2'">按星期</el-radio> -->
              <el-radio :label="'3'">按时间段</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div v-show="type === '3'">
            <el-row>
              <el-col :span="15"
                      style="position: relative;">
                  <el-date-picker
                      style='height: 40px;margin-bottom: 8px;'
                      v-for="(item,index) in qzdateArr"
                      :key="index"
                      v-model="item.qzdatetime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                  <span class='add' style='position: absolute;top: 0;right: -50px;'>
                    <i class="el-icon-circle-plus-outline"
                       @click="addDate"></i>
                  </span>
              </el-col>
              <el-col :span="1">
                <span v-for="(item,redindex) in qzdateArr.length">
                  <i  v-if="redindex>0"
                      class="el-icon-remove-outline"
                      style="margin-left: 20px;"
                      @click="redDate(redindex)"></i>
                  <i  v-else></i>
                </span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop='checkWeeks' label="适用星期">
            <el-checkbox-group
              v-model="hotelGoods.checkWeeks">
              <el-checkbox
                v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- <el-form-item label="适用星期">
            <el-checkbox-group
                v-model="checkWeeks">
              <el-checkbox
                v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="price" label="执行价格">
              <input v-model="hotelGoods.price">元/间夜
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
    <el-row>
      <el-col>
        <button class="submit" @click="submitForm('hotelGoods')">提交</button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    getRoomtypeList,
    addHotelGoods
  } from '@/api/getData'
  const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    data () {
      return {
        qzdateArr: [],
        weeks: weekOptions,
        times: [],
        // checkWeeks: [],
        hotelGoods: {
          hotelId: '',
          id: '',
          // goodsName: '',
          roomtypeId: '',
          description: '',
          breakfast: '',
          cancel: '',
          cancelTime: '',
          confirm: '',
          confirmTime: '',
          price: '',
          checkWeeks: [],
          type: '',
          basicPrice: '',
          creator: '',
          special: 0,
          priceRuleList: []
        },
        startTime: '',
        endTime: '',
        type: '1',
        cooperateType: 0,
        brokerage: '',
        brokerageProportion: '',
        ruleData: [{
          weekStart: 1,
          week: '星期一',
          price: '',
          basicPrice: ''
        }, {
          weekStart: 2,
          week: '星期二',
          price: '',
          basicPrice: ''
        }, {
          weekStart: 3,
          week: '星期三',
          price: '',
          basicPrice: ''
        }, {
          weekStart: 4,
          week: '星期四',
          price: '',
          basicPrice: ''
        }, {
          weekStart: 5,
          week: '星期五',
          price: '',
          basicPrice: ''
        }, {
          weekStart: 6,
          week: '星期六',
          price: '',
          basicPrice: ''
        }, {
          weekStart: 7,
          week: '星期日',
          price: '',
          basicPrice: ''
        }],
        rules: {
          roomtypeId: [
            {required: true, message: '请选择房型', trigger: 'blur'}
          ],
          // goodsName: [
          //   {required: true, message: '请输入商品名称', trigger: 'blur'}
          // ],
          breakfast: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          cancel: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          confirm: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          checkWeeks: [
            {type: 'array', required: true, message: '请输入至少一个星期', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入执行价格', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          special: [
            {required: true, message: '请选择', trigger: 'blur'}
          ]
        },
        roomtypeList: []
      }
    },
    created () {
      this.initData()
      this.qzdateArr = [
        {qzdatetime: ''}
      ]
    },
    methods: {
      addDate: function () {
        this.qzdateArr.push({qzdatetime: ''})
      },
      redDate: function (redindex) {
        this.qzdateArr.splice(redindex, 1)
      },
      initData () {
        this.hotelGoods.hotelId = this.$store.state.hotelId
        this.hotelGoods.creator = this.$store.state.user.nickName
        getRoomtypeList(this.hotelGoods.hotelId).then((res) => {
          if (res.data.state === 1) {
            this.roomtypeList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: '获取失败'
            })
          }
        }).catch(e => console.log(e))
      },
      transfToNumFn: function (n) {
        switch (n) {
          case '周一':
            return '1'
          case '周二':
            return '2'
          case '周三':
            return '3'
          case '周四':
            return '4'
          case '周五':
            return '5'
          case '周六':
            return '6'
          case '周日':
            return '7'
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.type !== '2' && this.hotelGoods.price === '') {
              this.$message({
                type: 'error',
                message: '请输入价格'
              })
              return
            }
            let map = {}
            if (this.hotelGoods.special === 0) {
              if (this.type === '3') {
                for (let i = 0; i < this.qzdateArr.length; i++) {
                  let time = {
                    start: Date.parse(this.qzdateArr[i].qzdatetime[0]),
                    end: Date.parse(this.qzdateArr[i].qzdatetime[1])
                  }
                  this.times.push(time)
                }
                map.price = this.hotelGoods.price
                for (let j = 0; j < this.hotelGoods.checkWeeks.length; j++) {
                  this.hotelGoods.checkWeeks[j] = this.transfToNumFn(this.hotelGoods.checkWeeks[j])
                }
                map.weeks = this.hotelGoods.checkWeeks.join('')
                map.times = this.times
                map.rtype = this.type
                this.hotelGoods.map = map
              } else {
                map.price = this.hotelGoods.price
                for (let j = 0; j < this.hotelGoods.checkWeeks.length; j++) {
                  this.hotelGoods.checkWeeks[j] = this.transfToNumFn(this.hotelGoods.checkWeeks[j])
                }
                map.weeks = this.hotelGoods.checkWeeks.join('')
                // map.times = this.times
                map.rtype = this.type
                this.hotelGoods.map = map
              }
            } else {
              this.type = '1'
              map.rtype = this.type
              this.hotelGoods.map = map
            }
            // if (!this.checkWeeks.length) {
            //   this.$notify.error({
            //     title: '错误',
            //     message: '请至少选择一个星期',
            //     duration: 1000,
            //     position: 'bottom-right'
            //   })
            // } else {
            addHotelGoods(this.hotelGoods).then((res) => {
              if (res.data.state === 1) {
                this.$refs[formName].resetFields()
                // this.hotelGoods.priceRuleList = []
                this.hotelGoods.special = 0
                this.hotelGoods.checkWeeks = []
                this.type = '1'
                for (let i in this.ruleData) {
                  this.ruleData[i].price = ''
                  this.ruleData[i].basicPrice = ''
                }
                // this.checkWeeks = []
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              } else {
                // this.hotelGoods.priceRuleList = []
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      changePrice () {
        if (this.cooperateType === 0) {
          this.hotelGoods.price = (parseFloat(this.hotelGoods.basicPrice) + parseFloat(this.brokerage)).toFixed(2)
        } else if (this.cooperateType === 1) {
          this.hotelGoods.price = (this.hotelGoods.basicPrice * (1 + parseFloat(this.brokerageProportion.replace('%', '')))).toFixed(2)
        }
      },
      changebasicPrice () {
        if (this.cooperateType === 0) {
          this.hotelGoods.basicPrice = (parseFloat(this.hotelGoods.price) - parseFloat(this.brokerage)).toFixed(2)
        } else if (this.cooperateType === 1) {
          this.hotelGoods.basicPrice = (this.hotelGoods.price / (1 + parseFloat(this.brokerageProportion.replace('%', '')))).toFixed(2)
        }
      },
      change () {
        for (var i in this.roomtypeList) {
          if (this.roomtypeList[i].id === this.hotelGoods.roomtypeId) {
            this.cooperateType = this.roomtypeList[i].cooperateType
            this.brokerageProportion = this.roomtypeList[i].brokerageProportion
            this.brokerage = this.roomtypeList[i].brokerage
          }
        }
        this.hotelGoods.price = ''
        this.hotelGoods.basicPrice = ''
        for (var c in this.ruleData) {
          this.ruleData[c].price = ''
          this.ruleData[c].basicPrice = ''
        }
      },
      changePriceWeek (o) {
        for (var i in this.ruleData) {
          if (this.ruleData[i].weekStart === o) {
            if (this.cooperateType === 0) {
              this.ruleData[i].price = (parseFloat(this.ruleData[i].basicPrice) + parseFloat(this.brokerage)).toFixed(2)
            } else if (this.cooperateType === 1) {
              this.ruleData[i].price = (parseFloat(this.ruleData[i].basicPrice) * (1 + parseFloat(this.brokerageProportion.replace('%', '')))).toFixed(2)
            }
          }
        }
      },
      changebasicPriceWeek (o) {
        for (var i in this.ruleData) {
          if (this.ruleData[i].weekStart === o) {
            if (this.cooperateType === 0) {
              this.ruleData[i].basicPrice = (parseFloat(this.ruleData[i].price) - parseFloat(this.brokerage)).toFixed(2)
            } else if (this.cooperateType === 1) {
              this.ruleData[i].basicPrice = (parseFloat(this.ruleData[i].price) / (1 + parseFloat(this.brokerageProportion.replace('%', '')))).toFixed(2)
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/mixin.less";
  input {
    height: 30px;
    margin: 5px;
    border: 1px solid #E4E7EC;
    border-radius: 3px;
  }
  .separe, .biaoti {
    width: 90%;
    margin: 8px auto;
    color: #6C6A6A;
  }
  .separe {
    border-bottom: 2px dashed #BBBBBB;
  }
  .el-row i {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin-bottom: 8px;
    font-size: 28px;
    color: #616060;
    vertical-align: middle;
    cursor: pointer;
  }
  .hotel-goods-add {
    padding: 30px 33px 100px 30px;
    background-color: #fff;
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
      border-radius: 3px;
      margin-top: 60px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: @theme-color;
      .sc(20px, #fff);
      text-align: center;
    }
    table {
      width: 100%;
      padding-left: 22px;
    }
    td {
      width: 28%;
    }
    .map {
      width: 100%;
      height: 300px;
    }
  }
</style>
