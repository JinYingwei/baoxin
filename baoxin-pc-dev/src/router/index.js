import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import GLOBAL from '../assets/common/common.js'

import iView from 'iview';
import store from '../store/index'
Vue.use(iView);
Vue.use(Router)

// Index
import Index from '@/views/index/Index'
// School
import School from '@/views/index/School'
// Consult
import Consult from '@/views/index/Consult'

/* Sub */
// Article
import Article from '@/views/sub/Article'
import Evaluation from '@/views/sub/Evaluation'
// 
import Help from '@/views/sub/Help'


//顾问中心
// import MangeAgent from '@/views/mangeAgent/Mange'
const MangeAgent = () => import('@/views/mangeAgent/Mange');
// import LoginOrRegAgent from '@/views/mangeAgent/agent/LoginOrReg' //顾问登陆
const LoginOrRegAgent = () => import('@/views/mangeAgent/agent/LoginOrReg');
// import Agent from '@/views/mangeAgent/agent/Agent' //顾问个人中心主页
const Agent = () => import('@/views/mangeAgent/agent/Agent');
// import Demand from '@/views/mangeAgent/agent/Demand' //顾问 接单中心
const Demand = () => import('@/views/mangeAgent/agent/Demand');
// import OrderHistory from '@/views/mangeAgent/agent/OrderHistory' //顾问 接单历史
const OrderHistory = () => import('@/views/mangeAgent/agent/OrderHistory');
// import Myteam from '@/views/mangeAgent/agent/Myteam' //顾问 我的团队
const Myteam = () => import('@/views/mangeAgent/agent/Myteam');
// import Crm from '@/views/mangeAgent/agent/Crm' //顾问 客户管理
const Crm = () => import('@/views/mangeAgent/agent/Crm');
// import Userinfo from '@/views/mangeAgent/agent/Userinfo' //顾问 个人信息
const Userinfo = () => import('@/views/mangeAgent/agent/Userinfo');
// import Money from '@/views/mangeAgent/agent/Money' //顾问 充值缴费
const Money = () => import('@/views/mangeAgent/agent/Money');
// import Message from '@/views/mangeAgent/agent/Message' //顾问 我的消息
const Message = () => import('@/views/mangeAgent/agent/Message');
// import DataShare from '@/views/mangeAgent/agent/DataShare' //顾问 资料分享
const DataShare = () => import('@/views/mangeAgent/agent/DataShare');

