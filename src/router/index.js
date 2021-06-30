import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/account/find_id',
        component: () => import('../views/account/FindID.vue')
    },
    {
        path: '/account/find_id_result',
        component: () => import('../views/account/FindIDResult.vue')
    },
    {
        path: '/account/find_pw',
        component: () => import('../views/account/FindPW.vue')
    },
    {
        path: '/account/edit_user_info',
        component: () => import('../views/account/EditUserInfo.vue')
    },
    {
        path: '/account/login',
        component: () => import('../views/account/Login.vue')
    },
    {
        path: '/account/cert',
        component: () => import('../views/account/Cert.vue')
    },
    {
        path: '/account/invitation',
        component: () => import('../views/account/Invitation.vue')
    },
    {
        path: '/account/join',
        component: () => import('../views/account/Join.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router