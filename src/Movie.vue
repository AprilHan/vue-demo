<template>
  <div>
    <!-- 头部 -->
    <header class='header'>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="grid-content">
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" v-bind:router='true'>
              <el-menu-item index="activeCenter">活动中心</el-menu-item>
              <el-menu-item index="infoCenter">信息中心</el-menu-item>
             <!--  <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu> -->
              <el-menu-item index="movieList">电影列表</el-menu-item>
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
              <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
                <el-menu-item index="1">top10</el-menu-item>
                <el-menu-item index="2">最热</el-menu-item>
                <el-menu-item index="3">最信</el-menu-item>
              </el-menu>
          </div>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
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
</style>
