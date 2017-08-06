<template>
  <div class="ht100">
    <div id="particles-js" class="ht100"></div>
    <div class="loginpanel">
      <div class="panel panel-primary" style="width: 30%;margin: 10% auto">
        <div class="panel-heading">
          <div class="panel-title" style="display: inline-block">登录</div>
          <div style="float:right; margin-top: 10px">
          </div>
        </div>
        <div style="padding-top:30px" class="panel-body">
          <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
          <form id="loginform" class="form-horizontal">
            <div style="margin-bottom: 25px;margin-right: 15px" class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
              <input type="text" class="form-control" v-model="user.account" placeholder="用户名">
            </div>
            <div style="margin-bottom: 25px;margin-right: 15px" class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
              <input type="password" class="form-control" v-model="user.password" placeholder="密码">
            </div>
            <div style="text-align: center;margin-top: 5px" class="form-group">
              <a  @click="submit" class="btn btn-primary" style="width: 50%;display: block; margin: 0 auto">登录</a><br>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: [],
        apiUrl: 'http://test.cloudwarehub.com'
      }
    },
    methods: {
      submit() {
        this.$http.post('http://test.cloudwarehub.com' + '/login', {account: this.user.account, password: this.user.password})
          .then(response => {
            switch(response.status) {
              case 200:
                alert('ok')
            }
          })
      }
    }
  }

</script>
