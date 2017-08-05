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
                      <th>设备ID</th>
                      <th>位置</th>
                      <th>库存量</th>
                      <th>容量</th>
                      <th>通信状态</th>
                      <th>缺货</th>
                    </tr>
                    <tr>
                      <td>109844024108756</td>
                      <td>浙工大校区</td>
                      <td>1602</td>
                      <td>2000</td>
                      <td><small class="label bg-green">正常</small></td>
                      <td><small class="label bg-red">3</small></td>
                    </tr>
                    <tr>
                      <td>109844024108757</td>
                      <td>同济四平校区</td>
                      <td>1602</td>
                      <td>2000</td>
                      <td><small class="label bg-green">正常</small></td>
                      <td><small class="label bg-red">5</small></td>
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
    name: 'Devices'
  }
</script>
