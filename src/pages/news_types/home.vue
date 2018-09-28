<template>
  <div>
    <el-card shadow="hover">
      <el-carousel class="bgcolor-white" height="285px" type="card" style="margin-top: 5px">
        <el-carousel-item v-for="(item, index) of topList" :key="index">
          <img :src="item.imageUrl" class="width100p" @click="goDetail(item)">
          <div class="title">{{item.title}}</div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <div v-for="(item, index) of newsList" :key="index" @click="goDetail(item)">
      <news :news="item"></news>
    </div>
    <div class="text-align-center" style="margin-top: 10px">
      <el-button type="primary" icon="el-icon-download" circle @click="getMore"></el-button>
      <el-button type="success" icon="el-icon-upload2" circle @click="goTop"></el-button>
    </div>
  </div>
</template>

<script>
  import news from '@/components/news_panel'

  export default {
    name: 'domestic',
    components: {news},
    data () {
      return {
        type: null,
        start: 0, //从第几条开始 一次返回20条
        newsList: [],
        topList: []
      }
    },
    created () {
      this.start = 0
      this.type = 8
      let id = null
      if (localStorage.getItem('userInfo')) {
        this.$message.success(`已按照兴趣模型为您推荐资讯`)
        id = JSON.parse(localStorage.getItem('userInfo')).id
      }else {
        this.$message(`登陆后资讯推荐更精准`)
      }
      let url = `http://localhost:8080/Article/getArticleByType?typeNumber=${this.type}&start=${this.start}`
      let url2 = `http://localhost:8080/Article/getArticleByType?typeNumber=${this.type}&start=${this.start}&userId=${id}`
      this.$axios.get({
        url: id === null ? url : url2
      }).then(res => {
        this.newsList.push(...res.data.articleJSONArray)
        this.topList = this.newsList.slice(0, 5)
        this.newsList = this.newsList.slice(5, this.newsList.length)
        console.log(this.topList)
      })
    },
    methods: {
      goDetail (item) {
        localStorage.setItem('newsIdTemp', item.id)
        localStorage.setItem('newsImgTemp', item.imageUrl)
        this.$router.push({
          name: 'news_detail',
          params: {
            news: item
          }
        })
      },
      getMore () {
        this.start += 20
        this.$axios.get({
          url: `http://localhost:8080/Article/getArticleByType?typeNumber=${this.type}&start=${this.start}`
        }).then(res => {
          this.newsList.push(...res.data.articleJSONArray)
          console.log(`加载更多 ===> `, this.newsList)
        })
      },
      goTop () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },

    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .title {
    font-size: 17px;
    letter-spacing: 1px;
    color: white;
    text-align: center;
    position: relative;
    top: -30px
  }

  /*.el-carousel__container{*/
  /*background-color: white;*/
  /*}*/
  /*.el-carousel__item:nth-child(2n) {*/
  /*!*background-color: #99a9bf;*!*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*!*background-color: #d3dce6;*!*/
  /*}*/
</style>
