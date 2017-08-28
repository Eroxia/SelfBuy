<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <section class="content-header">
      <h1>分类管理</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>Home</a></li>
        <li class="active">分类管理</li>
      </ol>
    </section>
    <section class="content" >

      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" v-for="(cate,index) in pid_0">
        <div class="panel panel-default">
          <div class="panel-heading" role="tab">
            <h4 class="panel-title">
              <a  data-toggle="collapse"  data-parent="#accordion"  aria-expanded="true"  aria-controls="collapseOne">{{cate.name}}</a>
              <a style="float: right" @click="capture(cate,index)"  data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-trash"></span></a>
            </h4>
          </div>
          <div  class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
              <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                  <tbody>
                  <tr v-for="(col, index) in cate.values">
                    <td style="width: 40%; padding-left: 10px">{{ col.name }}</td>
                    <td style="width: 30%"></td>
                    <td><a @click="deleteValue(col, index)"><span class="glyphicon glyphicon-trash"></span></a></td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <form class="form-inline" style="float: right;margin-right: 30px">
                        <div class="form-group">
                          <div class="col-sm-8">
                            <input type="text"  class="form-control" v-model="item2.name" id="inputPassword2" style="width: 300px" placeholder="输入value名称">
                          </div>
                        </div>
                        <button class="btn btn-primary" @click="addValue(cate)">添加</button>
                      </form>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <form class="form-inline">
          <div class="form-group">
            <p class="form-control-static">将要添加的属性名称:</p>
          </div>
          <div class="form-group">
            <div class="col-sm-8">
              <input type="text" class="form-control"  v-model="item.name"  style="width: 300px" placeholder="输入属性名称">
            </div>
          </div>
          <button type="submit" class="btn btn-success"  @click="add">确认添加</button>
        </form>
      </div>

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
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteCate">yes</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'Category',
    data() {
      return {
        categories: [],
        pid_0: [],
        index: '',
        cate: [],
        item: [],
        item2: []
      }
    },
    //获取所有分类后进行排序
    created() {
      this.$http.get('http://test.cloudwarehub.com/category')
        .then(response => {
          var datas = response.body.data
          var pid_1 = []
          datas.forEach(data => {
            if(data.pid == 0) {
              data.values = []
              pid_1.push(data)
            }
          })
          console.log(pid_1)
          datas.forEach(data => {
            datas.forEach(data_2 => {
              if(data.id == data_2.pid) {
                data.values.push(data_2)
              }
            })
          })
         this.pid_0 = pid_1
        })
    },
    methods: {
      capture(cate, index) {
        this.cate = cate
        this.index = index
      },
      deleteCate() {
        this.$http.delete('http://test.cloudwarehub.com/category/' + this.cate.id)
          .then( response => {
            this.pid_0.splice(this.index, 1)
          })
      },
      //添加pid:0的分类
      add() {
        this.$http.post('http://test.cloudwarehub.com/category',  {name: this.item.name, pid: 0} )
          .then(response => {
            var obj = {
              name: this.item.name,
              pid: response.body.data.pid,
              values: [],
              id: response.body.data.id
            }
            this.pid_0.push(obj)
            this.item = []
          })
      },
      //在pid:0 的分类下添加value
      addValue(cate) {
        this.$http.post('http://test.cloudwarehub.com/category', {name: this.item2.name, pid: cate.id} )
          .then(response => {
            this.pid_0.forEach(pid => {
             if(pid.id == cate.id){
               var obj = {
                 name: this.item2.name,
                 pid: cate.id
               }
               pid.values.push(obj)
             }
           })
            this.item2 = []
          })
      },
      //删除pid:0分类下的value
      deleteValue(col, index) {
        this.$http.delete('http://test.cloudwarehub.com/category/' + col.id)
          .then(response => {
            this.pid_0.forEach(pid => {
              if (col.pid == pid.id) {
                pid.values.splice(index, 1)
              }
            })

          })
      }
    }
  }
</script>
