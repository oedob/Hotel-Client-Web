<template>
  <div class='datatable_box'>
    <div class='datatable_biaoti'>
      <i class='icon-add_circle'></i>
      <span>账单列表</span>
    </div>
    <ul class='search_dingdan'>
      <li>
        <label>账单状态</label>
        <select v-model='selected'>
          <option v-for='item in pagenum'
                  :key='item'
                  :value='item'>{{item}}
          </option>
        </select>
      </li>
      <li>
        <div class="block">
          <el-date-picker
            v-model="value9"
            type="daterange"
            start-placeholder="账单开始日期"
            end-placeholder="账单结束日期"
            default-value="2010-10-01">
          </el-date-picker>
        </div>
      </li>
      <li>
        <label for='search'>账单号</label>
        <input type='text'
               id='search'
               v-model='search'>
        <button class='chaxuncla'>查询</button>
      </li>
    </ul>
    <table>
      <tr>
        <th v-for='item in data_tr'
            :key='item'>{{item}}
        </th>
      </tr>
      <tr v-for='item in oldalldata'>
        <td v-for='value in item'
            :key='value'>{{value}}
        </td>
      </tr>
    </table>
    <div class='data_bottom'>
      <p class='table_tishi'>
        Showing {{beginnum}} to {{overnum}} of {{total}} entries
        </p>
      <ul class='table_qiehuan'>
        <li>第一页</li>
        <li>上一页</li>
        <li v-if='allpage'
            v-for='(item, index) in allpage'
            :key='item'>{{item}}
        </li>
        <li>下一页</li>
        <li>最后一页</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value8: '',
        value9: '',
        data_tr: ['账单号', '账单日期', '订单数', '订单金额', '扣除佣金', '实结金额', '发票信息', '状态'],
        pagenum: ['全部', '未付款', '待处理', '处理中'],
        oldalldata: [
          {
            'zhuangdanhao': 'A1000011710',
            'zhangdanriqi': '2017-10-01-2017-10-31',
            'dingdanshu': '37',
            'dingdanjine': '8920.20',
            'kouchuyongjin': '678.90',
            'shijiejine': '8241.30',
            'fapiaoxinxi': '待开票 ￥678.90',
            'zhuangtai': '账单生成中'
          }, {
            'zhuangdanhao': 'A1000011710',
            'zhangdanriqi': '2017-10-01-2017-10-31',
            'dingdanshu': '37',
            'dingdanjine': '8920.20',
            'kouchuyongjin': '678.90',
            'shijiejine': '8241.30',
            'fapiaoxinxi': '待开票 ￥678.90',
            'zhuangtai': '账单生成中'
          }, {
            'zhuangdanhao': 'A1000011710',
            'zhangdanriqi': '2017-10-01-2017-10-31',
            'dingdanshu': '37',
            'dingdanjine': '8920.20',
            'kouchuyongjin': '678.90',
            'shijiejine': '8241.30',
            'fapiaoxinxi': '待开票 ￥678.90',
            'zhuangtai': '账单生成中'
          }, {
            'zhuangdanhao': 'A1000011710',
            'zhangdanriqi': '2017-10-01-2017-10-31',
            'dingdanshu': '37',
            'dingdanjine': '8920.20',
            'kouchuyongjin': '678.90',
            'shijiejine': '8241.30',
            'fapiaoxinxi': '待开票 ￥678.90',
            'zhuangtai': '账单生成中'
          }, {
            'zhuangdanhao': 'A1000011710',
            'zhangdanriqi': '2017-10-01-2017-10-31',
            'dingdanshu': '37',
            'dingdanjine': '8920.20',
            'kouchuyongjin': '678.90',
            'shijiejine': '8241.30',
            'fapiaoxinxi': '待开票 ￥678.90',
            'zhuangtai': '账单生成中'
          }
        ],
        // alldata: [],
        beginnum: 1,
        overnum: 10,
        total: 15,
        selected: '全部',
        beginpage: 0,
        overpage: 0,
        allpage: 1,
        search: ''
      }
    }
  }
