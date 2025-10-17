<script lang="ts" setup>
import type { CommentInfo } from '#/api/type/comment';
import type { PersonInfo } from '#/api/type/person';

import { computed, h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Card, Image, Rate, Table } from 'ant-design-vue';
import dayjs from 'dayjs';

import { searchCommentsByPersonId, searchPersonById } from '#/api';

const route = useRoute();
const router = useRouter();

const current = ref<null | string>(null);
const currentComment = ref<CommentInfo | null>(null);

// 注册 Modal 实例
const [Modal, modalApi] = useVbenModal();
// 注册评价详情 Modal 实例
const [CommentModal, commentModalApi] = useVbenModal();

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
      // 评分为 10 分制：每半颗星=1分，5 颗星=10 分
      h(Rate, { value: Number(text) / 2, count: 5, allowHalf: true, disabled: true }),
  },
  {
    title: '评价',
    dataIndex: 'evaluate',
    key: 'evaluate',
    customRender: ({ record }: any) => {
      const text = record.evaluate || '';
      const shouldShowButton = text.length > 30;
      
      return h('div', { style: 'display: flex; align-items: center; max-width: 400px;' }, [
        h('span', { 
          style: 'flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
          title: text
        }, shouldShowButton ? `${text.slice(0, 30)}...` : text),
        shouldShowButton ? h('a', {
          style: 'margin-left: 6px; cursor: pointer; color: #409eff; white-space: nowrap;',
          onClick: () => showCommentDetail(record)
        }, '更多') : null
      ]);
    },
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

// 显示评价详情
function showCommentDetail(comment: CommentInfo) {
  currentComment.value = comment;
  commentModalApi.open();
}

onMounted(() => {
  queryPerson(personId);
  queryComments(personId);
});

// 返回到选角页面（仅通过本按钮触发恢复）
function goBack() {
  const fromJob = (route.query.fromJob as string | undefined) ?? undefined;
  if (fromJob) {
    try {
      sessionStorage.setItem(`castingState:restore:${fromJob}`, '1');
    } catch (e) {
      // ignore
    }
  }
  router.back();
}
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
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">花名：</span>
                  <span class="info-value">{{ person.nickName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">QQ：</span>
                  <span class="info-value">{{ person.qq }}</span>
                </div>

                

                <div class="info-item">
                  <span class="info-label">姓名：</span>
                  <span class="info-value">{{ person.name }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">微信：</span>
                  <span class="info-value">{{ person.wechat }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">费用参考：</span>
                  <span class="info-value">{{ person.salary }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">银行信息：</span>
                  <span class="info-value">{{ person.creditCardNum }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">电话：</span>
                  <span class="info-value">{{ person.telephone }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">地址：</span>
                  <span class="info-value">{{ person.address }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">紧急联系人电话：</span>
                  <span class="info-value">{{ person.emergencyTelphone }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">身份证号：</span>
                  <span class="info-value">
                    {{ person.ID }}
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
                  </span>
                </div>
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

    <!-- 评价详情弹窗 -->
    <CommentModal
      :width="600"
      :footer="false"
      :fullscreen-button="false"
      destroy-on-close
      title="评价详情"
    >
      <div v-if="currentComment" class="comment-detail">
        <div class="comment-text">{{ currentComment.evaluate }}</div>
      </div>
    </CommentModal>
    <!-- 底部返回按钮 -->
    <div class="mt-4 flex justify-center">
      <Button type="primary" @click="goBack">返回</Button>
    </div>
  </Page>
</template>

<style scoped>
.left-margin {
  margin-left: 20px; /* 左侧外边距 20px */
}

.comment-detail {
  padding: 20px;
}

.comment-text {
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px; /* 行间距12、列间距24 */
}

.info-item {
  display: flex;
  align-items: center;
  min-height: 28px;
}

.info-label {
  width: 120px; /* 固定标签宽度，保证纵向对齐 */
  color: #666;
  flex: 0 0 auto;
}

.info-value {
  flex: 1 1 auto;
  color: #111;
  word-break: break-all;
}
</style>
