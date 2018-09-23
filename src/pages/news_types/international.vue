<template>
  <div>
    <!--<transition name="fade">-->
    <div v-for="(item, index) of newsList" :key="index" @click="goDetail(item)">
      <news :news="item"></news>
    </div>
    <div class="text-align-center" style="margin-top: 10px">
      <el-button type="primary" icon="el-icon-download" circle @click="getMore"></el-button>
      <el-button type="success" icon="el-icon-upload2" circle @click="goTop"></el-button>
    </div>
    <!--</transition>-->
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
        newsList: []
      }
    },
    created () {
      this.start = 0
      this.type = 1
      this.$axios.get({
        url: `http://localhost:8080/Article/getArticleByType?typeNumber=${this.type}&start=${this.start}`
      }).then(res => {
        this.newsList.push(...res.data.articleJSONArray)
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
      goTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
</script>

<style scoped>
</style>
