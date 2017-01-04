<template>
  <div class="grid-content conMain">
    <ul>
      <li>
         <el-steps :active="1">
          <el-step title="活动信息" ></el-step>
          <el-step title="报名签到" ></el-step>
          <el-step title="分享设置" ></el-step>
          <el-step title="个性设置" ></el-step>
        </el-steps>
      </li>
      <li>
          <el-form label-position="top"  :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
            <!-- 活动名称 -->
            <el-form-item label="活动名称" prop="name">
              <el-input  v-model="ruleForm.name"></el-input>
            </el-form-item>
            <!-- 活动分类 -->
            <el-form-item required label='' prop='catogory' style='margin-bottom: 20px; line-height: 100%; padding-top: 10px;'>
              <el-row>
                <el-col :span="3">
                  <div class='el-form-item'><label class="el-form-item__label">活动分类</label></div>
               </el-col>
                <el-col :span="6">
                  <el-button type="text" v-on:click='dialog.catogoryVisible = true'>设置</el-button>
               </el-col>
              </el-row>
              <el-radio-group v-model="ruleForm.catogory" >
                <el-radio v-for='catogory in ruleForm.catogoryS' :label='catogory.value'> {{ catogory.name }} </el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 活动标签 -->
            <el-form-item required label='活动标签' prop='label'>
              <el-tag type="primary" :closable="true" v-for='item in ruleForm.label' v-on:close='removeLabel(item, ruleForm.label)' > {{ item.name }}</el-tag>
              <el-button type="primary" icon="plus" v-on:click='dialog.labelVisible=true'>添加</el-button>
            </el-form-item>
            <!-- 活动时间 -->
            <el-form-item label="活动时间" required >
              <el-col :span="5">
                <el-form-item prop='startDate'>
                  <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
               <el-col :span="5" :offset='1'>
                <el-form-item prop='startTime' >
                  <el-time-picker
                      v-model="ruleForm.startTime"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }"
                      placeholder="选择开始时间">
                    </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style='text-align: center;'>-</el-col>
              <el-col :span="5">
                <el-form-item prop='endDate'>
                   <el-date-picker
                      v-model="ruleForm.endDate"
                      type="date"
                      placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
               <el-col :span="5" :offset='1'>
                <el-form-item prop='endTime'>
                  <el-time-picker
                      v-model="ruleForm.endTime"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }"
                      placeholder="选择结束时间">
                    </el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 活动区域 -->
            <!-- 三级联动选择器 -->
            <region-adress
            :sPro='ruleForm.sPro'
            :sCity='ruleForm.sCity'
            :sXian='ruleForm.sXian'
            :details='ruleForm.details'
            v-on:proChange='cPro'
            v-on:cityChange='cCity'
            v-on:xianChange='cXian'
            v-on:detailChange='cDetail'
            ></region-adress>

            <el-form-item label="活动人数" required>
              <el-row>
                <el-col :span='6'>
                   <div class="grid-content">
                      <el-radio-group v-model="ruleForm.activeNumFlag">
                        <el-radio :label="1">限制</el-radio>
                        <el-radio :label="0">无限制</el-radio>
                      </el-radio-group>
                   </div>
                </el-col>
                <el-col :span='6'>
                   <div class="grid-content">
                      <el-input placeholder="请输入人数" v-model="ruleForm.activeNum" :disabled='ruleForm.activeNumFlag == 0'>
                        <template slot="append">人</template>
                      </el-input>
                   </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label='活动封面'>
              <el-upload
                action="//jsonplaceholder.typicode.com/posts/"
                type="drag"
                :multiple="true"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :default-file-list="fileList"
              >
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleReset">重置</el-button>
              <el-button type="primary" @click="handleSubmit">下一步</el-button>
            </el-form-item>
          </el-form>
      </li>
    </ul>
     <!-- 活动分类 设置弹出框 -->
      <el-dialog title="设置活动分类" v-model="dialog.catogoryVisible" size="tiny">
        <el-tag
            v-for="catogory in ruleForm.catogoryS"
            :closable="true"
            type="success"
            :key="catogory.value"
            :close-transition="false"
            @close="removeCatogory(catogory, ruleForm.catogoryS)"
          >
          {{catogory.name}}
        </el-tag>
         <el-input
            class="inputCatogory"
            size="large"
            placeholder="请输入分类名称"
            v-model="dialog.fenLei">
          </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.catogoryVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCatogory(dialog.fenLei, ruleForm.catogoryS)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 活动标签  添加活动标签弹出框 -->
      <el-dialog title='添加活动标签' v-model='dialog.labelVisible' size='small'>
        <el-input v-model="dialog.label" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.labelVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLabel(dialog.label, ruleForm.label)">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import region from './region'
