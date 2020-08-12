import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios=axios;
Vue.config.productionTip = false

Vue.filter("image",function(url,arg){
	return url.replace(/w\.h/,arg);//  /w\.h/是用了正则表达式\.是转义.
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
