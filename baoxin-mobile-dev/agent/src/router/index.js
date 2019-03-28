import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import takeOrder from "@/views/takeOrder"
import message from "@/views/message"
// const message = resolve => require.ensure([], () => resolve(require('@/views/message')), 'message');

import practice from "@/views/practice"
// const practice = resolve => require.ensure([], () => resolve(require('@/views/practice')), 'practice');
import practiceMenu from "@/views/zhanye/menu"

import client from "@/views/zhanye/client/index"
import agenda from "@/views/zhanye/client/agenda"
import addVisit from "@/views/zhanye/client/addVisit"
import clientList from "@/views/zhanye/client/clientList" 
import addClient from "@/views/zhanye/client/addClient" 
import clientManage from "@/views/zhanye/client/clientManage" 
import clientDtail from "@/views/zhanye/client/clientDtail" 

import law from "@/views/zhanye/law"
import custom from "@/views/zhanye/custom"
import pan from "@/views/zhanye/pan"
import teamMange from "@/views/zhanye/teamMange"
import teamDtails from "@/views/zhanye/teamDtails"

import learn from "@/views/learn"
import details from "@/views/details"
// const learn = resolve => require.ensure([], () => resolve(require('@/views/learn')), 'learn');

import mine from "@/views/mine"
// const mine = resolve => require.ensure([], () => resolve(require('@/views/mine')), 'mine');
import mineMenu from "@/views/mines/menu"
import show from "@/views/mines/show"
import introduce from '@/views/mines/introduce'
import forward from "@/views/mines/forward"
import share from "@/views/mines/share"
import product from "@/views/mines/product"
import person from "@/views/mines/person"
import pay from "@/views/mines/pay"
import payHistory from "@/views/mines/payHistory"
import help from "@/views/mines/help"
import loginType from "@/views/mines/loginType"

var bus = new Vue()
Vue.prototype.bus = bus

const Routers = new Router({
  // mode: 'history',
  base: '/mobile/agent/',
  routes: [{
      path: '/',
      name: 'takeOrder',
      component: takeOrder,
      meta: {
        title:'接单'
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        title:'消息'
      }
    },
    {
      path: '/practice',
      component: practice,
      children: [{
          path: '',
          name: 'practiceMenu',
          component: practiceMenu,
          meta: {
            title:'展业'
          }
        },
        {
          path: 'client',
          component: client,
          children: [{
              path: '',
              name: 'agenda',
              component: agenda,
              meta: {
                title:'客户'
              }
            },
            {
              path: 'addVisit',
              name: 'addVisit',
              component: addVisit,
              meta: {
                title:'添加拜访'
              }
            },
            {
              path: 'clientList',
              name: 'clientList',
              component: clientList,
              meta: {
                title:'客户列表'
              }
            },
            {
              path: 'addClient',
              name: 'addClient',
              component: addClient,
              meta: {
                title:'添加客户'
              }
            },
            {
              path: 'clientManage',
              name: 'clientManage',
              component: clientManage,
              meta: {
                title:'客户管理'
              }
            },
            {
              path: 'clientDtail',
              name: 'clientDtail',
              component: clientDtail,
              meta: {
                title:'客户详情'
              }
            }
          ]
        },
        {
          path: 'custom',
          name: 'custom',
          component: custom,
          meta: {
            title:'分享'
          }
        },
        {
          path: 'pan',
          name: 'pan',
          component: pan,
          meta: {
            title:'资料库'
          }
        },
        {
          path: 'teamMange',
          name: 'teamMange',
          component: teamMange,
          meta: {
            title:'我的团队'
          }
        },
        {
          path: 'teamDtails',
          name: 'teamDtails',
          component: teamDtails,
          meta: {
            title:'团队详情'
          }
        },
        {
          path: 'law',
          name: 'law',
          component: law
        },
      ]
    },
    {
      path: '/learn',
      name: 'learn',
      component: learn,
      meta: {
        title:'学习'
      }
    },
    {
      path: '/details',
      name: 'details',
      component: details,
      meta: {
        title:'文章详情'
      }
    },
    {
      path: '/mine',
      // name: 'mine',
      component: mine,
      children: [{
          path: '',
          name: 'mineMenu',
          component: mineMenu,
          meta: {
            title:'我的'
          }
        },
        {
          path: 'show',
          name: 'show',
          component: show,
          meta: {
            title:'个人秀'
          }
        },
        {
          path: 'forward',
          name: 'forward',
          component: forward,
          meta: {
            title:'转发'
          }
        },
        {
          path: 'share',
          name: 'share',
          component: share,
          meta: {
            title:'分享'
          }
        },
        {
          path: 'product',
          name: 'product',
          component: product,
          meta: {
            title:'产品'
          }
        },
        {
          path: 'person',
          name: 'person',
          component: person,
          meta: {
            title:'个人资料'
          }
        },
        {
          path: 'pay',
          name: 'pay',
          component: pay,
          meta: {
            title:'充值'
          }
        },
        {
          path: 'payHistory',
          name: 'payHistory',
          component: payHistory,
          meta: {
            title:'充值历史'
          }
        },
        {
          path: 'help',
          name: 'help',
          component: help,
          meta: {
            title:'帮助'
          }
        },
        {
          path: 'loginType',
          name: 'loginType',
          component: loginType,
          meta: {
            title:'登陆方式'
          }
        },
        {
          path: 'introduce',
          name: 'introduce',
          component: introduce,
          meta: {
            title:'个人介绍'
          }
          
        }

      ]
    }
  ],
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
        return savePosition
    } else {
        return { x: 0, y: 0 }
    }
}
})

export default Routers
