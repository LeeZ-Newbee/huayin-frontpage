<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { clearPreferencesCache, resetPreferences } from '@vben/preferences';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();
async function handleClearCache() {
  resetPreferences();
  clearPreferencesCache();
  emit('clearPreferencesAndLogout');
}
</script>

<template>
  <Page title="音频筛选">
    <!-- <VbenButton
      class="mr-4 w-full"
      size="sm"
      variant="ghost"
      @click="handleClearCache"
    >
      清除缓存
    </VbenButton> -->
  </Page>
</template>
