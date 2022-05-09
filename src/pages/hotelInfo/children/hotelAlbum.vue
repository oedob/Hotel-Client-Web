<template>
  <div class="hotel-album">
    <el-tabs v-model="activeName" @tab-click="tabHandle" type="card">
      <el-tab-pane label="酒店封面" name="cover">
        <div class="cover">
          <header>酒店封面</header>
          <el-row>
            <el-col :offset="2" :span="4">
              <el-upload
                class="avatar-uploader list-cover"
                :action="imgUploadUrl"
                :before-upload="beforeImgUpload"
                :on-success="coverImgHandleSuccess"
                name="headImgUp"
                :show-file-list="false">
                <img v-if="hotel.coverImg" :src="hotel.coverImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span class="tips">酒店列表图片<br>200*240</span>
            </el-col>
            <el-col :span="4">
              <el-upload
                class="avatar-uploader detail-cover"
                :action="imgUploadUrl"
                :before-upload="beforeImgUpload"
                :on-success="detailImgHandleSuccess"
                name="headImgUp"
                :show-file-list="false">
                <img v-if="hotel.detailImg" :src="hotel.detailImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span class="tips">酒店详情页大图-封面<br>400*240</span>
            </el-col>
          </el-row>
        </div>
        <div class="album">
          <header>酒店相册</header>
          <el-row>
            <el-col :offset="2" :span="24">
              <el-upload
                :action="imgUploadUrl"
                :before-upload="beforeImgUpload"
                :on-success="albumHandleSuccess"
                :on-remove="albumHandleRemove"
                name="headImgUp"
                :file-list="hotelAlbumList"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane v-for="(roomType,index) in roomTypeList" :label="roomType.apartmentName" :name="roomType.id"
                   :key="roomType.id">
        <div class="album">
          <ul class="img-list">
            <li v-for="item in roomTypeAlbumList">
              <div>
                <img :src="item.url">
              </div>
              <a>
                <i class="el-icon-delete" v-on:click="_deleteImg(item.url)"></i>
                <button v-on:click="setCover(item.url)">设置为封面</button>
              </a>
            </li>
          </ul>
          <el-upload
            class="uploadBox"
            :action="imgUploadUrl"
            name="headImgUp"
            :before-upload="beforeImgUpload"
            :on-success="roomTypeHandleSuccess"
            :on-remove="roomTypeHandleRemove"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button class="next" @click="nextStep" type="primary" v-show="nextFlag">下一步,添加售卖房型</el-button>
  </div>
</template>