var Vue = require('vue')
var VueResource = require('vue-resource')
Vue.use(VueResource)
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        catogory: '',
        catogoryS: [{name: 'fenlei1', value: 'fenlei11'}, {name: 'fenlei2', value: 'fenlei12'}],
        label: [{name: '标签一', value: 'fenlei11'}, {name: '标签二', value: 'fenlei12'}],
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        sPro: '甘肃省',
        sCity: '天水',
        sXian: '测试1',
        details: '详细街道测试哈哈',
        activeNum: '',
        activeNumFlag: 0,
        desc: ''
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        catogory: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        label: [
          { type: 'array', required: true, message: '请至少添加一个标签', trigger: 'change' }
        ],
        startDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        endDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      dialog: {
        catogoryVisible: false,
        fenLei: '',
        labelVisible: false,
        label: ''
      }
    }
  },
  methods: {
    handleReset () {
      this.$refs.ruleForm.resetFields()
    },
    handleSubmit (ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          console.log('submit!')
          this.$http.post('/test', this.ruleForm).then((response) => {
            // success callback
            console.log(response)
          }, (response) => {
            // error callback
            console.log(response)
          })
          this.$router.push('/activeCenter/publish/2')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeCatogory (catogory, catogoryS) {
      if (catogory && catogoryS) {
        var index = catogoryS.indexOf(catogory)
        // 删除指定位置的数组  返回删除之后的数组 会改变原数组
        catogoryS.splice(index, 1)
      }
    },
    addCatogory (fenLei, catogoryS) {
      if (fenLei && catogoryS) {
        // 关闭对话框
        this.dialog.catogoryVisible = false
        // 将新添加的分类天骄到 分类数组中
        catogoryS.push({name: fenLei, value: fenLei})
      }
    },
    removeLabel (item, label) {
      if (item && label) {
        label.splice(label.indexOf(item), 1)
      }
    },
    addLabel (item, label) {
      item = item.trim()
      if (!item) {
        console.log('提示')
        // 提示不能为空
        this.$message({
          message: '标签不能为空',
          type: 'warning'
        })
      }
      if (item && label) {
        var flag = true
        label.forEach((i, index) => {
          if (i.name === item) {
            this.$message({
              message: '标签已经存在',
              type: 'warning'
            })
            flag = false
          }
        })
        if (flag) {
          this.dialog.labelVisible = false
          label.push({name: item, value: item})
        }
      }
    },
    cPro (val) {
      console.log('val' + val)
      this.ruleForm.sPro = val
      this.ruleForm.sCity = ''
      this.ruleForm.sXian = ''
      this.ruleForm.details = ''
    },
    cCity (val) {
      console.log('val' + val)
      this.ruleForm.sCity = val
      this.ruleForm.sXian = ''
      this.ruleForm.details = ''
    },
    cXian (val) {
      console.log('val' + val)
      this.ruleForm.sXian = val
      this.ruleForm.details = ''
    },
    cDetail (val) {
      console.log('val' + val)
      this.ruleForm.details = val
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (response, file, fileList) {
      console.log('upload success')
      console.log(response)
      console.log(file)
    },
    handleError (err, response, file) {
      console.log(err)
    }
  },
  watch: {
    sPro: function (val, oldVal) {
      if (val !== oldVal) {
        this.ruleForm.sCity = ''
        this.ruleForm.sXian = ''
        this.ruleForm.details = ''
      }
    }
  },
  components: {
    regionAdress: region
  }
}
</script>
