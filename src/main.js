// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import AMap from 'vue-amap'

import $ from 'jquery'

Vue.use(router)
Vue.use(VueResource)
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '5ce6e7f61cc0bd8a43816d022a9e969e',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});


Vue.http.options.emulateJSON = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
