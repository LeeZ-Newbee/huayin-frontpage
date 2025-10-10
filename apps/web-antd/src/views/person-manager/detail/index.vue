<script lang="ts" setup>
import type { CommentInfo } from '#/api/type/comment';
import type { PersonInfo } from '#/api/type/person';

import { computed, h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Card, Image, Rate, Table } from 'ant-design-vue';
import dayjs from 'dayjs';

import { searchCommentsByPersonId, searchPersonById } from '#/api';
import ExpandableText from '#/views/_core/ExpandableText.vue';

const route = useRoute();

const current = ref<null | string>(null);

// 注册 Modal 实例
const [Modal, modalApi] = useVbenModal();

// 人员id
const personId = Number(route.params.artistId);
console.warn(`艺人id:${personId}`);

const person = ref<PersonInfo>({
  avatar: '',
  nickName: '',
  qq: '',
  ID: '',
  name: '',
  wechat: '',
  salary: 0,
  creditCardNum: '',
  telephone: '',
  address: '',
  emergencyTelphone: '',
  artistId: undefined,
  job: 0,
  recommendWord1: '',
  recommendWord2: '',
  recommendWord3: '',
  identityCardFront: '',
  identityCardReverse: '',
  priorityRating: undefined,
  createTime: undefined,
  gender: 0,
});

const historyCooperations = ref<CommentInfo[]>([]);
const recentCooperations = ref<CommentInfo[]>([]);

const commentColumns = [
  { title: '日期', dataIndex: 'time', key: 'time' },
  { title: '合作内容', dataIndex: 'content', key: 'content' },
  { title: '配音导演', dataIndex: 'director', key: 'director' },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
    customRender: ({ text }: any) =>
      h(Rate, { value: text, count: 5, allowHalf: true, disabled: true }),
  },
  {
    title: '评价',
    dataIndex: 'evaluate',
    key: 'evaluate',
    customRender: ({ record }: any) =>
      h(ExpandableText, {
        text: record.evaluate,
        maxLength: 30,
        width: '400px',
      }),
  },
];

// 对数据二次处理，格式化时间
const processedRecent = computed(() => {
  return (
    recentCooperations.value
      // 格式化时间戳
      .map((item) => ({
        ...item,
        time: dayjs(item.time).format('YYYY年M月DD日'), // 可用 dayjs 格式化
      }))
  );
});

// 对数据二次处理，格式化时间
const processedHistory = computed(() => {
  return (
    historyCooperations.value
      // 格式化时间戳
      .map((item) => ({
        ...item,
        time: dayjs(item.time).format('YYYY年M月DD日'), // 可用 dayjs 格式化
      }))
  );
});

// 查询艺人信息
async function queryPerson(id: number) {
  const queryResult = await searchPersonById(id);
  console.warn(`艺人详情: ${queryResult}`);
  person.value = queryResult;
}

// 查询评价
async function queryComments(personId: number) {
  const queryResult = await searchCommentsByPersonId(personId);
  console.warn(`评价列表: ${queryResult}`);
  if (Object.prototype.toString.call(queryResult) === '[object Object]') {
    console.warn('评价列表为空');
    return;
  }
  if (queryResult.length === 0) {
    console.warn('评价列表为空1');
    return;
  }
  const recentComment = queryResult[0];
  if (recentComment) {
    recentCooperations.value = [recentComment];
  }
  if (queryResult.length <= 1) {
    console.warn('评价列表长度小于1个');
    return;
  }
  const historyComments = queryResult.slice(1);
  historyCooperations.value = historyComments;
}

// 查看身份证正面
function showIDFront(url: string) {
  current.value = url;
  modalApi.open();
}

// 查看身份证反
function showIDReverse(url: string) {
  current.value = url;
  modalApi.open();
}

onMounted(() => {
  queryPerson(personId);
  queryComments(personId);
});
</script>

<template>
  <Page auto-content-height>
    <Card>
      <template #title>
        <div class="w-full text-center">人员档案</div>
      </template>

      <div class="flex flex-col gap-6 p-4">
        <!-- 人员档案 -->
        <Card class="p-4">
          <div class="flex">
            <Image :src="person.avatar" height="120px" width="120px" />
            <div class="left-margin flex flex-1 flex-col gap-3">
              <div class="flex justify-between">
                <span>花名：{{ person.nickName }}</span>
                <span>QQ: {{ person.qq }}</span>
                <div>
                  <span>身份证号：{{ person.ID }}</span>
                  <Button
                    type="primary"
                    style="margin-left: 8px"
                    @click="showIDFront(person.identityCardFront)"
                  >
                    身份证正面
                  </Button>
                  <Button
                    type="primary"
                    style="margin-left: 8px"
                    @click="showIDReverse(person.identityCardReverse)"
                  >
                    身份证反面
                  </Button>
                </div>
              </div>
              <div class="flex justify-between">
                <span>姓名：{{ person.name }}</span>
                <span>微信：{{ person.wechat }}</span>
                <span>费用参考：{{ person.salary }}</span>
              </div>
              <div class="flex justify-between">
                <span>银行信息：{{ person.creditCardNum }}</span>
                <span>电话：{{ person.telephone }}</span>
              </div>
              <div class="flex justify-between">
                <span>地址：{{ person.address }}</span>
                <span>紧急联系人电话：{{ person.emergencyTelphone }}</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- 最近合作 -->
        <Card class="p-4">
          <h3 class="mb-4 text-center">最近合作</h3>
          <Table
            :columns="commentColumns"
            :data-source="processedRecent"
            :pagination="false"
            row-key="id"
          />
        </Card>

        <!-- 历史合作 -->
        <Card class="p-4">
          <h3 class="mb-4 text-center">历史合作</h3>
          <Table
            :columns="commentColumns"
            :data-source="processedHistory"
            :pagination="false"
            row-key="id"
          />
        </Card>
      </div>
    </Card>

    <Modal
      :width="800"
      :footer="false"
      :fullscreen-button="false"
      destroy-on-close
    >
      <Image
        v-if="current"
        :src="current"
        style="
          display: block;
          max-width: 100%;
          max-height: 80vh;
          margin: 0 auto;
        "
      />
    </Modal>
  </Page>
</template>

<style scoped>
.left-margin {
  margin-left: 20px; /* 左侧外边距 20px */
}
</style>
