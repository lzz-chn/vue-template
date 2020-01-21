import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import home from '@/views/Home';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
        children: [
            {
                path: 'HeaderNav',
                name: 'HeaderNav',
                component: () => import('@/components/HeaderNav') //路由懒加载
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
