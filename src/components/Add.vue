<template>
  <div class="content-wrapper" style="padding-top: 3%">
    <section class="content">
      <div class="amap-page-container">
        <el-amap
          vid="amapDemo"
          :center="center"
          :zoom="zoom"
          class="amap-demo">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
          <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
        </el-amap>
      </div>
    </section>
  </div>


</template>

<script>
  export default {
    name: 'Add',
    data() {
      return {
        apiUrl: 'http://test.cloudwarehub.com/shop?page=0&pageSize=1000',
        shops: [],
        //地图缩放比例
        zoom: 10,
        //坐标定位 当前定位杭州
        center: [120.183788,30.244166],
        markers: [],
        windows: []
      }
    },
    mounted() {
      let markers = [];
      let windows = [];

      let num = 10;
      let self = this;

      for (let i = 0 ; i < 1 ; i ++) {
        markers.push({
          position: [120.183788,30.244166 + i * 0.001],
          events: {
            click() {
              self.windows.forEach(window => {
                window.visible = false;
              });

              self.$nextTick(() => {
                self.windows[i].visible = true;
              });
            }
          }
        });

        windows.push({
          position: [120.183788,30.244166 + i * 0.001],
          content: `<div class="prompt"><a href="http://localhost:8090/#/nav/devices/11502477059133">详情</a></div>`,
          visible: false
        });
      }

      this.markers = markers;
      this.windows = windows;
    },
    created() {
      this.$http.get(this.apiUrl)
        .then( resp => {
          this.shops = resp.body.data
          this.shop_id = this.shops.id
        })
    }
  }
</script>


<style>
  .amap-demo {
    height: 1500px;
    width: 100%;
  }

  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
  }
  .amap-page-container {
    height: 1000px;
  }
</style>

