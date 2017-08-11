<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        售货机管理
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">补货管理</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->


            <!-- /.box-header -->
            <div class="col-lg-3 col-xs-6" v-for="(shop,index) in shops">
              <div class="small-box bg-green">
                <div class="inner">
                  <h3>{{index}}号机柜</h3>
                  <p>{{shop.id}}</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <router-link :to="{name: 'details', params:{id: shop.id}}" class="small-box-footer">详情<i class="fa fa-arrow-circle-right"></i></router-link>
              </div>
            </div>
            <!-- /.box-body -->

      <!-- Main row -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
  import Vue from 'vue'
  var bus = new Vue()
  export default {
    name: 'Add',
    data() {
      return {
        apiUrl: 'http://test.cloudwarehub.com/shop?page=0&pageSize=1000',
        shops: []
      }
    },
    created() {
      this.$http.get(this.apiUrl)
        .then( resp => {
          this.shops = resp.body.data
          this.shop_id = this.shops.id
          console.log(this.shop_id)
        })
    }
  }
</script>
