<script lang="ts" setup>
import type { MediaDemo } from '#/api';

import { h, ref } from 'vue';

import { confirm, Page } from '@vben/common-ui';
import { useRefresh } from '@vben/hooks';

import { Button, Card, message, Select, Table } from 'ant-design-vue';

import { deleteMediaDemoById, searchMediaDemosByTag } from '#/api';
import { MediaTag, MediaTagOptions } from '#/api/type/mediatag';

const { refresh } = useRefresh();

// import { clearPreferencesCache, resetPreferences } from '@vben/preferences';

// const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();
// async function handleClearCache() {
//   resetPreferences();
//   clearPreferencesCache();
//   emit('clearPreferencesAndLogout');
// }

const allMediaTagOptions = MediaTagOptions;
const mediaTag = ref<MediaTag | undefined>();

const demoListColumns = [
  { title: '艺名', dataIndex: 'name', key: 'name' },
  {
    title: '音频',
    dataIndex: 'fileUrl',
    key: 'fileUrl',
    customRender: ({ record }: any) => {
      return h('div', [
        h('audio', {
          src: record.fileUrl,
          controls: true,
          style: 'width: 400px;',
        }),
      ]);
    },
  },
  {
    title: '操作',
    key: 'action',
    customRender: ({ record }: any) => {
      return h('div', [
        h(
          Button,
          {
            type: 'primary',
            size: 'small',
            onClick: () => handleDelete(record),
          },
          () => '删除',
        ),
      ]);
    },
  },
];

const demoList = ref<MediaDemo[]>([]);

// 删除文件
function handleDelete(mediaDemo: MediaDemo) {
  confirm('确定删除该文件么？').then(() => {
    deleteMediaDemo(mediaDemo);
  });
}

async function deleteMediaDemo(mediaDemo: MediaDemo) {
  const demoId = mediaDemo.demoId;
  if (!demoId) {
    console.error('demoId为空');
    return;
  }
  const deleteResult = await deleteMediaDemoById(demoId);
  if (deleteResult) {
    message.success('删除成功');
    // 刷新当前页面
    refresh();
  }
}

// 根据标签搜索音频demo
async function searchMediaDemos() {
  const selectedMediaTag = mediaTag.value;
  if (!selectedMediaTag) {
    return;
  }
  const searchResult = await searchMediaDemosByTag(selectedMediaTag);
  console.warn(`小样搜索结果:${searchResult}`);
  if (searchResult) {
    demoList.value = searchResult.demos;
  }
}
</script>

<template>
  <Page>
    <Card>
      <div class="flex gap-1">
        <Button type="text" style="pointer-events: none; cursor: default">
          标签:
        </Button>
        <Select v-model:value="mediaTag" style="width: 100px">
          <Select.Option
            :value="preset.value"
            v-for="preset in allMediaTagOptions"
            :key="preset.value"
          >
            {{ preset.label }}
          </Select.Option>
        </Select>

        <Button type="primary" @click="searchMediaDemos">搜索</Button>
      </div>

      <Table
        :data-source="demoList"
        :columns="demoListColumns"
        :pagination="false"
      />
    </Card>
  </Page>
</template>
