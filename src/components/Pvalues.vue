<template>
  <div class="content-wrapper" style="padding-top: 4%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>规格管理</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">规格管理</li>
      </ol>
    </section>


    <!-- Main content -->
    <section class="content" >

      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" v-for="(Attr,index) in goodsAttrs">
        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse"  data-parent="#accordion"  aria-expanded="true"  aria-controls="collapseOne">
                {{ Attr.name }}
              </a>
              <a style="float: right" @click="capture(index, Attr)"  data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-trash"></span></a>
            </h4>
          </div>
          <div  class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
              <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                  <tbody>
                  <tr v-for="(pvalue, index) in Attr.pvalues">
                    <td style="width: 40%; padding-left: 10px">{{ pvalue.value }}</td>
                    <td style="width: 30%">{{ pvalue.updatedAt }}</td>
                    <td><a><span class="glyphicon glyphicon-pencil"></span></a></td>
                    <td><a v-on:click="deletePvalue(index, pvalue)"><span class="glyphicon glyphicon-trash"></span></a></td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <form class="form-inline" style="float: right;margin-right: 30px">
                        <div class="form-group">
                          <div class="col-sm-8">
                            <input type="text" v-model="item2.value" class="form-control" id="inputPassword2" style="width: 300px" placeholder="输入value名称">
                          </div>
                        </div>
                        <button class="btn btn-primary" @click="add(Attr)">添加</button>
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
              <input type="text" v-model="item.name" class="form-control"  style="width: 300px" placeholder="输入属性名称">
            </div>
          </div>
        <button type="submit" class="btn btn-success" @click="save">确认添加</button>
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
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletePname">yes</button>
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
    data() {
      name: 'Pvalues'
      return {
        apiUrl: 'http://test.cloudwarehub.com',
        goodsAttrs: [],
        item: [],
        item2: [],
        index: '',
        Attr: [],

      }
    },
    //获取所有规格
    created() {
      this.$http.get(`${this.apiUrl}/goodsAttrs`)
        .then(response => {
          this.goodsAttrs = response.body.data
        })
    },
    methods: {
      //如果有输入值不为空 发送post请求保存
      save() {
        if(this.item.name) {
          this.$http.post(`${this.apiUrl}/pname`, {name: this.item.name} )
            .then(response => {
              var obj = {
                name: this.item.name,
                pnameId: response.body.data.id,
                pvalues: []
              }
              this.goodsAttrs.push(obj)
              this.item = []
            })
        }
      },
      //获取单个属性
      capture(index, Attr) {
        this.Attr = Attr
        this.index = index
      },
      //删除一个规格
      deletePname() {
        this.$http.delete(this.apiUrl + '/pname/' + this.Attr.pnameId)
          .then(response => {
            this.goodsAttrs.forEach(attr => {
              if(attr.pnameId == this.Attr.pnameId) {
                this.goodsAttrs.splice(this.index, 1)
              }
            })
          })
      },
      //添加规格的pvalue
      add(Attr) {
        this.$http.post(this.apiUrl + '/pvalue', {pNameId: Attr.pnameId, value: this.item2.value} )
          .then(response => {
            this.goodsAttrs.forEach(attr => {
              if(attr.pnameId == Attr.pnameId) {
                var obj = {
                  value: this.item2.value,
                  pnameId: Attr.pnameId,
                  id: response.body.data.id,
                  createdAt: response.body.data.createdAt,
                  value: response.body.data.value
                }
                attr.pvalues.push(obj)
              }
            })
            this.item2 = []
          })
      },
      //删除规格里边的pvalue
      deletePvalue(index, pvalue) {
        this.$http.delete(this.apiUrl+ '/pvalue/' + pvalue.id )
          .then(response => {
            this.goodsAttrs.forEach(attr => {
              attr.pvalues.forEach(value => {
                if(value.id == pvalue.id){
                  attr.pvalues.splice(index, 1)
                }
              })
            })
          })
      }
    }
  }
</script>
