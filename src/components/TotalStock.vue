<template>
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        订单管理
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">订单管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" >
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">订单列表</h3>
              <div class="box-tools">
                <ul class="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul>
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <th>商品名称</th>
                  <th>规格</th>
                  <th>时间</th>
                  <th>金额</th>
                  <th>状态</th>
                </tr>
                <tr>
                  <td>2dB48NRx2tkIV7euSfn46mH</td>
                  <td>可口可乐</td>
                  <td>2017-03-30 13:23:32</td>
                  <td>¥3.50</td>
                  <td><span class="label label-success">成功</span></td>
                </tr>
                <tr>
                  <td>2dB48NRx2tkIV7euSfn46mH</td>
                  <td>可口可乐</td>
                  <td>2017-03-30 13:23:32</td>
                  <td>¥3.50</td>
                  <td><span class="label label-success">成功</span></td>
                </tr>
                <tr>
                  <td>2dB48NRx2tkIV7euSfn46mH</td>
                  <td>可口可乐</td>
                  <td>2017-03-30 13:23:32</td>
                  <td>¥3.50</td>
                  <td><span class="label label-success">成功</span></td>
                </tr>
                <tr>
                  <td>2dB48NRx2tkIV7euSfn46mH</td>
                  <td>可口可乐</td>
                  <td>2017-03-30 13:23:32</td>
                  <td>¥3.50</td>
                  <td><span class="label label-success">成功</span></td>
                </tr>
                <tr>
                  <td>2dB48NRx2tkIV7euSfn46mH</td>
                  <td>可口可乐</td>
                  <td>2017-03-30 13:23:32</td>
                  <td>¥3.50</td>
                  <td><span class="label label-success">成功</span></td>
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
    name: 'totalStock',
    data(){

    }
  }
</script>
