<template>
<div class='fangtaiguanli-wrapper'>
  <div class='fangtaiguanli'>
    <el-row>
      <el-col :span="8" class='menu'><span class='title'>房态管理</span></el-col>
      <el-col :span="8" class='menu'>
        <div class='block'>
          <span class='demonstration'>日期</span>
          <el-date-picker
            class='shuru_date'
            v-model='value2'
            type='date'
            placeholder='选择日期'>
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8" class='menu'>
        <a class='anniu'
           href='javascript: '
           @click="centerDialogVisible = true">批量修改库存</a>
      </el-col>
    </el-row>
    <div class='roomhotellist'>
      <table class='biaoge'>
        <tr>
          <th class='single_th'>房型\日期</th>
          <th v-for='(itemth,indexth) in tableth'
              v-if='indexth < 14'
              :key='itemth'>
              <div>{{itemth | formatTime}}</div>
              <div style='margin-top: 5px;'>
                <span v-if='parseInt(itemth.replace(/-/g, "")) === parseInt(today.replace(/-/g, ""))'>今天</span>
                <span v-else>{{thWeeks[indexth]}}</span>
              </div>
          </th>
        </tr>
        <tr v-for='(itemtr,indexout) in tablebody'
            :key='indexout'>
          <td>{{itemtr[15]}}</td>
          <td v-for='(itemtd,indexinto) in itemtr'
              v-if='indexinto < 14'
              :key='indexinto'>
              <div  ref='tdjs'
                    class='tdMask'
                    @mousedown='bianjibegin(indexout,indexinto)'
                    @mouseup='bianjiend(indexout,indexinto)'>
                <div :class="[itemtd.isOpen === 2 ? activeClass : '', errorClass]">
                  <span class='stock' v-if='!itemtd.stock'>未设置库存</span>
                  <span class='stock' v-else>{{itemtd.stock}}</span>
                </div>
              </div>
              <div class='preMask' v-if="parseInt(tableth[indexinto].replace(/-/g, '')) < parseInt(today.replace(/-/g, ''))">
              </div>
            <div class='bianji_block'
                 ref='bianjiBlock'
                 style='display: none;'>
                 <div v-show='pilaingChange'
                      class='piliangchange'>
                   <div class='biaoti-date'>
                   <span class='pl_date'
                         v-if='tableth[beginDateIndex] === tableth[endIndex]'>{{tableth[beginDateIndex] | formatTime}}</span>
                   <span class='pl_date'
                         v-else>{{tableth[beginDateIndex] | formatTime}} ~ {{tableth[endIndex] | formatTime}}</span>
                     <ul>
                       <li class='lilist'
                           v-for='(item,index) in clickArr'>
                         {{tablebody[item][15]}}
                       </li>
                     </ul>
                   </div>
                   <ul class='xiugai-guize'>
                      <li class='lilist'>
                        开关房型：
                        <el-radio-group
                          v-model="isOpen"
                          @change='closeRoom()'>
                            <el-radio :label="0">不做修改</el-radio>
                            <el-radio :label="1">开房</el-radio>
                            <el-radio :label="2">关房</el-radio>
                        </el-radio-group>
                      </li>
                      <li class='lilist'>
                        <span style='vertical-align: top;'>修改房量：</span>
                        <el-radio-group v-model="isChange" style='width: 50%;margin-top: 5px;'>
                          <el-radio
                            :label="0"
                            style='margin: 5px 0;'>不做修改</el-radio>
                          <el-radio
                            :disabled="isOpen===2?true:false"
                            :label="1"
                            style='margin: 5px 0;'>增加
                            <input
                                type="number"
                                v-model="addNum"
                                min="1"
                                :disabled="isChange!==1?true:false">间</el-radio>
                          <el-radio
                            :disabled="isOpen===2?true:false"
                            :label="2"
                            style='margin: 5px 0;'>减少
                            <input
                                type="number"
                                v-model="reduceNum"
                                min="1"
                                :disabled="isChange!==2?true:false">间</el-radio>
                        </el-radio-group>
                      </li>
                    </ul>
                    <div class='btn_wrapper'>
                      <span class='quxiao'
                            @click='guanbi()'>取消</span>
                      <span class='queren'
                            @click='plqueren()'>确认</span>
                    </div>
                 </div>
                <div class='guanbi'
                     @click='guanbi()'><img src='static/img/close.png'></div>
              </div>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="900px"
      center>
      <div class='plchange_block'>
        <div class='top-title'>批量修改库存</div>
        <div class='plblock_content'>
          <div class='left_dh'>
            <el-checkbox-group
              v-model="alldata">
              <el-checkbox
                v-for='(yiji,yijiindex) in leftFenlei'
                :label="yiji"
                :key="yiji"
                style='display: block;margin-left: 0;'>{{yiji.label}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class='right_content'>
            <el-row>
              <el-col :span="4">适用时间*：&nbsp;&nbsp;&nbsp;</el-col>
              <el-col :span="10">
               <el-radio-group v-model="radio2">
                  <el-radio :label="1">所有日期</el-radio>
                  <el-radio :label="2">按时间段</el-radio>
               </el-radio-group>
              </el-col>
            </el-row>
            <div v-show='radio2 === 2'>
              <el-row style='position: relative;'>
                <el-col :span="13"
                        offset="4">
                    <el-date-picker
                        style='height: 40px;margin: 10px 0;'
                        v-for="(item,index) in qzdateArr"
                        :key="index"
                        v-model="item.qzdatetime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="dateWeeks">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                  <span v-for="(item,redindex) in qzdateArr.length">
                    <i  v-if="redindex>0"
                        class="el-icon-remove-outline"
                        @click="redDate(redindex)"></i>
                    <i  v-else></i>
                  </span>
                </el-col>
              </el-row>
              <span class='add' style='position: absolute;top: 65px;right: 165px;'>
                <i class="el-icon-circle-plus-outline"
                   @click="addDate"></i>
              </span>
            </div>
              <div class='alldata'
               :key='inIndex'>
                <el-row>
                  <el-col :span="4">适用星期*：&nbsp;&nbsp;&nbsp;</el-col>
                  <el-col :span="20">
                    <el-checkbox-group
                      v-model="checkedweek">
                      <el-checkbox
                        v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">开关房型：&nbsp;&nbsp;&nbsp;</el-col>
                  <el-col :span="20">
                    <el-radio-group
                      v-model="plisOpen"
                      @change='plcloseRoom()'>
                      <el-radio :label="0">不做修改</el-radio>
                      <el-radio :label="1">开房</el-radio>
                      <el-radio :label="2">关房</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">修改房量：&nbsp;&nbsp;&nbsp;</el-col>
                  <el-col :span="20">
                    <el-radio-group v-model="plisChange">
                      <el-radio :label="0">不做修改</el-radio>
                      <el-radio :disabled="plisOpen===2?true:false" :label="1">增加
                        <input
                          type="number"
                          v-model="pladdNum"
                          min="1"
                          :disabled="plisChange!==1?true:false">间</el-radio>
                      <el-radio :disabled="plisOpen===2?true:false" :label="2">减少
                        <input
                          type="number"
                          v-model="plreduceNum"
                          min="1"
                          :disabled="plisChange!==2?true:false">间</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tijiao" :disabled='jinyong'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
<script>
  import {getStockInfo, plhotelTree, chuanruStock, plChangeStock} from '@/api/getData.js'
  import {formatDate, fmtDate, transfToNumFn, transforStrFn} from '@/config/mUtils.js'
  const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    data () {
      return {
        activeClass: 'close',
        errorClass: '',
        value2: '',
        tableth: [],
        thWeeks: week,
        tablebody: [],
        leftFenlei: [],
        newxinxi: {},
        isOpen: 0,
        isChange: 0,
        addNum: '',
        reduceNum: '',
        singleChange: false,
        pilaingChange: false,
        changednum: '',
        Datetime: '',
        beginZuoBiao: '',
        beginDateIndex: '',
        endIndex: '',
        endZuoBiao: '',
        x1: '',
        x2: '',
        y1: '',
        y2: '',
        clickArr: [],
        today: '',
        centerDialogVisible: false,
        preTodayIndex: '',
        hotelId: '',
        alldata: [],
        listobj: {},
        radio2: 1,
        weeks: weekOptions,
        checkedweek: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        checkweek: '1234567',
        plisOpen: 0,
        plisChange: 0,
        pladdNum: '',
        plreduceNum: '',
        qzdateArr: [],
        dateWeeks: {
          firstDayOfWeek: 1
        },
        jinyong: false
      }
    },
    created: function () {
      this.initFn()
      this.qzdateArr = [
        {qzdatetime: ''}
      ]
    },
    mounted: function () {
      this.$nextTick(() => {
        this.getRoomTreeList()
      })
    },
    filters: {
      formatTime: function (houtaiTime) {
        return formatDate(houtaiTime, 'MM-DD')
      },
      formatMoney: function (value) {
        return '￥' + value
      },
      formateBaifenbi: function (value) {
        return value + '%'
      },
      formatToFixed: function (value) {
        return parseFloat(value).toFixed(2)
      }
    },
    watch: {
      value2: function () {
        this.getGoodsNum()
      }
    },
    methods: {
      initFn: function () {
        this.hotelId = this.$store.state.hotelId
        this.value2 = new Date()
        this.hotelId = this.$store.state.hotelId
        let year = this.value2.getFullYear()
        let month = (this.value2.getMonth() + 1)
        let day = this.value2.getDate()
        month = month >= 10 ? month : '0' + month
        day = day >= 10 ? day : '0' + day
        // this.today = month + '-' + day
        this.today = year + '-' + month + '-' + day
      },
      closeRoom: function () {
        if (this.isOpen === 2) {
          this.isChange = 0
        }
      },
      getRoomTreeList: function () {
        plhotelTree(this.hotelId).then(res => {
          this.leftFenlei = res.data.data
        })
      },
      getGoodsNum: function () {
        this.tablebody = []
        this.tableth = []
        let time = fmtDate(this.value2)
        getStockInfo(this.hotelId, time).then(res => {
          this.newxinxi = res.data.data
          this.getTdArr()
        })
      },
      // 把表头和表单内容转化为数组形式
      getTdArr: function () {
        for (let i = 0; i < this.newxinxi.length; i++) {
          let itemTdArr = []
          for (let j in this.newxinxi[i]) {
            itemTdArr.push(this.newxinxi[i][j])
          }
          this.tablebody.push(itemTdArr)
        }
        for (let k in this.newxinxi[0]) {
          this.tableth.push(k)
        }
        this.preTodayIndex = this.tableth.indexOf(this.today)
        // console.log(this.preTodayIndex)
      },
      // 点击非选中的地区颜色改变
      hiddenBgColorFn: function () {
        for (let i = 0; i < this.$refs.tdjs.length; i++) {
          this.$refs.tdjs[i].style.backgroundColor = ''
        }
      },
      bianjibegin: function (indexout, indexinto) {
        this.hiddenBgColorFn()
        this.x1 = indexout
        this.y1 = indexinto
        this.beginZuoBiao = this.clickindex(this.x1, this.y1)
        this.$refs.tdjs[this.beginZuoBiao].style.backgroundColor = '#d5eeff'
        this.beginDateIndex = this.y1
        let idZhi = []
        for (let i = 0; i < this.tablebody.length; i++) {
          idZhi.push(this.tablebody[i][14])
        }
      },
      bianjiend: function (indexout, indexinto) {
        let bianjiBlock = this.$refs.bianjiBlock
        this.singleChange = false
        this.pilaingChange = false // 初始化
        this.x2 = indexout
        this.y2 = indexinto
        this.endIndex = this.y2
        this.endZuoBiao = this.clickindex(this.x2, this.y2)
        this.$refs.tdjs[this.endZuoBiao].style.backgroundColor = '#d5eeff'
        this.hidden(bianjiBlock) // 消除前一个框选块
        this.chageTdBg('#d5eeff')
        this.pilaingChange = true
        bianjiBlock[this.endZuoBiao].style.display = 'block'
      },
      // 批量发送修改库存
      plqueren: function () {
        let listobj = {}
        let times = []
        let list = []
        for (let i = 0; i < this.clickArr.length; i++) {
          list.push({roomtypeId: this.tablebody[this.clickArr[i]][14]})
        }
        let start = Date.parse(this.tableth[this.beginDateIndex].replace(/-/g, '/'))
        let end = Date.parse(this.tableth[this.endIndex].replace(/-/g, '/'))
        if (this.addNum) {
          listobj.addStock = this.addNum
        } else if (this.reduceNum) {
          listobj.redStock = this.reduceNum
        }
        times.push({start: start, end: end})
        listobj.list = list
        listobj.times = times
        listobj.rtype = '3'
        listobj.isOpen = this.isOpen + ''
        listobj.isChange = this.isChange + ''
        listobj.weeks = '1234567'
        if (this.isOpen === 0 && this.isChange === 0) {
          this.$notify.error({
            title: '修改失败',
            message: '未作修改',
            duration: 1000,
            position: 'top-right'
          })
        } else if (this.isOpen !== 2 && this.isChange === 1 && !this.addNum) {
          this.$notify.error({
            title: '修改失败',
            message: '请输入要增加的库存',
            duration: 1000,
            position: 'top-right'
          })
        } else if (this.isOpen !== 2 && this.isChange === 1 && this.addNum < 0) {
          this.$notify.error({
            title: '修改失败',
            message: '增加的库存必须大于1',
            duration: 1000,
            position: 'top-right'
          })
        } else if (this.isOpen !== 2 && this.isChange === 2 && !this.reduceNum) {
          this.$notify.error({
            title: '修改失败',
            message: '请输入要减少的库存',
            duration: 1000,
            position: 'top-right'
          })
        } else if (this.isOpen !== 2 && this.isChange === 2 && this.reduceNum < 0) {
          this.$notify.error({
            title: '修改失败',
            message: '减少的库存必须大于1',
            duration: 1000,
            position: 'top-right'
          })
        } else {
          plChangeStock(listobj).then(res => {
            if (res.data.state === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.getGoodsNum()
              this.addNum = ''
              this.reduceNum = ''
              listobj = {}
              times = []
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        }
      },
      // 发送单个修改后的价格/库存给后台
      queren: function (itemtr, indexout, indexinto) {
        let Id = itemtr[14]
        let datetime = this.tableth[indexinto]
        if (!this.changednum) {
          this.$message({
            type: '修改失败',
            message: '请输入库存'
          })
        } else {
          chuanruStock(Id, datetime, this.changednum, 3).then(res => {
            if (res.data.state === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.guanbi()
              // 使视图同步更新
              this.$set(this.tablebody[indexout][indexinto], 'stock', this.changednum)
              this.changednum = ''
            }
          })
        }
      },
      // 关闭函数
      guanbi: function () {
        this.$refs.bianjiBlock[this.endZuoBiao].style.display = 'none'
        this.chageTdBg('') // 清除颜色
      },
      // 选择的位置计算
      clickindex: function (indexout, indexinto) {
        return (indexout * 14 + indexinto)
      },
      chageTdBg: function (color) {
        this.clickArr = []
        for (var i = this.x1; i <= this.x2; i++) {
          this.clickArr.push(i)
          for (var j = this.y1; j <= this.y2; j++) {
            let tdindex = this.clickindex(i, j)
            this.$refs.tdjs[tdindex].style.backgroundColor = color
          }
        }
      },
      // 选中的坐标计算
      hidden: function (element) {
        for (let i = 0; i < element.length; i++) {
          element[i].style.display = 'none'
        }
      },
      plcloseRoom: function () {
        if (this.plisOpen === 2) {
          this.plisChange = 0
        }
      },
      addDate: function () {
        this.qzdateArr.push({qzdatetime: ''})
      },
      redDate: function (redindex) {
        this.qzdateArr.splice(redindex, 1)
      },
      // 使星期数组同步更新
      toUpdateWeek: function () {
        for (let i = 1; i < 8; i++) {
          let week = transforStrFn(i)
          this.$set(this.checkedweek, i, week)
        }
      },
      // 把星期数组转化成星期字符串
      toWeekSrtFn: function () {
        for (let j = 0; j < this.checkedweek.length; j++) {
          this.checkedweek[j] = transfToNumFn(this.checkedweek[j])
        }
        this.checkweek = this.checkedweek.join('')
      },
      // 把时间段转化成转化成后台需要的数据
      toDatetimeFn: function () {
        let newqzdateArr = new Array(this.qzdateArr.length)
        for (let i = 0; i < this.qzdateArr.length; i++) {
          for (let j = 0; j < this.qzdateArr[i].qzdatetime.length; j++) {
            let datetime = this.qzdateArr[i].qzdatetime[j]
            this.qzdateArr[i].qzdatetime[j] = Date.parse(datetime)
            newqzdateArr[i] = {
              start: this.qzdateArr[i].qzdatetime[0],
              end: this.qzdateArr[i].qzdatetime[1]
            }
          }
        }
        return newqzdateArr
      },
      tijiao: function () {
        if (this.plisOpen === 0 && this.plisChange === 0) {
          this.$notify.error({
            title: '修改失败',
            message: '未作修改',
            duration: 1000,
            position: 'bottom-right'
          })
          return
        }
        if (!this.alldata.length) {
          this.$notify.error({
            title: '提交失败',
            message: '请选择房型',
            duration: 1000,
            position: 'top-right'
          })
        } else if (this.radio2 === 2 && !this.qzdateArr[0].qzdatetime) {
          this.$notify.error({
            title: '提交失败',
            message: '请至少选择一个时间段',
            duration: 1000,
            position: 'bottom-right'
          })
        } else if (!this.checkedweek.length) {
          this.$notify.error({
            title: '提交失败',
            message: '请至少选择一个星期',
            duration: 1000,
            position: 'bottom-right'
          })
        } else if (this.plisOpen !== 2 && this.plisChange === 1 && !this.pladdNum) {
          this.$notify.error({
            title: '提交失败',
            message: '请输入要增加的库存',
            duration: 1000,
            position: 'bottom-right'
          })
        } else if (this.plisOpen !== 2 && this.plisChange === 1 && this.pladdNum < 0) {
          this.$notify.error({
            title: '修改失败',
            message: '增加的库存必须大于1',
            duration: 1000,
            position: 'top-right'
          })
        } else if (this.plisOpen !== 2 && this.plisChange === 2 && !this.plreduceNum) {
          this.$notify.error({
            title: '提交失败',
            message: '请输入要减少的库存',
            duration: 1000,
            position: 'bottom-right'
          })
        } else if (this.plisOpen !== 2 && this.plisChange === 2 && this.plreduceNum < 0) {
          this.$notify.error({
            title: '修改失败',
            message: '减少库存必须大于1',
            duration: 1000,
            position: 'top-right'
          })
        } else {
          this.jinyong = true
          this.toWeekSrtFn()
          this.listobj = {list: this.alldata}
          if (this.radio2 === 2) {
            this.listobj.rtype = '3'
            this.listobj.times = this.toDatetimeFn()
          } else {
            this.listobj.rtype = '1'
          }
          this.listobj['weeks'] = this.checkweek
          this.listobj.isOpen = this.plisOpen + ''
          this.listobj.isChange = this.plisChange + ''
          if (this.pladdNum) {
            this.listobj.addStock = this.pladdNum
          } else if (this.plreduceNum) {
            this.listobj.redStock = this.plreduceNum
          }
          this.sentListFtFn(this.listobj)
        }
      },
      // 发送房量修改信息
      sentListFtFn: function (list) {
        plChangeStock(list).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.pladdNum = ''
            this.plreduceNum = ''
            this.qzdateArr = [
              {qzdatetime: ''}
            ]
            this.centerDialogVisible = false
            this.getGoodsNum()
            this.qzdateArr = [
              {qzdatetime: ''}
            ]
            this.jinyong = false
            this.listobj = {}
            this.toUpdateWeek()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.jinyong = false
            this.toUpdateWeek()
          }
        })
      }
    }
  }
