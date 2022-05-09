<template>
  <div class="hotel-register">
    <header>联系人信息<span class="text">(<span>*</span>此为必填项)</span></header>
    <el-row>
      <el-col :span="12">
        <el-form :model="hotel" :rules="rules" ref="hotel1" label-width="150px">
          <el-form-item prop="contacts" label="酒店联系人">
            <el-input v-model="hotel.contacts"></el-input>
          </el-form-item>
          <el-form-item prop="contactPhone" label="联系人电话">
            <el-input v-model="hotel.contactPhone"></el-input>
          </el-form-item>
          <el-form-item prop="contactEmail" label="联系人邮箱">
            <el-input v-model="hotel.contactEmail"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <header>酒店基本信息<span class="text">(<span>*</span>此为必填项)</span></header>
    <el-row>
      <el-col :span="12">
        <el-form :model="hotel" :rules="rules" ref="hotel" label-width="150px">
          <el-form-item prop="name" label="酒店名称">
            <el-input v-model="hotel.name" placeholder="如:XXXX酒店(XX分店)"></el-input>
          </el-form-item>
          <el-form-item prop="receptionPhone" label="前台咨询电话">
            <el-input v-model="hotel.receptionPhone"></el-input>
          </el-form-item>
          <el-form-item prop="address" label="酒店地址">
            <el-row :gutter="2">
              <el-col :span="12">
                <el-input v-model="hotel.address" readonly="true" v-if="hotel.address"></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" plain @click="showLocationDialog">编辑地址/定位</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="starLevel" label="酒店星级">
            <el-radio-group v-model="hotel.starLevel">
              <el-radio :label="2">二星及以下</el-radio>
              <el-radio :label="3">三星级</el-radio>
              <el-radio :label="4">四星级</el-radio>
              <el-radio :label="5">五星级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="服务设施">
            <el-button type="primary" plain @click="showHotelServeDialog">服务设施</el-button>
          </el-form-item>
          <el-form-item prop="roomNumber" label="客房总数">
            <el-input v-model.number="hotel.roomNumber" placeholder="请填写数字"></el-input>
          </el-form-item>
          <el-form-item prop="chainBrand" label="连锁品牌名称">
            <el-input v-model="hotel.chainBrand" placeholder="选填"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <button class="submit" @click="submitForm('hotel', 'hotel1')">提交</button>
      </el-col>
    </el-row>
    <el-dialog title="酒店服务设施" :visible.sync="dialogTableVisible">
      <el-form :model="hotel.hotelServe" ref="hotel" label-width="90px">
        <header class="server-header">基础设施</header>
        <el-row :gutter="2" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="停车场">
              <el-radio-group v-model="hotel.hotelServe.park">
                <el-radio :label="1">免费</el-radio>
                <el-radio :label="2">收费</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="电梯">
              <el-radio-group v-model="hotel.hotelServe.elevator">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="2" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="独立卫浴">
              <el-radio-group v-model="hotel.hotelServe.bathroom">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="24小时热水">
              <el-radio-group v-model="hotel.hotelServe.hotWater">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="2" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="空调">
              <el-radio-group v-model="hotel.hotelServe.airConditioner">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="免费饮用水">
              <el-radio-group v-model="hotel.hotelServe.freeDrinkingWater">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="2" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="免费WIFI">
              <el-radio-group v-model="hotel.hotelServe.freeWifi">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="宽带上网">
              <el-radio-group v-model="hotel.hotelServe.adsl">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">部分</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <header class="server-header">酒店服务</header>
      <el-checkbox-group v-model="hotel.hotelServe.serviceList">
        <table>
          <tbody>
          <tr>
            <td v-for="(service,index) in serviceList" v-show="index<4">
              <el-checkbox :label="service" :key="service"></el-checkbox>
            </td>
          </tr>
          <tr>
            <td v-for="(service,index) in serviceList" v-show="index<8 && index>=4">
              <el-checkbox :label="service" :key="service"></el-checkbox>
            </td>
          </tr>
          <tr>
            <td v-for="(service,index) in serviceList" v-show="index<12 && index>=8">
              <el-checkbox :label="service" :key="service"></el-checkbox>
            </td>
          </tr>
          <tr>
            <td v-for="(service,index) in serviceList" v-show="index<16 && index>=12">
              <el-checkbox :label="service" :key="service"></el-checkbox>
            </td>
          </tr>
          </tbody>
        </table>
      </el-checkbox-group>
      <el-row>
        <el-col>
          <button class="submit" v-on:click="dialogTableVisible = false">提交</button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="酒店定位" :visible.sync="dialogLocationVisible">
      <el-form :model="hotel" :rules="rules" label-width="80px">
        <el-row>
          <el-form-item label="酒店地址">
            <el-col :span="7">
              <el-select v-model="hotel.provinceId" placeholder="请选择省份" @change='setCityList' filterable>
                <el-option
                  v-for="item in provinceList"
                  :key="item.provinceId"
                  :label="item.provinceName"
                  :value="item.provinceId">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="hotel.cityId" placeholder="请选择市" @change='setAreaList'>
                <el-option
                  v-for="item in cityList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="hotel.areaId" placeholder="请选择区县">
                <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input v-model="shotAddress"
                        placeholder="如：XXX路XX号（XX对面)"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :offset="3" :span="3">
            <el-button v-on:click="setLocation">定位</el-button>
          </el-col>
          <el-col :span="3">
            <el-button v-on:click="confirm">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getHotelServeList,
    getProvinceList,
    getCityList,
    getAreaList,
    hotelRegister,
    getLocation
  } from '@/api/getData'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      let checkPhone = (rule, value, callback) => {
        if (isNaN(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        dialogTableVisible: false,
        dialogLocationVisible: false,
        hotelServe: '',
        shotAddress: '',
        hotel: {
          name: '',
          ownerId: '',
          contacts: '',
          contactPhone: '',
          contactEmail: '',
          receptionPhone: '',
          address: '',
          lat: '',
          lon: '',
          starLevel: '',
          roomNumber: '',
          chainBrand: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          creator: 'huashuwen',
          hotelServe: {
            park: 0,
            bathroom: 0,
            airConditioner: 0,
            freeWifi: 0,
            elevator: 0,
            hotWater: 0,
            freeDrinkingWater: 0,
            adsl: 0,
            serviceList: []
          }
        },
        rules: {
          contacts: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          contactPhone: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          contactEmail: [
            {required: true, message: '请输入联系人邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          name: [
            {required: true, message: '请输入酒店名称', trigger: 'blur'}
          ],
          receptionPhone: [
            {required: true, message: '请输入前台电话', trigger: 'blur'}
          ],
          starLevel: [
            {type: 'number', required: true, message: '请选择星级'}
          ],
          roomNumber: [
            {required: true, message: '请输入房间总数', trigger: 'blur'},
            {type: 'number', message: '请输入数字'}
          ],
          address: [
            {required: true, message: '请定位', trigger: 'blur'}
          ]
        },
        provinceList: [],
        cityList: [],
        areaList: [],
        serviceList: [],
        provinceName: '',
        cityName: '',
        areaName: ''
      }
    },
    computed: {
      ownerId () {
        return this.$store.state.user.id
      }
    },
    created () {
      this.initData()
    },
    methods: {
      ...mapMutations([
        'SET_HOTELID'
      ]),
      initData () {
        this.setHotelServeList().then(() => this.setProvinceList()).then().catch(e => console.log(e))
      },
      showHotelServeDialog () {
        this.dialogTableVisible = true
      },
      showLocationDialog () {
        this.dialogLocationVisible = true
      },
      submitForm (formName, formName1) {
        this.$refs[formName1].validate((valid) => {
          if (valid) {
            return false
          }
        })
        this.$refs[formName].validate((valid1) => {
          if (valid1) {
            if (!this.hotel.lat && !this.hotel.lon) {
              this.$message({
                type: 'error',
                message: '请定位地址'
              })
              return
            }
            this.hotel.ownerId = this.ownerId
            hotelRegister(this.hotel).then((res) => {
              if (res.data.state === 1) {
                this.$refs[formName].resetFields()
                if (res.data.data) {
                  this.SET_HOTELID(res.data.data)
                }
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
                this.$router.push('/manage/hotelInfo/baseInfo')
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
          } else {
            return false
          }
        })
      },
      async setHotelServeList () {
        await getHotelServeList().then((res) => {
          if (res.data.state === 1) {
            this.serviceList = res.data.data.serviceList
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      async setProvinceList () {
        await getProvinceList().then((res) => {
          if (res.data.state === 1) {
            this.provinceList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      setCityList () {
        this.hotel.cityId = ''
        this.hotel.areaId = ''
        getCityList(this.hotel.provinceId).then((res) => {
          if (res.data.state === 1) {
            this.cityList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      setAreaList () {
        this.hotel.areaId = ''
        getAreaList(this.hotel.cityId).then((res) => {
          if (res.data.state === 1) {
            this.areaList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          return new Promise(resolve => {
            resolve()
          })
        })
      },
      confirm () {
        this.hotel.address = this.getValue(this.hotel.provinceId, this.provinceList) + this.getValue1(this.hotel.cityId, this.cityList) + this.getValue2(this.hotel.areaId, this.areaList) + this.shotAddress
        this.dialogLocationVisible = false
      },
      getValue1 (key, map) {
        for (var i in map) {
          if (map[i].cityId === key) {
            return map[i].cityName
          }
        }
        return ''
      },
      getValue2 (key, map) {
        for (var i in map) {
          if (map[i].areaId === key) {
            return map[i].areaName
          }
        }
        return ''
      },
      getValue (key, map) {
        for (var i in map) {
          if (map[i].provinceId === key) {
            return map[i].provinceName
          }
        }
        return ''
      },
      setLocation () {
        let provinceName = this.getValue(this.hotel.provinceId, this.provinceList)
        let cityName = this.getValue1(this.hotel.cityId, this.cityList)
        let areaName = this.getValue2(this.hotel.areaId, this.areaList)
        let address = provinceName + cityName + areaName + this.shotAddress
        if (provinceName && cityName && areaName && this.shotAddress) {
          getLocation(cityName, address).then((res) => {
            if (res.data.state === 1) {
              this.hotel.lon = res.data.data.lon
              this.hotel.lat = res.data.data.lat
              this.$message({
                type: 'success',
                message: res.data.message
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请输入完整地址'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/mixin.less";

  .hotel-register {
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
