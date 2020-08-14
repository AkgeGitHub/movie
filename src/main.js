import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import scroller from '@/components/scroller'
import loading from '@/components/loading'

Vue.use(ElementUI);
Vue.prototype.axios=axios;
Vue.config.productionTip = false

Vue.filter("image",function(url,arg){
	return url.replace(/w\.h/,arg);//  /w\.h/是用了正则表达式\.是转义.
})

Vue.component("scroller",scroller);//注册为全局组件
Vue.component("loading",loading);//注册为全局组件


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
