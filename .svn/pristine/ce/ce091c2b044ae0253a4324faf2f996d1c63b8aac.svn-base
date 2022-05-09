<template>
  <div class='caiwuguanli_wrapper'>
    <div class='caiwuguanli'>
      <div class='dongtai'>
        <div class='caiwu_inbox'>
          <div class='dongtai_biti'><i></i>最新动态</div>
          <ul class='dongtai_neirong'>
            <li class='list'
                v-for='item in dongtailist'>
              <span class='neirong'>{{item.neirong}}</span>
              <span class='datetime'>{{item.datetime}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class='caiwuzhuangkuang'>
        <div class='caiwu_inbox'>
          <div class='dongtai_biti'><i></i>财务状况</div>
          <div class='canuse_money'>
            <span class='title'>可提现</span>
            <div class='money_info'>
              <spn class='jiage'>￥0.0</spn>
              <span class='tixian_wrapper'>
                <el-button
                  type="text"
                  class='btn'
                  @click="dialogVisible = true">提现</el-button><a href='javascript: '>查看收款账户</a>
              </span>
            </div>
          </div>
          <div class='will_invoice'>
            <span class='title'>待开票</span>
            <div class='invoice_info'>
              <ul>
                <li>需开具增值税专用发票</li>
                <li>金额总计</li>
              </ul>
              <div class='involice_btn'>
                <a href='javascript:'>查看开票信息</a>
                <a href='javascript:'>查看明细</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="收款信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
          <el-row>
            <el-col :span="4"
                    offset='2'>
              选择收款方式*：&nbsp;&nbsp;
            </el-col>
            <el-col :span="15">
              <el-radio v-model="payMode" label="101">对公账号</el-radio>
              <el-radio disabled v-model="payMode" label="102">个人账号</el-radio>
              <el-radio disabled v-model="payMode" label="1033">支付宝</el-radio>
              <el-radio disabled v-model="payMode" label="104">微信</el-radio>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="18"
                    offset="2">
             <el-form v-if="account" :model="account" :rules="rules" ref="account" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户名称" prop="accountName">
                  <el-input v-model="account.accountName" placeholder="请输入账户名称"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" prop="accountNum">
                  <el-input v-model="account.accountNum" placeholder="请输入银行账号"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" prop="depositBankStr">
                  <el-select v-model="account.depositBankStr" placeholder="请选择" @change="sentBankName">
                    <el-option
                      v-if='banOptions'
                      v-for="item in banOptions"
                      :key="item.bankName"
                      :label="item.bankName"
                      :value="item.bin">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支行" prop="subBank">
                  <el-input v-model="account.subBank" placeholder="请输入支行"></el-input>
                </el-form-item>
                <el-form-item label="银行行号" prop="bankCode">
                  <el-input v-model="account.bankCode" placeholder="请输入银行行号"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary">
            <span @click="sentBankData('account')">确定/提交变更申请</span>
          </el-button>
        </span>
      </el-dialog>
    </div>
    <div class='datatable_box'>
      <el-tabs class='tabs' v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账单列表" name="first">
          <ul class='search_dingdan'>
            <li>
              <label>账单状态</label>
              <select v-model='selected'>
                <option v-for='(item,index) in pagenum'
                        :key='index'
                        :value='item.status'>{{item.text}}</option>
              </select>
            </li>
            <li>
              <div class="block">
                <el-date-picker
                  v-model="valueTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="账单开始日期"
                  end-placeholder="账单结束日期">
                </el-date-picker>
              </div>
            </li>
            <li>
              <label for='search'>账单号</label>
              <input  type='text'
                      id='search'
                      v-model='search'>
              <button class='chaxuncla'
                      @click='searchOrder()'>查询</button></li>
          </ul>
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column prop="billNo" label="账单号"></el-table-column>
            <el-table-column prop="beginEndTime" label="账单日期"></el-table-column>
            <el-table-column prop="orderCount" label="订单数"></el-table-column>
            <el-table-column prop="orderMoney" label="订单金额"></el-table-column>
            <el-table-column prop="commMoney" label="扣除佣金"></el-table-column>
            <el-table-column prop="actualMoney" label="实结金额"></el-table-column>
            <el-table-column prop="commMoney" label="发票信息"></el-table-column>
            <el-table-column prop="billStatus" label="操作">
              <template slot-scope="scope">
                <a @click="handleEdit(scope.$index,scope.row.billStatus)"
                   style='cursor: pointer;'>账单详情</a>
                <a v-if='scope.row.zhuangtai < 7'
                   style='color: #ffa200;'>{{ scope.row.zhuangtai }}</a>
                <a v-else>{{ scope.row.zhuangtai }}</a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="账单列表2" name="second">账单列表2</el-tab-pane> -->
      </el-tabs>
      <el-pagination
        class='fanye'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-count="pageCount"
        layout="prev, pager, next, jumper"
        >
      </el-pagination>
    </div>
    <el-dialog width="80%" :visible.sync="dialogTableVisible">
      <div class='zhangdanDetail_wrpper'>
        <div class='headerDetail'>
          <div class='left_info'>
            <span class='title'>账单详情</span>
            <span class='danhao'>{{order}}</span>
            <span class='xiazai'>（{{startTime | formatTime}} ~ {{endTime | formatTime}}）</span>
            <!-- <a href="javascript: ">下载账单</a> -->
          </div>
        </div>
        <el-steps :active="status" align-center style='margin: 24px 0;'>
          <el-step title="生成订单"></el-step>
          <el-step title="申请体现"></el-step>
          <el-step title="财务审核"></el-step>
          <el-step title="银行支付"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <div class='middle_content'>
          <ul class='right_content'>
            <li class='tixian_detail'>
              <div class='tixian'>
                <button>提现</button>
              </div>
              <div><a href="javascript: ">查看收款账号</a></div>
            </li>
            <li class='tixian_detail'>
              <ul>
                <li class='fabiao_tishi'>需开具增值税专用发票金额总计:</li>
                <li class='shuju'>
                  <strong>￥0:00</strong>
                </li>
                <li>
                  <a href="javascript: ">查看</a>
                  <a href="javascript: ">查看明细</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class='left_content'>
            <li class='ordermoney_detail'>
              <div class='miaoshu'>订单总额</div>
              <div class='shuju'><strong>{{finance.orderMoney | formatMoney}}</strong></div>
            </li>
            <li class='ordermoney_detail'>
              <div class='miaoshu'>
                扣除佣金
              </div>
              <div class='shuju'><strong>{{finance.commMoney | formatMoney}}</strong></div>
            </li>
            <li class='ordermoney_detail'>
              <div class='miaoshu'>
                实结金额
              </div>
              <div class='shuju'><strong>{{finance.actualMoney | formatMoney}}</strong></div>
            </li>
          </ul>
        </div>
        <div style='margin: 30px 0 0 20px;'>订单(共)</div>
        <el-table
          :data="tableData"
          stripe
          style="width: 99%;margin: 0 auto;">
          <el-table-column prop="orderNum" label="订单号"></el-table-column>
          <el-table-column prop="roomTypeName" label="房型"></el-table-column>
          <el-table-column prop="nickName" label="姓名" ></el-table-column>
          <el-table-column prop="goodsNum" label="间夜数"></el-table-column>
          <el-table-column prop="orderStartDate" label="预定日期"></el-table-column>
          <el-table-column prop="orderMoney" label="订单金额"></el-table-column>
          <el-table-column prop="orderYongjin" label="佣金"></el-table-column>
          <el-table-column prop="basicMoney" label="实结金额"></el-table-column>
        </el-table>
          <el-pagination
            class='fanye'
            @size-change="handleSizeChangeDetail"
            @current-change="handleCurrentChangeDetail"
            :current-page.sync="currentPage3"
            layout="prev, pager, next, jumper"
            :page-count="pageCountDetail">
          </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import {caiwuGuanli, getBankData, addBankData, findAccount, caiwuDetail, readMessage} from '@/api/getData.js'
  import {formatDate} from '@/config/mUtils.js'
  const qs = require('qs')
  export default {
    data () {
      return {
        type: '',
        account: {},
        dialogVisible: false,
        dialogTableVisible: false,
        userId: '',
        payMode: '101',
        dongtailist: [],
        banOptions: [],
        accountName: '',
        accountNum: '',
        depositBank: '',
        subBank: '',
        bankCode: '',
        clickindex: '',
        id: '',
        order: '',
        startTime: '',
        endTime: '',
        activeName: 'first',
        rules: {
          accountName: [
            {required: true, message: '请输入账户名称', trigger: 'blur'}
          ],
          accountNum: [
            {required: true, message: '请输入银行账户', trigger: 'blur'}
          ],
          depositBankStr: [
            {required: true, message: '请选择开户银行', trigger: 'blur'}
          ],
          subBank: [
            {required: true, message: '请输入支行', trigger: 'blur'}
          ],
          bankCode: [
            {required: true, message: '请输入银行行号', trigger: 'blur'}
          ]
        },
        pagenum: [{
          status: 0,
          text: '全部'
        }, {
          status: 1,
          text: '待提现'
        }, {
          status: 3,
          text: '审核中'
        }, {
          status: 4,
          text: '支付成功'
        }, {
          status: 5,
          text: '支付失败'
        }, {
          status: 6,
          text: '未出账单'
        }],
        selected: 0,
        tableData1: [],
        beginEndTime: '',
        search: '',
        valueTime: [],
        searchStartTime: '',
        searchendtTime: '',
        shopId: '',
        creatorId: '',
        pageNum: 1,
        pageSize: 5,
        pageCount: '',
        pageCountDetail: '',
        tableData: [],
        orderIndex: '',
        finance: {},
        status: ''
      }
    },
    created: function () {
      this.shopId = this.$store.state.hotelId
      this.creatorId = this.$store.state.user.nickName
    },
    filters: {
      formatTime: function (houtaiTime) {
        return formatDate(houtaiTime, 'YYYY-MM-DD')
      },
      formatMoney: function (value) {
        return '￥' + value
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.getValue()
        this.initfind()
        getBankData().then(res => {
          this.banOptions = res.data.data
        })
        this.getdongtailist()
        this.caiwuListFn(this.shopId, this.pageNum, this.pageSize)
      })
    },
    methods: {
      sentBankName: function (val) {
        this.depositBank = val
      },
      initfind: function () {
        findAccount(this.shopId).then(res => {
          this.account = res.data.data
          if (this.account.id) {
            this.userId = this.account.id
          }
        })
      },
      getValue: function () {
        this.type = this.$route.query.finan
      },
      handleClose: function (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.initfind()
            done()
          })
          .catch(_ => {})
      },
      cancel: function () {
        this.initfind()
        this.dialogVisible = false
      },
      sentBankData: function (formName) {
        this.accountName = this.account.accountName
        this.accountNum = this.account.accountNum
        this.subBank = this.account.subBank
        this.bankCode = this.account.bankCode
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addBankData(this.userId, this.creatorId, this.shopId, this.payMode, this.accountName, this.accountNum, this.depositBank, this.subBank, this.bankCode).then(res => {
              if (res.data.state === 1) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
                this.dialogVisible = false
              }
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '请完善表单',
              duration: 1000,
              position: 'bottom-right'
            })
            return false
          }
        })
      },
      caiwuListFn: function (shopId, pageNum, pageSize) {
        caiwuGuanli(shopId, pageNum, pageSize).then(res => {
          this.pageCount = res.data.pageCount
          this.tableData1 = res.data.data.list
          this.setDateYongjin()
        })
      },
      // 封装转换财务时间和佣金
      setDateYongjin: function () {
        for (let i = 0; i < this.tableData1.length; i++) {
          let sTime = formatDate(this.tableData1[i].startTime, 'YYYY-MM-DD')
          let eTime = formatDate(this.tableData1[i].endTime, 'YYYY-MM-DD')
          this.tableData1[i]['beginEndTime'] = sTime + '~' + eTime
          // this.tableData1[i]['yongjin'] = this.tableData1[i].actualAmounts - this.tableData1[i].orderMoney
        }
        this.setbillStatus()
      },
      // 封装状态
      setbillStatus: function () {
        for (let i = 0; i < this.tableData1.length; i++) {
          if (this.tableData1[i].billStatus === 1) {
            this.tableData1[i]['zhuangtai'] = '待提现'
          } else if (this.tableData1[i].billStatus === 3) {
            this.tableData1[i]['zhuangtai'] = '审核中'
          } else if (this.tableData1[i].billStatus === 4) {
            this.tableData1[i]['zhuangtai'] = '支付中'
          } else if (this.tableData1[i].billStatus === 5) {
            this.tableData1[i]['zhuangtai'] = '支付成功'
          } else if (this.tableData1[i].billStatus === 6) {
            this.tableData1[i]['zhuangtai'] = '支付失败'
          } else if (this.tableData1[i].billStatus === 7) {
            this.tableData1[i]['zhuangtai'] = '未出账单'
          }
        }
      },
      // 搜索功能
      searchOrder: function () {
        if (this.valueTime) {
          if (this.valueTime.length > 0) {
            for (let i = 0; i < this.valueTime.length; i++) {
              let datetime = this.valueTime[i]
              this.valueTime[i] = formatDate(Date.parse(datetime), 'YYYY-MM-DD')
            }
            this.searchStartTime = this.valueTime[0]
            this.searchendtTime = this.valueTime[1]
          }
        }
        axios.post('/finance/search', qs.stringify({
          sellerId: this.shopId,
          billNo: this.search,
          startTime: this.searchStartTime,
          endTime: this.searchendtTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          billStatus: this.selected})
        ).then(res => {
          this.tableData1 = res.data.data.list
          this.setDateYongjin()
        })
      },
      handleEdit: function (suoyin, status) {
        this.dialogTableVisible = true
        this.clickindex = suoyin
        this.id = this.tableData1[this.clickindex].id
        this.order = this.tableData1[this.clickindex].billNo
        this.startTime = this.tableData1[this.clickindex].createTime
        this.endTime = this.tableData1[this.clickindex].endTime
        this.getzhangdanDetail(this.id, this.pageNum, this.pageSize)
        this.status = status
      },
      getzhangdanDetail: function (id, pageNum, pageSize) {
        caiwuDetail(id, pageNum, pageSize).then(res => {
          this.tableData = res.data.data.order
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i]['orderStartDate'] = formatDate(this.tableData[i].orderTime, 'YYYY-MM-DD')
            this.tableData[i]['orderYongjin'] = this.tableData[i].orderMoney - this.tableData[i].basicMoney
          }
          this.finance = res.data.data.finance
          this.pageCountDetail = res.data.pageCount
        })
      },
      // 财务信息列表翻页功能
      handleCurrentChange: function (val) {
        this.caiwuListFn(this.shopId, val, this.pageSize)
      },
      // 财务详情翻页功能
      handleCurrentChangeDetail: function (val) {
        this.getzhangdanDetail(this.id, val, this.pageSize)
      },
      getdongtailist: function () {
        this.dongtailist = [{
          'neirong': '10月提现已通过对公帐号转账，点击查找进度。',
          'datetime': '11-12'
        }, {
          'neirong': '10月提现已通过对公帐号转账，点击查找进度。',
          'datetime': '11-12'
        }, {
          'neirong': '10月提现已通过对公帐号转账，点击查找进度。',
          'datetime': '11-12'
        }, {
          'neirong': '10月提现已通过对公帐号转账，点击查找进度。',
          'datetime': '11-12'
        }]
      }
    },
    watch: {
      type: function () {
        readMessage(this.shopId, this.type).then(res => {})
      }
    }
  }
