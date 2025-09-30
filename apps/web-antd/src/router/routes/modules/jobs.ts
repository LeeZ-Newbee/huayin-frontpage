import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    // 评书主播
    meta: {
      icon: 'mdi:keyboard-voice',
      order: -1,
      title: '评书单播',
    },
    name: 'Jobs-pszb',
    path: '/jobs',
    component: () => import('#/views/jobs/pszb/index.vue'),
  },
  {
    // 主播旁白
    meta: {
      icon: 'mdi:keyboard-voice',
      order: 1,
      title: '主播旁白',
    },
    name: 'Jobs-zbpb',
    path: '/jobs/zbpb',
    component: () => import('#/views/jobs/zbpb/index.vue'),
  },
  {
    // 有声CV
    meta: {
      icon: 'mdi:keyboard-voice',
      order: 2,
      title: '有声CV',
    },
    name: 'Jobs-yscv',
    path: '/jobs/yscv',
    component: () => import('#/views/jobs/yscv/index.vue'),
  },
  {
    // 短剧CV
    meta: {
      icon: 'mdi:keyboard-voice',
      order: 3,
      title: '短剧CV',
    },
    name: 'Jobs-djcv',
    path: '/jobs/djcv',
    component: () => import('#/views/jobs/djcv/index.vue'),
  },
  {
    // 有声后期
    meta: {
      icon: 'mdi:music',
      order: 4,
      title: '有声后期',
    },
    name: 'Jobs-yshq',
    path: '/jobs/yshq',
    component: () => import('#/views/jobs/yshq/index.vue'),
  },
  {
    // 短剧后期
    meta: {
      icon: 'mdi:music',
      order: 5,
      title: '短剧后期',
    },
    name: 'Jobs-djhq',
    path: '/jobs/djhq',
    component: () => import('#/views/jobs/djhq/index.vue'),
  },
  {
    // 画本
    meta: {
      icon: 'mdi:draw-pen',
      order: 6,
      title: '画本',
    },
    name: 'Jobs-hb',
    path: '/jobs/hb',
    component: () => import('#/views/jobs/hb/index.vue'),
  },
  {
    // 对轨
    meta: {
      icon: 'mdi:waveform',
      order: 7,
      title: '对轨',
    },
    name: 'Jobs-dg',
    path: '/jobs/dg',
    component: () => import('#/views/jobs/dg/index.vue'),
  },
  {
    // 审听
    meta: {
      icon: 'mdi:headphones',
      order: 8,
      title: '审听',
    },
    name: 'Jobs-st',
    path: '/jobs/st',
    component: () => import('#/views/jobs/st/index.vue'),
  },
];

export default routes;