//团队中心
// import MangeTeam from '@/views/mangeTeam/Mange'
const MangeTeam = () => import('@/views/mangeTeam/Mange');
// import LoginOrRegTeam from '@/views/mangeTeam/team/LoginOrReg' //团队登陆
const LoginOrRegTeam = () => import('@/views/mangeTeam/team/LoginOrReg');
// import Team from '@/views/mangeTeam/team/Team' //团队个人中心主页
const Team = () => import('@/views/mangeTeam/team/Team');
// import Statistics from '@/views/mangeTeam/team/Statistics' //团队 业务统计
const Statistics = () => import('@/views/mangeTeam/team/Statistics');
// import Members from '@/views/mangeTeam/team/Members' //团队 成员管理
const Members = () => import('@/views/mangeTeam/team/Members');
// import TeamManage from '@/views/mangeTeam/team/TeamManage' //团队 团队管理
const TeamManage = () => import('@/views/mangeTeam/team/TeamManage');
// import TeamUserinfo from '@/views/mangeTeam/team/Userinfo' //顾问 个人信息
const TeamUserinfo = () => import('@/views/mangeTeam/team/Userinfo');
// import TeamMessage from '@/views/mangeTeam/team/TeamMessage' //团队消息通知
const TeamMessage = () => import('@/views/mangeTeam/team/TeamMessage');
// import TeamDataShare from '@/views/mangeTeam/team/TeamDataShare'; //团队 资料分享
const TeamDataShare = () => import('@/views/mangeTeam/team/TeamDataShare');
// import AccountBalance from '@/views/mangeTeam/team/AccountBalance'; //团队 账户余额
const AccountBalance = () => import('@/views/mangeTeam/team/AccountBalance');
// import TeamMoney from '@/views/mangeTeam/team/TeamMoney'; //团队 充值
const TeamMoney = () => import('@/views/mangeTeam/team/TeamMoney');
// import TeamDrawMoney from '@/views/mangeTeam/team/TeamDrawMoney'; //团队 提现
const TeamDrawMoney = () => import('@/views/mangeTeam/team/TeamDrawMoney');
// import BankCard from '@/views/mangeTeam/team/BankCard'; //团队 银行卡
const BankCard = () => import('@/views/mangeTeam/team/BankCard');
const router = new Router({
    mode: 'history',
    // base: '/',
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/school',
            name: 'School',
            component: School
        },
        {
            path: '/consult',
            name: 'Consult',
            component: Consult
        },
        {
            path: '/article/:id',
            name: 'Article',
            component: Article
        },
        {
            path: '/Evaluation',
            name: 'Evaluation',
            component: Evaluation
        },
        {
            path: '/Help',
            name: 'Help',
            component: Help
        },
        // 顾问中心
        {
            path: '/mangeAgent',
            // name: 'Mange',
            component: MangeAgent,
            children: [{
                path: '',
                // name:'Agent',
                component: Agent,
                children: [{
                        path: '',
                        name: 'Demand',
                        component: Demand
                    },
                    {
                        path: 'orderHistory',
                        name: 'OrderHistory',
                        component: OrderHistory
                    },
                    {
                        path: 'myteam',
                        name: 'Myteam',
                        component: Myteam
                    },
                    {
                        path: 'crm',
                        name: 'Crm',
                        component: Crm
                    },
                    {
                        path: 'userinfo',
                        name: 'Userinfo',
                        component: Userinfo
                    },
                    {
                        path: 'money',
                        name: 'Money',
                        component: Money
                    },
                    {
                        path: 'message',
                        name: 'Message',
                        component: Message
                    },
                    {
                        path: 'dataShare',
                        name: 'DataShare',
                        component: DataShare
                    }
                ]
            }]
        },
        // 团队中心
        {
            path: '/mangeTeam',
            // name: 'Mange',
            component: MangeTeam,
            children: [{
                path: '',
                // name:'Team',
                component: Team,
                children: [{
                        path: '',
                        name: 'Statistics',
                        component: Statistics,
                    },
                    {
                        path: 'members',
                        name: 'Members',
                        component: Members
                    },
                    {
                        path: 'teamManage',
                        name: 'TeamManage',
                        component: TeamManage
                    },
                    {
                        path: 'teamUserinfo',
                        name: 'TeamUserinfo',
                        component: TeamUserinfo
                    },
                    {
                        path: 'teamMessage',
                        name: 'TeamMessage0',
                        component: TeamMessage
                    },
                    {
                        path: 'teamDataShare',
                        name: 'TeamDataShare',
                        component: TeamDataShare
                    },
                    {
                        path: 'accountBalance',
                        name: 'AccountBalance',
                        component: AccountBalance,
                    },
                    {
                        path: 'teamMoney',
                        name: 'TeamMoney',
                        component: TeamMoney
                    },
                    {
                        path: 'teamDrawMoney',
                        name: 'TeamDrawMoney',
                        component: TeamDrawMoney
                    },
                    {
                        path: 'bankCard',
                        name: 'BankCard',
                        component: BankCard
                    },
                ]
            }]
        }
    ],
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
export default router
router.beforeEach((to, from, next) => {
    // axios公共配置
    axios.defaults.withCredentials = true;
    var _auth = GLOBAL.cookie.get('_auth')
    axios.defaults.headers.common['Accept'] = `text/plain, text/html,application/json,text/javascript,application/x-javascript, application/javascript;_auth=${_auth}`;


    /* 路径包含 mangeAgent 代表需要登陆的模块  */
    var fullPath = to.fullPath
    var fullPathItem = fullPath.split('/')
    if (fullPathItem.includes('mangeAgent')) {
        if (store.state.loginInfo.isLogin) {
            next();
        } else {
            sessionStorage.removeItem("loginInfo");
            store.commit("loginInfo", {
                type: 'agent',
                isLogin: false
            });
            store.commit("showAgentUser", {
                type: 'login',
                isShow: true
            });
            if (store.state.loginInfo.type == 'agent') {
                store.commit("showAgentUser", {
                    type: 'login',
                    isShow: true
                });
            } else if (store.state.loginInfo.type == 'team') {
                store.commit("showTeamUser", {
                    type: 'login',
                    isShow: true
                });
            }
            router.push({
                path: '/'
            })
        }
    } else {
        iView.LoadingBar.start();
        next();
    }

});

router.afterEach(route => {
    iView.LoadingBar.finish();
});