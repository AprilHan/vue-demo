<template>
  <div id="topic_list">
      <div class='cell clearfix'>
        <a href="#" class='fl'><img src="../../../static/img/test.png" class='h30' alt=""></a>
        <span><i title='回复数'>27</i><i>/</i><i title='阅读数'>4467</i></span>
        <a href="" class='fr'>
          <img src="../../../static/img/test.png" class='h18' alt="">
          <span>8小时前</span>
        </a>
        <div class='inBlock'>我是内容内容</div>
      </div>
      <div class='cell clearfix'>
        <a href="#" class='fl'><img src="../../../static/img/test.png" class='h30' alt=""></a>
        <span><i title='回复数'>27</i><i>/</i><i title='阅读数'>4467</i></span>
        <a href="" class='fr'>
          <img src="../../../static/img/test.png" class='h18' alt="">
          <span>8小时前</span>
        </a>
        <div class='inBlock'>我是内容内容</div>
      </div>
      <div class='cell clearfix'>
        <a href="#" class='fl'><img src="../../../static/img/test.png" class='h30' alt=""></a>
        <span><i title='回复数'>27</i><i>/</i><i title='阅读数'>4467</i></span>
        <a href="" class='fr'>
          <img src="../../../static/img/test.png" class='h18' alt="">
          <span>8小时前</span>
        </a>
        <div class='inBlock'>我是内容内容</div>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10">
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    fetchData () {

    }
  },
  data () {
    return {
      currentPage4: 1
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
