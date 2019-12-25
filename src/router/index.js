import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import home from '@/components/home';

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    }
    // {
    //     path: '/',
    //     name: 'home',
    //     component: () => import('@/components/home') //路由懒加载
    // }
];

const router = new VueRouter({
    routes
});

export default router;
