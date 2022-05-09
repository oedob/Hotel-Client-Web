<template>
  <div class="today">
    <div class="jinrigaikuo">
      <div class="title_text">今日概括</div>
      <ul>
        <li class="num_item">
          <span class="num">{{actualMoney}}</span>
          <small class="text">今日销售总额</small>
        </li>
        <li class="num_item">
          <span class="num">{{dataCount}}</span>
          <small class="text">今日订单数</small>
        </li>
        <li class="num_item">
          <span class="num">{{cancelCount}}</span>
          <small class="text">取消单数</small>
        </li>
        <li class="num_item">
          <span class="num">--:--</span>
          <small class="text">满房时间</small>
        </li>
      </ul>
    </div>
    <div class='charts'>
      <div class='mychartjs' :style='{width: "90%", height: "250px"}'></div>
      <div class='mychartjs' :style='{width: "90%", height: "250px"}'></div>
    </div>
  </div>
</template>

<script>
  import {
    getOrderCount,
    getFullTime,
    todayAccess
  } from '@/api/getData'

  import { formatDate } from '@/config/mUtils'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  export default {

    data () {
      return {
        dataCount: '',
        cancelCount: '',
        actualMoney: '',
        fullTime: '--:--',
        status: 1,
        dateList: [],
        numList: []
      }
    },
    computed: {
      aDate () {
        let aDate = []
        for (let i in this.dateList) {
          if (i === '6') {
            aDate.push('今日')
          } else {
            aDate.push(this.dateList[i].substring(5, 10))
          }
        }
        return aDate
      },
      todayNum () {
        return '今日关注指数' + this.numList[6]
      },
      todayPercent () {
        return '今日关注转化率' + this.percentList[6]
      }
    },
    created () {
      this.init()
    },
    mounted: function () {
      this.$nextTick(() => {
      })
    },
    methods: {
      drawline: function () {
        let chartjs = document.getElementsByClassName('mychartjs')[0]
        let chartjs2 = document.getElementsByClassName('mychartjs')[1]
        let mychart = echarts.init(chartjs)
        let mychart2 = echarts.init(chartjs2)
        let dateList = this.aDate
        let numList = this.numList
        let percentList = this.percentList
        mychart.setOption({
          title: {
            text: this.todayNum
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateList
          },
          yAxis: {},
          series: [
            {
              name: '今日关注指数',
              type: 'line',
              data: numList
            }
          ]
        })
        mychart2.setOption({
          title: {
            text: this.todayPercent
          },
          tooltip: {
            trigger: 'axis',
            formatter: '今日关注转化率{c}%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateList
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              },
              show: true
            }
          ],
          series: [
            {
              name: '今日关注转化率',
              type: 'line',
              data: percentList
            }
          ]
        })
      },
      init: function () {
        let shopId = this.$store.state.hotelId
        getOrderCount(shopId).then((res) => {
          if (res.data.state === 1) {
            this.dataCount = res.data.data.DATACOUNT
            this.cancelCount = res.data.data.CANCELCOUNT
            this.actualMoney = res.data.data.ACTUALMONEY
          }
        })
        getFullTime(shopId).then((res) => {
          if (res.data.state === 1) {
            this.fullTime = formatDate(res.data.data.time, 'HH:MM')
            this.status = res.data.data.status
          }
        })
        todayAccess(shopId, 1).then((res) => {
          if (res.data.state === 1) {
            this.dateList = res.data.data.date
            this.numList = res.data.data.num
            this.percentList = res.data.data.percent
          }
          this.drawline()
        })
      }
    }
  }
</script>

<style scoped>
  .today {
    width: 1100px;
    height: 425px;
    margin: 0 auto;
    background-color: #fff;
  }

  .today .jinrigaikuo {
    /*font-family: MicrosoftYaHei;*/
  }

  .today .jinrigaikuo .title_text {
    height: 60px;
    margin-left: 36px;
    line-height: 60px;
    font-size: 24px;
  }

  .today .jinrigaikuo big {
    display: block;
    margin: 10px 0 26px 50px;
  }

  .today .jinrigaikuo ul {
    display: flex;
    padding: 0 6px;
    font-size: 0;
  }

  .today .jinrigaikuo .title {
    margin: 0 0 26px 50px;
    font-size: 18px;
    color: #4d4d4d;
  }

  .today .jinrigaikuo .num_item {
    width: 210px;
    height: 70px;
    margin: 0 30px;
    color: #fff;
    text-align: right;
    background-color: #3797DB;
  }

  .today .jinrigaikuo .num_item:first-child {
    background: url('3.jpg') no-repeat;
  }

  .today .jinrigaikuo .num_item:nth-child(2) {
    background: url('4.jpg') no-repeat;
  }

  .today .jinrigaikuo .num_item:nth-child(3) {
    background: url('5.jpg') no-repeat;
  }

  .today .jinrigaikuo .num_item:nth-child(4) {
    background: url('6.jpg') no-repeat;
  }

  .today .jinrigaikuo .num_item .num {
    display: block;
    height: 35px;
    line-height: 35px;
    margin: 6px 18px 0 0;
    font-size: 24px;
  }

  .today .jinrigaikuo .num_item .text {
    height: 29px;
    line-height: 29px;
    margin-right: 18px;
    font-size: 16px;
  }

  .jinriguanzhuzhishu {
    display: flex;
  }

  .jinriguanzhuzhishu .chart_left, .jinriguanzhuzhishu .chart_right {
    flex: 1;
  }

  .jinriguanzhuzhishu .chart_right {
    width: 100%;
    height: 150px;
    margin: 35px 50px 0 0;
    border: 1px solid green;
  }

  .charts {
    display: flex;
    margin-top: 35px;
    padding-left: 24px;
  }

  .charts .mychartjs {
    flex: 1;
  }
</style>
