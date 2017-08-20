<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <div>
      <button id="button" type="button" class="btn btn-default" @click="edit">编辑模式</button>
      <span  style="margin-left: 40px;border: 1px;">
        <button type="button" class="btn btn-info" data-toggle="modal" data-target=".bs-example-modal-lg">增加坐标</button>
         <!--模态框-->
          <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" id="123">
            <div class="modal-dialog" role="document" style="margin-top:10%">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel">选择增加位置</h4>
                </div>
                <!--选择城市下拉表-->
                <div id="tip" class="modal-body">
                  <br>
                  省：<select id='province' style="width:100px" @change="search($event)"></select>
                  市：<select id="city" style="width:100px" @change="search($event)"></select>
                  区：<select id='district' style="width:100px" @change="search($event)"></select>
                  街道：<select id='street' style="width:100px"  @change='setCenter($event)'></select>
                  <br>
                  <br>
                  机器编号:<input type="text" style="width:100px"/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                  <button type="button" class="btn btn-primary">保存</button>
                </div>
              </div>
            </div>
          </div>
        <button type="button" class="btn btn-warning">移动坐标</button>
        <button type="button" class="btn btn-danger">删除坐标</button>
        <button type="button" class="btn btn-success" @click="save">保存全部</button>
      </span>
      <div class="amap-page-container">
      </div>
    </div>
    <div id="container" style="height: 900px"></div>
  </div>
</template>

<script>
  export default {
    name: 'Add',
    data () {
      return {
        apiUrl: 'http://test.cloudwarehub.com/shop?page=0&pageSize=1000',
        shops: [],
        show: false,
        map: null,
        district: null,
        polygons: null,
        getData: null
      }
    },
    created () {
      this.$http.get(this.apiUrl)
        .then(resp => {
          this.shops = resp.body.data
          this.shop_id = this.shops.id
        })



      //加载地图 100毫秒后执行
      setTimeout(() => {
        var map, district, citycode, polygons = []
        var citySelect = document.getElementById('city');
        var districtSelect = document.getElementById('district');
        var areaSelect = document.getElementById('street');
        map = new AMap.Map('container', {
          resizeEnable: true,
          //地图中心坐标
          center: [120.195461, 30.240014],
          //地图默认缩放比例
          zoom: 11,
        })
        //行政区划分
        var opts = {
          subdistrict: 1,   //返回下一级行政区
          showbiz:false  //最后一级返回街道信息
        };
        district = new AMap.DistrictSearch(opts)
        district.search('中国', function(status, result) {
          if(status=='complete'){
            getData(result.districtList[0]);
          }
        })
        this.district = district
        var getData = (data, level) => {
          var bounds = data.boundaries;
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              var polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                strokeColor: '#CC66CC',
                fillColor: '#CCF3FF',
                fillOpacity: 0.5,
                path: bounds[i]
              });
              polygons.push(polygon);
            }
            map.setFitView();//地图自适应
          }
          //清空下一级别的下拉列表
          if (level === 'province') {
            citySelect.innerHTML = '';
            districtSelect.innerHTML = '';
            areaSelect.innerHTML = '';
          } else if (level === 'city') {
            districtSelect.innerHTML = '';
            areaSelect.innerHTML = '';
          } else if (level === 'district') {
            areaSelect.innerHTML = '';
          }

          var subList = data.districtList;
          if (subList) {
            var contentSub = new Option('--请选择--');
            var curlevel = subList[0].level;
            var curList =  document.querySelector('#' + curlevel);
            curList.add(contentSub);
            for (var i = 0, l = subList.length; i < l; i++) {
              var name = subList[i].name;
              var levelSub = subList[i].level;
              var cityCode = subList[i].citycode;
              contentSub = new Option(name);
              contentSub.setAttribute("value", levelSub);
              contentSub.center = subList[i].center;
              contentSub.adcode = subList[i].adcode;
              curList.add(contentSub);
            }
          }
        }//end getData
        this.polygons = polygons
        this.getData = getData
        this.map = map
        }, 100)
    },
    methods: {
      edit() {
        this.show = true
        $('#button').text('编辑中...')
      },
      save() {
        this.show = false
        $('#button').text('编辑模式')
      },
      search(e) {
        var obj= e.target
        //获取选择的选项
        var option = obj[obj.options.selectedIndex];
        //获得关键字
        var keyword = option.text;
        //获得选择坐标
        var adcode = option.adcode;
        this.district.setLevel(option.value); //行政区级别
        this.district.setExtensions('all');
        //行政区查询
        this.district.search(adcode,(status, result) => {
          if(status === 'complete'){
            this.getData(result.districtList[0], obj.id);
          }
        })
        //清除地图上的覆盖物
        for (var i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null);
        }
      },
      setCenter(e) {
        var obj = e.target
        this.map.setCenter(obj[obj.options.selectedIndex].center)
        for (var i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null);
        }
      }
    }
  }
</script>
