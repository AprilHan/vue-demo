<template>
  <div id="topic_list">
    <div class='cell clearfix' v-for='list in lists'>
      <a href="#" class='fl'><img :src='list.author.avatar_url' class='h30' alt=""></a>
      <span><i title='回复数'>{{ list.reply_count }}</i><i>/</i><i title='阅读数'>{{ list.visit_count}}</i></span>
      <a href="" class='fr'>
        <span>{{ list.create_at | time}}</span>
      </a>
      <div class='inBlock'><a :href="'https://cnodejs.org/'+ list.id">{{ list.title }}</a></div>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total,  prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
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
        }
      }, (res) => {
        // 错误处理回调
        console.log(res)
      })
      if (flag) {
        console.log('执行...')
        this.$http.get(`${this.root}/topics?tab=${this.tab}`).then((res) => {
        // 返回成功的回调
          console.log(typeof res)
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
      limit: 10
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
