import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import Config from '../../config'
import pages from './routes/pages'
// import apps from './routes/apps'
// import dashboard from './routes/dashboard'
// import uiElements from './routes/ui-elements/index'
// import chartsMaps from './routes/charts-maps'
// import formsTable from './routes/forms-tables'
// import others from './routes/others'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: Config.baseURL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/contact'
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contacts.vue'),
      meta: {
        pageTitle: 'Contact',
        breadcrumb: [
          {
            text: 'Contact',
            active: true,
          },
        ],
      },
    },
    {
      path: '/tracing',
      name: 'tracking',
      component: () => import('@/views/Tracking.vue'),
      meta: {
        pageTitle: 'Tracking',
        breadcrumb: [
          {
            text: 'Tracking',
            active: true,
          },
        ],
      },
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/Report.vue'),
      meta: {
        pageTitle: 'Báo cáo năng suất',
        breadcrumb: [
          {
            text: 'Báo cáo năng suất',
            active: true,
          },
        ],
      },
    },
    {
      path: '/teacher-report',
      name: 'teacher-report',
      component: () => import('@/views/teacherReport.vue'),
      meta: {
        pageTitle: 'Báo cáo giáo viên',
        breadcrumb: [
          {
            text: 'Báo cáo giáo viên',
            active: true,
          },
        ],
      },
    },
    {
      path: '/test-list',
      name: 'testList',
      component: () => import('@/views/TestList.vue'),
      meta: {
        pageTitle: 'Bài thi',
        breadcrumb: [
          {
            text: 'Danh sách bài thi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/t/:id',
      name: 'test-detail',
      component: () => import('@/views/TestDetail.vue'),
      meta: {
        pageTitle: 'Bài test',
        breadcrumb: [
          {
            text: 'Chi tiết bài test',
            active: true,
          },
        ],
      },
    },
    {
      path: '/exam/:id',
      name: 'exam-edit',
      component: () => import('@/views/question/examEdit.vue'),
      meta: {
        pageTitle: 'Sửa đề thi',
        breadcrumb: [
          {
            text: 'Thi thử',
          },
          {
            text: 'Sửa đề thi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/exam',
      name: 'list-exam',
      component: () => import('@/views/question/listExam.vue'),
      meta: {
        pageTitle: 'Đề thi',
        breadcrumb: [
          {
            text: 'Đề thi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/list-class',
      name: 'list-class',
      component: () => import('@/views/listClass.vue'),
      meta: {
        pageTitle: 'Lớp',
        breadcrumb: [
          {
            text: 'Lớp',
            active: true,
          },
        ],
      },
    },
    {
      path: '/list-subject',
      name: 'list-subject',
      component: () => import('@/views/listSubject.vue'),
      meta: {
        pageTitle: 'Môn thi',
        breadcrumb: [
          {
            text: 'Môn thi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/list-topic',
      name: 'list-topic',
      component: () => import('@/views/question/listTopic.vue'),
      meta: {
        pageTitle: 'Chủ đề',
        breadcrumb: [
          {
            text: 'Chủ đề',
            active: true,
          },
        ],
      },
    },
    ...pages,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
