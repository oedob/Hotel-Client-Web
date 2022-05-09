<template>
  <div class="star" :class="starType">
    <span v-for="itemstarClass in starClasses" class="itemClass" :class="itemstarClass"></span>
    <!-- <span class="score">{{score}}</span> -->
  </div>
</template>
<script>
  const starOn = 'on'
  const starOff = 'off'
  const length = 5
  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      starClasses () {
        let arr = []
        let score = parseInt(this.score)
        for (let i = 0; i < score; i++) {
          arr.push(starOn)
        }
        while (arr.length < length) {
          arr.push(starOff)
        }
        return arr
      }
    }
  }
</script>
<style scoped>
  .star {
    font-size: 10px;
  }

  .star .itemClass {
    display: inline-block;
    background-repeat: no-repeat;
  }

  .star-36 .itemClass {
    width: 30px;
    height: 30px;
    margin-right: 13px;
    background-size: 30px 30px;
  }

  .star-36 .on {
    background-image: url("star36_on@2x.png");
  }

  .star-36 .off {
    background-image: url("star36_off@2x.png");
  }

  /*.star-24 .itemClass {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
  }
  .star-24 .on {
    background-image: url("star24_on@2x.png");
  }
  .star-24 .off {
    background-image: url("star24_off@2x.png");
  }*/
  /*.star .score {
    display: inline-block;
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    background-color: #ffa200;
    border-radius: 50%;
  }*/
</style>
