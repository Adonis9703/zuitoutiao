<template>
  <div class="height100p user-home">
    <el-card>
      <h1>我的兴趣模型</h1>
      <el-row>
        <el-col :offset="2" :span="12">
          <div class="title">兴趣模型</div>
          <div ref="myChart" id="myChart" class="chart"></div>
        </el-col>
        <el-col :offset="2" :span="5">
          <div class="title">个人信息</div>
          <img :src="userInfo.image" class="logo"/>
          <el-button type="text" size="small" icon="el-icon-upload">上传头像</el-button>
          <div class="info">
            <div>
              <span class="title">用户名：</span>
              <span>{{userInfo.userName}}</span>
            </div>
            <div>
              <span class="title">年龄：</span>
              <span>{{userInfo.age}}</span>
            </div>
            <div>
              <span class="title">性别：</span>
              <span>{{userInfo.gender}}</span>
            </div>
            <div>
              <span class="title">手机：</span>
              <span>{{userInfo.tel}}</span>
            </div>
            <div>
              <el-button type="text" size="small" icon="el-icon-edit" @click="dialogFormVisible = true">编辑</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--<div style="clear: both;"></div>-->
    </el-card>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :label-position="'left'" :model="formData" :rules="rules" ref="editForm" label-width="70px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="formData.userName" size="small" placeholder="您的真实姓名"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="formData.idCard" maxlength="18" placeholder="用于身份校验" size="small"
                    clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submit('editForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'user_home',
    data () {
      return {
        userInfo: null,
        userModel: null,
        dialogFormVisible: false,
        formData: {
          id: '',
          age: 0,
          gender: '',
          //  tel: '',
          userName: '',
          idCard: '',
        },
        rules: {
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {
              pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
              message: '身份证格式错误',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    created () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.userInfo.image = 'http://localhost:8080' + this.userInfo.image
      this.getModel()
    },
    methods: {
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              id: this.userInfo.id,
              userName: this.formData.userName,
              age: this.getInfoByIdCard(this.formData.idCard, 3),
              gender: this.getInfoByIdCard(this.formData.idCard, 2)
            }
            this.$axios.post({
              url: 'http://localhost:8080/User/updateUser',
              data: params,
              type: 'application/json;charset=UTF-8'
            }).then(res => {
              // let infoTemp = JSON.parse(localStorage.getItem('userInfo'))
              // infoTemp.userName = this.formData.userName
              // infoTemp.age = this.getInfoByIdCard(this.formData.idCard, 3)
              // infoTemp.gender = this.getInfoByIdCard(this.formData.idCard, 2)
              // localStorage.setItem('userInfo', infoTemp)
              this.dialogFormVisible = false
              this.resetForm('editForm')
              console.log(`修改用户信息`, res)
            })
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getInfoByIdCard (idCard, type) {
        if (type == 1) {
          let birth = idCard.substring(6, 10) + '-' + idCard.substring(10, 12) + '-' + idCard.substring(12, 14)
          return birth
        } else if (type == 2) {
          if (parseInt(idCard.substring(16, 1)) % 2 == 1) {
            return '女'
          } else {
            return '男'
          }
        } else if (type == 3) {
          let myDate = new Date()
          let month = myDate.getMonth() + 1
          let day = myDate.getDate()
          let age = myDate.getFullYear() - idCard.substring(6, 10) - 1
          if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
            age++
          }
          return age
        }
      },
      getModel () {
        this.$axios.get({
          url: `http://localhost:8080/HobbyModel/getHobbyModel?userId=${this.userInfo.id}`
        }).then(res => {
          let temp = res.data.userHobbyModelDTO
          this.userModel = res.data.userHobbyModelDTO
          if (temp.hobby1Name == null) {
            temp.hobby1Name = '暂无'
            temp.hobby1Rate = 0
          }
          if (temp.hobby2Name == null) {
            temp.hobby2Name = '暂无'
            temp.hobby2Rate = 0
          }
          if (temp.hobby3Name == null) {
            temp.hobby3Name = '暂无'
            temp.hobby3Rate = 0
          }
          if (temp.hobby4Name == null) {
            temp.hobby4Name = '暂无'
            temp.hobby4Rate = 0
          }
          if (temp.hobby5Name == null) {
            temp.hobby5Name = '暂无'
            temp.hobby5Rate = 0
          }
          if (temp.hobby6Name == null) {
            temp.hobby6Name = '暂无'
            temp.hobby6Rate = 0
          }
          let option = {
            // title: {
            //   text: temp.userName,
            //   // subtext: `${temp.userName} 的兴趣模型`
            // },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              x: 'left',
              data: [temp.userName]
            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: false, readOnly: false},
                restore: {show: false},
                saveAsImage: {show: false}
              }
            },
            calculable: true,
            polar: [{
              indicator: [
                {text: temp.hobby1Name, max: temp.hobby1Rate},
                {text: temp.hobby2Name, max: temp.hobby1Rate},
                {text: temp.hobby3Name, max: temp.hobby1Rate},
                {text: temp.hobby4Name, max: temp.hobby1Rate},
                {text: temp.hobby5Name, max: temp.hobby1Rate},
                {text: temp.hobby6Name, max: temp.hobby1Rate}
              ],
              radius: 130
            }],
            series: [
              {
                name: '用户兴趣模型数据',
                type: 'radar',
                itemStyle: {
                  normal: {
                    areaStyle: {
                      type: 'default'
                    }
                  }
                },
                data: [
                  {
                    value: [temp.hobby1Rate, temp.hobby2Rate, temp.hobby3Rate,
                      temp.hobby4Rate, temp.hobby5Rate, temp.hobby6Rate],
                    name: temp.userName
                  }
                ]
              }
            ]
          }
          this.initChart(option)
          console.log(`用户模型 ===> `, this.userModel)
        })
      },
      initChart (option) {
        let myChart = this.$echarts.init(document.getElementById('myChart'), 'macarons')
        myChart.setOption(option)
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
  .user-home {
    /*min-width: 800px;*/
    .logo {
      margin-top: 30px;
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      box-shadow: #c3c3c3 2px 2px;
    }
    .name {
      display: inline-block;
      margin-left: 10px;
    }
    .chart {
      display: inline-block;
      width: 400px;
      height: 400px;
    }
    .title {
      color: #999999;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .info {
      .title {
        color: #999999;
        font-size: 13px;
      }
      div {
        margin: 5px 0 5px 0;
      }
    }
  }

</style>
