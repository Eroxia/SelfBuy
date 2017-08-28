<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <section class="content">
      <div class="box box-info">
        <div class="box-header with-border" style="background-color:#00c0ef;">
          <h3 class="box-title" style="color: white">机柜详情</h3>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="box-body">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <td>
                    <div class="form-group">
                      <label class="col-sm-4 text-right">地理位置:</label>
                      <div class="col-sm-7">
                        <label>{{shop.name}}</label>
                      </div>
                      <div class="col-sm-1">
                        <a data-target=".bs-example-modal-lg" data-toggle="modal"><span class='glyphicon glyphicon-edit'></span></a>
                      </div>
                    </div>
                    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="bs-example-modal-lg">
                      <div class="modal-dialog modal-sm" role="document ">
                        <div class="modal-content" style="margin-top: 70%;border-radius: 4px">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" style="text-align: center">请输入新名称</h4>
                          </div>
                          <div class="modal-body">
                            <div class="form-group">
                              <label class="col-sm-12 text-center"><input type="text" v-model="shop.name"></label>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" style="float: left">
                              离开
                            </button>
                            <button type="button" class="btn btn-danger" @click="edit">确定</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="form-group">
                      <label class="col-sm-4 text-right">通信状态:</label>
                      <div class="col-sm-8">
                        <label><span class="label label-success">正常通信</span></label>
                      </div>

                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="form-group">
                      <label class="col-sm-4 text-right">今日卖出:</label>
                      <div class="col-sm-8"><label>30</label></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="form-group">
                      <label class="col-sm-4 text-right">累计卖出:</label>
                      <div class="col-sm-8"><label>300</label></div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-md-6">
            <div class="box-body">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <td>
                    <label class="col-sm-4 text-right">当前库存:</label>
                    <div class="col-sm-7">
                      <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                           aria-valuemin="0" aria-valuemax="100" style="width: 75%;">
                        150
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label class="col-sm-4 text-right">缺货:</label>
                    <div class="col-sm-7">
                      <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60"
                           aria-valuemin="0" aria-valuemax="100" style="width: 25%">50
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label class="col-sm-4 text-right">总库存:</label>
                    <div class="col-sm-7">
                      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="60"
                           aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        200
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12"  id="mini">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">在售商品列表</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th style="width: 2%"></th>
                  <th style="width: 20%">商品名称</th>
                  <th style="width: 20%">规格</th>
                  <th style="width: 10%">当前库存</th>
                  <th style="width: 10%">缺货</th>
                  <th>价格</th>
                  <th style="width: 10%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(sku,index) in shopskus">
                  <td><input type="checkbox" v-model="sku.checked"></td>
                  <td>{{sku.goodsName}}</td>
                  <td><span v-for="col in sku.pvalues">{{col.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                  <td><small style="margin-left:15px " class="label bg-green">{{sku.totalStock}}</small></td>
                  <td><small class="label bg-red">{{sku.saleNum}}</small></td>
                  <td>¥{{sku.price}}</td>
                  <td><a @click="deletesku(sku,index)"><span class="glyphicon glyphicon-minus"></span></a></td>
                </tr>
                </tbody>
                <tbody>
                <tr class="active" style="height:50px;">
                  <td colspan="10" style="vertical-align: middle;">
                    <input type="checkbox" v-model="checkedAll" @click="selectAll"><b style="padding-left: 20px;cursor: Text;">选中所有商品</b>
                    <b style="padding-left: 40px;cursor: Pointer;" @click="push">删除选中商品</b>
                    <button @click="addGoods" style="float: right" type="button" class="btn btn-default">添加商品</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--display：none -->
        <div class="col-md-6" v-if="show">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">预售商品列表</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th style="width: 4%"></th>
                  <th style="width: 25%">商品名称</th>
                  <th style="width: 20%">规格</th>
                  <th style="width: 20%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="sku in skus">
                  <td><input type="checkbox" v-model="sku.checked"></td>
                  <td>{{sku.goodsName}}</td>
                  <td><span v-for="value in sku.pvalues">{{value.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                  <td colspan="3"><a @click="addskus(sku)"><span class="glyphicon glyphicon-plus"></span></a></td>
                </tr>
                </tbody>
                <tbody>
                <tr class="active" style="height:50px;">
                  <td colspan="4">
                    <input type="checkbox" v-model="checkedAll_2" @click="selectAll_2"><b style="padding-left: 20px;cursor: Text;">全选</b>
                    <button @click="addShop" style="float: right" type="button" class="btn btn-default">添加选中商品</button>
                  </td>
                </tr>
                </tbody>
              </table>
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
    data () {
      return {
        shopskus: [],
        skus: [],
        goods: [],
        show: false,
        checked: [],
        index: [],
        checkedAll: false,
        checkedAll_2: false,
        Id: '',
        shop: '',
        item: ''
      }
    },
    created: function () {
      //获取url Id
      var Url = location.href.replace(/[^0-9]/ig, '')
      var Id = Url.slice(4)
      this.Id = Id
      this.$http.get('http://test.cloudwarehub.com/skuStock?shopId=' + Id)
        .then( resp => {
          resp.body.data.forEach(shopsku => {
            shopsku.checked = false
          })
          this.shopskus = resp.body.data
        })
      this.$http.get('http://test.cloudwarehub.com/sku?shopId=' + Id)
        .then( resp => {
          resp.body.data.forEach(sku => {
            sku.checked = false
          })
          this.skus = resp.body.data
        })
      //获取商店的信息
      this.$http.get('http://test.cloudwarehub.com/shop/' + Id)
        .then( resp => {
          this.shop = resp.body.data
        })
    },
    methods: {
      addGoods () {
        if (this.show) {
          this.show = false
        } else {
          this.show = true
        }
        $(function () {
          $('#mini').toggleClass('test');
        })
      },
      deletesku (sku, index) {
        this.$http.delete('http://test.cloudwarehub.com/skuStock/' + sku.id)
          .then(resp => {
            this.shopskus.splice(index, 1)
            var obj = {
              goodsName: sku.goodsName,
              pvalues: []
            }
            sku.pvalues.forEach(pvalue => {
              obj.pvalues.push(pvalue)
            })
            this.skus.push(obj)
          })
      },
      addskus (sku, index) {
        var obj = {
          price: sku.price,
          shopId: this.Id,
          skuId: sku.id,
          goodsId: sku.goodsId
        }
        var obj2 = {
          goodsName: sku.goodsName,
          price: sku.price,
          pvalues: []
        }
        sku.pvalues.forEach(pvalue => {
          obj2.pvalues.push(pvalue)
        })
        this.$http.post('http://test.cloudwarehub.com/skuStock/insert', obj)
          .then(resp => {
            this.skus.splice(index, 1)
            this.shopskus.push(obj2)
          })
      },
      selectAll() {
        if (this.checkedAll) {
          this.shopskus.forEach(shopsku => {
            shopsku.checked = true
          })
        } else {
          this.shopskus.forEach(shopsku => {
            shopsku.checked = false
          })
        }
      },
      selectAll_2() {
        if(this.checkedAll_2){
          this.skus.forEach(sku => {
            sku.checked = true
          })
        } else {
          this.skus.forEach(sku => {
            sku.checked =false
          })
        }
      },
      push() {
        this.shopskus.forEach(shopsku => {
          if(shopsku.checked == true) {
            this.$http.delete('http://test.cloudwarehub.com/skuStock/' + shopsku.id)
              .then(resp => {
                for(let i=0; i<this.shopskus.length; i++) {
                  if(this.shopskus[i] == shopsku) {
                    this.shopskus.splice(i, 1)
                    var obj = {
                      goodsName: shopsku.goodsName,
                      pvalues: []
                    }
                    shopsku.pvalues.forEach(pvalue => {
                      obj.pvalues.push(pvalue)
                    })
                    this.skus.push(obj)
                  }
                }
              })
          }
        })
      },
      addShop() {
        this.skus.forEach(sku => {
          if(sku.checked == true) {
            var obj = {
              price: sku.price,
              shopId: this.Id,
              skuId: sku.id,
              goodsId: sku.goodsId
            }
            this.$http.post('http://test.cloudwarehub.com/skuStock/insert', obj)
              .then(resp => {
                for(let i=0; i<this.skus.length; i++) {
                  if (this.skus[i] == sku) {
                    this.skus.splice(i, 1)
                  }
                }
                var obj2 = {
                  goodsName: sku.goodsName,
                  price: sku.price,
                  pvalues: []
                }
                sku.pvalues.forEach(pvalue => {
                  obj2.pvalues.push(pvalue)
                })
                this.shopskus.push(obj2)

              })
          }
        })
      },
      edit() {
        if(this.shop.name) {
          var name = this.shop.name
          this.$http.put('http://test.cloudwarehub.com/shop/'+ this.Id, {name: name, id: this.Id})
            .then( resp=> {
              $('.bs-example-modal-lg').modal('hide')
            })
        }
      }
    }
  }
</script>
<style>
  .test {
    width: 50%;
  }

</style>
