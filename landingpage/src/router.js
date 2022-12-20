/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import Config from '../config'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: Config.baseURL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/Main.vue'),
    //   meta: {
    //   },
    //   children: [
    //     // =============================================================================
    //     // Theme Routes
    //     // =============================================================================
    //     {
    //       path: '/',
    //       name: 'thithu',
    //       component: () => import('./views/Home.vue'),
    //       meta: {
    //       }
    //     },
    //     {
    //       path: '/bai-lam',
    //       name: 'bailamthithu',
    //       component: () => import('./views/BaiLam.vue'),
    //       meta: {
    //       }
    //     },
    //     {
    //       path: '/ket-qua',
    //       name: 'ketquaathithu',
    //       component: () => import('./views/KetQua.vue'),
    //       meta: {
    //       }
    //     },
    //   ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    // {
    //   path: '',
    //   component: () => import('@/layouts/full-page/FullPage.vue'),
    //   children: [
    //     // =============================================================================
    //     // PAGES
    //     // =============================================================================
    //     {
    //       path: '/callback',
    //       name: 'auth-callback',
    //       component: () => import('@/views/Callback.vue'),
    //       meta: {
    //         rule: 'editor'
    //       }
    //     }
    //   ]
    // },
    // Redirect to 404 page, if no match found
    {
      path: '/preview-exam',
      component: () => import('./layouts/PreviewExam.vue'),
    },
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {

//   if (to.meta.authRequired) {
//     if (!(auth.isAuthenticated())) {
//       router.push({ path: '/pages/login', query: { to: to.path } })
//     }
//   }

//   if (to.path === '/pages/login' && auth.isAuthenticated()) {
//     router.push({ path: '/' })
//   }

  return next()

})

export default router
