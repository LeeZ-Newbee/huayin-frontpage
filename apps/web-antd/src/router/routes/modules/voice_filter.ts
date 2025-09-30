import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:delete',
      order: 700,
      title: '音频筛选',
      authority: ['admin'],
    },
    name: 'Voice',
    path: '/voice/filter',
    component: () => import('#/views/voice/filter/index.vue'),
  },
];

export default routes;
