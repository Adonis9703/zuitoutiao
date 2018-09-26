<template>
  <div class="detail">
    <el-card>
      <h1>{{news_detail.title}}</h1>
      <p class="authorUrl">原文地址： <a :href="news_detail.url">{{news_detail.url}}</a>
        <span class="float-right">{{news_detail.timeSource}}</span>
      </p>
      <img :src="news_detail.imageUrl" class="inline-block width100p">
      <div class="content">
        <p>{{news_detail.content}}</p>
      </div>
      <span class="authorUrl">
          <!--<el-button style="float: right; padding: 3px 3px" type="text">-->
          <!--<i class="el-icon-share"/> 分享</el-button>-->
        <!--<el-button style="float: right; padding: 3px 0" type="text">-->
        <!--<i class="el-icon-star-off"/> {{news_detail.dislikes}}踩-->
        <!--</el-button>-->
        <el-button @click="like(news_detail.id)" :disabled="!isLogin" style="float: right; padding: 3px 0" type="text">
          <i class="el-icon-star-on"/> {{news_detail.likes}}
        </el-button>
        <el-button style="float: right; padding: 3px 3px" type="text">
         <i class="el-icon-view"/> {{news_detail.fangwenliang}}</el-button>
      </span>
      <div style="clear: both;"></div>
    </el-card>
    <el-card shadow="hover" class="margin-top10px">
      <h3>评论区</h3>
      <el-input v-if="isLogin" size="small"
        class="comment-input"
        type="text"
        clearable
        placeholder="在这留下你的评论吧"
        v-model="my_comment">
        <el-button @click="submit" slot="append" icon="el-icon-check"></el-button>
      </el-input>
      <el-input v-else size="small"
                class="comment-input"
                disabled
                placeholder="登陆后才能评论哦">
        <el-button disabled slot="append" icon="el-icon-check"></el-button>
      </el-input>
      <!--<div class="splitter"></div>-->
      <div v-if="news_comment.length=== 0">暂无评论~</div>
      <el-table v-else :data="news_comment"
                stripe :show-header="show">
        <el-table-column prop="userName" width="100"></el-table-column>
        <el-table-column prop="content" width="600"></el-table-column>
        <el-table-column prop="createDate"></el-table-column>
      </el-table>
      <!--<comments v-else v-for="(item, index) of news_comment" :key="index" :comment="item"></comments>-->
    </el-card>
  </div>

</template>

<script>
  import comments from '@/components/comments'
  export default {
    name: 'news_detail',
    components:{ comments },
    data () {
      return {
        isLogin:false,
        show: false,
        userInfo: {},
        news_detail: {},
        news_comment: [],
        imageList:[],
        my_comment:''
      }
    },
    created () {
      if (localStorage.getItem('userInfo')){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.isLogin = true
      }
      this.getNewsDetail()
    },
    methods: {
      getNewsDetail () {
        let id = localStorage.getItem('newsIdTemp')
        let img = localStorage.getItem('newsImgTemp')
        let userId = null
        if (this.isLogin) {
           userId = JSON.parse(localStorage.getItem('userInfo')).id
        }
        let url2 = `http://localhost:8080/Article/getArticleContent?articleId=${id}&userId=${userId}`
        let url = `http://localhost:8080/Article/getArticleContent?articleId=${id}`
        this.$axios.get({
          url: userId==null ? url : url2,
        }).then(res => {
          this.news_detail = res.data.jsonObject.ArticleDTO
          this.news_detail.imageUrl = img
          this.imageList.push(...this.news_detail.imageUrlList)
          console.log(`咨询详情 ===> `, this.news_detail)
        }).then(() => {
          this.$axios.get({
            url: `http://localhost:8080/ArticleComment/getComment?id=${id}`
          }).then(res => {
            this.news_comment.push(...res.data.articleCommentList)
            this.news_comment = this.news_comment.reverse()
            console.log(this.news_comment)
          })
        })
      },
      submit() {
        let params = {
          articleId: this.news_detail.id,
          content: this.my_comment,
          userId: this.userInfo.id,
          likes: 0,
          dislikes: 0,
          userName: this.userInfo.userName
        }
        this.$axios.post({
          url: 'http://localhost:8080/ArticleComment/addArticleComment',
          data: params,
          type: 'application/json;charset=UTF-8'
        }).then(res => {
          console.log(`提交评论 ===> `, res)
        }).then(() => {
          this.$axios.get({
            url: `http://localhost:8080/ArticleComment/getComment?id=${localStorage.getItem('newsIdTemp')}`
          }).then(res => {
            this.news_comment.push(...res.data.articleCommentList)
            this.news_comment = this.news_comment.reverse()
            // console.log(this.news_comment)
          })
        })
        // console.log(`提交评论`, this.my_comment)
      },
      like (newsId) {
        let userId = JSON.parse(localStorage.getItem('userInfo')).id
        let url = `http://localhost:8080/Article/updateLikes?articleId=${newsId}&userId=${userId}`
        this.$axios.get({
          url: url
        }).then(res => {
          this.news_detail.likes = res.data.likes
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail {
    margin-top: 10px;
    .authorUrl {
      font-size: 14px;
      color: #C0C4CC;
    }
    .content {
      line-height: 30px;
      letter-spacing: 0;
      text-indent: 25px;
    }
    .comment-input {
      margin-bottom: 10px;
      width: 38.2%;
    }
    .splitter{
      height: 1px;
      width: 100%;
      margin: 20px 0;
      background-color: #C0C4CC;
    }
  }
</style>
