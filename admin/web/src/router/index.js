import Vue from 'vue'
import Router from 'vue-router'
import { Base64 } from 'js-base64';
import App from '@/codes/App'

Vue.use(Router)
let router = new Router({
    mode: 'history',
    routes: [{
        path: '/standardApiApi',
        component: () =>
            import ('@/components/standardApiApi.vue'),
        name: '',
    },{
        path: '/standardApiSystem',
        component: () =>
            import ('@/components/standardApiSystem.vue'),
        name: ''
    },{
        path: '/standardApiSystemConfig',
        component: () =>
            import ('@/components/standardApiSystemConfig.vue'),
        name: ''
    }]
});

router.beforeEach((to, from, next) => {
    next();
})
export default router