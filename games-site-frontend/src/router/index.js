import {
    createRouter,
    createWebHistory
} from "vue-router";
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/", 
        name : "home",
        component: () =>
            import ("../views/home.vue"),
        meta: {
            layout: false,
            auth:false,
        },
     }, 
     {
        path: "/brand/:slug", 
        component: () =>
            import ("../views/brand.vue"),
        meta: {
            layout: false,
            auth:false,
        },
     },  

     {
        path: "/type/:slug", 
        component: () =>
            import ("../views/type.vue"),
        meta: {
            layout: false,
            auth:false,
        },
     },  

      
     {
        path: "/game/:slugBrand/:idGame", 
        component: () =>
            import ("../views/single-game.vue"),
        meta: {
            layout: false,
            auth:false,
        },
     },  
    ],

});
export default router;