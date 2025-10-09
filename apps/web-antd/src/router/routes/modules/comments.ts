import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // 评价管理
  {
    name: 'Comments',
    path: '/comments',
    component: () => import('#/views/comments/index.vue'),
    meta: {
      icon: 'mdi:comment-account-outline',
      title: '人员评价',
      order: 100,
    },
  },
  {
    name: 'AddComment',
    path: '/comments/add/:artistId',
    component: () => import('#/views/comments/add/index.vue'),
    meta: {
      icon: 'mdi:comment-account-outline',
      title: '人员评价',
      hideInMenu: true,
    },
  },
];

export default routes;
