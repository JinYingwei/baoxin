// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/base.css'

import './assets/font/iconfont.css'
import utils from "@/assets/js/utils.js"

import 'lib-flexible'

import axios from 'axios'
Vue.prototype.axios = axios;


var authCookie = utils.Cookie.get('_auth')
// axios公共配置
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = `text/plain, text/html,application/json,text/javascript, application/javascript;_auth=${authCookie}`;
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 如果响应数据中存在code并且值为1,则重定向至登陆页面
  var code = response.data.code
  if (code && code == 1) {
    noLogin('http://ii.sinelinked.com/mobile/transition/?role=agent')
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

// 未登录
function noLogin(targetUrl) {
  location.href = targetUrl;
}


// 临时代码 （如果是外部活动入口进入的，则跳转活动页面）“投影仪活动”
var activity = localStorage.getItem('activity')
if (activity == 'touyingyi') {
  localStorage.removeItem('activity')
  location.href = "/sub/activity/jinqiu/index.html"
}

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

// vant组件
import {
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  Tab,
  Tabs,
  Icon,
  Cell,
  CellGroup,
  Field,
  List,
  Badge,
  BadgeGroup,
  SwitchCell,
  Collapse,
  CollapseItem,
  Uploader,
  Swipe,
  Switch,
  SwipeItem,
  Area,
  Radio,
  RadioGroup,
  Tag,
  NoticeBar,
  Dialog,
  Search,
  ImagePreview,
  Popup,
  Panel,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  DatetimePicker,
  Actionsheet,
  Toast,
  Picker,
  Notify
}
from 'vant';

Vue
  .use(Button).use(Notify).use(Toast)
  .use(Tabbar).use(Actionsheet).use(SwipeCell).use(Popup)
  .use(TabbarItem).use(Checkbox).use(CheckboxGroup)
  .use(NavBar).use(Swipe).use(SwipeItem).use(NoticeBar)
  .use(Tab).use(Tabs).use(Icon).use(Cell).use(CellGroup).use(Field).use(List).use(Badge).use(BadgeGroup).use(SwitchCell)
  .use(Area).use(Dialog).use(Picker)
  .use(Collapse).use(DatetimePicker).use(CollapseItem).use(Uploader).use(RadioGroup).use(Radio).use(Tag).use(Switch).use(Search).use(Panel);

Vue.config.productionTip = false

import pdf from '@/components/pdf'
Vue.use(pdf)

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
