import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:account-badge-outline',
      order: 500,
      title: '人员管理',
    },
    name: 'Persons',
    path: '/persons/manager',
    children: [
      {
        name: 'AddPerson',
        path: '/person-manager/add',
        component: () => import('#/views/person-manager/add/index.vue'),
        meta: {
          icon: 'mdi:account-plus-outline',
          title: '新增人员',
        },
      },
      {
        name: 'AllPerson',
        path: '/person-manager/list',
        component: () => import('#/views/person-manager/list/index.vue'),
        meta: {
          icon: 'mdi:account-details-outline',
          title: '人员修改',
        },
      },
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
    ],
  },
];

export default routes;
