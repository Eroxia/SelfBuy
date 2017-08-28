<template>
  <div>
    <div class="content-wrapper" style="padding-top: 4%">
      <section class="content-header">
        <h1>商品 库存管理</h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i>Home</a></li>
          <li class="active">补货管理</li>
        </ol>
      </section>
      <div>
        <div>
          <section class="content" style="height: 100%;">
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
                        <th style="width: 10%">銷量</th>
                        <th>价格</th>
                        <th style="width: 10%">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(sku,index) in shopskus">
                        <td><input type="checkbox" v-model="sku.checked"></td>
                        <td>{{sku.goodsName}}</td>
                        <td><span v-for="col in sku.pvalues">{{col.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td><small style="margin-left:15px " class="label bg-red">{{sku.totalStock}}</small></td>
                        <td><small class="label bg-green">{{sku.saleNum}}</small></td>
                        <td>¥{{sku.price}}</td>
                        <td><a @click="deletesku(sku,index)"><span class="glyphicon glyphicon-minus"></span></a></td>
                      </tr>
                      </tbody>
                      <tbody>
                      <tr class="active" style="height:50px;">
                        <td colspan="10" style="vertical-align: middle;">
                          <input type="checkbox" v-model="checkedAll" @click="selectAll"><b style="padding-left: 20px">选中所有商品</b>
                          <b style="padding-left: 40px" @click="push">删除选中商品</b>
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
                          <input type="checkbox" v-model="checkedAll_2" @click="selectAll_2"><b style="padding-left: 20px">全选</b>
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
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'details',
    data() {
      return {
        id: this.$route.params.id,
        shopskus: [],
        skus: [],
        goods: [],
        show: false,
        checked: [],
        index: [],
        checkedAll: false,
        checkedAll_2: false
      }
    },
    created: function() {
      //get left list
      this.$http.get('http://test.cloudwarehub.com/skuStock?shopId=' + this.id)
        .then( resp => {
          resp.body.data.forEach(shopsku => {
            shopsku.checked = false
          })
          this.shopskus = resp.body.data
        })
      this.$http.get('http://test.cloudwarehub.com/sku?shopId=' + this.id)
        .then( resp => {
          resp.body.data.forEach(sku => {
            sku.checked = false
          })
          this.skus = resp.body.data
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
          shopId: this.id,
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
              shopId: this.id,
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
      }
    }
  }
</script>
<style>
  .test {
   width: 50%;
  }
</style>
