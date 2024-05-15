import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CadastroTT.vue') },
      { path: 'cadastro', component: () => import('pages/CadastroTT.vue') },
      { path: 'login', component: () => import('pages/LoginTT.vue') },
      { path: 'home', component: () => import('pages/HomeTT.vue') },
      { path: 'recompensa', component: () => import('pages/RecompensaTT.vue') },
      { path: 'registro', component: () => import('pages/RegistroTT.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
