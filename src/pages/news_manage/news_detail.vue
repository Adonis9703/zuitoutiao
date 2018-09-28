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
        <el-table-column prop="content" width="450"></el-table-column>
        <el-table-column prop="createDate" width="200"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <el-button type="text" :disable="isLogin" @click="makeChildComment(scope.row)" size="small">评论TA</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<comments v-else v-for="(item, index) of news_comment" :key="index" :comment="item"></comments>-->
    </el-card>
    <el-dialog title="评论TA" :visible.sync="show_child_comment_dialog" width="300">
      <el-form :label="'left'" ref="child_comment">
        <el-form-item>
          <el-input v-model="child_comment" placeholder="输入你的评论" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show_child_comment_dialog=false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitChildComment" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import comments from '@/components/comments'

  export default {
    name: 'news_detail',
    components: {comments},
    data () {
      return {
        isLogin: false,
        show: false,
        show_child_comment_dialog: false,
        userInfo: {},
        news_detail: {},
        news_comment: [],
        child_comment: '',
        imageList: [],
        my_comment: '',
        originComId: null,
        originUserId: null,
        originUserName: null,
      }
    },
    created () {
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.isLogin = true
      }
      this.getNewsDetail()
    },
    methods: {
      makeChildComment (v) {
        console.log(`原评论 ===> `, v)
        this.originComId = v.id  //commentID
        this.originUserId = v.userId   //userId
        this.originUserName = v.userName   //userName

        this.show_child_comment_dialog = true
      },
      submitChildComment () {
        let params = {
          commentId: this.originComId,
          userId: this.originUserId,
          userName: this.originUserName,
          content: this.child_comment,
          followerId: this.userInfo.id,
          followerName: this.userInfo.userName,
          type: 1
        }
        this.$axios.post({
          url:'http://localhost:8080/ArticleComment/addSubreview',
          data: params,
          type: 'application/json;charset=UTF-8'
        }).then(res => {
          this.$message.success(`评论成功`)
          this.show_child_comment_dialog = false
          console.log(`添加子评论 ===>`, res)
        })
      },
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
          url: userId == null ? url : url2,
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
            console.log(`评论列表 ===> `,this.news_comment)
          })
        })
      },
      submit () {
        let params = {
          articleId: this.news_detail.id,
          content: this.my_comment,
          userId: this.userInfo.id,
          likes: 0,
          dislikes: 0,
          userName: this.userInfo.userName,
        }
        this.$axios.post({
          url: 'http://localhost:8080/ArticleComment/addArticleComment',
          data: params,
          type: 'application/json;charset=UTF-8'
        }).then(res => {
          this.$message.success(`评论成功`)
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
<style>
  .el-dialog {
    width: 350px;
  }
</style>
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
    .splitter {
      height: 1px;
      width: 100%;
      margin: 20px 0;
      background-color: #C0C4CC;
    }
  }
</style>
