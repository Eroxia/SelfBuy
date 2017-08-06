<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        品牌管理
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">品牌管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" >
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">品牌列表</h3>
              <div class="box-tools">
                <!--<ul class="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul> -->
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
                  <th>名称</th>
                  <th>创建时间</th>
                  <th>编辑</th>
                  <th>删除</th>
                </tr>
                <tr  v-for="(brand, index) in Brands">
                  <td>{{ brand.id }}</td>
                  <td>{{ brand.chName }}</td>
                  <td>{{ brand.createdAt }}</td>
                  <td><a>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-align-justify" data-target="#exampleModal" @click="capture(index, brand)" data-toggle="modal"></span></a></td>
                  <td><a >&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-trash" data-target=".bs-example-modal-sm" @click="capture(index, brand)" data-toggle="modal"></span></a></td>
                </tr>
                </tbody>
              </table>

            </div>
            <div class="box-footer">
              <form class="form-inline" style="float: right;margin-right: 20px">
                <div style="margin-top: 25px">
                  <div class="form-group">
                    <input type="text" class="form-control" style="width: 300px" v-model="item.chName" placeholder="添加商标名称">
                  </div>
                  <button  class="btn btn-success" @click="add">添加</button>
                </div>
              </form>
            </div>

            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>

      </div>
      <!-- /.row -->
      <!-- Main row -->
      <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document ">
          <div class="modal-content"  style="margin-top: 70%;border-radius: 4px">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" style="text-align: center">Are you sure?</h4>
            </div>
            <div class="modal-body">
              <h4 class="modal-title" >删除将无法恢复,确定删除吗？</h4>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" style="float: left">no</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletebrand" >yes</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content"  style="margin-top: 30%;border-radius: 4px" >
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h3 class="modal-title" id="exampleModalLabel" style="text-align: center;color: #00a7d0">修改商标</h3>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label  class="col-sm-2 control-label">ID</label>
                  <div class="col-sm-10">
                    <input  type="text" class="form-control"  v-model="Brand.id" disabled >
                  </div>
                </div>
                <div class="form-group">
                  <label  class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control"　v-model="Brand.chName"  >
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="save">Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
  export default{
    name: 'Brand',
    data() {
      return {
        apiUrl: 'http://test.cloudwarehub.com',
        Brands: [],
        brandId: '',
        index: '',
        Brand: [],
        item: []
      }
    },
    //获取所有品牌
    created: function() {
      this.$http.get(`${this.apiUrl}/brand?pageSize=1000&page=1`)
        .then(response => {
          this.Brands = response.body.data
        })
    },
    methods: {
      //获取单个品牌属性
      capture(index,brand) {
        this.index = index
        this.brandId = brand.id
        this.Brand = brand
      },
      //删除品牌
      deletebrand(){
        this.$http.delete(this.apiUrl + '/brand/' + this.brandId)
          .then(response => {
            this.Brands.forEach(brand => {
              if(brand.id == this.brandId) {
                this.Brands.splice(this.index, 1)
              }
            })
          })
      },
      //保存修改
      save() {
        this.$http.put(this.apiUrl + '/brand/' + this.brandId, this.Brand)
      },
      //添加品牌
      add() {
        this.$http.post(this.apiUrl + '/brand', { chName: this.item.chName })
          .then(response => {
            console.log(response.body.data.id)
            var obj = {
              chName: this.item.chName,
              id: response.body.data.id,
              createdAt: response.body.data.createdAt
            }
            this.Brands.push(obj)
            this.item = []
          })
      }
    }
  }
</script>