</script>
<style scoped>
  .datatable_box {
    width: 98%;
    margin-top: 20px;
  }

  .datatable_box .datatable_biaoti, .datatable_box .search_dingdan {
    font-family: Oswald;
    padding-right: 10%;
    font-size: 14px;
    text-shadow: 0 1px 0 #fff;
  }

  .datatable_box .datatable_biaoti {
    height: 38px;
    line-height: 38px;
    font-weight: bold;
    color: #9a9a9a;
    background-color: #FAFAFA;
    border: 1.5px solid #C9C9C9;
    border-radius: 3px 3px 0 0;
    box-shadow: inset 0 1px 0 #fff;
  }

  .datatable_box .search_dingdan {
    display: flex;
    height: 60px;
    padding-left: 10px;
    color: #8f8f8f;
    line-height: 60px;
    border: 1.5px solid #C9C9C9;
    border-top: 0;
    border-bottom: 0;
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

  .datatable_box table {
    width: 100%;
    color: #696969;
    font-size: 14px;
    border: 1.5px solid #C9C9C9;
    border-radius: 0 0 3px 3px;
  }

  .datatable_box tr:nth-child(2n) {
    background-color: #FDFDFD;
  }

  .datatable_box tr:not(:first-child), .datatable_box tr:not(:last-child) {
    border: 1px solid #E0E0E0;
  }

  .datatable_box th:not(:last-child), .datatable_box td:not(:last-child) {
    border-right: 1px solid #E0E0E0;
  }

  .datatable_box th {
    font-family: Oswald;
    font-size: 13px;
    font-weight: normal;
    line-height: 28px;
    background-color: #F5F5F5;
  }

  .datatable_box .datatable_biaoti, .datatable_box td {
    padding-left: 10px;
  }

  .datatable_box td {
    font-size: 14px;
    line-height: 32px;
    color: #696969;
  }

  .datatable_box .data_bottom {
    display: flex;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #C9C9C9;
    background: #fdfdfd;
    background: -moz-linear-gradient(top, #fdfdfd 0%, #f4f4f4 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fdfdfd), color-stop(100%, #f4f4f4));
    background: -webkit-linear-gradient(top, #fdfdfd 0%, #f4f4f4 100%);
    background: -o-linear-gradient(top, #fdfdfd 0%, #f4f4f4 100%);
    background: -ms-linear-gradient(top, #fdfdfd 0%, #f4f4f4 100%);
    background: linear-gradient(to bottom, #fdfdfd 0%, #f4f4f4 100%);
    -webkit-box-shadow: inset 0 1px 0 #fff, 0 -2px 3px #E6E6E6;
    border: 1px solid #C9C9C9;
    box-shadow: inset 0 1px 0 #fff, 0 -2px 3px #E6E6E6;
  }

  .data_bottom .table_tishi, .data_bottom .table_qiehuan {
    font-family: Droid Sans;
    font-size: 13px;
    color: #8f8f8f;
    text-shadow: 0 1px 0 #fff;
  }

  .data_bottom .table_tishi {
    flex: 0 0 35%;
  }

  .data_bottom .table_qiehuan {
    flex: 1;
    text-align: right;
  }

  .data_bottom .table_qiehuan li {
    display: inline-block;
    height: 26px;
    margin: 0 3px;
    padding: 0 10px;
    line-height: 26px;
    font-size: 12px;
    font-family: Oswald;
    color: #8f8f8f;
    background: linear-gradient(to bottom, #fcfcfc 0%, #f2f2f2 100%);
    border: 1px solid #CBCBCB;
    border-radius: 3px;
    box-shadow: 0 1px 0 #fff, 0 1px 0 #fff inset;
    text-shadow: 0 1px 0 #fff;
    box-shadow: 0 2px 3px #EAEAEA;
    cursor: pointer;
  }

  .data_bottom .table_qiehuan li:hover {
    font-weight: bold;
    color: #6E83A5;
    border: 1px solid #6E83A5;
  }
</style>
