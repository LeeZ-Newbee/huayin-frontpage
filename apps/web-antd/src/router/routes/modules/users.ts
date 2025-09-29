import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:account',
      order: 600,
      title: '用户管理',
    },
    name: 'Users',
    path: '/user/manager/add',
    component: () => import('#/views/user-manager/add/index.vue'),
    // children: [
    //   {
    //     name: 'AllUser',
    //     path: '/user-manager/list',
    //     component: () => import('#/views/user-manager/list/index.vue'),
    //     meta: {
    //       icon: 'mdi:account-details',
    //       title: '所有用户',
    //     },
    //   },
    //   {
    //     name: 'AddUser',
    //     path: '/user-manager/add',
    //     component: () => import('#/views/user-manager/add/index.vue'),
    //     meta: {
    //       icon: 'mdi:account-plus',
    //       title: '新增用户',
    //     },
    //   },
    // ],
  },
];

export default routes;
