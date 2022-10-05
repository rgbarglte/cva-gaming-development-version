import {
    createRouter,
    createWebHistory
} from "vue-router";
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/login",
        name: "",
        component: () =>
            import ("../views/login.vue"),
        meta: {
            layout: false,
            login : true,
        },
    },
    {
        path: "/dashboard",
        name: "",
        component: () =>
            import ("../views/dashboard.vue"),
        meta: {
            layout: true,
        },
    },
    {
        path: "/users/:id",
        name: "",
        component: () =>
            import ("../views/users-edit.vue"),
        meta: {
            layout: true,
        },
    },
    {
        path: "/jugadores",
        name: "",
        component: () =>
            import ("../views/jugadores.vue"),
        meta: {
            layout: true,
        },
    },
    {
        path: "/jugadores/:id",
        name: "",
        component: () =>
            import ("../views/users-edit.vue"),
        meta: {
            layout: true,
        },
    },



    {
        path: "/movimientos",
        name: "",
        component: () =>
            import ("../views/movimientos.vue"),
        meta: {
            layout: true,
        },
    },


    {
        path: "/log/ip",
        name: "",
        component: () =>
            import ("../views/log-ip.vue"),
        meta: {
            layout: true,
        },
    },


    {
        path: "/chat",
        name: "",
        component: () =>
            import ("../views/chat.vue"),
        meta: {
            layout: true,
        },
    }


    ],

});
export default router;