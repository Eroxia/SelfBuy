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
                  <th>ID</th>
                  <th>下单时间</th>
                  <th>支付时间</th>
                  <th>金额</th>
                  <th>交易详情</th>
                  <th>状态</th>
                </tr>
                <tr v-for="order in orders">
                  <td>{{order.id}}</td>
                  <td>{{order.createdAt}}</td>
                  <td>{{order.finishAt}}</td>
                  <td>¥{{order.price.toFixed(2)}}</td>
                  <td><a data-toggle="modal"  data-target=".bs-example-modal-lg" style="cursor: pointer">详情</a></td>
                  <td><span v-if="order.payStatus == 0" class="label label-default">待支付</span><span v-if="order.payStatus == 1" class="label label-success">交易成功</span><span v-if="order.payStatus == 2" class="label label-danger">交易失败</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
              <div class="modal-dialog modal-lg" role="document" style="padding-top: 10%">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">订单详情</h4>
                  </div>
                  <div class="modal-body">
                    <div class="panel panel-default">
                      <!-- Default panel contents -->
                      <div class="panel-heading">下单/支付</div>
                      <div class="panel-body">
                        <div class="row">
                          <div class="col-md-6">
                        <table class="table">
                          <tbody>
                          <tr>
                            <td>订单号:</td>
                            <td><label>221313321321</label></td>
                          </tr>
                          <tr>
                            <td>支付单号:</td>
                            <td><label>21321312321</label></td>
                          </tr>
                          <tr>
                            <td>支付方式:</td>
                            <td><label>支付宝</label></td>
                          </tr>
                          </tbody>
                        </table>
                          </div>

                          <div class="col-md-6">
                            <table class="table">
                              <tbody>
                              <tr>
                                <td>下单时间:</td>
                                <td><label>2017-8-28 19:20:21</label></td>
                              </tr>
                              <tr>
                                <td>支付时间:</td>
                                <td><label>2017-8-28 19:20:21</label></td>
                              </tr>
                              <tr>
                                <td>交易状态:</td>
                                <td><label class="label label-success">成功</label></td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="panel panel-info">
                      <!-- Default panel contents -->
                      <div class="panel-heading">购买商品详情</div>
                      <div class="panel-body">
                        <table class="table">
                          <thead>
                          <tr>
                            <th>商品名称</th>
                            <th>单价</th>
                            <th>数量</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>可口可乐</td>
                            <td>2.00</td>
                            <td>1</td>
                          </tr>
                          <tr>
                            <td>雪碧</td>
                            <td>2.00</td>
                            <td>1</td>
                          </tr>
                          <tr>
                            <td>纯牛奶</td>
                            <td>5.00</td>
                            <td>1</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">离开</button>
                  </div>
                </div>
              </div>
            </div>
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
    name: 'Order',
    data() {
      return {
        orders: []
      }
    },
    created() {
      this.$http.get('http://test.cloudwarehub.com/order?page=1&pageSize=999').then(resp => {
        this.orders = resp.body.data
      })
    }
  }
</script>
