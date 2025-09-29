<script lang="ts" setup>
import { h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Card, Image, Rate, Table } from 'ant-design-vue';

import { searchPersonById } from '#/api';

const route = useRoute();

// 人员id
const personId = Number(route.params.artistId);
console.warn(`艺人id:${personId}`);

interface Person {
  avatar: string;
  nickName: string;
  qq: string;
  ID: string;
  name: string;
  wechat: string;
  salary: string;
  creditCardNum: string;
  telephone: string;
  address: string;
  emergencyTelphone: string;
}

const person = ref<Person>({
  avatar: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
  nickName: '花名示例',
  qq: '12345678',
  ID: '130301199901011234',
  name: '张三',
  wechat: 'wechat123',
  salary: '主播旁白200，角色350',
  creditCardNum: '622202********1234',
  telephone: '13800000000',
  address: '北京市海淀区',
  emergencyTelphone: '13900000000',
});

const recentCooperations = ref([
  {
    id: 1,
    date: '2025年9月11日',
    content: '《康熙大帝》旁白',
    director: '李木子',
    score: 3,
    comment: '表现优秀，声音感染力强。',
  },
]);

const historyCooperations = ref([
  {
    id: 1,
    date: '2025年8月11日',
    content: '《大染坊》旁白',
    director: '李木子',
    score: 3,
    comment: '声音醇厚，表现不错。',
  },
  {
    id: 2,
    date: '2025年6月11日',
    content: '《雍正王朝》旁白',
    director: '刘尔刀',
    score: 3,
    comment: '声音有感染力，完成度高。',
  },
]);

const historyColumns = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '合作内容', dataIndex: 'content', key: 'content' },
  { title: '配音导演', dataIndex: 'director', key: 'director' },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
    customRender: ({ text }: any) =>
      h(Rate, { value: text, count: 5, allowHalf: true }),
  },
  { title: '评价', dataIndex: 'comment', key: 'comment' },
];

// 查询艺人信息
async function queryPerson(id: number) {
  const queryResult = await searchPersonById(id);
  console.warn(`艺人详情: ${queryResult}`);
}

onMounted(() => {
  queryPerson(personId);
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
        <div class="flex flex-col gap-2">
          <div
            v-for="item in recentCooperations"
            :key="item.id"
            class="flex items-start justify-between border-b border-gray-200 p-2"
          >
            <span>{{ item.date }}</span>
            <span>{{ item.content }}</span>
            <span>{{ item.director }}</span>
            <Rate :value="item.score" :count="5" allow-half />
            <span>{{ item.comment }}</span>
          </div>
        </div>
      </Card>

      <!-- 历史合作 -->
      <Card class="p-4">
        <h3 class="mb-4 text-center">历史合作</h3>
        <Table
          :columns="historyColumns"
          :data-source="historyCooperations"
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
