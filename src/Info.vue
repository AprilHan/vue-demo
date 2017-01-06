
<template>
  <div v-loading.body="loading">
    <!-- 头部 -->
    <header class='header'>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="grid-content">
            <el-menu default-active="/infoCenter/ask" class="el-menu-demo" mode="horizontal" v-bind:router='true'>
              <el-menu-item index="/activeCenter">活动中心</el-menu-item>
              <el-menu-item index="/infoCenter/ask">信息中心</el-menu-item>
             <!--  <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu> -->
              <el-menu-item index="/movieList">电影列表</el-menu-item>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </header>
    <div style='position: relative;top: 0;left: 0; right: 0; height: 60px;'></div>
    <!-- 内容 -->
    <section class="container">
      <el-row>
        <el-col :span="4">
          <div class="grid-content subTitle">
              <el-menu :default-active="tab" v-bind:router='true' class="el-menu-vertical-demo" theme="dark">
                <el-menu-item index="ask" :route= "{path: '/infoCenter/ask'}">问答</el-menu-item>
                <el-menu-item index="job" :route= "{path: '/infoCenter/job'}">招聘</el-menu-item>
                <el-menu-item index="good" :route= "{path: '/infoCenter/good'}">精华</el-menu-item>
                <el-menu-item index="share" :route= "{path: '/infoCenter/share'}">分享</el-menu-item>
              </el-menu>
          </div>
        </el-col>
        <el-col :span="20">
          <div id="topic_list">
              <div class='cell clearfix' v-for='list in lists'>
                <a href="#" class='fl'><img :src='list.author.avatar_url' class='h30' alt=""></a>
                <span><i title='回复数'>{{ list.reply_count }}</i><i>/</i><i title='阅读数'>{{ list.visit_count}}</i></span>
                <a href="" class='fr'>
                  <span>{{ list.create_at | time}}</span>
                </a>
                <div class='inBlock'><a :href="'../static/demo.html?id='+ list.id">{{ list.title }}</a></div>
              </div>
              <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalPage">
                </el-pagination>
              </div>
            </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      this.currentPage = val
      var flag = false
      this.loading = true
      this.fetchData(this.limit, this.currentPage, flag)
    },
    fetchData (limit, page, flag) {
      console.log(this.$route.params.tab)
      this.tab = this.$route.params.tab
      /*
       *发送请求获取数据
       *获取总页数
       */
      this.$http.get(`${this.root}/topics?tab=${this.tab}&limit=${limit}&page=${page}`).then((res) => {
        // 返回成功的回调
        if (res.status === 200) {
          this.lists = res.data.data
          // 使用箭头函数 可以避免 _this = this 这样丑陋的代码
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      }, (res) => {
        // 错误处理回调
        console.log(res)
      })
      if (flag) {
        console.log('执行...')
        this.$http.get(`${this.root}/topics?tab=${this.tab}`).then((res) => {
          // 返回成功的回调
          if (res.status === 200) {
            this.totalPage = res.data.data.length
          }
        }, (res) => {
          // 错误处理回调
          console.log(res)
        })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPage = 1
      this.tab = to
      this.loading = true
      // this.limit = 10
      this.fetchData(this.limit, this.currentPage)
    }
  },
  data () {
    return {
      root: 'https://cnodejs.org/api/v1',
      currentPage: 1,
      lists: [],
      tab: this.$route.params.tab,
      totalPage: 0,
      limit: 10,
      loading: true
    }
  },
  created () {
    var flag = true
    this.fetchData(this.limit, this.currentPage, flag)
  },
  filters: {
    time: (val) => {
      /**
       * 将时间格式化
       * 返回中文格式
       */
      var demo = moment(val).fromNow()
      var arr = demo.split(' ')
      if (arr[0] === 'a' || arr[0] === 'an') {
        arr[0] = 1
      }
      if (arr[1] === 'day' || arr[1] === 'days') {
        arr[1] = '天'
      }
      if (arr[1] === 'months' || arr[1] === 'month') {
        arr[1] = '天'
      }
      if (arr[1] === 'minutes' || arr[1] === 'minute') {
        arr[1] = '天'
      }
      if (arr[1] === 'hour' || arr[1] === 'hours') {
        arr[1] = '天'
      }
      if (arr[1] === 'year' || arr[1] === 'years') {
        arr[1] = '天'
      }
      arr[2] = '前'
      demo = arr.join('')
      return demo
    }
  }
}
</script>
<style>
/*头部css*/
  .header {
    background-color: #eff2f7;
    overflow: hidden;
    box-shadow: 0 3px 3px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  /*内容css*/
  .container  {
     background-color: #fff;
     border: 40px solid #fcfcfc;
     min-height: 600px;
  }
  /*内容侧标题*/
  .container .subTitle {
    background-color: rgba(144, 112, 112, 0.04);
    /*min-height: 520px;*/
  }
  .container .subTitle .el-menu--dark {
    background-color: transparent;
  }
   .container .subTitle .el-menu--dark .el-menu-item:hover,
   .container .subTitle .el-menu--dark .el-submenu__title:hover {
      background-color: #d3dce6;
   }
  .container .subTitle  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .container .subTitle .el-menu--dark .el-menu-item.is-active {
    color: blue;
    background-color: #d3dce6;
  }
 .container .subTitle .el-menu--dark .el-menu-item,
 .container .subTitle .el-menu--dark .el-submenu__title {
  color: #000;
 }
  /*内容右侧*/
  .container .conMain {
    padding: 40px;
  }
  .container .conMain ul li {
    margin-bottom: 20px;
  }
  /*标签*/
  .el-tag {
    margin-right: 10px;
    padding: 10px 5px;
    height: auto;
  }
  .inputCatogory {margin-top: 10px;}

  /* list*/
   a {
    text-decoration: none;
  }
  img {
    vertical-align: middle;
  }
  .fr {
    float: right;
  }
  .fl {
    float: left;
  }
  .clearfix:before, .clearfix:after {
    content: " ";
    display: table;
  }
 .clearfix:after {
      clear: both;
  }
  .clearfix {
      *zoom: 1;
  }
  .inBlock {
    display: inline-block;
  }
  .h30 {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
  .h18 {
    width: 18px;
    height: 18px;
    border-radius: 2px;
  }
  #topic_list {
    font-size: 14px;
    line-height: 2em;
  }
  .cell {
    padding: 10px 8px;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
  }
  .cell:last-of-type {
    border-top: 0;
  }
</style>
