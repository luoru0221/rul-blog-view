import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";
import Article from "../components/Article";
import About from "../components/About";

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      redirect:'/home'
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/article',
                component: Article
            },
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
