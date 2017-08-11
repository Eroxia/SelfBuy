<template>
  <div>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        商品 库存管理
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">补货管理</li>
      </ol>
    </section>
    <!-- Main content -->
    <div>
      <div>
    <section class="content" style="height: 100%;">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-md-12"  id="mini">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">在售商品列表</h3>
              <div class="box-tools">
                <!--<ul class="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul>-->
                <!--<div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
                -->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 4%"></th>
                    <th style="width: 25%">商品名称</th>
                    <th style="width: 20%">规格</th>
                    <th>价格</th>
                    <th>当前库存</th>
                    <th style="width: 20%">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sku in shopskus">
                    <td><input type="checkbox" v-model="checked"></td>
                    <td>{{sku.goodsName}}</td>
                    <td><span v-for="col in sku.pvalues">{{col.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                    <td>{{sku.price}}</td>
                    <td>{{sku.totalStock}}</td>
                    <td colspan="3"><a><span class="glyphicon glyphicon-trash"></span></a></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr class="active" style="height:50px;">
                    <td colspan="10" style="vertical-align: middle;">
                      <input type="checkbox" @click="checkbox"><b style="padding-left: 20px">选中所有商品</b>
                      <b style="padding-left: 40px">删除选中商品</b>
                      <button @click="addGoods" style="float: right" type="button" class="btn btn-default">添加商品</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            </div>
          <!-- /.box -->
        </div>

        <div class="col-md-6" v-if="show">
          <div class="box">
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th style="width: 4%"></th>
                  <th style="width: 25%">商品名称</th>
                  <th style="width: 20%">规格</th>
                  <th style="width: 20%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="sku in skus">
                  <td><input type="checkbox"></td>
                  <td>{{sku.goodsName}}</td>
                  <td><span v-for="value in sku.pvalues">{{value.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                  <td colspan="3"><a><span class="glyphicon glyphicon-plus"></span></a></td>
                </tr>
                </tbody>
                <tbody>
                <tr class="active" style="height:50px;">
                  <td colspan="4">
                    <input type="checkbox"><b style="padding-left: 20px">全选</b>
                    <button @click="addGoods" style="float: right" type="button" class="btn btn-default">添加选中商品</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>




      </div>
      <!-- /.row -->
      <!-- Main row -->
      </div>
    </section>
      </div>


    </div>
    <!-- /.content -->
  </div>
  </div>
</template>
<script>
  export default {
    name: 'details',
    data() {
      return {
        id: this.$route.params.id,
        shopskus: [],
        skus: [],
        goods: [],
        show: false,
        checked: ''
      }
    },
    created: function() {
      this.$http.get('http://test.cloudwarehub.com/skuStock?shopId=' + this.id)
        .then( resp => {
          this.shopskus = resp.body.data
        })
      this.$http.get('http://test.cloudwarehub.com/sku?shopId=' + this.id)
        .then( resp => {
          this.skus = resp.body.data
        })
    },
    methods: {
      addGoods() {
        if(this.show) {
          this.show = false
        } else {
          this.show = true
        }
        $(function() {
          $('#mini').toggleClass('test');
        })
      },
      checkbox() {
        if(this.checked) {
          this.checked = false
        } else {
          this.checked = true
        }
      }
    }
  }
</script>
<style>
  .test {
   width: 50%;
  }
</style>
