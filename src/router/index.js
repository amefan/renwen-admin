import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    name: 'Example',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/admin'),
        meta: { title: '管理员', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/table/user'),
        meta: { title: '用户列表', icon: 'user' }
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    meta: { title: '文章管理', icon: 'nested' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/nested/menu1/index'),
        meta: { title: '文章管理', icon: 'table' },
        children:[
          { 
            path: 'article',
            component: () => import('@/views/table/share'),
            name: 'article',
            meta: { title: '文章列表' ,icon:'form' }
          },
          // {
          //   path: 'toarticle',
          //   component: () => import('@/views/table/toarticle'),
          //   name: 'toarticle',
          //   meta: { title: '待审核文章' ,icon:'form' },
            
          // }
        ]
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/table/articlecomment'),
        meta: { title: '文章评论管理', icon: 'tree' }
      }
    ]
  },
  
  {
    path: '/gathering',
    component: Layout,
    meta: { title: '活动管理',icon: 'link' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/table/gathering'),
        meta: { title: '活动列表', icon: 'form' }
      },
      {
        path: 'usergath',
        name: 'Form',
        component: () => import('@/views/table/usergath'),
        meta: { title: '报名人员管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/spit',
    component: Layout,
    meta: { title: '吐槽表白',icon: 'eye-open' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/table/spit'),
        meta: { title: '吐槽列表', icon: 'form' }
      },
      {
        path: 'confession',
        name: 'Form',
        component: () => import('@/views/table/confession'),
        meta: { title: '表白信息列表', icon: 'form' }
      },
      {
        path: 'spitcomment',
        name: 'Form',
        component: () => import('@/views/table/spitcomment'),
        meta: { title: '吐槽评论列表', icon: 'form' }
      }
    ]
  },
  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
