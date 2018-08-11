 import fetch from './../utils/fetch.js'
 // import {
 // simpleFetch
 // } from '../../utils/fetch.js'
 // import {HGJ_VUE} from '../../main.js'
 import helper from '../utils/helper.js'
 import { vueApp } from './../main.js'
 const platform = helper.getPlatForm()
 const isPC = helper.isPC()
 const saveAccount = (account, password) => {
   localStorage.account = account
   localStorage.password = password
 }
 class defaultAccountInfo {
   constructor(props) {
     this.ancestor = null
     this.qudao = null
     this.phone = ''
     this.captcha = ''
     this.verifyCode = ''
     this.userId = null
     this.isRealNamed = false
     this.name = null
     this.idCardNo = null
     this.isLoged = false
     this.jf = 0
     this.money = 0
     this.qrcodeUrl = ''
     this.userId = null
     this.unfreezeMoney = 0
     this.freezeMoney = 0
     this.isActive = 0
     this.level = 0
     this.freePlanTimes = 0
   }
 }

 export default {
   namespaced: true,
   state: new defaultAccountInfo(),
   getters: {},
   mutations: {
     shareInfoSet(s, { qudao, ancestor, uid }) {
       // console.log('shareInfoSet commit',qudao,ancestor,uid)
       s.qudao = qudao
       // s.ancestor=ancestor
       s.ancestor = uid
     },
     setActived(s) {
       s.isActive = true
     },
     setPhone(s, phone) {
       s.phone = phone
     },
     setCaptcha(s, captcha) {
       s.captcha = captcha
     },
     setVerifyCode(s, code) {
       s.verifyCode = code
     },
     reset(s) {
       var info = new defaultAccountInfo()
       for (let key in info) {
         s[key] = info[key]
       }
     },
   },
   actions: {
     logoutReset({ state, dispatch, commit }) {
       console.log('reset')
       commit('account/reset')
     },
     isPhoneRegister(context, phone) {
       var promise = fetch({
         // method:'get',
         url: '/account/isPhoneRegister',
         params: {
           phone: phone
         },
       })
       return promise
     },
     getVerifyCode(context, { phone, code, }) {
       let promise = fetch({
         url: '/account/sendVerifyCode',
         params: {
           phone,
           code,
         },
       })
       return promise
     },
     signup({ state }, { phone, password, code }) {
       var promise = fetch({
         url: 'account/register',
         params: {
           phone: phone,
           code: code, // 存不存store?
           password: password,
           ancestor: state.ancestor,
           qudao: state.qudao,
         }
       })
       promise.then(res => {
         state.isLoged = true
         helper.getInitialInfo()
         //save to local
       })
       return promise
     },
     login({ state, dispatch }, { phone, password, save }) {
       var loginPromise = fetch({
         url: 'account/login',
         params: {
           phone: phone,
           password: password,
         }
       })
       loginPromise.then(res => {
         console.log('res account login', res)
         state.userId = res.userId
         state.isLoged = true
         helper.getInitialInfo()
         if (save) {
           saveAccount(phone, password)
         }
         vueApp.$message.info('已登录')
       })
       return loginPromise
     },
     logout({ commit, dispatch }) { //todo :use modal
       vueApp.$modal.confirm({
         title: '登出',
         content: '确认退出Loo&co?',
         onOk() {
           var promise = fetch({
             url: 'account/logout',
           }, {
             simple: true,
           })
           promise.then(res => {
             console.log('res log out', res)
             if (res.error === 0) {
               vueApp.$message.info("已登出")
               helper.resetInitialInfo()
             }
           })
         },
       })
     },
     checkSession({ commit, dispatch }) {
       var promise = fetch({
         url: 'account/checkSession',
       }, {
         simple: true,
         // showloading: false,
       })
       promise.then(res => {
         if (res.data && res.data.userId) {
           // dispatch('getUserInfo')
           helper.getInitialInfo()
         } else if (res.message === '请登录') {
           console.log('未登录')
         } else if (res.message === '请重新登录') {
           console.log('请重新登录')
         }
       })
       return promise
     },
     getUserInfo({ state }, params) {

       if (params == undefined || params.showLoading == undefined) {
         var showLoading = false
       }
       return new Promise((resolve, reject) => {
         fetch({
           url: 'profile/info',
         }, showLoading).then(res => {
           for (let key in res) {
             state[key] = res[key]
           }
           if (res.name && res.idCardNo) {
             state.isRealNamed = true
             state.name = res.name
             state.idCardNo = res.idCardNo
           }
           if (res.userId) {
             state.userId = res.userId
             state.isLoged = true
           }
           resolve(res)
           // helper.getInitialInfo()
         })
       })

     },
     realNameVerify({ state }, { name, idCardNo }) {
       console.log('name,idCardNo%c', 'color:red', name, idCardNo)
       var promise = fetch({
         url: 'profile/realName',
         params: {
           name,
           idCardNo,
         },
       })
       promise.then(res => {
         console.log('real name verify ', res)
         state.name = name
         state.idCardNo = idCardNo
       })
     },
     modifyPwd({}, { password, newPassword }) {
       fetch({
         url: 'profile/modifyPwd',
         params: {
           password,
           newPassword,
         },
       })
     },
     findPwd({ state, dispatch }, { phone, code, password }) {
       var promise = fetch({
         url: 'account/findPwd',
         params: {
           phone,
           code,
           password,
         },
       })
       promise.then(res => {
         dispatch('account/getUserInfo')
       })
       return promise
     },
   }
 }
