<template>
  <div class="content-wrapper" style="padding-top: 4%" >
    <section class="content-header">
      <h1>商品管理<small>添加商品</small></h1>
    </section>
    <section class="content" >
      <div class="row">
        <div class="col-xs-12">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">商品信息</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal">
              <div class="box-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">类别</label>
                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-md-6">
                        <select v-model="level1" class="form-control" v-on:change="selectcate(level1)">
                          <option v-for="cate in pid_0" v-bind:value="cate">
                            {{ cate.name }}
                          </option>
                        </select>
                      </div>

                      <div class="col-md-6">
                        <select v-model="product.categoryId" class="form-control">
                          <option v-for="cate in cate_2" v-bind:value="cate.id" >
                            {{ cate.name }}
                          </option>
                        </select>
                      </div>


                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-10">
                    <input v-model="product.name" type="text" class="form-control" placeholder="名称">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">商标</label>
                  <div class="col-sm-10">
                    <select  class="form-control" v-model="product.brandId">
                      <option v-for="brand in brands" v-bind:value="brand.id">
                        {{ brand.chName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">单位</label>
                  <div class="col-sm-10">
                    <input v-model="product.unit" type="text" class="form-control" placeholder="件">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">标签</label>
                  <div class="col-sm-10">
                    <input v-model="product.tags" type="text" class="form-control" >
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">描述</label>

                  <div class="col-sm-10">
                    <textarea v-model="product.description" name="desc" class="form-control" placeholder="描述"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">规格</label>
                  <div class="col-sm-10">
                    <multiselect v-model="selProperties" @input="propChange" :options="properties" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="属性类型" label="name" track-by="name"></multiselect>
                  </div>
                </div>
                <div class="form-group" v-for="prop in selProperties">
                  <label class="col-sm-2 control-label">{{prop.name}}</label>
                  <div class="col-sm-10">
                    <div class="checkbox pull-left" style="min-width: 80px;" v-for="value in prop.pvalues">

                      <label>
                        <input v-on:change="propChange" type="checkbox" v-bind:value="value" v-model="checkedValues">
                        {{value.value}}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- /.box-body -->
            </form>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" v-for="(sku, index) in skus">
          <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">{{index + 1}}#{{selCategory.name}}</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->

            <form class="form-horizontal">
              <div class="box-body">
                <div class="form-group" v-for="prop in sku.properties" >
                  <label class="col-sm-2 control-label">  {{prop.prop.name}}</label>

                  <div class="col-sm-10" >
                    <input v-bind:value="prop.value.value" disabled  class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">条形码</label>
                  <div class="col-sm-10">
                    <input v-model="sku.code" type="text" class="form-control" placeholder="条形码">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">价格</label>

                  <div class="col-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon">¥</span><input v-model="sku.price" type="text" class="form-control" placeholder="价格">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">销售状态</label>
                  <div class="col-sm-10">
                    <div class="radio">
                      <label>
                        <input v-model="sku.saled" type="radio" name="optionsRadios" value="1" checked="">
                        上架
                      </label>
                      <label>
                        <input v-model="sku.saled" type="radio" name="optionsRadios" value="0">
                        下架
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">图片</label>

                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-md-3" v-for="img in sku.images">
                        <button  class="thumbnail">
                          <img v-bind:src="img" >
                        </button>
                      </div>
                      <div class="col-md-3">
                        <span v-on:click="upload(sku)" class="info-box-icon bg-light-blue"><i class="fa fa-plus"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
            </form>
          </div>
        </div>
      </div>
      <button v-on:click="submit" style="width: 100%;" type="button" class="btn btn-success">发布商品</button>
    </section>
    <!-- /.content -->
  <input style="display: none;" id="browse" type="file" v-on:change="previewFiles()" multiple>
  </div>
</template>



<script>
  //vue插件
  import Multiselect from 'vue-multiselect'
  export default{
    name: 'GoodsAddInfo',
    components: {Multiselect},
    data() {
      return {
        apiUrl: 'http://test.cloudwarehub.com',
        product: {},
        properties: [],
        selBrand: '',
        selProperties: [],
        checkedValues: [],
        skus: [],
        categories: [],
        level1: [],
        selCategory: '',
        currentSku: null,
        cates: [],
        brands: [],
        pid_0: [],
        cate_2: []
      }
    },
    created: function() {
      //获取所有商品类别
      this.$http.get(`${this.apiUrl}/category?&pageSize=100&page=0`).
        then(response => {
        this.cates = response.body.data
        this.cates.forEach(category => {
          category.values = []
          if(category.pid == 0) {
            this.pid_0.push(category)
          }
        })

        this.cates.forEach(category => {
          this.pid_0.forEach(pid => {
            if(category.pid == pid.id) {
              pid.values.push(category)
            }
          })
        })
      })
      //获取所有商品规格
      this.$http.get(`${this.apiUrl}/pname?included=pvalue`).then(response => {
        this.properties = response.body.data
        this.product.skus = this.skus
        this.propChange()
      })
      //获取所有商品品牌
      this.$http.get(`${this.apiUrl}/brand?pageSize=1000&page=1`).then(response => {
        this.brands = response.body.data
      })
    },
    methods: {
      selectcate(level1) {
        if(level1) {
          this.cate_2 = []
          this.cates.forEach(category => {
            if(level1.id == category.pid) {
              this.cate_2.push(category)
            }
          })
        }
      },
      previewFiles () {
        var sku = this.currentSku
        var files = document.querySelector('input[type=file]').files
        var formData = new FormData()
        formData.append("file",files[0])
        this.$http.post('http://file.descloud.io', formData)
          .then(response => {
            sku.images.splice(0,1,'http://'+response.body)
        })
      },
      upload (sku) {
        this.currentSku = sku
        document.querySelector('input[type=file]').click()
      },
      propChange () {
        /** arrange items **/
        var arr = []
        for(let i in this.selProperties) {
          var obj = {
            prop: this.selProperties[i],
            checks: []
          }
          for(let j in this.selProperties[i].pvalues) {
            var checked = false
            for(let k in this.checkedValues) {
              if(this.checkedValues[k].id === this.selProperties[i].pvalues[j].id) {
                checked = true
                break
              }
            }
            if(checked) {
              obj.checks.push(this.selProperties[i].pvalues[j])
            }
          }
          arr.push(obj)
        }
        /** /arrange items **/

        var count = 1
        for(let iArr in arr) {
          count *= arr[iArr].checks.length
        }
        if(count === 0) {
          return
        }
        this.skus.splice(0, this.skus.length)
        for(let i=0; i<count; i++) {
          var calCount = i
          var sku = {
            images: []
          }
          sku.properties = []
          for(let j in arr) {
            var offset = calCount % arr[j].checks.length
            calCount = parseInt(calCount / arr[j].checks.length)
            sku.properties[j] = {
              prop: arr[j].prop,
              value: arr[j].checks[offset]
            }
          }
          this.skus.push(sku)
        }
      },
      submit() {
        this.product.skus.forEach(sku => {
          sku.pvalueIds = []
          sku.properties.forEach(prop => {
            sku.pvalueIds.push(prop.value.id)
          })
          delete sku.properties
        })
        this.$http.post(`${this.apiUrl}/goods`, this.product)
          .then(response => {
            switch(response.status) {
              case 200:
                this.$router.push('/nav/goods')
                break
            }
          })
      }
    }
  }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