</script>
<style scoped>
  .caiwuguanli {
    display: flex;
    width: 98%;
    min-width: 1100px;
    font-size: 14px;
  }
  .datatable_box {
    width: 98%;
    margin-top: 20px;
    background-color: #fff;
  }
  .datatable_box .tabs {
    line-height: 35px;
    padding: 10px;
  }
  i {
    display: inline-block;
    width: 35px;
    height: 35px;
    margin-right: 11px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .dongtai, .caiwuzhuangkuang {
    height: 200px;
    background-color: #fff;
    border-radius: 3px;
  }
  .caiwu_inbox {
    margin: 15px 0 0 12px;
  }
  .dongtai {
    flex: 0 0 35%;
    min-width: 358px;
  }
  .dongtai i {
    background-color: #3797db;
  }
  .dongtai .dongtai_biti,.dongtai .list {
    height: 35px;
    line-height: 35px;
    color: #4c4c4c;
  }
  .dongtai .dongtai_biti {
    font-size: 20px;
  }
  .dongtai .dongtai_neirong {
    font-size: 14px;
  }
  .caiwuzhuangkuang {
    flex: 0 0 63%;
    min-width: 698px;
    margin-left: 2%;
  }
  .caiwuzhuangkuang i {
    background-color: #ffa200;
  }
  .caiwuzhuangkuang a {
    font-size: 14px;
    color: #3797db;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .caiwuzhuangkuang .canuse_money {
    float: left;
    margin-left: 46px;
    border-right: 1px solid #b3b3b3;
  }
  .caiwuzhuangkuang .will_invoice {
    float: right;
    margin-right: 108px;
  }
  .caiwuzhuangkuang .title {
    display: block;
    margin-top: 20px;
    font-size: 16px;
  }
  .caiwuzhuangkuang .canuse_money .jiage {
    vertical-align: top;
    font-size: 40px;
    color: #ffa200;
  }
  .caiwuzhuangkuang .canuse_money .title {
    margin: 20px 0 36px 0;
  }
  .caiwuzhuangkuang .will_invoice .title {
    margin-bottom: 7px;
  }
  .caiwuzhuangkuang .will_invoice li {
    height: 30px;
    line-height: 30px;
  }
  .caiwuzhuangkuang .money_info {
    height: 52px;
    margin: 36px 31px 0 0;
  }
  .caiwuzhuangkuang .canuse_money .tixian_wrapper {
    display: inline-block;
    margin: 0 31px 0 40px;
  }
  .caiwuzhuangkuang .canuse_money .btn {
    display: inline-block;
    width: 85px;
    height: 30px;
    line-height: 0;
    border-radius: 3px;
    background-color: #ffa200;
    margin-bottom: 8px;
    color: #fff;

  }
  .caiwuzhuangkuang .canuse_money .tixian_wrapper  a {
    display: block;
  }
  .caiwuguanli_wrapper .search_dingdan {
    display: flex;
    height: 60px;
    padding-left: 10px;
    color: #8f8f8f;
    line-height: 60px;
    border-top: 0;
    border-bottom: 0;
    font-family: Oswald;
    padding-right: 10%;
    font-size: 14px;
  }
  .datatable_box .search_dingdan .chaxuncla {
    width: 60px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    background-color: #3797db;
    border-radius: 3px;
  }
  .datatable_box .search_dingdan li {
    flex: 1;
    padding-left: 11px;
  }
  .datatable_box label {
    margin-right: 11px;
  }
  .datatable_box .search_dingdan select {
    height: 30px;
    padding: 0 10px 0 20px;
    line-height: 30px;
    border: 1px solid #c9c9c9;
  }
  .datatable_box .search_dingdan input {
    /*width: 180px;*/
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 0 1px 0 #fff;
    background-color: #fff;
  }
  .datatable_box a {
    color: #3797Db;
  }
  .caiwuguanli_wrapper .fanye {
    padding: 30px 15px 20px 0;
    text-align: right;
  }
  .zhangdanDetail_wrpper {
    /*max-width: 1065px;*/
    margin-top: -50px;
    color: #4c4c4c;
    background-color: #fff;
  }
  .zhangdanDetail_wrpper .headerDetail {
    width: 99%;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid #bfbfbf;
  }
  .zhangdanDetail_wrpper .middle_content {
    /*width: 928px;*/
    height: 170px;
    margin: 0 auto;
    padding: 0 47px 0 25px;
    background-color: #f2f2f2;
    border: 1px solid #8d8d8d;
  }
  .zhangdanDetail_wrpper .guanbi {
    float: right;
    margin-right: 30px;
    font-weight: bold;
    cursor: pointer;
  }
  .zhangdanDetail_wrpper .left_content {
    height: 135px;
    margin-top: 50px;
  }
  .zhangdanDetail_wrpper .right_content {
    float: right;
    height: 170px;
  }
  .zhangdanDetail_wrpper .shuju {
    color: #ffa200;
  }
  .zhangdanDetail_wrpper .left_content .ordermoney_detail,.zhangdanDetail_wrpper .right_content .tixian_detail {
    display: inline-block;
  }
  .zhangdanDetail_wrpper .right_content .fabiao_tishi {
    margin-bottom: 15px;
  }
  .zhangdanDetail_wrpper .right_content .shuju {
    margin-bottom: 14px;
    font-size: 20px;
  }
  .zhangdanDetail_wrpper .right_content .tixian_detail:first-child {
    height: 64px;
    margin: 15.5px 43px 0 0;
    padding: 35.5px 24px 35.5px 0;
    border-right: 1px solid #999;
  }
  .zhangdanDetail_wrpper .left_content .ordermoney_detail:nth-child(2) {
    margin: 0 92px;
  }
  .zhangdanDetail_wrpper .left_content .miaoshu {
    margin-bottom: 40px;
    font-size: 16px;
  }
  .zhangdanDetail_wrpper .left_content .shuju {
    margin-bottom: 40px;
    font-size: 24px;
    text-align: center;
  }
  .zhangdanDetail_wrpper .left_content .tixian {
    margin: 60px 0 15px 0;
  }
  .zhangdanDetail_wrpper .tixian button {
    width: 85px;
    height: 35px;
    margin-bottom: 15px;
    background-color: #ffa200;
    border-radius: 3px;
    color: #fff;
  }
  .zhangdanDetail_wrpper a {
    font-size: 14px;
    color: #3797db;
  }
</style>
