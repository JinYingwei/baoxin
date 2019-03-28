// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iviewArea from 'iview-area';

// iview
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import './theme/index.less';

import GLOBAL from './assets/common/common.js'
Vue.prototype.$GLOBAL = GLOBAL
Vue.prototype.store = store

import axios from 'axios'
Vue.prototype.$axios= axios

if(sessionStorage.getItem("loginInfo") != null){
    var loginInfoData = JSON.parse(sessionStorage.getItem('loginInfo'))
    store.commit("loginInfo", loginInfoData);
}else{
    store.commit("loginInfo", {isLogin: false});
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    var code = response.data.code
    // code = 1 需要登陆
    if(code && code == 1){
        sessionStorage.removeItem("loginInfo");
        GLOBAL.cookie.del('_auth')
        vm.$router.push({path:'/'})
        vm.$store.commit("loginInfo", {isLogin: false});
        vm.$store.commit("showAgentUser", { type: 'login', isShow: true});
        if(vm.$store.state.loginInfo.type=='agent'){
            vm.$store.commit("showAgentUser", { type: 'login', isShow: true});
        }else if(vm.$store.state.loginInfo.type=='team'){
            vm.$store.commit("showTeamUser", { type: 'login', isShow: true});
        }
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});


Vue.use(iView);
Vue.use(iviewArea);

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

