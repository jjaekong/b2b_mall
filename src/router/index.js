import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/filelist',
        component: () => import('../views/FileList.vue')
    },
    {
        path: '/account/find_id',
        component: () => import('../views/account/FindID.vue'),
    },
    {
        name: 'find_id_result',
        path: '/account/find_id_result',
        component: () => import('../views/account/FindIDResult.vue'),
    },
    {
        path: '/account/find_pw',
        component: () => import('../views/account/FindPW.vue')
    },
    {
        name: 'edit_user_info',
        path: '/account/edit_user_info',
        component: () => import('../views/account/EditUserInfo.vue')
    },
    {
        path: '/account/login',
        component: () => import('../views/account/Login.vue')
    },
    {
        name: 'added_cert',
        path: '/account/added_cert',
        component: () => import('../views/account/AddedCert.vue')
    },
    {
        name: 'invite_user',
        path: '/account/invite',
        component: () => import('../views/account/Invite.vue')
    },
    {
        path: '/account/join',
        component: () => import('../views/account/Join.vue')
    },
    {
        name: 'reset_pw',
        path: '/account/reset_pw',
        component: () => import('../views/account/ResetPW.vue')
    },
    {
        name: 'wake_up',
        path: '/account/wake_up',
        component: () => import('../views/account/WakeUp.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router