</script>
<style scoped>
  .fangtaiguanli-wrapper {
    width: 98%;
/*    margin: 0 auto;*/
    background-color: #fff;
  }
  .fangtaiguanli {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 200px;
    background-color: #fff;
  }
  .fangtaiguanli .menu {
    height: 60px;
    line-height: 90px;
  }
  .fangtaiguanli .menu .title {
    margin-left: 25px;
  }
  .fangtaiguanli .menu:last-child {
    text-align: right;
  }
  .fangtaiguanli .menu .anniu {
    display: inline-block;
    width: 100px;
    height: 30px;
    margin-right: 20px;
    padding: 0 8px;
    line-height: 30px;
    color: #fff;
    background-color: #3897DB;
    border-radius: 3px;
  }
  .roomhotellist {
    margin: 0 auto;
    padding-bottom: 50px;
    /*overflow-y: scroll;*/
    background-color: #fff;
    border: 25px solid rgba(0,0,0,0);
    -moz-user-select: none; /*让网页中的字不被复制 火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
  .roomhotellist .bianji_block #singletd {
    width: 100px;
  }
  .roomhotellist .biaoge {
    width: 100%;
    margin: 0 auto;
    border-radius: 6px;
    border-collapse: collapse;
    border: 2px solid #EBEEF5;
  }
  .roomhotellist .single_th {
    position: relative;
    height: 60px;
  }
  .roomhotellist tr:not(:first-child),.roomhotellist tr:not(:last-child) {
    border: 0.5px solid #E0E0E0;
  }
  .roomhotellist th, .roomhotellist td {
    height: 60px;
    padding: 0 1px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #EBEEF5;
  }
  .roomhotellist th {
    font-family: Oswald;
    font-size: 13px;
    font-weight: normal;
  }
  .roomhotellist td {
    position: relative;
    font-size: 14px;
    line-height: 32px;
    color: #696969;
  }
  .roomhotellist td .tdMask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 101%;
    height: 102%;
  }
  .roomhotellist td .close {
    width: 100%;
    height: 100%;
    background-color: rgba(220, 220, 220, 0.5);
  }
  .roomhotellist .preMask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.8;
  }
  .roomhotellist .tdMask:hover {
    background-color: #d5eeff;
  }
  .roomhotellist td:not(:first-child) {
    cursor: pointer;
  }
  .roomhotellist td .stock {
    display: block;
  }
  .roomhotellist .bianji_block {
    position: absolute;
    top: 60px;
    left: 0;
    transform: translateX(-60%);
    z-index: 7;
    text-align: left;
    border: 1px solid #BFBFBF;
  }
  .roomhotellist .bianji_block {
    background-color: #fff;
    /*box-shadow: #A4A3A3 0 0 100px;*/
    box-shadow: #ccc 0 0 100px;
  }
  .roomhotellist .piliangchange {
    width: 350px;
  }
  .roomhotellist .piliangchange input {
    width: 45px;
    height: 25px;
    margin: 0 2px;
    border: 1px solid #E4E7EC;
    border-radius: 3px;
  }
  .roomhotellist .bianji_block .biaoti-date {
    width: 96%;
    padding-left: 2%;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
  }
  .roomhotellist .bianji_block .pl_date {
    display: block;
    height: 35px;
    line-height: 35px;
  }
  .roomhotellist .bianji_block .xiugai_table {
    margin: 50px 10px 10px 10px;
    border-bottom: 1px solid #797979;
  }
  .roomhotellist .piliangchange .xiugai-guize {
    margin: 10px 5px 30px 5px;
  }
  .roomhotellist .bianji_block .lilist {
    display: inline-block;
    position: relative;
    /*width: 90px;*/
    height: 30px;
    margin-right: 8px;
    font-size: 13px;
  }
  .roomhotellist .bianji_block .pl_input {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 99%;
    text-align: center;
  }
  .roomhotellist .date_leibie {
    text-align: left;
    border-bottom: 1px solid #CCCACA;
  }
  .roomhotellist .date {
    margin: 0 10px 0 8px;
  }
  .roomhotellist .modify_price {
    width: 200px;
    margin: 15px 70px 0 10px;
  }
  .roomhotellist .modify_price .shuru_wrapper {
    display: inline-block;
    position: relative;
    width: 130px;
  }
  .roomhotellist .price_input {
    width: 130px;
    height: 28px;
    margin-left: 8px;
    line-height: 28px;
    vertical-align: top;
    border: 1px solid #CCCACA;
  }
  .roomhotellist .danwei {
    position: absolute;
    top: 0;
    left: 130px;
    z-index: 999;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #C0C0C0;
    border-radius: 3px;
  }
  .roomhotellist .guanbi {
    position: absolute;
    right: 12px;
    top: 6px;
    z-index: 7;
  }
  .roomhotellist .btn_wrapper {
    text-align: center;
  }
  .roomhotellist .btn_wrapper span {
    display: inline-block;
    width: 80px;
    height: 30px;
    margin: 15px 10px;
    line-height: 30px;
    border-radius: 4px;
  }
  .roomhotellist .quxiao {
    border: 1px solid #BFBFBF;
  }
  .roomhotellist .queren {
    color: #fff;
    background-color: #3897DB;
    border: 1px solid #3897DB;
  }
  .right_content input {
    width: 45px;
    height: 25px;
    margin: 0 5px;
    border: 1px solid #E4E7EC;
    border-radius: 3px;
  }
  li {
    font-size: 14px;
    line-height: 30px;
  }
  .plchange_block {
    width: 900px;
    margin: -25px -27px -30px;
  }
  .top-title {
    height: 30px;
    margin-top: -50px;
    line-height: 30px;
    padding: 0 15px 10px 15px;
    font-size: 20px;
    color: #4d4d4d;
    border-bottom: 1px solid #e5e5e5;
 }
.plchange_block .plblock_content {
    display: flex;
    height: 450px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    overflow-y: hidden;
  }
  .plchange_block .left_dh {
    flex: 0 0 190px;
    overflow-y: scroll;
    margin-left: 15px;
    border-right: 1px solid #e5e5e5;
  }
  .plchange_block .right_content {
    position: relative;
    flex: 1;
    padding: 20px;
    overflow-y: scroll;
  }
  .plchange_block .xuanze_date {
    margin: 20px 0;
  }
  .plchange_block .alldata {
    margin-bottom: 20px;
  }
  .plchange_block .el-row {
    margin-bottom: 20px;
  }
  .plchange_block .el-col:first-child {
    text-align: right;
  }
  .el-row i {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin: 10px;
    font-size: 28px;
    color: #616060;
    vertical-align: middle;
    cursor: pointer;
  }
  .plchange_block .alldata .leibie {
    line-height: 35px;
  }
</style>
