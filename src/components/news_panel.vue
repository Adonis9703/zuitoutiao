<template>
  <div class="panel">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{news.title}}</span>
        <!--<el-button style="float: right; padding: 3px 3px" type="text">-->
          <!--<i class="el-icon-share"/> 分享-->
        <!--</el-button>-->
        <!--<el-button style="float: right; padding: 3px 0" type="text">-->
        <!--<i class="el-icon-star-off"/> {{news.dislikes}}踩-->
        <!--</el-button>-->
        <el-button :disabled="!isLogin" style="float: right; padding: 3px 0" type="text" @click.stop="like(news.id)">
          <i class="el-icon-star-on"/> {{news.likes}}
        </el-button>
        <el-button style="float: right; padding: 3px 3px" type="text">
          <i class="el-icon-view"/> {{news.fangwenliang}}
        </el-button>
        <span class="float-right colorC0C font-size13" style="margin-top: 3px">{{news.time}}</span>
      </div>
      <img class="inline-block float-left width382p" :src="news.imageUrl"/>
      <div class="left15px"> 关键词：{{news.keywords}}</div>
      <div style="clear: both;"></div>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: 'news_panel',
    props: ['news'],
    data () {
      return {
        isLogin: false,
        style: {}
      }
    },
    created () {
      if (localStorage.getItem('userInfo')){
        this.isLogin = true
      }
    },
    methods: {
      like (newsId) {
        let userId = JSON.parse(localStorage.getItem('userInfo')).id
        let url = `http://localhost:8080/Article/updateLikes?articleId=${newsId}&userId=${userId}`
        this.$axios.get({
          url: url
        }).then(res => {
          this.news.likes = res.data.likes
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .panel {
    margin: 5px 0;
    color: rgba(0, 124, 255, 0.07);
  }

  .box-card {
  }
</style>
