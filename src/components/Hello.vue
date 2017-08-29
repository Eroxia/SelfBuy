<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        总览
        <small>数据视图</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">总览</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>{{report.orderCount}}</h3>
              <p>今日订单</p>
            </div>

            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <router-link to="/nav/order" class="small-box-footer">详情<i class="fa fa-arrow-circle-right"></i></router-link>
          </div>

        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{report.totalPrice}}</h3>

              <p>今日销售额</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <router-link to="#" class="small-box-footer"><i class="fa fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>{{this.report.regCount}}</h3>
              <p>新增用户</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="#" class="small-box-footer">详情<i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>{{this.report.saleStockRate}}<sup style="font-size: 20px">%</sup></h3>
              <p>当前库存比例</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <router-link to="/devices" class="small-box-footer"><i class="fa fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->
      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <section class="col-lg-12 connectedSortable">
          <!-- Custom tabs (Charts with tabs)-->
          <div class="nav-tabs-custom">
            <!-- Tabs within a box -->
            <ul class="nav nav-tabs pull-right" id="navtab">
              <li class="active"><a href="#revenue-chart" data-toggle="tab">销售额</a></li>
              <li class="pull-left header"><i class="fa fa-inbox"></i>销售曲线图</li>
            </ul>
            <div class="tab-content no-padding">
              <!-- Morris chart - Sales -->
              <schart :canvasId="cancasId1"
                      :type="type1"
                      :height="height"
                      :width="width"
                      :data="data1"
               style="width: 100%"></schart>
            </div>
          </div>
          <!-- /.nav-tabs-custom -->

          <!-- interactive chart -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <i class="fa fa-bar-chart-o"></i>

              <h3 class="box-title">热销商品排行</h3>

              <div class="box-tools pull-right">
                实时
                <div class="btn-group" id="realtime" data-toggle="btn-toggle">
                  <button type="button" class="btn btn-default btn-xs active" data-toggle="on">On</button>
                  <button type="button" class="btn btn-default btn-xs" data-toggle="off">Off</button>
                </div>
              </div>
            </div>
            <div class="box-body">
              <schart :canvasId="canvasId"
                      :type="type"
                      :width="width"
                      :height="height"
                      :data="data"
                      :options="options"
              ></schart>
            </div>
            <!-- /.box-body-->
          </div>
          <!-- /.box -->


        </section>
        <!-- /.Left col -->
        <!-- right col (We are only adding the ID to make the widgets sortable)-->

        <!-- right col -->
      </div>
      <!-- /.row (main row) -->

    </section>
    <!-- /.content -->

<!-- ./wrapper -->
  </div>

</template>

<script>
  import Schart from 'vue-schart';
export default {
  name: 'Hello',
  data () {
    return {
      report: '',
      canvasId: 'myCanvas',
      cancasId1: 'myCanvas1',
      type: 'bar',
      type1: 'line',
      height: 400,
      width: 500,
      data: [
        {name: '可口可乐', value: 42},
        {name: '农夫山泉', value: 41},
        {name: '红烧牛肉米饭', value: 40},
        {name: '怡宝', value: 35},
        {name: '百岁山', value: 33},
        {name: '绿茶', value: 20 },
        {name: '特仑苏', value: 10},
        {name: '甜辣鸭脖', value: 10},
        {name: '梅菜扣肉饭', value: 8},

      ],
      data1: [
        {name:'0：00' ,value: 20},
        {name:'1：00' ,value: 15},
        {name:'2：00' ,value: 5},
        {name:'3：00' ,value: 1},
        {name:'4：00' ,value: 0},
        {name:'5：00' ,value: 0},
        {name:'6：00' ,value: 11},
        {name:'7：00' ,value: 50},
        {name:'8：00' ,value: 70},
        {name:'9：00' ,value: 66},
        {name:'10：00' ,value: 30},
        {name:'11：00' ,value: 30},
        {name:'12：00' ,value: 50},
        {name:'13：00' ,value: 20},
        {name:'14：00' ,value: 30},
        {name:'15：00' ,value: 10},
        {name:'16：00' ,value: 10},
        {name:'17：00' ,value: 14},
        {name:'18：00' ,value: 12},
        {name:'19：00' ,value: 40},
        {name:'20：00' ,value: 60},
        {name:'21：00' ,value: 70},
        {name:'22：00' ,value: 77},
        {name:'23：00' ,value: 50},
        {name:'24：00' ,value: 55},
      ],
      options: {
        title: '热销商品前10名'
      }
    }
  },
  created: function() {
    this.$http.get('http://test.cloudwarehub.com/report/curOverview')
      .then(resp => {
        this.report = resp.body.data
      })
    setTimeout(() => {
      var widthC = $('#navtab').width()
      this.width = widthC
    }, 500)
    },
  components:{ Schart }
}
</script>

