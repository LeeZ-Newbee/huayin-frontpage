<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type { PersonInfo } from '#/api/type/person';

import { h, onMounted, reactive, ref, watch } from 'vue';

import { Page, VbenCheckButtonGroup } from '@vben/common-ui';

import { Button, Card, Image, Input, Table } from 'ant-design-vue';

import { getAllPersion, searchPersonByNickName } from '#/api';
import { SERVER_DOMAIN } from '#/api/type/constants';
import { JobOptions } from '#/api/type/job';
import { router } from '#/router';

const allPersonList = ref<PersonInfo[]>([]);

const jobProps = reactive({
  beforeChange: undefined,
  disabled: false,
  gap: 20,
  showIcon: false,
  size: 'middle',
  allowClear: false,
} as Recordable<any>);

const jobSelected = ref<number | undefined>(); // 单选
// 监听岗位切换
// 监听选中变化
watch(jobSelected, (val) => {
  console.warn('当前选中值:', val);
  if (val) {
    queryAllPersion(val);
  }
});

const personListColumns = [
  {
    title: '艺名',
    dataIndex: 'nickName',
    key: 'nickName',
    customRender: ({ record }: any) => {
      return h(
        'span',
        {
          style: 'cursor:pointer;',
          onClick: () => checkPersonDetail(record.artistId),
        },
        record.nickName,
      );
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    customRender: ({ record }: any) => {
      return h('div', [
        h(Image, {
          src: SERVER_DOMAIN + record.avatar,
          width: 60,
          height: 60,
          preview: true,
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
            onClick: () => {
              const artistId = record.artistId;
              router.push({ name: 'AddComment', params: { artistId } });
            },
          },
          () => '评价',
        ),
      ]);
    },
  },
];

// 查看艺人详情
function checkPersonDetail(artistId: number | undefined) {
  if (!artistId) {
    console.error('艺人id为空');
    return;
  }
  router.push({ name: 'PersonDetail', params: { artistId } });
}

const nickNameSearch = defineModel<string>();

/**
 * 艺人搜索
 */
async function searchPerson() {
  const searchContent = nickNameSearch.value;
  console.warn(`搜索艺人:${searchContent}`);
  if (searchContent === undefined || searchContent.length === 0) {
    queryAllPersion();
    return;
  }
  const searchResult = await searchPersonByNickName(searchContent);
  console.warn(`搜索艺人结果:${searchResult}`);
  Object.entries(searchResult).forEach(([key, value]) => {
    console.warn(key, value);
  });
  allPersonList.value = [searchResult];
}

/**
 * 查询所有艺人
 */
async function queryAllPersion(jobId?: number) {
  const queryResult = await getAllPersion(jobId);
  console.warn(`所有人列表结果:${queryResult}`);
  if (queryResult) {
    allPersonList.value = queryResult.artists;
  }
}

onMounted(() => {
  queryAllPersion();
});
</script>

<template>
  <Page auto-content-height>
    <Card>
      <div class="flex flex-col gap-4">
        <div class="flex gap-1">
          <Button type="text" style="pointer-events: none; cursor: default">
            艺名：
          </Button>
          <Input
            v-model:value="nickNameSearch"
            type="text"
            style="width: 400px"
          />
          <Button type="primary" @click="searchPerson">搜索</Button>
        </div>

        <VbenCheckButtonGroup
          v-model="jobSelected"
          :options="JobOptions"
          v-bind="jobProps"
        />
      </div>
    </Card>

    <Table
      :data-source="allPersonList"
      :columns="personListColumns"
      :pagination="false"
    />
  </Page>
</template>
