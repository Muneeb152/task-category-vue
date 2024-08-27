import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'SignIn',
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: () => import("@/views/SignUp.vue"),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        children: [
            {
                path: "",
                name: "DashboardHome",
                component: () => import("../views/DashboardHome.vue"),
            },
        ],
        meta: { requiresAuth: true }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
