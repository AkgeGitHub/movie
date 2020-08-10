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
            path:'/films',
            redirect:'/films/nowplaying'
        }
    ]
}