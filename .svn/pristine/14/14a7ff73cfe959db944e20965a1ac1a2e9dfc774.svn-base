<template>
  <div class="geolocation-wrapper">
    <div id="container"></div>
    <div class="footer">
      <el-button type="primary" @click="submitPosition">确 定</el-button>
      <el-button @click="cancelPosition">取 消</el-button>
    </div>
  </div>
</template>
<script>
  import AMap from 'AMap'
  var map, geocoder, marker, placeSearch
  export default {
    props: ['address', 'lat', 'lng'],
    data () {
      return {
        positionLat: '',
        positionLng: '',
        clickAdress: '',
        initAddress: ''
      }
    },
    created () {
      this.initAddress = this.$store.state.oldaddress
      // console.log('最初的地址：' + this.initAddress)
    },
    mounted: function () {
      this.init()
    },
    methods: {
      init () {
        // console.log(this.address)
        var _this = this
        var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 13,
          center: [104.07, 30.67]
          // center: [_this.lng, _this.lat]
        })
        AMap.plugin('AMap.Geocoder', function () {
          marker = new AMap.Marker({
            map: map,
            bubble: true
          })
          map.on('click', function (e) {
            _this.positionLat = e.lnglat.lat
            _this.positionLng = e.lnglat.lng
            marker.setPosition(e.lnglat)
            // geocoder.getAddress(e.lnglat, function(status, result){
            //   if (status === 'complete' && result.info === 'OK') {
            //     _this.clickAdress = result.regeocode.formattedAddress
            //   }
            // })
          })
        })
        AMap.service(["AMap.PlaceSearch"], function() {
          geocoder = new AMap.Geocoder()
          placeSearch = new AMap.PlaceSearch({ // 构造地点查询类
            pageSize: 1,
            pageIndex: 1,
            // city: "010", //城市
            map: map
          })
          if (_this.address) {
            let addr
            var lng = _this.lng || 104.07
            var lat = _this.lat || 30.67
            var lnglatXY = [lng, lat]
            geocoder.getAddress(lnglatXY, function (status, result) {
              if (status === 'complete') {
                if (_this.address !== _this.initAddress) {
                  addr = _this.address
                } else {
                  addr = result.regeocode.formattedAddress
                }
                placeSearch.search(addr, function (status, result) {
                  let pois = result.poiList.pois[0]
                  _this.positionLat = pois.location.lat
                  _this.positionLng = pois.location.lng
                })
              }
            })
            // 关键字查询
            // placeSearch.search(_this.address, function (status, result) {
            //   let pois = result.poiList.pois[0]
            //   _this.positionLat = pois.location.lat
            //   _this.positionLng = pois.location.lng
            // })
            // return
          }
          // // 关键字查询
          // placeSearch.search(_this.address, function (status, result) {
          //   let pois = result.poiList.pois[0]
          //   _this.positionLat = pois.location.lat
          //   _this.positionLng = pois.location.lng
          // })
        })
      },
      submitPosition () {
        this.$emit('sentPosition', this.positionLat, this.positionLng)
      },
      cancelPosition () {
        this.$emit('cancel')
      }
    }
  }
</script>
<style scoped>
  .geolocation-wrapper {
      position: relative;
      width: 100%;
      height: 300px;
    }
  #container{
    height: 90%;
    margin: 0px
  }
  .footer {
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
</style>
<!-- <template>
  <div id="XSDFXPage" class="XSDFXPage"></div>
</template>

<script>
  export default {
    data () {
      return {
        address: {},
        point: {}
      }
    },
    methods: {
      initMap () {
        var map = new BMap.Map("XSDFXPage")
        var point
        this.getPosition().then(r => {
          point = r.point
          map.centerAndZoom(point, 15)
        })
      },
      getPosition () {
        let map = new BMap.Map('XSDFXPage')
        let point = new BMap.Point(116.331398, 39.897445)
        let geolocation = new BMap.Geolocation()
        if (map && point && geolocation) {
          map.centerAndZoom(point, 20)
          return new Promise((resolved, rejected) => {
            geolocation.getCurrentPosition(function (r) {
              if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let mk = new BMap.Marker(r.point)
                map.addOverlay(mk)
                map.panTo(r.point)
                resolved(r)
              }
              else {
                rejected(this.getStatus())
              }
            })
          })
        }
      },
      geoCode (address) {
        if (address) {
          var myGeo = new BMap.Geocoder()
          var map = new BMap.Map("XSDFXPage")
          return new Promise((resolved, rejected) => {
            myGeo.getPoint(address.fullAddress, function (point) {
              if (point) {
                map.centerAndZoom(point, 15)
                map.addOverlay(new BMap.Marker(point))
                resolved(point)
              } else {
                rejected('定位出错')
              }
            },
            address.provinceName)
          })
        }
      }
    },
    mounted () {
      this.initMap()
    }
  }
</script>

<style>
  .XSDFXPage {
    width: 100%;
    height: 300px;
  }
</style> -->
