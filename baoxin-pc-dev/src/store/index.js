import Vue from 'vue'
import vuex from 'vuex'
import GLOBAL from '../assets/common/common.js'
Vue.use(vuex);

const state={
    loginInfo:{
        type:'agent',
        isLogin:false,
        phone:'',
        cookie:'',
    },
    modalConsult:false,
    // 顾问模态框
    showAgentUser:{
        isShow:false,
        type:'login'
    },
    // 顾问模态框
    showTeamUser:{
        isShow:false,
        type:'login'
    }
};
var _auth = GLOBAL.cookie.get('_auth')

const mutations={
    // 登录状态
    loginInfo(state,data){
        state.loginInfo.type = data.type || 'agent'
        state.loginInfo.isLogin = data.isLogin || false
        state.loginInfo.phone = data.phone
        state.loginInfo.cookie = data.cookie || _auth
        // 将信息存在session中 防止刷新造成vuex数据丢失

        sessionStorage.setItem('loginInfo',JSON.stringify(state.loginInfo))

    },
    // 咨询弹框
    modalConsult(state,data){
        state.modalConsult = data
    },
    // 登陆注册弹框
    showAgentUser(state,data){
        state.showAgentUser.isShow = data.isShow
        state.showAgentUser.type = data.type
    },
    // 登陆注册弹框
    showTeamUser(state,data){
        state.showTeamUser.isShow = data.isShow
        state.showTeamUser.type = data.type
    }
}

const getters = {

}
export default new vuex.Store({
    state,
    mutations,
    getters
})