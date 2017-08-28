<template>
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>人员管理</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>Home</a></li>
        <li class="active">人员管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-5">
          <div class="box box-info">
            <div class="box-header with-border" style="background-color:#00c0ef;">
              <h3 class="box-title" style="color: white">设置机器型号</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal">
              <div class="box-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">shelf个数:</label>
                  <div class="col-sm-7">
                    <input type="text" class="form-control" placeholder="">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">unit个数:</label>
                  <div class="col-sm-7">
                    <input type="text" class="form-control" placeholder="密码">
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button type="submit" class="btn btn-info pull-right">确认</button>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>
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
    name: 'StaffsAdd'
  }
</script>
