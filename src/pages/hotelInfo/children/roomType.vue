<template>
  <div class="room-type">
    <div class="room-type-body">
      <div class="header">
        <header>房型规格</header>
        <span class="prompt">该模块仅用作维护基础房型信息，房型售卖请在“房价”模块操作。</span>
        <button @click="editRoomType()">添加房型规格</button>
      </div>
      <div class="room-type-item">
        <ul>
          <li v-for="roomType in roomTypeList">
            <header>{{roomType.apartmentName}}</header>
            <span>{{roomType.statesStr}}</span>
            <img :src="roomType.coverImg" width=250px                  height=230px>
            <div class="span">
              <span>预留: {{roomType.initStock}}间/天</span>
              <span class="right" v-show="roomType.cooperateType === 0">佣金：{{roomType.brokerage}}元/间夜</span>
              <span class="right"
                    v-show="roomType.cooperateType === 1">佣金率：{{roomType.brokerageProportion * 100}}%</span>
            </div>
            <ul>
              <li>面积：{{roomType.area}}m²</li>
              <li>床型：{{roomType.bedType}}{{roomType.bed}}米</li>
              <li>加床：{{roomType.addBed}}</li>
              <li>可住：{{roomType.people}}人</li>
            </ul>
            <div class="btn-group">
              <button class="delete" @click="remove(roomType.id)">删除</button>
              <button class="edit" @click="edit(roomType.id)">编辑房型规格</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="房型规格" :visible.sync="dialogTableVisible">
      <el-form :model="roomType" :rules="rules" ref="roomType" label-width="150px">
        <el-row>
          <el-col :span="20">
            <el-form-item prop="apartmentName" label="房型名称">
              <el-input v-model="roomType.apartmentName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="area" label="面积">
              <el-input v-model="roomType.area">
                <template slot="append">m²</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="floor" label="房型所在楼层">
              <el-input v-model="roomType.floor">
                <template slot="append">层</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="people" label="最多可入住成人数">
              <el-input v-model="roomType.people">
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="kidNum" label="最多可入住儿童数">
              <el-input v-model="roomType.kidNum">
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="wideband" label="宽带上网">
              <el-radio-group v-model="roomType.wideband">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'2'">部分</el-radio>
                <el-radio :label="'1'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="freeWifi" label="免费WIFI">
              <el-radio-group v-model="roomType.freeWifi">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'2'">部分</el-radio>
                <el-radio :label="'1'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="bathroom" label="独立卫浴">
              <el-radio-group v-model="roomType.bathroom">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'2'">部分</el-radio>
                <el-radio :label="'1'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="isWindow" label="是否有窗">
              <el-radio-group v-model="roomType.isWindow">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'2'">部分</el-radio>
                <el-radio :label="'1'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="bedType" label="床型">
              <el-select v-model="roomType.bedType">
                <el-option
                  v-for="item in bedTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="床宽">
              <el-input v-model="roomType.bed">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item prop="addBed" label="可否加床">
              <el-radio-group v-model="roomType.addBed">
                <el-radio :label="'-1'">不可</el-radio>
                <el-radio :label="'0'">免费加</el-radio>
                <el-radio :label="'1'">收费加</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="roomType.bedFee" v-show="roomType.addBed === '1'">
              <template slot="append">元/床</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="无烟信息">
              <el-radio-group v-model="roomType.smoke">
                <el-radio :label="'0'">不可吸烟</el-radio>
                <el-radio :label="'1'">可安排无烟房</el-radio>
                <el-radio :label="'2'">没有无烟房</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="房型特色">
              <el-input v-model="roomType.description" type="textarea" autosize></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="房型照片" prop="headImgUp">
              <el-upload
                class="upload-demo"
                ref="upload"
                :on-remove="handleRemove"
                :before-upload="beforeImgUpload"
                :on-success="handleSuccess"
                :action="imgUploadUrl"
                :file-list="fileList"
                name="headImgUp"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
              <!--<el-dialog :visible.sync="" size="tiny">-->
              <!--<img width="100%" :src="" alt="">-->
              <!--</el-dialog>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('roomType')" v-show="roomTypeList !== []">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="房型规格" :visible.sync="addTableVisible">
      <el-form :model="addRoomType" :rules="rules" ref="addRoomType" label-width="150px">
        <el-row>
          <el-col :span="20">
            <el-form-item prop="apartmentName" label="房型名称">
              <el-input v-model="addRoomType.apartmentName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="area" label="面积">
              <el-input v-model="addRoomType.area">
                <template slot="append">m²</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="floor" label="房型所在楼层">
              <el-input v-model="addRoomType.floor">
                <template slot="append">层</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="people" label="最多可入住成人数">
              <el-input v-model="addRoomType.people">
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="kidNum" label="最多可入住儿童数">
              <el-input v-model="addRoomType.kidNum">
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="wideband" label="宽带上网">
              <el-radio-group v-model="addRoomType.wideband">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'1'">部分</el-radio>
                <el-radio :label="'2'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="freeWifi" label="免费WIFI">
              <el-radio-group v-model="addRoomType.freeWifi">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'1'">部分</el-radio>
                <el-radio :label="'2'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="bathroom" label="独立卫浴">
              <el-radio-group v-model="addRoomType.bathroom">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'1'">部分</el-radio>
                <el-radio :label="'2'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="isWindow" label="是否有窗">
              <el-radio-group v-model="addRoomType.isWindow">
                <el-radio :label="'0'">无</el-radio>
                <el-radio :label="'1'">部分</el-radio>
                <el-radio :label="'2'">全部</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item prop="bedType" label="床型">
              <el-select v-model="addRoomType.bedType">
                <el-option
                  v-for="item in bedTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="床宽">
              <el-input v-model="addRoomType.bed">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item prop="addBed" label="可否加床">
              <el-radio-group v-model="addRoomType.addBed">
                <el-radio :label="'-1'">不可</el-radio>
                <el-radio :label="'0'">免费加</el-radio>
                <el-radio :label="'1'">收费加</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="addRoomType.bedFee" v-show="addRoomType.addBed === '1'">
              <template slot="append">元/床</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="无烟信息">
              <el-radio-group v-model="addRoomType.smoke">
                <el-radio :label="'0'">不可吸烟</el-radio>
                <el-radio :label="'1'">可安排无烟房</el-radio>
                <el-radio :label="'2'">没有无烟房</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="房型特色">
              <el-input v-model="addRoomType.description" type="textarea" autosize></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="房型照片" prop="addHeadImgUp">
              <el-upload
                class="upload-demo"
                ref="upload"
                :on-remove="editHandleRemove"
                :before-upload="beforeImgUpload"
                :on-success="editHandleSuccess"
                :action="imgUploadUrl"
                :file-list="addFileList"
                name="headImgUp"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="separe"></div>
        <div class="biaoti">合作意向</div>
        <el-row>
          <el-radio-group v-model="addRoomType.cooperateType">
            <el-col :span="8">
              <el-form-item label="佣金：" prop="brokerage">
                <el-radio :label="0">佣金&nbsp;&nbsp;


                  <el-input
                    v-model="addRoomType.brokerage"
                    style="width: 60px;"
                    :disabled="addRoomType.cooperateType!==0?true:false"></el-input>&nbsp;&nbsp;元/间夜


                </el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    offset="1">
              <el-form-item prop="brokerageProportion">
                <el-radio :label="1">佣金率&nbsp;&nbsp;


                  <el-input
                    v-model="addRoomType.brokerageProportion"
                    style="width: 60px;"
                    :disabled="addRoomType.cooperateType!==1?true:false"></el-input>
                  &nbsp;&nbsp;%

                </el-radio>
              </el-form-item>
            </el-col>
          </el-radio-group>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="firstStock" label="预留房量：">
              <el-input v-model="addRoomType.firstStock"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="line-height: 40px;margin-left: 5px;">间/天</el-col>
          <el-col :span="8"
                  pull="3">
            <el-form-item prop="totalStock">
              <el-checkbox v-model="checked">总房量限制


                <el-input v-model="addRoomType.totalStock"
                          :disabled="checked?false:true"
                          style='width: 60px;margin-right: 5px;'></el-input>
                间


              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="高级设置">
          <el-checkbox v-model="isShow"></el-checkbox>
          <span>
              <!-- <el-checkbox
                v-model="isShow"
                style="position: absolute;left:50%;top: 50%;transform: translate(-50%, -50%);"></el-checkbox> -->
            <!-- <i v-if="isShow" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-right"></i> -->
            </span>
        </el-form-item>
        <div v-if="isShow">
          <el-row v-show="addRoomType.special === 0">
            <el-col :span="24">
              <el-form-item prop="type" label="适用日期">
                <el-radio-group v-model="type">
                  <el-radio :label="'1'">所有日期</el-radio>
                  <el-radio :label="'3'">按时间段</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="addRoomType.special === 0 && type === '3'">
            <el-col :span="13"
                    offset="4"
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
                          <i v-if="redindex>0"
                             class="el-icon-remove-outline"
                             style="margin: 8px 0 0 20px;"
                             @click="redDate(redindex)"></i>
                          <i v-else></i>
                        </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop='checkWeeks' label="适用星期">
                <el-checkbox-group
                  v-model="addRoomType.checkWeeks">
                  <el-checkbox
                    v-for="week in weeks" :label="week" :key="week">{{week}}

                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="stock" label="预留房量">
                <el-input v-model="addRoomType.stock" autosize placeholder="请输入预留房量">
                  <template slot="append">间/天</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit('addRoomType')" v-show="!nextFlag">提交</el-button>
        <el-button type="primary" @click="nextStep" v-show="nextFlag">下一步,添加酒店卖点</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { imgUploadUrl } from '@/config/env'
  import {
    getRoomType,
    deleteRoomType,
    toRoomTypeView,
    getbedType,
    saveOrUpdateRoomType
  } from '@/api/getData'
  const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    data () {
      let checkBrokerageProportion = (rule, value, callback) => {
        if (value === '' && this.addRoomType.cooperateType === 1) {
          callback(new Error('请输入佣金或佣金率'))
        } else {
          callback()
        }
      }
      let checkBrokerage = (rule, value, callback) => {
        if (value === '' && this.addRoomType.cooperateType === 0) {
          callback(new Error('请输入佣金或佣金率'))
        } else {
          callback()
        }
      }
      let checkApartmentName = (rule, value, callback) => {
        let length = this.roomTypeList.length
        let flag = false
        for (let i = 0; i < length; i++) {
          if (this.roomTypeList[i].apartmentName === value) {
            flag = true
          }
        }
        if (value === '') {
          callback(new Error('请输入房型名称'))
        } else if (value.length > 10) {
          callback(new Error('房型名称请设置10个字以内'))
        } else if (flag && this.addTableVisible) {
          callback(new Error('不可创建重复名称的房型'))
        } else {
          callback()
        }
      }
      let checkHeadImgUp = (rule, value, callback) => {
        if (this.roomType.imgs === '') {
          callback(new Error('请上传照片'))
        } else {
          callback()
        }
      }
      let checkAddHeadImgUp = (rule, value, callback) => {
        if (this.addRoomType.imgs === '') {
          callback(new Error('请上传照片'))
        } else {
          callback()
        }
      }
      let checkType = (rule, value, callback) => {
        if (this.type === '') {
          callback(new Error('请选择适用日期'))
        } else {
          callback()
        }
      }
      let checkTotalStock = (rule, value, callback) => {
        if (this.checked && value === '') {
          callback(new Error('请输入总房量限制'))
        } else {
          callback()
        }
      }
      let checkTime = (rule, value, callback) => {
        if (this.time) {
          if (this.time.length === 0) {
            callback(new Error('请选择时间段'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请选择时间段'))
        }
      }
      return {
        isShow: false,
        checked: true,
        weeks: weekOptions,
        qzdateArr: [],
        dialogTableVisible: false,
        addTableVisible: false,
        imgUploadUrl,
        roomTypeList: [],
        nextFlag: false,
        newCheckweek: [],
        roomType: {
          id: '',
          hotelId: '',
          apartmentName: '',
          area: '',
          floor: '',
          people: '',
          kidNum: '',
          freeWifi: '',
          bathroom: '',
          wideband: '',
          isWindow: '',
          bedType: '',
          bed: '',
          addBed: '',
          bedFee: '',
          smoke: '',
          coverImg: '',
          imgs: '',
          description: '',
          creator: '',
          updater: ''
        },
        addRoomType: {
          id: '',
          hotelId: '',
          apartmentName: '',
          area: '',
          floor: '',
          people: '',
          kidNum: '',
          freeWifi: '',
          bathroom: '',
          wideband: '',
          isWindow: '',
          bedType: '',
          bed: '',
          addBed: '',
          bedFee: '',
          smoke: '',
          coverImg: '',
          imgs: '',
          description: '',
          creator: '',
          updater: '',
          stock: '',
          checkWeeks: [],
          special: 0,
          cooperateType: 1,
          brokerageProportion: '',
          brokerage: '',
          firstStock: '',
          totalStock: ''
        },
        bedTypeList: [],
        startTime: '',
        endTime: '',
        times: [],
        type: '1',
        pickerOptions: {
          disabledDate (data) {
            return data.getTime() < Date.now() - 8.64e7
          }
        },
        ruleData: [{
          weekStart: 1,
          week: '星期一',
          stock: ''
        }, {
          weekStart: 2,
          week: '星期二',
          stock: ''
        }, {
          weekStart: 3,
          week: '星期三',
          stock: ''
        }, {
          weekStart: 4,
          week: '星期四',
          stock: ''
        }, {
          weekStart: 5,
          week: '星期五',
          stock: ''
        }, {
          weekStart: 6,
          week: '星期六',
          stock: ''
        }, {
          weekStart: 7,
          week: '星期日',
          stock: ''
        }],
        rules: {
          apartmentName: [
            {required: true, validator: checkApartmentName, trigger: 'blur'}
          ],
          area: [
            {required: true, message: '请输入面积', trigger: 'blur'}
          ],
          floor: [
            {required: true, message: '请输入楼层', trigger: 'blur'}
          ],
          people: [
            {required: true, message: '请输入最多可住成人数', trigger: 'blur'}
          ],
          kidNum: [
            {required: true, message: '请输入最多可住儿童数', trigger: 'blur'}
          ],
          freeWifi: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          bathroom: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          isWindow: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          wideband: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          bedType: [
            {required: true, message: '请选择房型', trigger: 'blur'}
          ],
          addBed: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          imgs: [
            {required: true, message: '请上传照片', trigger: 'blur'}
          ],
          special: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          brokerage: [
            {required: true, validator: checkBrokerage, trigger: 'blur'}
          ],
          brokerageProportion: [
            {required: true, validator: checkBrokerageProportion, trigger: 'blur'}
          ],
          headImgUp: [
            {required: true, validator: checkHeadImgUp, trigger: 'blur'}
          ],
          addHeadImgUp: [
            {required: true, validator: checkAddHeadImgUp, trigger: 'blur'}
          ],
          cooperateType: [
            {required: true, message: '请选择合作方式', trigger: 'blur'}
          ],
          type: [
            {required: true, validator: checkType, trigger: 'blur'}
          ],
          checkWeeks: [
            {type: 'array', required: true, message: '请输入至少一个星期', trigger: 'blur'}
          ],
          stock: [
            {required: true, message: '请输入预留房量', trigger: 'blur'}
          ],
          time: [
            {required: true, validator: checkTime, trigger: 'blur'}
          ],
          firstStock: [
            {required: true, message: '请输入预留房量', trigger: 'blur'}
          ],
          totalStock: [
            {required: true, validator: checkTotalStock, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      fileList () {
        if (this.roomType.imgs) {
          if (this.roomType.imgs.length) {
            let fileList = this.roomType.imgs.split(',').map((item) => {
              const img = {
                url: item.toString()
              }
              return img
            })
            return fileList
          } else {
            return []
          }
        }
      },
      addFileList () {
        if (this.addRoomType.imgs) {
          if (this.addRoomType.imgs.length) {
            let addFileList = this.addRoomType.imgs.split(',').map((item) => {
              const img = {
                url: item.toString()
              }
              return img
            })
            return addFileList
          } else {
            return []
          }
        }
      },
      coverImg () {
        let imgsList = []
        if (this.addTableVisible) {
          imgsList = this.addFileList
        } else if (this.dialogTableVisible) {
          imgsList = this.fileList
        }
        if (imgsList) {
          if (imgsList.length > 0) {
            let coverImg = imgsList[0].url
            return coverImg
          }
        }
        return ''
      }
    },
    created () {
      this.qzdateArr = [
        {qzdatetime: ''}
      ]
      this.initData()
    },
    methods: {
      // 点击增加时间段
      addDate: function () {
        this.qzdateArr.push({qzdatetime: ''})
        console.log(this.qzdateArr)
      },
      // 点击减少时间段
      redDate: function (redindex) {
        this.qzdateArr.splice(redindex, 1)
      },
      initData () {
        let state = this.$store.state
        this.roomType.hotelId = state.hotelId
        this.roomType.updater = this.$store.state.user.nickName
        this.addRoomType.creator = state.user.nickName
        this.nextFlag = this.$route.query.flag
        this.setBedType().then(getRoomType(this.roomType.hotelId).then((res) => {
          if (res.data.state === 1) {
            this.roomTypeList = res.data.data
          } else {
            return false
          }
        })).catch(e => console.log(e))
      },
      editRoomType () {
        this.addTableVisible = true
      },
      edit (id) {
        this.dialogTableVisible = true
        toRoomTypeView(id).then((res) => {
          if (res.data.state === 1) {
            this.roomType = res.data.data
          }
        }).catch(e => console.log(e))
      },
      remove (id) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRoomType(id).then((res) => {
            if (res.data.state === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              getRoomType(this.roomType.hotelId).then((res) => {
                if (res.data.state === 1) {
                  this.roomTypeList = res.data.data
                } else {
                  return false
                }
              }).catch(e => console.log(e))
            }
          }).catch(e => console.log(e))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      async setBedType () {
        await getbedType().then((res) => {
          if (res.data.state === 1) {
            this.bedTypeList = res.data.data.bedTypeList
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
        return new Promise(resolve => {
          resolve()
        })
      },
      submit (formName) {
        this.roomType.coverImg = this.coverImg
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.roomType.imgs) {
              this.$message({
                type: 'error',
                message: '请上传图片'
              })
              return
            }
            delete this.roomType.createTime
            delete this.roomType.updateTime
            saveOrUpdateRoomType(this.roomType).then((res) => {
              if (res.data.state === 1) {
                this.dialogTableVisible = false
                this.$refs[formName].resetFields()
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
                getRoomType(this.roomType.hotelId).then((res) => {
                  if (res.data.state === 1) {
                    this.roomTypeList = res.data.data
                    return true
                  } else {
                    return false
                  }
                }).catch(e => console.log(e))
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
                return false
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
      },
      nextStep () {
        this.submitEdit('addRoomType')
      },
      submitEdit (formName) {
        this.addRoomType.hotelId = this.roomType.hotelId
        this.addRoomType.coverImg = this.coverImg
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.addRoomType.imgs) {
              this.$message({
                type: 'error',
                message: '请上传图片'
              })
              return
            }
            if (!this.checked) {
              this.addRoomType.totalStock = ''
            }
            let map = {
              isShow: this.isShow,
              firstStock: this.addRoomType.firstStock,
              totalStock: this.addRoomType.totalStock
            }
            if (this.isShow) {
              this.newCheckweek = this.addRoomType.checkWeeks
              for (let j = 0; j < this.newCheckweek.length; j++) {
                this.newCheckweek[j] = this.transfToNumFn(this.newCheckweek[j])
              }
            }
            map.weeks = this.newCheckweek.join('')
            if (this.addRoomType.special === 0) {
              if (this.type === '3') {
                for (let i = 0; i < this.qzdateArr.length; i++) {
                  let time = {
                    start: Date.parse(this.qzdateArr[i].qzdatetime[0]),
                    end: Date.parse(this.qzdateArr[i].qzdatetime[1])
                  }
                  this.times.push(time)
                }
                map.stock = this.addRoomType.stock
                map.times = this.times
                map.rtype = this.type
                this.addRoomType.map = map
              } else {
                this.type = '1'
                map.rtype = this.type
                map.stock = this.addRoomType.stock
                this.addRoomType.map = map
              }
            } else {
              this.type = '1'
              map.rtype = this.type
              this.addRoomType.map = map
            }
            saveOrUpdateRoomType(this.addRoomType).then((res) => {
              if (res.data.state === 1) {
                this.addTableVisible = false
                this.$refs[formName].resetFields()
                this.addRoomType = {
                  cooperateType: 1,
                  special: 0,
                  imgs: '',
                  coverImg: '',
                  checkWeeks: [],
                  map: {},
                  totalStock: ''
                }
                this.addRoomType.special = 0
                this.type = '1'
                for (let i in this.ruleData) {
                  this.ruleData[i].stock = ''
                }
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
                getRoomType(this.roomType.hotelId).then((res) => {
                  if (res.data.state === 1) {
                    this.roomTypeList = res.data.data
                    this.$router.push({path: 'introduce', query: {flag: true}})
                  } else {
                    return false
                  }
                })
                this.checked = true
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
            //  else {
            //   this.$notify.error({
            //     title: '错误',
            //     message: '请完善表单',
            //     duration: 1000,
            //     position: 'bottom-right'
            //   })
          }
        })
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
      handleSuccess (res) {
        if (res.imgUrl) {
          this.roomType.imgs += this.roomType.imgs === '' ? res.imgUrl : ',' + res.imgUrl
          if (!this.roomType.coverImg) {
            this.roomType.coverImg = this.fileList[0].url
          }
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      },
      handleRemove (file, fileList) {
        let filePath = ''
        if (file.response) {
          filePath = file.response.filePath
        } else {
          filePath = file.url
        }
        this.roomType.imgs = this.roomType.imgs.replace(',' + filePath, '')
        this.roomType.imgs = this.roomType.imgs.replace(filePath + ',', '')
        this.roomType.imgs = this.roomType.imgs.replace(filePath, '')
      },
      beforeImgUpload (file) {
        const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
        if (!isRightType) {
          this.$message.error('上传图片只能是 JPG/png 格式!')
        }
        return isRightType
      },
      editHandleSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        console.log(this.imageUrl)
        if (res.imgUrl) {
          this.addRoomType.imgs += this.addRoomType.imgs === '' ? res.imgUrl : ',' + res.imgUrl
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          console.log(this.addRoomType.imgs)
        }
      },
      editHandleRemove (file, fileList) {
        let filePath = ''
        if (file.response) {
          filePath = file.response.filePath
        } else {
          filePath = file.url
        }
        this.addRoomType.imgs = this.roomType.imgs.replace(',' + filePath, '')
        this.addRoomType.imgs = this.roomType.imgs.replace(filePath + ',', '')
        this.addRoomType.imgs = this.roomType.imgs.replace(filePath, '')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../style/mixin.less";

  .el-row {
    margin: 6px 0;
  }

  .el-row i {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    color: #616060;
    vertical-align: middle;
    cursor: pointer;
  }

  .separe, .biaoti {
    width: 90%;
    margin: 8px auto;
    color: #6C6A6A;
  }

  .separe {
    border-bottom: 2px dashed #BBBBBB;
  }

  .room-type {
    padding: 20px 40px;
    background-color: #fff;
    .room-type-body {
      .header {
        height: 25px;
        margin-bottom: 40px;
        header {
          float: left;
          font-size: 20px;
        }
        button {
          float: right;
          width: 100px;
          height: 25px;
          line-height: 25px;
          border-radius: 3px;
          background-color: @theme-color;
          .sc(14px, #fff);
          text-align: center;
        }
      }
      .room-type-item {
        display: inline;
        & > ul {
          .fj('flex-start');
          flex-wrap: wrap;
          & > li {
            width: 270px;
            margin-right: 10px;
            margin-bottom: 20px;
            padding: 0 10px 0 10px;
            border: 1px solid #d9d9d9;
            & > header {
              height: 43px;
              line-height: 43px;
            }
            & > img {
              width: 270px;
              height: 140px;
            }
            .span {
              border-bottom: 1px #d9d9d9 solid;
              & > span {
                display: inline-block;
                height: 37px;
                line-height: 37px;
                .sc(14px, red);
                &.right {
                  float: right;
                }
              }
            }
            & > ul {
              margin-top: 10px;
              .fj();
              flex-wrap: wrap;
              border-bottom: 1px solid #d9d9d9;
              li {
                width: 50%;
                margin-bottom: 10px;
                font-size: 14px;
              }
            }
          }
        }
      }
      .btn-group {
        height: 25px;
        padding: 10px 0;
        button.delete {
          width: 50px;
          height: 25px;
          line-height: 25px;
          .sc(14px, #fff);
          text-align: center;
          border-radius: 3px;
          background-color: #ff0000;
        }
        button.edit {
          float: right;
          width: 100px;
          height: 25px;
          line-height: 25px;
          .sc(14px, #fff);
          text-align: center;
          border-radius: 3px;
          background-color: @theme-color;
        }
      }
      .prompt {
        color: red;
        text-align: center;
        display: block;
      }
    }
  }
</style>
