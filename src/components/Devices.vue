<template>
  <div class="content-wrapper" style="padding-top: 4%">
    <section class="content-header">
      <h1>售货机管理</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>Home</a></li>
        <li class="active">补货管理</li>
      </ol>
    </section>
    <section class="content">
      <div class="col-lg-3 col-xs-6" v-for="(shop, index) in shops">
        <div class="small-box bg-green">
          <div class="inner">
            <h3>{{index}}号机柜</h3>
            <p>{{shop.id}}</p>
          </div>
          <div class="icon">
            <i class="ion ion-bag"></i>
          </div>
          <router-link :to="{name: 'Replenish', params:{id: shop.id}}" class="small-box-footer">详情<i class="fa fa-arrow-circle-right"></i></router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
        })
    }
  }
</script>
