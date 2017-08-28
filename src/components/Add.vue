<template>
  <div id="contentWrapper" class="content-wrapper">
      <span id="spanEdge">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">
          <span class="glyphicon glyphicon-plus"></span>
        </button>
          <div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
               aria-labelledby="gridSystemModalLabel">
            <div id="modelContent" class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header btn-primary">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel">选择增加位置</h4>
                </div>
                <div id="lists" class="modal-body">
                  <br>
                  省：<select id='province' @change="search($event)"></select>
                  市：<select id="city" @change="search($event)"></select>
                  区：<select id='district' @change="search($event)"></select>
                  街道：<select id='street' @change="setCenter($event)"></select>
                  <br><br>
                  位置：<input v-model="itemName" type="text"><span><a v-show="show" id="a">请输入机器的位置</a></span>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                  <button type="button" class="btn btn-primary" @click="Sure">确定</button>
                </div>
              </div>
            </div>
          </div>
      </span>
    <div id="container"></div>
  </div>
</template>

<script>
  export default {
    name: 'Add',
    data() {
      return {
        shops: null,
        map: null,
        getData: null,
        polygons: null,
        district: null,
        show: false, //提示
        itemName: '',
        createMarker: null,
        pointer: null, //选择的中心店
      }
    },
    created() {
      //获取所有商店的坐标和id
      this.$http.get('http://test.cloudwarehub.com/shop?page=0&pageSize=1000')
        .then(resp => {
          this.shops = resp.body.data
        })
      //加载地图
      var me = this
      setTimeout(() => {
        //根据ID初始哈所有dom
        var polygons = []
        var citySelect = document.getElementById('city')
        var districtSelect = document.getElementById('district')
        var areaSelect = document.getElementById('street')
        //指定地图所在的容器
        var map = new AMap.Map('container', {
          //地图是否可重置大小
          resizeEnable: true,
          //地图中心坐标
          center: [120.195461, 30.240014],
          //地图默认缩放比例
          zoom: 11,
        })
        //定义marker(标记)的构造函数
        var createMarker = function(name, position, draggable, color, id) {
          AMapUI.loadUI(['overlay/SimpleMarker'], (Marker) => {
            var marker = new Marker({
              iconLabel: {
                style: {
                  color: '#fff',
                  fontSize: '120%',
                  marginTop: '2px'
                },
                innerHTML: 'O'
              },
              iconStyle: color,
              map: map,
              position: position,
              draggable: draggable
            })
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
              var infoWindow = new SimpleInfoWindow({
                myCustomHeader: '我的header',
                myCustomFooter: '我的footer',
                infoTitle: '<div><strong>' + name + '</strong></div>',
                infoBody: '<a class=\'trashThis\' style=\'padding: 10px;color: red\'>' + '<span class=\'glyphicon glyphicon-trash\'></span></a>' +
                '<a style=\'padding-left: 10px;color: green\'><span class=\'glyphicon glyphicon-move\'></span></a>' +
                '<a style=\'padding-left: 22px;color: blue\'><span class=\'glyphicon glyphicon-check\'></span></a>' +
                '<a style=\'padding-left: 25px\'><span class=\'glyphicon glyphicon-circle-arrow-right\'></span></a>',

                //基点指向marker的头部位置
                offset: new AMap.Pixel(0, -31)
              })
              //根据class名称绑定事件 绑定删除事件
              infoWindow.get$InfoBody().on('click', '.trashThis', (event) => {
                //阻止冒泡
                event.stopPropagation()
                //移除标记点
                me.$http.delete('http://test.cloudwarehub.com/shop/' + id)
                  .then( resp => { map.remove(marker) })
                //关闭弹出窗口
                infoWindow.close(map, marker.getPosition())
              })
              //绑定移动事件
              infoWindow.get$InfoBody().on('click', '.glyphicon-move', (event) => {
                //阻止冒泡
                event.stopPropagation()
                marker.setIconStyle('green')
                marker.setDraggable(true)
                infoWindow.close(map, marker.getPosition())
              })
              //绑定确认事件
              infoWindow.get$InfoBody().on('click', '.glyphicon-check', (event) => {
                //阻止冒泡
                event.stopPropagation()
                marker.setIconStyle('blue')
                marker.setDraggable(false)
                var thisPosition = [marker.getPosition().lng, marker.getPosition().lat]
                me.$http.put('http://test.cloudwarehub.com/shop/' + id, {id: id, gps: JSON.stringify(thisPosition) })
              })
              //绑定详情事件
              infoWindow.get$InfoBody().on('click', '.glyphicon-circle-arrow-right', (event) => {
                //阻止冒泡
                event.stopPropagation()
                window.location.assign("http://localhost:8090/#/nav/devices/"+id)

              })
              //打开窗口函数
              function openInfoWin() {
                infoWindow.open(map, marker.getPosition())
              }

              //绑定鼠标点击事件
              marker.clicked = AMap.event.addListener(marker, 'click', () => {
                openInfoWin()
              })

            })
            return marker
          })
        }
        this.createMarker = createMarker

        this.shops.forEach(shop => {
          createMarker(shop.name, JSON.parse(shop.gps), false, 'blue', shop.id)
        })
        var district = new AMap.DistrictSearch({
          subdistrict: 1,   //返回下一级行政区
          showbiz: false  //最后一级返回街道信息
        })
        district.search('中国', (status, result) => {
          if (status == 'complete') {
            getData(result.districtList[0])
          }
        })
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
        this.map = map
        this.district = district
        this.polygons = polygons
        this.getData = getData
      }, 500) //加载完成
    },//end created
    methods: {
      search(e) {
        //获取search的dom
        var obj = e.target
        //获取选择的选项
        var option = obj[obj.options.selectedIndex]
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
      },
      setCenter(e) {
        var obj = e.target
        //设置地图中心点为选中的位置
        this.map.setCenter(obj[obj.options.selectedIndex].center)
        //传递经纬度坐标
        var point = obj[obj.options.selectedIndex].center
        this.pointer = point
        //清除地图标记覆盖物
        for (var i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null)
        }
        this.map.setZoom(12)
        this.zoom = 3
      },
      Sure() {
        if(this.itemName){
          var name = this.itemName
          var position = [this.pointer.lng, this.pointer.lat]
          this.$http.post('http://test.cloudwarehub.com/shop', {name: '测试专用', gps: JSON.stringify(position) })
            .then( resp => {
              var id = resp.body.data.id
              this.createMarker(name, position, true, 'green', id)
            })
          $('#modal').modal('hide')
        } else {
          this.show = true
        }
      }
    }
  }
</script>

<style>
  #contentWrapper {
    padding-top: 3%;
  }
  #container {
    height: 870px;
  }
  #spanEdge {
    margin-left: 20px;
    border: 1px;
  }
  #modelContent {
    margin-top: 10%;
  }
  #lists select {
    width: 100px;
  }
  #lists input {
    width: 200px;
  }
  #lists input span {
    margin-left: 20px;
  }
  #a {
    color: red;
  }
  #spanEdge button {
    width: 80px;
  }
</style>
