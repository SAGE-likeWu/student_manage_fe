<template>
  <body id="poster">


  <img class="title_show"
    src="../assets/title.png"
    width="600"
    height="170"
    usemap="#mp"
    title=""
    cursor="default">

    <el-form class="login-container" label-position="left"
             label-width="0px">


      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.adminName"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.passWord"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>

    </el-form>
  </body>
</template>

<script>

    export default {
      name: 'Login',
      data () {
        return {
          loginForm: {
            adminName:'',
            passWord: ''
          },
        }
      },

      methods: {
        login () {
          // this.$router.push({'path':'/information/select'})
          // this.$router.push({'path':'/information/select'})

          this.$axios.post('/login',this.loginForm)
            .then(res => {
              if (res.data.code === 200) {
                this.$store.commit('SET_TOKEN',res.data.data.token)
                this.$store.commit('GET_USER',res.data.data.name)
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                })
                this.$router.push({'path':'/information/select'})
              }else {
                this.$message({
                  message: '登陆失败',
                  type: 'error'
                })
              }
            })
        }
      }
    }


</script>

<style scoped>

</style>
<style>
  #poster {
    background:url("../assets/53.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .title_show{
    margin: 80px auto;

  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
