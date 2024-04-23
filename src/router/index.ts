import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/Layout.vue';
import Login from '@/views/Auth/Login.vue';
import Registro from '@/components/Content/Registro.vue';
import ReservaForm from '@/components/Auth/ReservaForm.vue';
import ConfirmCuenta from '@/components/Content/ConfirmCuenta.vue';
import { isAuthenticated } from '@/auth/auth';
import ReservaDetail from '@/components/Content/ReservaDetail.vue';
import CenoteForm from '@/components/Content/CenoteForm.vue';
import CenoteCreate from '@/components/Content/CenoteCreate.vue';
import CenoteView from '@/components/Content/CenoteView.vue';

const routes = [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'reserva',
        name: 'reserva',
        component: ReservaForm,
        meta: { requiresAuth: true }
      },
      {
        path: 'registro',
        name: 'registro',
        component: Registro,
        meta: { requiresAuth: true }
      },
      {
        path: 'detalle/:token',
        name: 'detalle',
        component: ReservaDetail,
        meta: { requiresAuth: true }
      },
      {
        path: 'cenote',
        name: 'cenote',
        component: CenoteForm,
        meta: { requiresAuth: true }
      },
      {
        path: 'cenote/crear',
        name: 'cenotec',
        component: CenoteCreate,
        meta: { requiresAuth: true }
      },
      {
        path: 'cenote/:id',
        name: 'cenotev',
        component: CenoteView,
        meta: { requiresAuth: true }
      },
      
    ]
  },
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: ConfirmCuenta,
    meta: {requiresAuth: false}
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
