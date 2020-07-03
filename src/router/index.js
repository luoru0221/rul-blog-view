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
import Editor from "../components/Editor";

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
                redirect: '/management/user',
                children: [
                    {
                        path: 'login',
                        component: Login
                    },
                    {
                        path: 'user',
                        component: User
                    },
                    {
                        path: 'editor/:articleId',
                        component: Editor
                    },
                    {
                        path: 'article/:articleId',
                        component: Article
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

/**
 * 路由导航守卫
 */
router.beforeEach((to, from, next) => {
    if (to.matched[1].path === '/management') {
        if (to.path === '/management/login') {
            //登录直接放行
            return next();
        } else if (sessionStorage.getItem("user") !== null) {
            //已经登录，直接放行
            return next();
        } else {
            //没有登录，导航到登录
            return next("/management/login");
        }
    } else {
        next();
    }
});

export default router
