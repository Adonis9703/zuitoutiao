<template>
  <!--主页-->
  <div class="home">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal" @select="check"
      text-color="#666666">
      <div class="logo"></div>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">国内</el-menu-item>
      <el-menu-item index="3">国际</el-menu-item>
      <el-menu-item index="4">科技</el-menu-item>
      <el-menu-item index="5">军事</el-menu-item>
      <el-menu-item index="6">财经</el-menu-item>
      <el-menu-item index="7">娱乐</el-menu-item>
      <el-menu-item index="8">时尚</el-menu-item>
      <el-menu-item index="9">体育</el-menu-item>

      <el-input placeholder="搜索资讯" size="small" class="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-dropdown style="margin-left: 20px;" @command="test">
        <div class="flex-center inline-block top10">
          <img src="" class="user-logo"/>
          <span>
            Alex<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="a">个人资料</el-dropdown-item>
          <el-dropdown-item command="b" >登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--<el-submenu index="10" class="float-right">-->
      <!--<template slot="title">个人中心</template>-->
      <!--<el-menu-item index="10-1" @click="$router.push('/login')" >设置</el-menu-item>-->
      <!--<el-menu-item index="10-2">退出</el-menu-item>-->
      <!--</el-submenu>-->
    </el-menu>
    <transition name="fade">
      <router-view class="content"/>
    </transition>


  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted () {
      this.activeIndex = localStorage.getItem('activeIndex')
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
        localStorage.setItem('activeIndex', this.activeIndex)
        switch (index) {
          case '1':
            this.$router.push('/home')
            break
          case '2':
            this.$router.push('/domestic')
            break
          case '3':
            this.$router.push('/international')
            break
          case '4':
            this.$router.push('/technology')
            break
          case '5':
            this.$router.push('/military')
            break
          case '6':
            this.$router.push('/economic')
            break
          case '7':
            this.$router.push('/entertain')
            break
          case '8':
            this.$router.push('/fashion')
            break
          case '9':
            this.$router.push('/sport')
            break
          case '10-1':
            this.$router.push('/technology')
            break
        }
      },
      axiosTest () {
        this.$axios.get({
          url: 'http://localhost:8080/Article/getArticleContent?articleId=1'
        }).then(res => {
          console.log(res.data)
        })
      },
      test(v){
        if (v == 'a'){
          this.$router.push('/login')
        }
        console.log(v)
      }
    }
  }
</script>

<style lang="less" scoped>
  .home {
    background-color: #f8f8f8;
    /*height: 100%;*/
    .logo {
      float: left;
      display: inline-block;
      margin-top: 1px;
      padding-left: 20%;
      font-size: 40px;
    }
    .user-logo {
      margin: 0 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #f8f8f8;
      display: inline-block;
    }
    .content {
      padding: 0 20% 10px 20%;
      /*min-height: 800px;*/
    }
    .search {
      padding-left: 45px;
      padding-top: 15px;
      width: 250px;
    }
    .top10{
      position: relative;
      top: 10px;
    }
    .go-top{
      position: fixed;
      bottom: 10px;
    }
  }
  /*.fade-enter-active, .fade-leave-active {*/
    /*transition: opacity .3s;*/
  /*}*/

  /*.fade-enter, .fade-leave-to !* .fade-leave-active below version 2.1.8 *!*/
  /*{*/
    /*opacity: 1;*/
  /*}*/
</style>