<script>
  import { imgUploadUrl } from '@/config/env'
  import {
    getRoomType,
    getHotelById,
    editCoverImg,
    editDetailImg,
    editAlbum,
    editRoomTypeAlbum,
    deleteImg,
    changeCover
  } from '@/api/getData'
  export default {
    data () {
      return {
        imgUploadUrl,
        activeName: 'cover',
        roomTypeList: [],
        roomType: {
          id: '',
          hotelId: '',
          coverImg: '',
          imgs: '',
          updater: ''
        },
        hotel: {
          id: '',
          coverImg: '',
          detailImg: '',
          album: '',
          updater: ''
        },
        nextFlag: false
      }
    },
    computed: {
      hotelAlbumList () {
        if (this.hotel.album) {
          if (this.hotel.album.length) {
            let hotelAlbumList = this.hotel.album.split(',').map((item) => {
              const img = {
                url: item.toString()
              }
              return img
            })
            return hotelAlbumList
          } else {
            return []
          }
        }
      },
      roomTypeAlbumList () {
        if (this.roomType.imgs) {
          if (this.roomType.imgs.length) {
            let roomTypeAlbumList = this.roomType.imgs.split(',').map((item) => {
              const img = {
                url: item.toString()
              }
              return img
            })
            return roomTypeAlbumList
          } else {
            return []
          }
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      nextStep () {
        this.$router.push({path: '/manage/hotelGoodsList', query: {flag: true}})
      },
      initData () {
        this.hotel.id = this.$store.state.hotelId
        this.hotel.updater = this.$store.state.user.nickName
        this.nextFlag = this.$route.query.flag
        this.setHotelData().then(getRoomType(this.hotel.id).then((res) => {
          if (res.data.state === 1) {
            this.roomTypeList = res.data.data
          } else {
            return false
          }
        }).catch(e => console.log(e))).catch(e => console.log(e))
      },
      async setHotelData () {
        await getHotelById(this.hotel.id).then((res) => {
          if (res.data.state === 1) {
            this.hotel.coverImg = res.data.data.hotel.coverImg === undefined ? '' : res.data.data.hotel.coverImg
            this.hotel.detailImg = res.data.data.hotel.detailImg === undefined ? '' : res.data.data.hotel.detailImg
            this.hotel.album = res.data.data.hotel.album === undefined ? '' : res.data.data.hotel.album
          } else {
            this.$message({
              type: 'error',
              message: '获取信息失败'
            })
          }
        })
        return new Promise(resolve => {
          resolve()
        })
      },
      coverImgHandleSuccess (res) {
        if (res.imgUrl) {
          editCoverImg(this.hotel.id, res.imgUrl, this.hotel.updater).then((res1) => {
            if (res1.data.state === 1) {
              this.hotel.coverImg = res.imgUrl
              this.$message({
                type: 'success',
                message: res1.data.message
              })
            } else {
              this.$message({
                type: 'error',
                message: res1.data.message
              })
            }
          })
        }
      },
      detailImgHandleSuccess (res) {
        if (res.imgUrl) {
          editDetailImg(this.hotel.id, res.imgUrl, this.hotel.updater).then((res1) => {
            if (res1.data.state === 1) {
              this.hotel.detailImg = res.imgUrl
              this.$message({
                type: 'success',
                message: res1.data.message
              })
            } else {
              this.$message({
                type: 'error',
                message: res1.data.message
              })
            }
          })
        }
      },
      albumHandleSuccess (res) {
        if (res.imgUrl) {
          this.hotel.album += this.hotel.album === '' ? res.imgUrl : ',' + res.imgUrl
          editAlbum(this.hotel.id, this.hotel.album, this.hotel.updater).then((res1) => {
            if (res1.data.state === 1) {
              this.$message({
                type: 'success',
                message: res1.data.message
              })
            } else {
              this.$message({
                type: 'error',
                message: res1.data.message
              })
            }
          })
        }
      },
      albumHandleRemove (file, fileList) {
        let filePath = ''
        if (file.response) {
          filePath = file.response.filePath
        } else {
          filePath = file.url
        }
        this.hotel.album = this.hotel.album.replace(',' + filePath, '')
        this.hotel.album = this.hotel.album.replace(filePath + ',', '')
        this.hotel.album = this.hotel.album.replace(filePath, '')
        editAlbum(this.hotel.id, this.hotel.album, this.hotel.updater).then((res1) => {
          if (res1.data.state === 1) {
            this.$message({
              type: 'success',
              message: res1.data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: res1.data.message
            })
          }
        })
      },
      beforeImgUpload (file) {
        const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
        if (!isRightType) {
          this.$message.error('上传图片只能是 JPG/png 格式!')
        }
        return isRightType
      },
      tabHandle () {
        for (var index in this.roomTypeList) {
          if (this.roomTypeList[index].id === this.activeName) {
            this.roomType.id = this.roomTypeList[index].id
            this.roomType.imgs = this.roomTypeList[index].imgs
            return
          }
        }
      },
      roomTypeHandleSuccess (res) {
        if (res.imgUrl) {
          this.roomType.imgs += this.roomType.imgs === '' ? res.imgUrl : ',' + res.imgUrl
          editRoomTypeAlbum(this.roomType.id, this.roomType.imgs, this.roomType.updater).then((res1) => {
            if (res1.data.state === 1) {
              for (var index in this.roomTypeList) {
                if (this.roomTypeList[index].id === this.activeName) {
                  this.roomTypeList[index].imgs = this.roomType.imgs
                }
              }
              this.$message({
                type: 'success',
                message: res1.data.message
              })
            } else {
              this.$message({
                type: 'error',
                message: res1.data.message
              })
            }
          })
        }
      },
      roomTypeHandleRemove (file, fileList) {
        let filePath = ''
        if (file.response) {
          filePath = file.response.filePath
        } else {
          filePath = file.url
        }
        this.roomType.imgs = this.roomType.imgs.replace(',' + filePath, '')
        this.roomType.imgs = this.roomType.imgs.replace(filePath + ',', '')
        this.roomType.imgs = this.roomType.imgs.replace(filePath, '')
        editAlbum(this.roomType.id, this.roomType.imgs, this.roomType.updater).then((res1) => {
          if (res1.data.state === 1) {
            this.$message({
              type: 'success',
              message: res1.data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: res1.data.message
            })
          }
        })
      },
      _deleteImg (url) {
        deleteImg(url, this.roomType.id).then(res => {
          if (res.data.state === 1) {
            this.roomType.imgs = res.data.data
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(error => console.log(error))
      },
      setCover (url) {
        changeCover(this.roomType.id, url).then(res => {
          if (res.data.state === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(error => console.log(error))
      }
    },
    mounted () {
    }

  }
</script>

<style lang="less" scoped>
  @import "../../../style/mixin.less";

  .hotel-album {
    position: relative;
    .next {
      position: absolute;
      top: 0px;
      right: 20px;
    }
    header {
      line-height: 50px;
      .sc(20px, #4c4c4c);
    }
    .cover {
      border-bottom: 1px solid #d4d4d4;
      padding-bottom: 40px;
      .tips {
        display: inline-block;
        width: 180px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
      }
    }
    .album {
      ul.img-list {
        .fj('flex-start');
        flex-wrap: wrap;
        li {
          position: relative;
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
          margin-right: 10px;
          div {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          a {
            display: none;
          }
          &:hover {
            a {
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              background: rgba(0, 0, 0, .5);
              i {
                font-size: 25px;
                color: #fff;
                .lr;
                top: 75px;
                cursor: pointer;
              }
              button {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 200px;
                height: 50px;
                background: rgba(0, 0, 0, .7);
                font-size: 16px;
                color: white;
              }
            }
          }
        }
      }
      .uploadBox {
        position: relative;
        .uploadBox-cover {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
  }
</style>
