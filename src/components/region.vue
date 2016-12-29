<template>
    <el-form-item required label='活动地点'>
      <el-row>
        <el-col :span='4'>
          <div class="grid-content" style="width: 100%;">
            <el-select v-model="regionForm.sPro" placeholder="请选择省份" v-on:change='proChange' >
                <el-option
                  v-for="item in pro"
                  :label="item.name"
                  :value="item.name">
                </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span='4' :offset='1'>
          <div class="grid-content" style="width: 100%;">
            <el-select v-model="regionForm.sCity" placeholder="请选择市" v-on:change='cityChange'>
                <el-option
                  v-for="(item, index) in city"
                  :label="item.name"
                  :value="item.name">
                </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span='4' :offset='1'>
          <div class="grid-content" style="width: 100%;">
            <el-select v-model="regionForm.sXian" placeholder="请选择县" v-on:change='xianChange'>
                <el-option
                  v-for="(item, index) in xian"
                  :label="item.name"
                  :value="item.name">
                </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span='8' :offset='1'>
          <div class="grid-content">
            <el-input v-model="regionForm.details" placeholder="请输入详细街道" v-on:change='detailChange'></el-input>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
</template>
<script>
import address from '../assets/js/adress'
// 先得到省份
function formDate (address) {
  var pro = []
  for (var k in address) {
    pro.push({name: k})
  }
  return pro
}
// 格式化县
function formXian (res) {
  var result = []
  if (res) {
    Array.prototype.slice.call(res)
    .forEach((item, index) => {
      result.push({name: item})
    })
  }
  return result
}
export default {
  props: {
    sPro: {
      type: String,
      default: ''
    },
    sCity: {
      type: String,
      default: ''
    },
    sXian: {
      type: String,
      default: ''
    },
    details: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      regionForm: {
        sPro: this.sPro,
        sCity: this.sCity,
        sXian: this.sXian,
        details: this.details
      },
      pro: formDate(address)
    }
  },
  // watch: {
  //   sPro: function (val, oldVal) {
  //     console.log('watch sPro' + val)
  //     if (val !== oldVal) {
  //       this.sCity = ''
  //       this.sXian = ''
  //       this.details = ''
  //       this.regionForm.sPro = val
  //     }
  //   },
  //   sCity: function (val, oldVal) {
  //     if (val !== oldVal) {
  //       this.sXian = ''
  //       this.details = ''
  //       this.regionForm.sCity = val
  //     }
  //   },
  //   sXian: function (val, oldVal) {
  //     if (val !== oldVal) {
  //       this.details = ''
  //       this.regionForm.sXian = val
  //     }
  //   },
  //   details: function (val, oldVal) {
  //     if (val !== oldVal) {
  //       this.regionForm.details = val
  //     }
  //   }
  // },
  computed: {
    city: function () {
      return formDate(address[this.regionForm.sPro])
    },
    xian: function () {
      if (this.sPro) {
        return formXian(address[this.regionForm.sPro][this.regionForm.sCity])
      }
    }
  },
  methods: {
    proChange: function (val) {
      console.log('省份' + val)
      if (val) {
        this.regionForm.sCity = ''
        this.regionForm.sXian = ''
        this.regionForm.details = ''
        this.$emit('proChange', val)
      }
    },
    cityChange: function (val) {
      if (val) {
        this.regionForm.sXian = ''
        this.regionForm.details = ''
        this.$emit('cityChange', val)
      }
    },
    xianChange: function (val) {
      console.log('县' + val)
      if (val) {
        this.regionForm.details = ''
        this.$emit('xianChange', val)
      }
    },
    detailChange: function (val) {
      if (val) {
        this.$emit('detailChange', val)
      }
    }
  }
}
</script>
