<template>
<div class='fangtaiguanli-wrapper'>
  <div class='hotelGoodslist'>
    <el-row>
      <el-col :span="8" class='menu'><span class='title'>房价管理</span></el-col>
      <el-col :span="8" class='menu'>
        <div class='block'>
          <span class='demonstration'>日期</span>
          <el-date-picker
            class='shuru_date'
            v-model='value1'
            type='date'
            placeholder='选择日期'>
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8" class='menu'>
      <a class='anniu'
         href='javascript: '
          @click="centerDialogVisible = true">批量修改价格</a>
      <router-link class='anniu' to='/manage/hotelGoodsAdd'>新增售卖规则</router-link></el-col>
    </el-row>
    <div class='goodsFormlist'>
      <table class='biaoge'>
        <tr>
          <th class='table-th single_th'>房型\日期</th>
          <th class='table-th'
              v-for='(itemth,indexth) in tableth'
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
          <td class='table-td' style='position:relative;'>
            {{itemtr[15]}}
               <el-button
                type="text"
                class='delete-cla'
                title='删除'
                @click='deleteGoods(indexout)'></el-button>
          </td>
          <td class='table-td'
              v-for='(itemtd,indexinto) in itemtr'
              v-if='indexinto < 14'
              :key='indexinto'>
              <div  ref='tdjs'
                    class='tdMask'
                    @mousedown='bianjibegin(indexout,indexinto)'
                    @mouseup='bianjiend(indexout,indexinto)'>
                <div>
                  <span v-if='!itemtd.price'>未设置价格</span>
                  <div v-else>
                    <span class='price'>{{itemtd.price | formatMoney}}</span>
                  </div>
                </div>
              </div>
              <div class='preMask' v-if="parseInt(tableth[indexinto].replace(/-/g, '')) < parseInt(today.replace(/-/g, ''))"></div>
            <div class='bianji-block'
                 ref='bianjiBlock'
                 style='display: none;'>
                 <div v-show='singleChange'>
                    <div class='date-leibie'>
                      <span class='date'>{{tableth[indexinto] | formatTime}}</span>
                      <span class='leibie'>{{itemtr[15]}}</span>
                    </div>
                    <div class='modify-price'>
                      <span class='modify-text'>修改价格</span>
                      <span class='shuru-wrapper'>
                        <input ref='kXInput'
                               class='price-input'
                               type='text'
                               v-model='changednum'>
                               <button class='danwei'>元/间夜</button>
                      </span>
                    </div>
                    <div class='btn-wrapper'>
                      <span class='quxiao'
                            @click='guanbi()'>取消</span>
                      <span class='queren'
                            @click='queren(changednum,itemtr,indexout,indexinto)'>确认</span>
                    </div>
                 </div>
                 <div v-show='pilaingChange'
                      class='piliangchange'>
                   <span class='pl-date'>{{tableth[beginDateIndex] | formatTime}} ~ {{tableth[endDateIndex] | formatTime}}</span>
                    <table class='xiugai-table'>
                      <tr class='plxg-table'>
                        <th class='lilist'>房型</th>
                        <th class='lilist'>行价(元/间夜)</th>
                      </tr>
                      <tr class='plxg-table'
                          v-for='(item,index) in clickArr'>
                        <td class='lilist'>{{tablebody[item][15]}}</td>
                        <td class='lilist'>
                        <input ref='kXInput'
                               type='text'
                               class='pl_input'
                               v-model='dijiaobj[index]'></td>
                      </tr>
                    </table>
                    <div class='btn-wrapper'>
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
      width="920px"
      center>
      <div class='plchange_block'>
        <div class='top-title'>批量修改价格</div>
        <div class='plblock_content'>
          <div class='left_dh'>
            <el-tree
              :data="leftFenlei"
              :indent="5"
              accordion
              show-checkbox
              node-key="id"
              @check-change="handleCheckChange">
            </el-tree>
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
              <span class='add' style='position: absolute;top: 45px;right: 156px;'>
                <i class="el-icon-circle-plus-outline"
                   @click="addDate"></i>
              </span>
            </div>
             <div class='alldata'>
                 <el-row>
                  <el-col :span="4">适用星期*：&nbsp;&nbsp;&nbsp;</el-col>
                  <el-col :span="20">
                    <el-checkbox-group
                      v-model="checkedweek">
                      <el-checkbox v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <div class='table_wrapper'>
                  <table border='1'>
                    <tr>
                      <th>售卖房型</th>
                      <th>执行价(元/间夜)</th>
                    </tr>
                    <tr v-for='(item, inIndex) in alldata'
                        :key='inIndex'>
                      <td>{{item.label}}</td>
                      <td>
                        <input type='text'
                               v-model='alldata[inIndex].price'
                               placeholder='不填写则不做修改'></td>
                    </tr>
                  </table>
                </div>
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
  import {getPriceInfo, plhotelTree, chuanruPrice, kxChangePrice, plChangePrice, delGoods} from '@/api/getData.js'
  import {formatDate, fmtDate, transfToNumFn, transforStrFn} from '@/config/mUtils.js'
  const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    data () {
      return {
        hotelId: '',
        leftFenlei: [],
        value1: '',
        tableth: [],
        thWeeks: week,
        tablebody: [],
        newxinxi: {},
        singleChange: false,
        pilaingChange: false,
        changednum: '',
        Num: '',
        beginZuoBiao: '',
        beginDateIndex: '',
        endDateIndex: '',
        endZuoBiao: '',
        x1: '',
        x2: '',
        y1: '',
        y2: '',
        clickArr: [],
        dijiaobj: [],
        today: '',
        centerDialogVisible: false,
        alldata: [],
        listobj: {},
        qzdatetime: '',
        radio2: 1,
        weeks: weekOptions,
        checkedweek: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        qzdateArr: [],
        dateWeeks: {
          firstDayOfWeek: 1
        },
        jinyong: false,
        yijiDate: []
      }
    },
    created: function () {
      this.value1 = new Date()
      this.qzdateArr = [
        {qzdatetime: ''}
      ]
      this.initFn()
    },
    mounted: function () {
      this.$nextTick(() => {
        this.getGoodsTreeList()
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
      value1: function () {
        this.getGoodsList()
      }
    },
    methods: {
      initFn: function () {
        this.hotelId = this.$store.state.hotelId
        let year = this.value1.getFullYear()
        let month = (this.value1.getMonth() + 1)
        let day = this.value1.getDate()
        month = month >= 10 ? month : '0' + month
        day = day >= 10 ? day : '0' + day
        this.today = year + '-' + month + '-' + day
      },
      // 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      handleCheckChange (data, checked, indeterminate) {
        if (checked) {
          if (data.children) {
            for (let i = 0; i < data.children.length; i++) {
              if (this.alldata.indexOf(data.children[i]) < 0) {
                this.alldata.push(data.children[i])
              }
            }
          } else {
            if (this.alldata.indexOf(data) < 0) {
              this.alldata.push(data)
            }
          }
        } else if (!checked && !indeterminate) {
          if (data.children) {
            for (let i = 0; i < data.children.length; i++) {
              if (this.alldata.indexOf(data.children[i]) !== -1) {
                this.alldata.splice(this.alldata.indexOf(data.children[i]), 1)
              }
            }
          } else {
            if (this.alldata.indexOf(data) !== -1) {
              this.alldata.splice(this.alldata.indexOf(data), 1)
            }
          }
        }
        // console.log(data, checked, indeterminate)
      },
      getGoodsTreeList: function () {
        plhotelTree(this.hotelId).then(res => {
          this.leftFenlei = res.data.data
        })
      },
      getGoodsList: function () {
        this.tablebody = []
        this.tableth = []
        let time = fmtDate(this.value1)
        getPriceInfo(this.hotelId, time).then(res => {
          this.newxinxi = res.data.data
          this.getTdArr()
        })
      },
      // 把表头和表单内容转化为数组形式
      getTdArr: function () {
        let itemTdArr = []
        for (let i = 0; i < this.newxinxi.length; i++) {
          itemTdArr = []
          for (let j in this.newxinxi[i]) {
            itemTdArr.push(this.newxinxi[i][j])
          }
          this.tablebody.push(itemTdArr)
        }
        for (let k in this.newxinxi[0]) {
          this.tableth.push(k)
        }
        // console.log(this.tablebody)
      },
      deleteGoods: function (index) {
        let goodsId = this.tablebody[index][14]
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delGoods(goodsId).then(res => {
            if (res.data.state === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getGoodsList()
            }
          })
        }).catch(() => {})
      },
      // 点击非选中的地区颜色改变
      hiddenBgColorFn: function () {
        for (let i = 0; i < this.$refs.tdjs.length; i++) {
          this.$refs.tdjs[i].style.backgroundColor = ''
        }
      },
      // 清空input
      clearInputValue: function () {
        let kXInput = this.$refs.kXInput
        for (let i = 0; i < kXInput.length; i++) {
          kXInput[i].value = ''
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
        this.clearInputValue()
        this.chageTdBg('')
        let bianjiBlock = this.$refs.bianjiBlock
        this.singleChange = false
        this.pilaingChange = false // 初始化
        this.x2 = indexout
        this.y2 = indexinto
        this.endDateIndex = this.y2
        this.endZuoBiao = this.clickindex(this.x2, this.y2)
        this.$refs.tdjs[this.endZuoBiao].style.backgroundColor = '#d5eeff'
        this.hidden(bianjiBlock) // 消除所有td点击
        if (this.beginZuoBiao !== this.endZuoBiao) { // 判断不是单点时
          this.chageTdBg('#d5eeff') // 点击后变色
          this.pilaingChange = true
        } else {
          this.chageTdBg('')
          this.singleChange = true
          this.chageTdBg('#d5eeff')
        }
        bianjiBlock[this.endZuoBiao].style.display = 'block'
      },
      // 批量发送修改价格
      plqueren: function () {
        for (let i = 0; i < this.clickArr.length; i++) {
          if (!this.dijiaobj[i]) {
            this.$notify.error({
              title: '修改失败',
              message: '请输入要修改的价格',
              duration: 1000,
              position: 'top-right'
            })
            return
          }
        }
        let startDate = Date.parse(this.tableth[this.beginDateIndex].replace(/-/g, '/'))
        let endDate = Date.parse(this.tableth[this.endDateIndex].replace(/-/g, '/'))
        let arr = []
        for (let i = 0; i < this.clickArr.length; i++) {
          arr.push({goodsId: this.tablebody[this.clickArr[i]][14], price: this.dijiaobj[i], startDate: startDate, endDate: endDate})
        }
        let kuangxuanDate = {priceRuleList: arr}
        kxChangePrice(kuangxuanDate).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.getGoodsList()
            for (let i = 0; i < this.clickArr.length; i++) {
              this.dijiaobj[i] = ''
            }
          }
        })
      },
      // 发送单个修改后的价格/库存给后台
      queren: function (changednum, itemtr, indexout, indexinto) {
        this.Num = changednum
        let Id = itemtr[14]
        let datetime = this.tableth[indexinto]
        // 当时房价管理时
        if (!changednum) {
          this.$notify.error({
            title: '修改失败',
            message: '请输入要修改的价格',
            duration: 1000,
            position: 'top-right'
          })
          return
        }
        chuanruPrice(Id, datetime, this.Num, 3).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.guanbi()
            this.tablebody[indexout][indexinto].price = this.Num
            this.changednum = ''
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
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
      showdh: function (index) {
        let jserjidh = this.$refs.jserjidh
        if (jserjidh[index].style.display === 'none') {
          jserjidh[index].style.display = 'block'
        } else {
          jserjidh[index].style.display = 'none'
        }
      },
      // 把星期数组转化成星期字符串
      toWeekSrtFn: function () {
        for (let j = 0; j < this.checkedweek.length; j++) {
          this.checkedweek[j] = transfToNumFn(this.checkedweek[j])
        }
        return this.checkedweek.join('')
      },
      // 把时间段转化成转化成后台需要的数据
      toDatetimeFn: function () {
        let newqzdateArr = new Array(this.qzdateArr.length)
        for (let i = 0; i < this.qzdateArr.length; i++) {
          // if (this.qzdateArr[i].qzdatetime) {
          for (let j = 0; j < this.qzdateArr[i].qzdatetime.length; j++) {
            let datetime = this.qzdateArr[i].qzdatetime[j]
            this.qzdateArr[i].qzdatetime[j] = Date.parse(datetime)
            newqzdateArr[i] = {
              start: this.qzdateArr[i].qzdatetime[0],
              end: this.qzdateArr[i].qzdatetime[1]
            }
          }
          // }
        }
        return newqzdateArr
      },
      tijiao: function () {
        if (!this.alldata.length) {
          this.$notify.error({
            title: '提交失败',
            message: '请选择房型',
            duration: 1000,
            position: 'bottom-right'
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
        } else {
          this.listobj = {list: this.alldata}
          if (this.radio2 === 2) {
            this.listobj.rtype = '3'
            this.listobj.times = this.toDatetimeFn()
          } else {
            this.listobj.rtype = '1'
          }
          this.listobj.weeks = this.toWeekSrtFn()
          this.jinyong = true
          this.sentListFjFn(this.listobj)
        }
      },
      // 发送房价修改信息
      sentListFjFn: function (list) {
        plChangePrice(list).then(res => {
          if (res.data.state === 1) {
            this.centerDialogVisible = false
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.getGoodsList()
            for (let i = 0; i < this.alldata.length; i++) {
              this.alldata[i].price = ''
            }
            this.qzdateArr = [
              {qzdatetime: ''}
            ]
            this.jinyong = false
            this.toUpdateWeek()
            // this.alldata = []
            this.listobj = {}
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
    width: 96%;
/*    margin: 0 auto;*/
    background-color: #fff;
  }
  .hotelGoodslist {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 200px;
    background-color: #fff;
  }
  .hotelGoodslist .menu {
    height: 60px;
    line-height: 90px;
  }
  .hotelGoodslist .menu .title {
    margin-left: 25px;
  }
  .hotelGoodslist .menu:last-child {
    text-align: right;
  }
  .hotelGoodslist .menu .anniu {
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
  .goodsFormlist {
    margin: 0 auto;
    padding-bottom: 50px;
    background-color: #fff;
    border: 25px solid rgba(0,0,0,0);
    -moz-user-select: none; /*让网页中的字不被复制 火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
  .goodsFormlist .bianji-block #singletd {
    width: 100px;
  }
  .goodsFormlist .biaoge {
    width: 100%;
    margin: 0 auto;
    border-collapse:collapse;
    border: 2px solid #EBEEF5;
  }
  .goodsFormlist .single_th {
    position: relative;
  }
  .goodsFormlist th, .goodsFormlist td {
    padding: 0 1px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #EBEEF5;
  }
  .goodsFormlist .table-th, .goodsFormlist .table-td {
    height: 60px;
  }
  .goodsFormlist th {
    font-family: Oswald;
    font-size: 13px;
    font-weight: normal;
  }
  .goodsFormlist td {
    position: relative;
    font-size: 14px;
    color: #696969;
  }
  .goodsFormlist .table-td {
    line-height: 32px;
  }
  .goodsFormlist .table-td .delete-cla {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 32px;
    height: 32px;
    background-image: url('delete_1.png');
    background-repeat: no-repeat;
  }
  .goodsFormlist .table-td .delete-cla:hover {
    background-image: url('delete_2.png');
  }
  .goodsFormlist .table-td .tdMask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 101%;
    height: 102%;
  }
  .goodsFormlist .preMask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.8;
  }
  .goodsFormlist .tdMask:hover {
    background-color: #d5eeff;
  }
  .goodsFormlist td:not(:first-child) {
    cursor: pointer;
  }
  .goodsFormlist td .price {
    display: block;
    color: #01E10F;
  }
  .goodsFormlist .bianji-block {
    position: absolute;
    top: 60px;
    left: 0;
    transform: translateX(-50%);
    z-index: 8;
    text-align: left;
    border: 1px solid #BFBFBF;
  }
  .goodsFormlist .bianji-block {
    background-color: #fff;
    box-shadow: #A4A3A3 0 0 100px;
  }
  .goodsFormlist .piliangchange {
    max-height: 280px;
    overflow-y: scroll;
  }
  .goodsFormlist .bianji-block .pl-date {
    display: block;
    width: 90%;
    height: 35px;
    line-height: 35px;
    margin: 0 auto;
    padding-left: 8px;
    border-bottom: 1px solid #ccc;
  }
  .goodsFormlist .bianji-block .xiugai-table {
    margin: 20px 10px 10px 10px;
    border-collapse:collapse;
    border: 1px solid #EBEEF5;
  }
  .goodsFormlist .piliangchange .plxg-table {
    display: flex;
    width: 260px;
    text-align: center;
    font-size: 0;
  }
  .goodsFormlist .piliangchange th {
    font-weight: bold;
  }
  .goodsFormlist .bianji-block .lilist {
    flex: 1;
    position: relative;
    font-size: 13px;
    line-height: 30px;
  }
  .goodsFormlist .bianji-block .pl_input {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 99%;
    text-align: center;
  }
  .goodsFormlist .date-leibie {
    text-align: left;
    border-bottom: 1px solid #CCCACA;
  }
  .goodsFormlist .date {
    margin: 0 10px 0 8px;
  }
  .goodsFormlist .modify-price {
    width: 200px;
    margin: 15px 70px 0 10px;
  }
  .goodsFormlist .modify-price .shuru-wrapper {
    display: inline-block;
    position: relative;
    width: 130px;
  }
  .goodsFormlist .price-input {
    width: 130px;
    height: 28px;
    margin-left: 8px;
    line-height: 28px;
    vertical-align: top;
    border: 1px solid #CCCACA;
  }
  .goodsFormlist .danwei {
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
  .goodsFormlist .guanbi {
    position: absolute;
    right: 12px;
    top: 6px;
    z-index: 8;
    font-weight: bold;
  }
  .goodsFormlist .btn-wrapper {
    text-align: center;
  }
  .goodsFormlist .btn-wrapper span {
    display: inline-block;
    width: 80px;
    height: 30px;
    margin: 15px 10px;
    line-height: 30px;
    border-radius: 4px;
  }
  .goodsFormlist .quxiao {
    border: 1px solid #BFBFBF;
  }
  .goodsFormlist .queren {
    color: #fff;
    background-color: #3897DB;
    border: 1px solid #3897DB;
  }
  li {
    font-size: 14px;
    line-height: 30px;
  }
 .plchange_block {
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
    height: 550px;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
  }
 .plchange_block .left_dh {
    flex: 0 0 230px;
    overflow-y: scroll;
    border-right: 1px solid #e5e5e5;
  }
 .plchange_block .right_content {
    position: relative;
    flex: 1;
    overflow-y: scroll;
  }
 .right_content input {
    text-align: center;
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
 .table_wrapper {
    margin-bottom: 30px;
  }
 .plchange_block table {
    margin: 15px auto;
    border-collapse:collapse;
  }
 .plchange_block th,.plchange_block td {
    width: 160px;
    height: 35px;
    text-align: center;
    border: 1px solid #BBBBBB;
  }
 .plchange_block th {
    background-color: #F5F7FA;
    color: #909399;
  }
 .plchange_block td {
    color: #4C4A4A;
  }
  </style>
