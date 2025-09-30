import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'PersonDetail',
    path: '/person-manager/detail/:artistId',
    component: () => import('#/views/person-manager/detail/index.vue'),
    meta: {
      icon: 'mdi:account-details-outline',
      title: '人员档案',
      hideInMenu: true,
    },
  },
];

export default routes;
