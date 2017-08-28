<template>
  <div class="hold-transition skin-blue sidebar-mini">
     <div class="wrapper" >
       <header class="main-header" style="position: fixed; width: 100%" >
         <!-- Logo -->
         <router-link to="/nav">
           <a class="logo">
             <!-- mini logo for sidebar mini 50x50 pixels -->
             <span class="logo-mini"><b>S</b>B</span>
             <!-- logo for regular state and mobile devices -->
             <span class="logo-lg"><b>Self</b>BUY</span>
           </a>
         </router-link>
         <!-- Header Navbar: style can be found in header.less -->
         <nav class="navbar navbar-static-top">
           <!-- Sidebar toggle button-->
           <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
             <span class="sr-only">Toggle navigation</span>
           </a>

           <div class="navbar-custom-menu">
             <ul class="nav navbar-nav">

               <!-- User Account: style can be found in dropdown.less -->
               <li class="dropdown user user-menu">
                 <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                   <img src="../assets/img/user2-160x160.jpg" class="user-image" alt="User Image">
                   <span class="hidden-xs">管理员</span>
                 </a>
                 <ul class="dropdown-menu">
                   <!-- User image -->
                   <li class="user-header">
                     <img src="../assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                   </li>
                   <!-- Menu Footer-->
                   <li class="user-footer">
                     <div class="pull-left">
                       <a class="btn btn-default btn-flat">个人信息</a>
                     </div>
                     <div class="pull-right">
                       <a class="btn btn-default btn-flat">退出</a>
                     </div>
                   </li>
                 </ul>
               </li>
             </ul>
           </div>
         </nav>
       </header>
       <!-- Left side column. contains the logo and sidebar -->
       <aside class="main-sidebar" style="position: fixed">
         <!-- sidebar: style can be found in sidebar.less -->
         <section class="sidebar">
           <!-- Sidebar user panel -->
           <!--<div class="user-panel">
             <div class="pull-left image">
               <img  src="" class="img-circle" alt="User Image">
             </div>
             <div class="pull-left info">
               <p>管理员</p>
             </div>
           </div>
           <!-- search form -->
           <form action="#" method="get" class="sidebar-form">
             <div class="input-group">
               <input type="text" name="q" class="form-control" placeholder="Search...">
               <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
             </div>
           </form>
           <!-- /.search form -->
           <!-- sidebar menu: : style can be found in sidebar.less -->
           <ul class="sidebar-menu">
             <li class="header">MAIN NAVIGATION</li>
             <li class="active">
               <router-link to="/nav"><i class="fa fa-dashboard"></i> <span>总览</span></router-link>
             </li>
             <li class="">
               <router-link to="/nav/order">
                 <i class="fa fa-files-o"></i> <span>订单管理</span>
                 <span class="pull-right-container">
              <small class="label pull-right bg-green">150</small>
            </span>
               </router-link>
             </li>
             <li class="treeview">
               <a >
                 <i class="fa fa-user"></i>
                 <span>人员管理</span>
                 <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
               </a>
               <ul class="treeview-menu">
                 <li><router-link to="/nav/staff"><i class="fa fa-circle-o"></i>员工列表</router-link></li>
                 <li><router-link to="/nav/staffs_add"><i class="fa fa-circle-o"></i>新增员工</router-link></li>
               </ul>
             </li>

             <li class="">
               <router-link to="/nav/devices"><i class="fa fa-laptop"></i> <span>售货机管理</span></router-link>
             </li>

             <li class="treeview">
               <a>
                 <i class="fa fa-table"></i>
                 <span>商品管理</span>
                 <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
               </a>
               <ul class="treeview-menu">
                 <li><router-link to="/nav/goods"><i class="fa fa-circle-o"></i>商品列表</router-link></li>
                 <li><router-link to="/nav/goods_add"><i class="fa fa-circle-o"></i>新增商品</router-link></li>
               </ul>
             </li>
             <li class="treeview">
               <a>
                 <i class="fa fa-tags"></i>
                 <span>商标管理</span>
                 <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
               </a>
               <ul class="treeview-menu">
                 <li><router-link to="/nav/category"><i class="fa fa-circle-o"></i>分类管理</router-link></li>
                 <li><router-link to="/nav/brand"><i class="fa fa-circle-o"></i>品牌管理</router-link></li>
                 <li><router-link to="/nav/pvalues"><i class="fa fa-circle-o"></i>规格管理</router-link></li>
               </ul>
             </li>
             <li class=""><router-link to="/nav/add"><i class="fa fa-book"></i><span>售货机管理</span></router-link>
             </li>
           </ul>
         </section>
         <!-- /.sidebar -->
       </aside>
       <router-view></router-view>
     </div>
  </div>
</template>
<script>
  export default {
    name: 'Navigation',
    data () {
      return {
        report: ''
      }
    },
    created: function() {
      this.$http.get('http://test.cloudwarehub.com/report/curOverview')
        .then(resp => {
          this.report = resp.body.data
        })
      console.log(this.report)
    }
  }
</script>

<style scoped>
  @import '/static/dist/css/AdminLTE.min.css';
  @import '/static/dist/css/skins/_all-skins.min.css';
</style>
