import Vue from 'vue'
import Router from 'vue-router'

import statistical from '@/views/statistical'
// const  statistical = resolove=>require.ensure([], () => resolove(require('@/views/statistical')), 'statistical');

import memberDetail from '@/views/memberDetail'

import joinTip from '@/views/sub/jointip'
import sendSms from '@/views/sub/sendSms'
// 团队中心
import mine from '@/views/mine'
import share from '@/views/share'
import manage from '@/views/manage'
import menu from '@/views/mine/menu'
import show from '@/views/mine/show'
import forward from '@/views/mine/forward'
import person from '@/views/mine/person'
import pay from '@/views/mine/pay'
import help from '@/views/mine/help'
import payHistory from '@/views/mine/payHistory'
import tixian from '@/views/mine/tixian'
import tixianHistory from '@/views/mine/tixianHistory'
import bankCard from '@/views/mine/bankCard' //银行卡
import message from '@/views/mine/message' //系统通知

import teamCharge from '@/views/mine/teamCharge' //团队缴费
import teamChargeHistory from '@/views/mine/teamChargeHistory' //团队缴费记录


// 团队管理
import teamManage from '@/views/teamManage'
import teamManageMenu from '@/views/teamManage/menu'
import readPacket from '@/views/teamManage/readPacket' //红包
import charge from '@/views/teamManage/charge' //收费
import teamMsg from '@/views/teamManage/teamMsg' //消息通知
import msgHistory from '@/views/teamManage/msgHistory' //消息通知
import aa from '@/views/teamManage/aa' //aa收款

// 资料分享
import pan from '@/views/teamManage/pan/index' //消息通知
import panMain from '@/views/teamManage/pan/main'
import panStat from '@/views/teamManage/pan/stat'

Vue.use(Router)



export default new Router({
  base: '/bxTeam/mobile/dist/',
  routes: [{
      path: '/',
      name: 'statistical',
      component: statistical,
      meta: {
        title:'业务统计'
      }
    },
    {
      path: '/joinTip',
      name: 'joinTip',
      component: joinTip,
      meta: {
        title:'加入申请'
      }
    },
    {
      path: '/sendSms',
      name: 'sendSms',
      component: sendSms,
      meta: {
        title:'历史通知'
      }
    },
    {
      path: '/share',
      name: 'share',
      component: share,
      meta: {
        title:'资料分享'
      }
    },
    {
      path: '/memberDetail/:id',
      name: 'memberDetail',
      component: memberDetail,
      meta: {
        title:'成员信息'
      }
    },
    {
      path: '/teamManage',
      // name:'teamManage',
      component: teamManage,
      children: [{
          path: '',
          name: 'teamManageMenu',
          component: teamManageMenu,
          meta: {
            title:'团队管理'
          }
        },
        {
          path: 'readPacket',
          name: 'readPacket',
          component: readPacket,
          meta: {
            title:'红包'
          }
        },
        {
          path: 'aa',
          name: 'aa',
          component: aa,
          meta: {
            title:'AA收款'
          }
        },
        {
          path: 'charge',
          name: 'charge',
          component: charge,
          meta: {
            title:'成员缴费'
          }
        },
        {
          path: 'pan',
          // name: 'pan',
          component: pan,
          meta: {
            title:'资料分享'
          },
          children:[
            {
              path:'',
              name: 'panMain',
              component: panMain,
              meta: {
                title:'资料分享'
              }
            },
            {
              path:'panStat',
              name: 'panStat',
              component: panStat,
              meta: {
                title:'分享统计'
              }
            }
          ]
        },
        {
          path:'teamChargeHistory',
          name:'teamChargeHistory',
          component:teamChargeHistory,
          meta: {
            title:'收支记录'
          }
        },
        {
          path: 'teamMsg',
          name: 'teamMsg',
          component: teamMsg,
          meta: {
            title:'发送通知'
          }
        },
        {
          path:'msgHistory',
          name:'msgHistory',
          component:msgHistory,
          meta: {
            title:'通知历史'
          }
        }
      ]
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      meta: {
        title:'成员管理'
      }
    },
    {
      path: '/mine',
      component: mine,
      meta: {
        title:'团队中心'
      },
      children: [{
          path: '',
          name: 'menu',
          component: menu,
          meta: {
            title:'团队中心'
          }
        },
        {
          path:'teamCharge',
          name:'teamCharge',
          component:teamCharge,
          meta: {
            title:'费用管理'
          }
        },
        {
          path: 'show',
          name: 'show',
          component: show,
          meta: {
            title:'团队秀'
          }
        },
        {
          path: 'forward',
          name: 'forward',
          component: forward,
          meta: {
            title:'名片转发'
          }
        },
        {
          path: 'person',
          name: 'person',
          component: person,
          meta: {
            title:'团队资料'
          }
        },
        {
          path: 'pay',
          name: 'pay',
          component: pay,
          meta: {
            title:'帐户充值'
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
          path: 'message',
          name: 'message',
          component: message,
          meta: {
            title:'系统消息'
          }
        },
        {
          path: 'payHistory',
          name: 'payHistory',
          component: payHistory,
          meta: {
            title:'充值记录'
          }
        },
        {
          path: 'tixian',
          name: 'tixian',
          component: tixian,
          meta: {
            title:'提现'
          }
        },
        {
          path: 'bankCard',
          name: 'bankCard',
          component: bankCard,
          meta: {
            title:'银行卡'
          }
        },
        {
          path: 'tixianHistory',
          name: 'tixianHistory',
          component: tixianHistory,
          meta: {
            title:'提现记录'
          }
        }
      ]
    },
  ]
})
