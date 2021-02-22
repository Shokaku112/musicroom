import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mymusic from '../views/home/mymusic.vue'
import Login from '../views/login.vue'
import Homepage from '../views/homepage.vue'
import Songlist from '../views/component/songlist.vue'
import Hotsong from '../views/home/hotsonglist.vue'
import User from '../views/home/user.vue'
import Listedit from '../views/component/edit.vue'
import Admin from '../views/managersys/Alogin.vue'
import Usertable from '../views/managersys/Usertable.vue'
import Upload from '../views/component/upload.vue'
import SonglistTable from '../views/managersys/Songlistdata.vue'
/* eslint-disable */

import Userlogin from './request'
Vue.use(VueRouter)


const routes = [

  {
    path: '/',
    redirect:'/homepage',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
  {
    path:'/login',
    name:'Login',
    component:Login,
  },
  {
    path:'/upload',
    name:'upload',
    component:Upload,
  },
  {
    path:'/mymusic/',
    name:'mymusic',
    component:Mymusic,
    children:[
     {path:'playlist/:id',name:'playlist',component:Songlist},
     {path:'editlist/:id',name:'editlist',component:Listedit}
    ]
  },
  {
    path:'/hotlist/:id',
    name:'hotlist',
    component:Hotsong
  },
  {
    path:'/homepage',
    name:'Homepage',
    component:Homepage
  },{
    path:'/user',
    name:'my',
    component:User
  },{
    path:'/admin',
    name:'admin',
    component:Admin,
    children:[
      {path:'tablelist',name:'tablelist',component:Usertable},
      {path:'songlist',name:'SonglistTable',component:SonglistTable}
     ]
  }
]
// 路由守卫
const router = new VueRouter({
  routes
})

router.beforeEach(async (to,from,next)=>{
  // alert("routerguard")
  var routertest=/\/admin/
  // 判断路由是否为/
  
  console.log('test:',routertest.test('/admin'))

  var getstatus=await Userlogin.iflogin();
  console.log(to.name!='Login'&&!getstatus)
  // 如果不是到登录页面且cookie过期的话则返回登录页
  console.log(getstatus)
  
  if(to.name!='Login'&&!getstatus){
    // alert("cookie过期")
    // alert("你尚未登录！")
    // this.$store.state.navigationbar=false
    next({name:'Login'})
    return;
    
  }else if(getstatus) {
    // router.push(from.path)
    // alert("cookie未过期")
    if(to.name=='Login'){
        router.push(from.path)
        console.log(from.path)
        next()
    }else{
      next()
    }
  }
  // alert(getstatus)
  next();
 
})



const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router
