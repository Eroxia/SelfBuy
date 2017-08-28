<template>
  <div class="content-wrapper" style="padding-top: 3%"  >
    <!-- Content Header (Page header) -->
    <section class="content-header" >
      <h1>
        商品列表
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">商品列表</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content"  >
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">商品列表</h3>
              <div class="box-tools">
                <!-- <ul class="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul> -->
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input  type="text" name="table_search" class="form-control pull-right" placeholder="Search" v-model="name">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table">
                <thead>
                 <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>规格</th>
                  <th style="text-align: center">操作</th>
                 </tr>
                </thead>
                <tbody>
                  <tr v-for="(good,index) in Goods">
                    <td style="width: 10%;vertical-align: middle">{{good.id}}</td>
                    <td style="vertical-align: middle;width: 15%"><a>{{good.name}}</a></td>
                    <td style="width: 60%">
                      <table class="table table-hover subtable" >
                        <thead>
                          <tr>
                            <th width="30%"><b>名称</b></th>
                            <th width="20%"><b>价格</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(sku,index) in good.skus" style="background-color:gainsboro">
                            <td style="width: 20%"><a style="color: black" v-for="value in sku.pvalues">{{value.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a> </td>
                            <td style="width: 8%">￥{{ sku.price}}</td>
                            <td style="width: 10%">&nbsp;&nbsp;
                              <a @click="captureSku(index,sku)" data-toggle="modal" data-target="#exampleModal">
                                <span class="glyphicon glyphicon-pencil"></span>
                              </a>
                            </td>
                            <td style="width: 12%">
                              <a @click="captureSku(index,sku)" data-toggle="modal" data-target=".bs-example-modal-sm">
                                <span class="glyphicon glyphicon-trash" data-target="#exampleModal1"></span>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style="vertical-align:middle;" @click="captureGood(index, good)" data-toggle="modal" data-target="#exampleModal1"><a>编辑</a></td>
                    <td style="vertical-align:middle;" @click="captureGood(index, good)" data-toggle="modal" data-target=".bs-example-modal-sm2"><a>移除</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
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
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteSku">yes</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade bs-example-modal-sm2" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
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
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteGood">yes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->
      <!-- Main row -->
    </section>

    <!-- Content Header (Page header) -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content"  style="margin-top: 20%;border-radius: 4px" >
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h3 class="modal-title" id="exampleModalLabel" style="text-align: center;color: #00a7d0">修改商品</h3>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label  class="col-sm-2 control-label"  >名称</label>
                <div class="col-sm-5" v-for="col2 in item.pvalues">
                  <input  type="text" class="form-control"   disabled v-model="col2.value">
                </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">条形码</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control"  v-model="item.code" >
                </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">价格</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control"  v-model="item.price">
                </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">商品宽度:</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control"  v-model="item.size">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">销售状态</label>
                <div class="col-sm-10">
                  <div class="radio">
                    <label>
                      <input type="radio" v-model="item.saled" value="1" >
                      上架
                    </label>
                    <label style="margin-left: 40px">
                      <input type="radio"   v-model="item.saled" value="0">
                      下架
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group" v-for="img in item.images" >
                <label  class="col-sm-2 control-label">图片</label>
                <img title="点击更换图片"  data-placement="right" @click="uploadSku()" class="img-thumbnail" alt="140x140" :src="img" data-holder-rendered="true" style="width: 140px; height: 140px;">
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="saveSku">Save</button>
          </div>
        </div>
      </div>
      <input style="display: none;" id="browse" type="file" @change="previewFiles()" multiple>
    </div>
    <!-- /.content -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content"  style="margin-top: 10%;border-radius: 4px" >

          <div>

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">修改品牌</a></li>
              <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">添加sku</a></li>
              <button type="button" style="margin-right: 20px;margin-top: 10px" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="home">

          <div class="modal-header">
            <h3 class="modal-title"  style="text-align: center;color: #00a7d0">修改品牌</h3>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label  class="col-sm-2 control-label">类别</label>
                <div class="col-sm-10">
                  <div class="row">

                    <div class="col-md-6">
                      <select v-model="level1" class="form-control" v-on:change="selectcate(level1)">
                        <option v-for="cate in Categories"  v-bind:value="cate" v-if="cate.pid == 0">
                          {{ cate.name }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-6">
                      <select v-model="item2.categoryId" class="form-control">
                        <option v-for="cate in cate_2" v-bind:value="cate.id" >
                          {{ cate.name }}
                        </option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>



              <div class="form-group">
                <label  class="col-sm-2 control-label">商标:</label>
                  <div class="col-sm-10">
                    <select  v-model="item2.brandId" class="form-control"  >
                      <option  v-for="brand in Brands"   v-bind:value="brand.id" >
                        {{brand.chName}}
                      </option>
                    </select>
                  </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">名称:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="item2.name">
                </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">单位:</label>
                <div class="col-sm-10">
                  <input  class="form-control" v-model="item2.unit">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">描述:</label>

                <div class="col-sm-10">
                  <textarea name="desc" class="form-control" v-model="item2.description"></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">标签:</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="item2.tags">
                </div>
              </div>


            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="moda" @click="close">Close</button>
            <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="saveGood">Save</button>
          </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="profile">

                <div class="modal-header">
                  <h3 class="modal-title"  style="text-align: center;color: #00a7d0">添加sku</h3>
                </div>
                <div class="modal-body">
                  <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">属性</label>
                  <div class="col-sm-10">
                    <multiselect v-model="selProperties"  :options="properties" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="属性类型" label="name" track-by="name"></multiselect>
                  </div>
                </div>
                <div class="form-group" v-for="prop in selProperties">
                  <label class="col-sm-2 control-label">{{prop.name}}</label>
                  <div class="col-sm-10">
                    <div class="checkbox pull-left" style="min-width: 80px;" v-for="value in prop.pvalues">

                      <label>
                        <input type="checkbox" v-bind:value="value" v-model="checkedValues">
                        {{value.value}}
                      </label>
                    </div>
                  </div>
                </div>


                    <div class="form-group">
                      <label  class="col-sm-2 control-label">条形码:</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="item3.code">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-2 control-label">价格</label>

                      <div class="col-sm-10">
                       <input v-model="item3.price" type="text" class="form-control" placeholder="¥">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-2 control-label">销售状态</label>
                      <div class="col-sm-10">
                        <div class="radio">
                          <label>
                            <input v-model="item3.saled" type="radio" name="optionsRadios" value="1" checked="">
                            上架
                          </label>
                          <label>
                            <input v-model="item3.saled" type="radio" name="optionsRadios" value="0">
                            下架
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-sm-2 control-label">图片</label>

                      <div class="col-sm-10">
                        <div class="row">
                          <div class="col-md-4" v-for="img in item3.images" >
                              <img v-bind:src=img style="width: 150px">
                          </div>
                          <div class="col-md-3">
                            <span  @click="uploadGood" class="info-box-icon bg-light-blue"><i class="fa fa-plus"></i></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <input style="display: none;" id="upload2"  type="file" @change="previewFilesSku" multiple>


                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal" @click="close">关闭</button>
                  <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="submit">发布</button>
                </div>
              </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>




</template>


<script>
  import Vue from 'vue'
  import Multiselect from 'vue-multiselect'
  export default {
    name: 'Goods',
    data () {
      return {
        apiUrl: 'http://test.cloudwarehub.com',
        Goods: [],
        Categories: [],
        name: '',
        deleteSkuId: '',
        deleteGoodId: '',
        item: [],
        item2: [],
        item3: [],
        index: '',
        index2: '',
        Brands: [],
        level1: [],
        selBrand: '',
        properties: [],
        selProperties: [],
        checkedValues: [],
        cate_2: []
      }
    },
    created() {
      this.$http.get(`${this.apiUrl}/goods?included=all&included=skus`)
        .then(response => {
          this.Goods = response.body.data
        })
      this.$http.get(`${this.apiUrl}/brand?pageSize=1000&page=1`)
        .then(response => {
          this.Brands = response.body.data
        })
      this.$http.get(`${this.apiUrl}/category`)
        .then(response => {
          this.Categories = response.body.data
        })
      this.$http.get(`${this.apiUrl}/pname?included=pvalue`)
        .then(response => {
          this.properties = response.body.data
        })
    },
    methods: {
      //获取选择的sku
      captureSku(index, sku) {
        this.deleteSkuId = sku.id
        this.index = index
        this.item = sku
      },
      //获取选择的Good
      captureGood(index, good){
        this.item2 = good
        this.deleteGoodId = good.id
        this.index2 = index
        this.cate_2 = []
        var cache = ''
        this.Categories.forEach(category => {
          //循环找出good的pid
          if(good.categoryId == category.id) {
            var cate = category.pid
            //根据good的pid找出上一层的id
            this.Categories.forEach(category => {
              if(category.id == cate){
                this.level1 = category
                cache = category.id
              }

            })
          }
        })
        this.Categories.forEach(category => {
          if(category.pid == cache) {
            this.cate_2.push(category)
          }
        })
      },
      //添加sku
      submit() {
        this.item3.pvalueIds = []
        this.checkedValues.forEach(value => {
          this.item3.pvalueIds.push(value.id)
        })
        var files = document.querySelector('#upload2').files
        var formData = new FormData()
        Vue.set(this.item3, 'images', [])
        this.item3.images = []
        formData.append("file",files[0])
        this.$http.post('http://file.descloud.io', formData)
          .then(response => {
            this.item3.images.splice(0, 1, 'http://'+response.body)
          })
        this.$http.post(`${this.apiUrl}/insert`, {code: this.item3.code, goodsId: this.item2.id, images: this.item3.images, price: this.item3.price, pvalueIds: this.item3.pvalueIds, saled: this.item3.saled, totalStock: this.item3.totalStock})
          .then(response => {
            this.Goods.forEach(good => {
              if(good.id == this.item2.id) {
                var obj = {
                  goodsId: this.item3.goodsId,
                  code: this.item3.code,
                  images: this.item3.images,
                  price: this.item3.price,
                  saled: this.item3.saled,
                  pvalueIds: this.item3.pvalueIds,
                  totalStock: this.item3.totalStock
                }
                good.skus.push(obj)
                this.item3 = []
                this.selProperties = []
              }
            })
          })
       console.log(this.item3)

      },
      close() {
        if(this.item3.images) {
          this.item3.images = []
        }
      },
      //删除sku
      deleteSku() {
        this.$http.delete(this.apiUrl + '/sku/' + this.deleteSkuId)
          .then(response => {
            this.Goods.forEach(goods => {
              goods.skus.forEach(sku => {
                if(sku.id == this.deleteSkuId) {
                  goods.skus.splice(this.index, 1)
                }
              })
            })
          })
      },
      //删除一个good
      deleteGood() {
        this.$http.delete(this.apiUrl + '/goods/' + this.deleteGoodId)
          .then(response => {
            this.Goods.forEach(good => {
             if(good.id == this.deleteGoodId) {
               this.Goods.splice(this.index2, 1)
             }
            })
          })
      },
      //更新sku
      saveSku() {
        this.item.pvaluesId = []
        this.item.pvalues.forEach(pvalue => {
          this.item.pvaluesId.push(pvalue.id)
        })
        delete this.item.pvalues
        this.$http.put(this.apiUrl + '/sku/' + this.deleteSkuId, this.item)
          .then(response => {

            }
          )
      },
      //更新单个good
      saveGood(){
        var obj = {
          id: this.item2.id,
          name: this.item2.name,
          unit: this.item2.unit,
          categoryId: this.item2.categoryId,
          order: this.item2.order,
          description: this.item2.description,
          brandId: this.selBrand.id,
          tags: this.item2.tags
        }
        this.$http.put(this.apiUrl + '/goods/' + this.item2.id , obj)
          .then(response => {
          })
      },
      //更新sku 图片url获取
      previewFiles() {
        var files = document.querySelector('input[type=file]').files
        var formData = new FormData()
        formData.append("file",files[0])
        this.$http.post('http://file.descloud.io', formData)
          .then(response => {
            this.item.images.splice(0,1,'http://'+response.body)
          })
      },
      //添加sku 图片url获取
      previewFilesSku() {
        var files = document.querySelector('#upload2').files
        var formData = new FormData()
        Vue.set(this.item3, 'images', [])
        this.item3.images = []
        formData.append("file",files[0])
        this.$http.post('http://file.descloud.io', formData)
          .then(response => {
            this.item3.images.splice(0, 1, 'http://'+response.body)
          })
      },
      uploadSku() {
        document.querySelector('input[type=file]').click()
      },
      uploadGood() {
        document.querySelector('#upload2').click()
      },
      selectcate(level1) {
        if(level1) {
          this.cate_2 = []
          this.Categories.forEach(category => {
            if(level1.id == category.pid) {
              this.cate_2.push(category)
            }
          })
        }
      }
    },
    components: { Multiselect }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
