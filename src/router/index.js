import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import home from '@/views/home';

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
        children: [
            {
                path: 'header',
                name: 'header',
                component: () => import('@/components/header') //路由懒加载
            }
        ]
    }
];

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
});

export default router;
