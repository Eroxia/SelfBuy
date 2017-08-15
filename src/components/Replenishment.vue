<template>
  <div class="content-wrapper" style="padding-top: 3%">

    <section class="content" style="background-color:white;">
      <div class="box-body table-responsive " style="padding-top: 10px">
        <table id="table" class="table table-bordered">
          <tbody>
          <tr>
            <th :width="100/19 + '%'" v-for="index in 19">{{index}}</th>
          </tr>
          <tr v-for="(shelf,index) in shopskus.shelfs">
            <td style="text-align: center" v-for="unit in shelf.units" v-bind:id=index v-bind:colspan="unit.size">
              <div style="cursor:move;" class="btn btn-info">{{unit.sku.name}}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="box-footer">
        <table class="table table-striped" style="width: 50%;float: left" >
          <thead>
          <tr>
            <th style="width: 25%">商品名称</th>
            <th style="width: 25%">规格</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(sku,index) in leftskus">
            <td>
              <div style="cursor:move" v-bind:id="sku.id" class="btn btn-success" @click="move(sku,$event)">
                {{sku.goodsName}}
              </div>
            </td>
            <td><span v-for="value in sku.pvalues">{{value.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
          </tr>
          </tbody>
        </table>

        <table class="table table-striped " style="width: 50%">
          <thead>
          <tr>
            <th style="width: 25%">商品名称</th>
            <th style="width: 25%">规格</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(sku,index) in rightskus">
            <td>
              <div style="cursor:move" v-bind:id="sku.id" class="btn btn-success" @click="move(sku,$event)">
                {{sku.goodsName}}
              </div>
            </td>
            <td><span v-for="value in sku.pvalues">{{value.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
          </tr>
          </tbody>

        </table>
      </div>
    </section>
  </div>
</template>
<script>

  export default {
    name: 'Replenish',
    data () {
      return {
        id: this.$route.params.id,
        skus: [],
        shopskus: [],
        leftskus: [],
        rightskus: []
      }
    },
    created: function () {
      this.$http.get('http://test.cloudwarehub.com/skuStock?shopId=' + this.id)
        .then(resp => {
          resp.body.data.forEach((sku) => {
            sku.size = '3'
          })
          //sku绑定id 变成可拖动
          setTimeout(() => {
            resp.body.data.forEach(sku => {
              $('#' + sku.id).draggable()
            })
          }, 500)
          //分割skus数组
          var min = parseInt((resp.body.data.length / 2))
          var leftskus = resp.body.data.slice(0,min)
          var rightskus = resp.body.data.slice(min, resp.body.data.length.length)
          this.leftskus = leftskus
          this.rightskus = rightskus
        })
      //定义图形化数据结构
      var shop = {}
      shop.shelfs = []

      for (let i = 0; i < 10; i++) {
        shop.shelfs.push({units: [], width: '840mm'})
      }
      shop.shelfs.forEach(so => {
        for (let j = 0; j < parseInt(19 / 3); j++) {
          so.units.push({No: j, size: '3', sku: {name: ''}})
        }
      })
      this.shopskus = shop
    },
    methods: {
      //移动函数
      move (sku,event) {
        var x = event.target
        //获取当前表格的坐标
        var table = $('#table').offset()
        var tableX = table.top
        var tableY = table.left
        //获取选定的商品名称的坐标
        var button = $('#' + sku.id).offset()
        var buttonTop = button.top
        var buttonLeft = button.left
        /*
        console.log(parseInt(buttonTop / 50 - 1))
        console.log(parseInt(buttonLeft / 156))
        */
        //拖动商品之后的位置 和 table的位置比对  应该push到哪一行 哪一列
        var Y = parseInt(buttonTop / 51 - 2)
       /* var X = parseInt((buttonLeft / (51 * sku.size)) - 1)*/
        var X = parseInt((buttonLeft /( parseInt((100/19)*10) * sku.size) ) -1 )
        //X.Y 数值过大自动返回
        //拖动完后后 恢复初始位置
        x.style.top = 0 + 'px'
        x.style.left = 0 + 'px'
        console.log()
        //push到对应的行和列
        if(Y < 10 && X < parseInt(19/3) + 1 ) {
          this.shopskus.shelfs[Y].units[X].sku.name = sku.goodsName
          this.shopskus.shelfs[Y].units[X].size = '3'
        }
      }
    }
  }
</script>
<style>
  #index td {
    text-align: center;
    width: 100/6;
    overflow: hidden;
  }

  tr {
    height: 50px;
  }

  #abc tr th {
    width: 100/19;
    background-color: #9e9e9e;
  }
</style>
