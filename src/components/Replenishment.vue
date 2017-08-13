<template>
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        设备管理
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">设备管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">设备#1（同济大学四平校区）</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <th>unit ID</th>
                  <th>商品名称</th>
                  <th>规格</th>
                  <th>当前库存量</th>
                  <th></th>
                </tr>
                <tr>
                  <td>1232</td>
                  <td>甜圈圈</td>
                  <td>220ml</td>
                  <td><small class="label bg-red">3</small></td>
                  <td><a><span class="glyphicon glyphicon-plus"></span></a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

        </div>
      </div>
      <!-- /.row -->
      <!-- Main row -->

    </section>
    <!-- /.content -->
  </div>
</template>
<script>
  export default {
    name: 'Replenish',
    data() {
      return {
        id: this.$route.params.id,
        shopskus: []
      }
    },
    create: function() {
      this.$http.get('http://test.cloudwarehub.com/skuStock?shopId=' + this.id)
        .then( resp => {
          this.shopskus = resp.body.data
        })
    }
  }
</script>
