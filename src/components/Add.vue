<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        补货管理
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">补货管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">补货清单 <small>设备#1（同济大学四平校区）</small></h3>
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
                  <th>名称</th>
                  <th>条形码</th>
                  <th>当前库存</th>
                  <th>需补货数量</th>
                </tr>
                <tr>
                  <td>可口可乐</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>芬达汽水</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>乐事薯片</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>王中王火腿肠</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>海飞丝洗发露</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>清风纸巾</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>大白兔奶糖</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>王老吉</td>
                  <td>109844024108756</td>
                  <td>9</td>
                  <td>12</td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box --><div class="box">
          <div class="box-header">
            <h3 class="box-title">补货清单 <small>设备#2（浙工大校区）</small></h3>
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
                <th>名称</th>
                <th>条形码</th>
                <th>当前库存</th>
                <th>需补货数量</th>
              </tr>
              <tr>
                <td>可口可乐</td>
                <td>109844024108756</td>
                <td>9</td>
                <td>12</td>
              </tr>
              <tr>
                <td>康师傅红烧牛肉面</td>
                <td>109844024108756</td>
                <td>9</td>
                <td>12</td>
              </tr>
              <tr>
                <td>芬达汽水</td>
                <td>109844024108756</td>
                <td>9</td>
                <td>12</td>
              </tr>
              <tr>
                <td>可比克薯片</td>
                <td>109844024108756</td>
                <td>9</td>
                <td>12</td>
              </tr>
              <tr>
                <td>娃哈哈矿泉水</td>
                <td>109844024108756</td>
                <td>9</td>
                <td>12</td>
              </tr>
              <tr>
                <td>蒙牛优酸乳</td>
                <td>109844024108756</td>
                <td>9</td>
                <td>12</td>
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
    name: 'Add'
  }
</script>
