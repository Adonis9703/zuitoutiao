<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex"
      background-color="#000"
      mode="horizontal" @select="check"
      text-color="#666666"
      active-text-color="#fafafa"
    >
      <div class="logo">最头条</div>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">热门</el-menu-item>
      <el-menu-item index="3">新闻</el-menu-item>
      <el-menu-item index="4">科技</el-menu-item>
      <el-submenu index="5">
        <template slot="title">个人中心</template>
        <el-menu-item index="2-1">设置</el-menu-item>
        <el-menu-item index="2-2">退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <button @click="$router.push('/login')">登陆</button>
    <button @click="axiosTest">axiosTest</button>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted(){
      this.activeIndex=localStorage.getItem('activeIndex')
    },
    data () {
      return {
        activeIndex: '1',
        color: 'red'
      }
    },
    methods: {
      check (index) {
        this.activeIndex = index
        localStorage.setItem('activeIndex',this.activeIndex)
        switch (index) {
          case '1':
            this.$router.push('/home')
            break
          case '2':
            this.$router.push('/hot')
            break
          case '3':
            this.$router.push('/news')
            break
          case '4':
            this.$router.push('/technology')
            break
        }
      },
      axiosTest() {
        this.$axios.get({
          url:'http://localhost:8080/Article/getArticleContent?articleId=1'
        }).then(res=>{
          console.log(res.data)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .home {
    .nav-bar {
      background: #666666;
      height: 50px;
      width: 100%;
    }
    .logo {
      font-family: "仿宋", serif;
      float: left;
      font-weight: bold;
      display: inline-block;
      color: #fff;
      margin-left: 5px;
      margin-top: 8px;
      margin-right: 40px;
      font-size: 40px;
    }
  }
</style>
