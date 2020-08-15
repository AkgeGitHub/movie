export default {
    path: '/films',
    component: () => import('@/views/films/index'),
    children:[
        {
            path:'city',
            component:()=>import('@/components/city/index')
        },
        {
            path:'nowplaying',
            component:()=>import('@/components/nowplaying/index')
        },
        {
            path:'comingsoon',
            component:()=>import('@/components/comingsoon/index')
        },
        {
            path:'search',
            component:()=>import('@/components/search/index')
        },
        {
            path:"detail/1/:id",
            components:{
                default:()=>import('@/components/nowplaying/index'),
                detail:()=>import("@/views/films/detail")
            },
            props: { detail: true}
        },
        {
            path:"detail/2/:id",
            components:{
                default:()=>import('@/components/comingsoon/index'),
                detail:()=>import("@/views/films/detail")
            },
            props: { detail: true}
        },
        {
            path:'/films',
            redirect:'/films/nowplaying'
        }
    ]
}