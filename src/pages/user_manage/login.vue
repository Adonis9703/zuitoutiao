<template>
  <div class="login">
    <el-row class="height100p">
      <el-col :span="8" :offset="8" class="height100p">
        <el-tabs type="border-card" class="login-panel">
          <el-tab-pane label="登陆">
            <div v-if="loginType">
              <el-form :label-position="labelPosition" :rules="rules" ref="loginForm" label-width="70px"
                       :model="loginFormData">
                <el-form-item label="用户名" prop="accountName">
                  <el-input v-model="loginFormData.accountName" size="small" class="width618p" clearable></el-input>
                  <el-button type="text" size="small" class="colorC0C" @click="changeLoginType">手机号登陆</el-button>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="loginFormData.password" size="small" class="width618p" clearable></el-input>
                  <i class="el-icon-question colorC0C">
                    <el-button type="text" size="small" class="colorC0C">忘记密码</el-button>
                  </i>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                  <el-input v-model="loginFormData.captcha" placeholder="请注意字母大小写" size="small" class="width618p"
                            clearable>
                  </el-input>
                  <img :src="captcha" @click="getCaptcha" class="inline-block identifyCaptcha"/>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="submit('loginForm')" size="small">确定</el-button>
            </div>
            <div v-else>
              <el-form :label-position="labelPosition" :rules="rules" ref="loginForm" label-width="70px"
                       :model="loginFormData">
                <el-form-item label="手机号" prop="tel">
                  <el-input v-model="loginFormData.tel" size="small" maxlength="11" class="width618p"
                            clearable></el-input>
                  <el-button type="text" size="small" class="colorC0C" @click="changeLoginType">账号密码登陆</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                  <el-input v-model="loginFormData.code" size="small" class="width618p" clearable>
                    <el-button v-if="!timer" slot="append" size="small" @click="getCode">获取验证码</el-button>
                    <el-button v-else slot="append" size="small">{{count}} s</el-button>
                  </el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="submit('loginForm')" size="small">确定</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <el-form :label-position="labelPosition" :rules="rules" ref="registerForm" label-width="70px"
                     :model="registerForm" clearable>
              <el-form-item label="用户名" prop="accountName">
                <el-input v-model="registerForm.accountName" size="small" placeholder="用于登陆" class="width618p"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" size="small" placeholder="支持数字/字母/特殊符号" class="width618p"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="tel">
                <el-input v-model="registerForm.tel" size="small" placeholder="用于重置密码/验证码获取" class="width618p"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email" size="small" placeholder="请输入邮箱" class="width618p"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="registerForm.userName" size="small" placeholder="您的真实姓名" class="width618p"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="idCard">
                <el-input v-model="registerForm.idCard" maxlength="18" placeholder="用于身份校验" size="small"
                          class="width618p" clearable></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="submit('registerForm')" size="small">确定</el-button>
            <el-button size="small" @click="resetForm('registerForm')">重置</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    accountName: 'login',
    created () {
      this.getCaptcha()
    },
    data () {
      return {
        loginType: true, //true=账号密码登陆 false=手机号登陆
        labelPosition: 'left',
        loginFormData: {
          accountName: '',
          password: '',
          captcha: '',
          tel: '',
          code: ''
        },
        captcha: '',
        registerForm: {
          accountName: '',
          age: 0,
          email: '',
          gender: '',
          password: '',
          tel: '',
          totalTimes: 0,
          userName: '',
          idCard: '',
        },

        rules: {
          accountName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
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
        identifyCaptcha: '',
        timer: null,
        count: '',
        show: true
      }
    },
    methods: {
      changeLoginType () {
        this.loginType = !this.loginType
      },
      getCaptcha () {
        this.$axios.get({
          url: 'http://localhost:8080/User/getCaptcha'
        }).then(res => {
          let random = new Date().getTime() + '' + Math.floor(Math.random() * Math.pow(10, 8))
          this.captcha = `http://localhost:8080/User/getCaptcha?rad=${random}`
        })
      },
      getCode () {
        this.$axios.get({
          url: `http://localhost:8080/User/getCode?tel=${this.loginFormData.tel}`
        }).then(res => {
          this.setTime()
          console.log(res)
        })
      },
      setTime () {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      },
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'loginForm') {

              let params = new URLSearchParams()
              params.append('accountName', this.loginFormData.accountName)
              params.append('password', this.loginFormData.password)
              params.append('captcha', this.loginFormData.captcha)

              let params2 = new URLSearchParams()
              params2.append('tel', this.loginFormData.tel)
              params2.append('code', this.loginFormData.code)

              let url = 'http://localhost:8080/User/login'
              let url2 = 'http://localhost:8080/User/loginByCode'

              this.$axios.post({
                url: this.loginType ? url : url2,
                data: this.loginType ? params : params2
              }).then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data.user))
              })
            } else {
              let params = new URLSearchParams()
              params.append('accountName', this.registerForm.accountName)
              params.append('age', '0')
              params.append('email', this.registerForm.email)
              params.append('gender', '男')
              params.append('password', this.registerForm.password)
              params.append('tel', this.registerForm.tel)
              params.append('totalTimes', '0')
              params.append('userName', this.registerForm.userName)
              this.$axios.post({
                url: 'http://localhost:8080/User/regist',
                data: params
              }).then(res => {
                console.log(`注册 ===> `, res)
              })
            }

          } else {
            console.log(`submit error`)
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    background-color: #f6f6f6;
    height: 100%;
  }

  .login-panel {
    position: relative;
    top: 20%;
    width: 100%;
    /*height: 60%;*/
  }

  .identifyCaptcha {
    position: relative;
    top: 10px;
    width: 90px;
    height: 30px;
    border-radius: 4px;
    border: none;
  }
</style>
