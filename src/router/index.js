import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";
import Catalog from "../components/Catalog";
import About from "../components/About";
import Article from "../components/Article";
import Management from "../components/Management";
import Login from "../components/Login";
import Customer from "../components/Customer";
import User from "../components/User";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        redirect: '/customer/catalog',
        children: [
            //文章
            {
                path: '/customer',
                component: Customer,
                redirect: '/customer/catalog',
                children: [
                    {
                        path: 'catalog/:type?',
                        component: Catalog
                    },
                    {
                        path: 'article/:articleId',
                        component: Article
                    }
                ]
            },
            //管理
            {
                path: '/management',
                component: Management,
                redirect: '/management/login',
                children: [
                    {
                        path: 'login',
                        component: Login
                    },
                    {
                        path:'user',
                        component: User
                    }
                ]
            },
            //关于
            {
                path: '/about',
                component: About
            }
        ]
    }
];

const router = new VueRouter({
    routes
});


export default router
