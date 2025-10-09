<script lang="ts" setup>
import type { CommentInfo } from '#/api/type/comment';
import type { PersonInfo } from '#/api/type/person';

import { computed, h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Card, Image, Rate, Table } from 'ant-design-vue';
import dayjs from 'dayjs';

import { searchCommentsByPersonId, searchPersonById } from '#/api';
import ExpandableText from '#/views/_core/ExpandableText.vue';

const route = useRoute();

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

onMounted(() => {
  queryPerson(personId);
  queryComments(personId);
});
</script>

<template>
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
              <span>身份证号：{{ person.ID }}</span>
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
        <!-- <div class="flex flex-col gap-2">
          <div
            class="flex items-start justify-between border-b border-gray-200 p-2"
            v-if="recentCooperations"
          >
            <span>{{
              dayjs(recentCooperations.time).format('YYYY年M月DD日')
            }}</span>
            <span>{{ recentCooperations.content }}</span>
            <span>{{ recentCooperations.director }}</span>
            <Rate
              :value="recentCooperations.score"
              :count="5"
              allow-half
              :disabled="true"
            />

            <ExpandableText
              :text="recentCooperations.evaluate"
              :max-length="30"
              width="400px"
            />
          </div>
        </div> -->
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
</template>

<style scoped>
.left-margin {
  margin-left: 20px; /* 左侧外边距 20px */
}
</style>
