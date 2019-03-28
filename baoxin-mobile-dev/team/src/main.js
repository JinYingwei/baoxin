import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/base.css'
import './assets/font/iconfont.css'
import 'lib-flexible'

import axios from 'axios'
Vue.prototype.axios = axios;

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

// var authCookie = utils.Cookie.get('_auth')
// axios公共配置
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Accept'] =
//   `text/plain, text/html,application/json,text/javascript, application/javascript;_auth=${authCookie}`;
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 如果响应数据中存在code并且值为1,则重定向至登陆页面
  var code = response.data.code
  if (code && code == 1) {
    noLogin('http://ii.sinelinked.com/mobile/transition/?role=team')
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});
// 未登录
function noLogin(targetUrl) {
	location.href = targetUrl;
}
var bus = new Vue()
Vue.prototype.bus = bus

// vant组件
import {
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Panel,
  Tab,
  Tabs,
  Field,
  Collapse,
  CollapseItem,
  Dialog,
  Area,
  Swipe,
  SwipeItem,
  Uploader,
  List,
  Search,
  Popup,
  Checkbox,
  CheckboxGroup,
  Circle,
  SwitchCell,
  RadioGroup,
  Radio,
  Stepper,
  Picker,
  Actionsheet,Slider 
} from 'vant'

Vue.use(Button).use(Picker).use(Slider).use(Checkbox).use(Circle).use(CheckboxGroup).use(Search).use(Dialog).use(Actionsheet).use(Stepper).use(RadioGroup).use(Radio).use(SwitchCell).use(Tabbar).use(Popup).use(TabbarItem).use(Collapse).use(CollapseItem).use(NavBar).use(List).use(Icon).use(Cell).use(CellGroup).use(Panel).use(Tab).use(Tabs).use(Field).use(Area).use(Swipe).use(SwipeItem).use(Uploader)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
