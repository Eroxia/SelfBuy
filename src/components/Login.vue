<template>
  <div class="skin-blue sidebar-mini" style="height: auto;">
    <main>
      <div class="login-box" style="width: 360px;margin: 7% auto;">
        <div class="login-logo" style="text-align: center;">
          <a style="color: #3c8dbc;font-size: 35px;font-weight: 300;color: #444;"><b>FREE</b>GOU</a>
        </div>
        <div class="login-box-body" style="padding: 20px;border-top: 0; color: #666;text-align: center; margin-top: 30px">
          <p class="login-box-msg" >后台管理系统</p>
          <div style="margin-top:30px">
            <div v-if="show"><font color="#FF0000">账号或密码错误</font></div>
            <div class="form-group has-feedback" style="margin-top: 6px">
              <div class="col-sm-undefined">
                <input type="text" placeholder="账号" class="form-control" v-model="user.account">
                <span class="glyphicon form-control-feedback glyphicon-user"></span>
              </div>
            </div>
            <div class="form-group has-feedback">
              <div class="col-sm-undefined">
                <input type="password" placeholder="密码" class="form-control" v-model="user.password">
                <span class="glyphicon form-control-feedback glyphicon-lock"></span>
              </div>
            </div>
            <button @click="submit" class="btn btn-primary btn-block">登录</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: [],
        apiUrl: 'http://test.cloudwarehub.com',
        Information: [],
        show: false
      }
    },
    methods: {
      submit() {
        this.$http.post('http://test.cloudwarehub.com' + '/login', {account: this.user.account, password: this.user.password} )
          .then(response => {
            this.Information = response.body.data
            localStorage.setItem('token', this.Information.token)
            if(this.Information.id !== null){
              this.$router.push('/nav')
            } else {
              this.show = true
            }
          })
      }
    }
  }

</script>
