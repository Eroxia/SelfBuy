<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <div>
      <span style="margin-left: 20px;border: 1px;">
        <button type="button" class="btn btn-primary" style="width: 80px" data-toggle="modal"
                data-target=".bs-example-modal-lg"><span class="glyphicon glyphicon-plus"></span></button>
        <!--模态框-->
          <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel"
               id="123">
            <div class="modal-dialog" role="document" style="margin-top:10%">
              <div class="modal-content">
                <div class="modal-header btn-primary">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel">选择增加位置</h4>
                </div>
                <!--选择城市下拉表-->
                <div id="tip" class="modal-body">
                  <br>
                  省：<select id='province' style="width:100px" @change="search($event)"></select>
                  市：<select id="city" style="width:100px" @change="search($event)"></select>
                  区：<select id='district' style="width:100px" @change="search($event)"></select>
                  街道：<select id='street' style="width:100px" @change='setCenter($event)'></select>
                  <br>
                  <br>
                  编号：<input type="text" v-model="No" style="width:200px"><span v-show="show" style="margin-left: 20px;"><a
                  style="color: red">请输入机器编号！</a></span>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                  <button type="button" class="btn btn-primary" @click="makeSure">确定</button>
                </div>
              </div>
            </div>
          </div>
         <button @click="movePoint" type="button" class="btn btn-success" style="width: 80px"><span
           class="glyphicon glyphicon-pencil"></span></button>
         <button @click="save" type="button" class="btn btn-primary" style="width: 80px"><span
           class="glyphicon glyphicon-ok"></span></button>
      </span>
      <div class="amap-page-container">
      </div>
    </div>
    <div id="container" style="height: 900px"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'Add',
    data () {
      return {
        apiUrl: 'http://test.cloudwarehub.com/shop?page=0&pageSize=1000',
        shops: [],
        No: '',
        show: false,
        map: null,
        district: null,
        polygons: null,
        getData: null,
        pointLng: '',
        pointLat: '',
        markers: [],
        createMarker: null
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
        var citySelect = document.getElementById('city')
        var districtSelect = document.getElementById('district')
        var areaSelect = document.getElementById('street')
        map = new AMap.Map('container', {
          resizeEnable: true,
          //地图中心坐标
          center: [120.195461, 30.240014],
          //地图默认缩放比例
          zoom: 11,
        })

        //加载出每个坐标
        var lnglats = [
          [120.195461, 30.240014],
          [120.195461, 30.230014],
          [120.195461, 30.220014],
          [120.195461, 30.210014]
        ]
        //给每个marker点添加样式属性
        var markers = []
        var createMarker = function (i, Marker, position, draggable, color) {
          var marker = new Marker({
            iconLabel: {
              style: {
                color: '#fff',
                fontSize: '120%',
                marginTop: '2px'
              },
              innerHTML: '#' + i
            },
            iconStyle: color,
            map: map,
            position: position,
            draggable: draggable
          })
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
            var infoWindow = new SimpleInfoWindow({
              myCustomHeader: '我的header',
              myCustomFooter: '我的footer',
              infoTitle: '<div style="padding-left: 52%"><strong>#' + i + '</strong></div>',
              infoBody: '<a class=\'trashThis\' style=\'padding: 10px;color: red\'><span class=\'glyphicon glyphicon-trash\'></span></a><a style=\'padding-left: 50px\'><span class=\'glyphicon glyphicon-circle-arrow-right\'></span></a>',

              //基点指向marker的头部位置
              offset: new AMap.Pixel(0, -31)
            })

            infoWindow.get$InfoBody().on('click', '.trashThis', function (event) {
              //阻止冒泡
              event.stopPropagation()
              //移除标记点
              map.remove(marker)
              //关闭弹出窗口
              infoWindow.close(map, marker.getPosition())
            })

            //打开窗口函数
            function openInfoWin () {
              infoWindow.open(map, marker.getPosition())
            }

            //绑定鼠标点击事件
            marker.clicked = AMap.event.addListener(marker, 'click', function () {
              openInfoWin()
            })

          })
          return marker
        }
        var draggable = false
        var color = 'blue'
        AMapUI.loadUI(['overlay/SimpleMarker'], (Marker) => {
          for (let i = 0; i < lnglats.length; i++) {
            var marker = createMarker(i, Marker, lnglats[i], draggable, color)
            markers.push(marker)
          }
        })
        //赋值到全局属性
        this.markers = markers
        this.createMarker = createMarker
        //行政区划分
        var opts = {
          subdistrict: 1,   //返回下一级行政区
          showbiz: false  //最后一级返回街道信息
        }
        district = new AMap.DistrictSearch(opts)
        district.search('中国', function (status, result) {
          if (status == 'complete') {
            getData(result.districtList[0])
          }
        })
        this.district = district

        var getData = (data, level) => {
          var bounds = data.boundaries
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              var polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                strokeColor: '#CC66CC',
                fillColor: '#CCF3FF',
                fillOpacity: 0.5,
                path: bounds[i]
              })
              polygons.push(polygon)
            }
            map.setFitView()//地图自适应
          }
          //清空下一级别的下拉列表
          if (level === 'province') {
            citySelect.innerHTML = ''
            districtSelect.innerHTML = ''
            areaSelect.innerHTML = ''
          } else if (level === 'city') {
            districtSelect.innerHTML = ''
            areaSelect.innerHTML = ''
          } else if (level === 'district') {
            areaSelect.innerHTML = ''
          }

          var subList = data.districtList
          if (subList) {
            var contentSub = new Option('--请选择--')
            var curlevel = subList[0].level
            var curList = document.querySelector('#' + curlevel)
            curList.add(contentSub)
            for (var i = 0, l = subList.length; i < l; i++) {
              var name = subList[i].name
              var levelSub = subList[i].level
              var cityCode = subList[i].citycode
              contentSub = new Option(name)
              contentSub.setAttribute('value', levelSub)
              contentSub.center = subList[i].center
              contentSub.adcode = subList[i].adcode
              curList.add(contentSub)
            }
          }
        }//end getData
        this.polygons = polygons
        this.getData = getData
        this.map = map
      }, 100)
    },
    methods: {
      edit () {
        this.show = true
        $('#button').text('编辑中...')
      },
      save () {
        this.show = false
        $('#button').text('编辑模式')
      },
      search (e) {
        var obj = e.target
        //获取选择的选项
        var option = obj[obj.options.selectedIndex]
        //获得关键字
        var keyword = option.text
        //获得选择坐标
        var adcode = option.adcode
        this.district.setLevel(option.value) //行政区级别
        this.district.setExtensions('all')
        //行政区查询
        this.district.search(adcode, (status, result) => {
          if (status === 'complete') {
            this.getData(result.districtList[0], obj.id)
          }
        })
        //清除地图上的覆盖物
        for (var i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null)
        }
      },
      setCenter (e) {
        var obj = e.target
        //设置地图中心点为选中的位置
        this.map.setCenter(obj[obj.options.selectedIndex].center)
        //传递经纬度坐标
        var point = obj[obj.options.selectedIndex].center
        this.pointLng = point.lng
        this.pointLat = point.lat
        //清除地图标记覆盖物
        for (var i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null)
        }
      },
      makeSure () {
        if (this.No) {
          var position = [this.pointLng, this.pointLat]
          AMapUI.loadUI(['overlay/SimpleMarker'], (Marker) => {
            var Nonum = this.No
            var marker = this.createMarker(Nonum, Marker, position, true, 'green')
            this.markers.push(marker)
          })
          $('#123').modal('hide')
        } else {
          this.show = true
        }
      },
      movePoint () {
        this.markers.forEach((marker) => {
          marker.setDraggable(true)
          marker.setIconStyle('green')
          AMap.event.removeListener(marker.clicked)
        })
      },
      save () {
        var me = this
        var i = 0
        this.markers.forEach((marker) => {
          marker.setDraggable(false)
          marker.setIconStyle('blue')
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
            var infoWindow = new SimpleInfoWindow({
              myCustomHeader: '我的header',
              myCustomFooter: '我的footer',
              infoTitle: '<div style="padding-left: 52%"><strong>#' + (i++) + '</strong></div>',
              infoBody: '<a class=\'trashThis\' style=\'padding: 10px;color: red\'><span class=\'glyphicon glyphicon-trash\'></span></a><a style=\'padding-left: 50px\'><span class=\'glyphicon glyphicon-circle-arrow-right\'></span></a>',

              //基点指向marker的头部位置
              offset: new AMap.Pixel(0, -31)
            })

            infoWindow.get$InfoBody().on('click', '.trashThis', (event) => {
              //阻止冒泡
              event.stopPropagation()
              //移除标记点
              this.map.remove(marker)
              //关闭弹出窗口
              infoWindow.close(me.map, marker.getPosition())
            })

            //打开窗口函数
            function openInfoWin () {
              infoWindow.open(me.map, marker.getPosition())
            }

            //绑定鼠标点击事件
            marker.clicked = AMap.event.addListener(marker, 'click', function () {
              openInfoWin()
            })

          })
        })
      }
    }
  }
</script>
