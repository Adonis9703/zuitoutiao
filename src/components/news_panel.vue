<template>
  <div class="panel">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{news.title}}</span>

        <el-button style="float: right; padding: 3px 3px" type="text">
          <i class="el-icon-share"/> 分享
        </el-button>
        <!--<el-button style="float: right; padding: 3px 0" type="text">-->
        <!--<i class="el-icon-star-off"/> {{news.dislikes}}踩-->
        <!--</el-button>-->
        <el-button style="float: right; padding: 3px 0" type="text">
          <i class="el-icon-star-on"/> {{news.likes}}
        </el-button>
        <el-button style="float: right; padding: 3px 3px" type="text">
          <i class="el-icon-view"/> {{news.fangwenliang}}
        </el-button>
        <span class="float-right colorC0C font-size10" style="margin-top: 3px">{{news.time}}</span>
      </div>
      <img class="inline-block float-left width618p" :src="news.imageUrl"/>
      <div class="left15px"> 关键词：{{news.keywords}}</div>
      <div style="clear: both;"></div>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: 'news_panel',
    props: ['news'],
    created () {
    }
  }
</script>

<style lang="less" scoped>
  .panel {
    margin: 5px 0;
  }

  .box-card {
  }
</style>
