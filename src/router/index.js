import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import { getUserInformation, isAuthenticated } from '@/utils/supabase' // add getuserinformation if needed
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import AccountSettingsView from '@/views/system/AccountSettingsView.vue'
import BenefitsView from '@/views/system/BenefitsView.vue'
import FormView from '@/views/system/FormView.vue'
import AboutView from '@/views/system/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Pages
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },

    // System Pages
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/account/settings',
      name: 'account-settings',
      component: AccountSettingsView,
      meta: { requiresAuth: true },
    },

    {
      path: '/manage/users',
      name: 'manage-users',
      component: AccountSettingsView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    {
      path: '/benefits',
      name: 'Benefits',
      component: BenefitsView,
      meta: { requiresAuth: true },
    },

    {
      path: '/form',
      name: 'Form',
      component: FormView,
      meta: { requiresAuth: true },
    },

    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: { requiresAuth: true },
    },

    // Error Pages
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    // {
    //   path: '/not-found',
    //   name: 'not-found',
    //   component: NotFoundView,
    // },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to) => {
  const isLoggedIn = await isAuthenticated()

  //Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  // If logged in, prevent access to login and register pages
  if (isLoggedIn && !to.meta.requiresAuth) {
    //redict the user to the dashboard page
    return { name: 'dashboard' }
  }

  // If not logged in, prevent access to system pages
  if (!isLoggedIn && to.meta.requiresAuth) {
    //redirect the user to the login page
    return { name: 'login' }
  }

  // Check if the user is logged in
  if (isLoggedIn) {
    //Retrieve info
    const userMetadata = await getUserInformation()
    //Get the user role
    const isAdmin = userMetadata.is_admin

    // Restrict access to admin-only routes
    if (!isAdmin && to.meta.requiresAdmin) {
      return { name: 'forbidden' }
    }
  }

  // // Redirect to 404 not found if the route does not exist
  // if (router.resolve(to).matched.length === 0) {
  //   return { name: 'not-found' }
  // }
})
export default router
