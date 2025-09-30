<script lang="ts" setup>
import { computed } from 'vue';

import { AuthPageLayout } from '@vben/layouts';
import { preferences } from '@vben/preferences';

import { $t } from '#/locales';

const appName = computed(() => preferences.app.name);
// 登录页图标
// const logo = computed(() => preferences.logo.source);
// :app-name="appName"
//     logo="/logo.jpg"
</script>

<template>
  <AuthPageLayout
    :app-name="appName"
    logo="/favicon.ico"
    :page-description="$t('authentication.pageDesc')"
    :page-title="$t('authentication.pageTitle')"
    :toolbar="false"
    :copyright="false"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
