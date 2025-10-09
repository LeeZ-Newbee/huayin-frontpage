<script lang="ts" setup>
import type { CommentInfo } from '#/api/type/comment';
import type { PersonInfo } from '#/api/type/person';

import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Button, Card, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { addComment, searchPersonById } from '#/api';
import { router } from '#/router';

const route = useRoute();

// 人员id
const personId = Number(route.params.artistId);
console.warn(`艺人id:${personId}`);

// 评价
const comment = reactive<CommentInfo>({
  time: undefined,
  content: undefined,
  director: undefined,
  score: 0,
  evaluate: undefined,
  artistId: 0,
});
const nickNameSearch = defineModel<string>();

// 搜索结果
const searchPersonResult = ref<null | PersonInfo>(null);

/**
 * 艺人搜索
 */
async function searchPerson(personId: number) {
  const searchResult = await searchPersonById(personId);
  console.warn(`搜索艺人结果:${searchResult}`);
  Object.entries(searchResult).forEach(([key, value]) => {
    console.warn(key, value);
  });
  searchPersonResult.value = searchResult;
  comment.artistId = searchResult.artistId;
}

// 提交评价
async function onSubmit(values: Record<string, any>) {
  console.warn(`提交表单: ${values}`);
  const submitResult = await addComment(comment);
  if (submitResult) {
    message.success({
      content: `创建评价成功`,
    });
    router.push({ name: 'Comments' });
  }
}

// 评价表单
const [CommentForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  handleValuesChange(_values, fieldsChanged) {
    comment.score = _values.rate === undefined ? 0 : _values.rate * 2;
    if (_values.date !== undefined) {
      const timeStamp = dayjs(_values.date).valueOf();
      comment.time = timeStamp;
    }
    if (_values.content !== undefined) {
      comment.content = _values.content;
    }
    if (_values.director !== undefined) {
      comment.director = _values.director;
    }
    if (_values.comments !== undefined) {
      comment.evaluate = _values.comments;
    }
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'DatePicker',
      fieldName: 'date',
      componentProps: {
        format: 'YYYY-MM-DD',
        placeholder: '请选择日期',
      },
      label: '日期',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'content',
      label: '合作内容',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'director',
      label: '配音导演',
      rules: 'required',
    },
    {
      component: 'Rate',
      fieldName: 'rate',
      label: '评分',
      rules: 'required',
      componentProps: {
        count: 5, // 星星数量
        allowHalf: true, // 是否允许半颗星
        disabled: false, // 是否禁用
      },
      suffix: () => {
        // 在 Rate 后面显示分数
        return `${comment.score}`;
      },
    },
    {
      component: 'Textarea',
      fieldName: 'comments',
      rules: 'required',
      // 占满三列空间 基线对齐
      formItemClass: 'col-span-4 items-baseline',
      label: '评价',
      componentProps: {
        rows: 20,
        placeholder: '请输入不少于30字的评价',
        minlength: 30,
      },
    },
  ],
  // 一共三列
  wrapperClass: 'grid-cols-4',
});

onMounted(() => {
  searchPerson(personId);
});
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4">
      <!-- 搜索结果 -->
      <div class="flex gap-1" v-if="searchPersonResult">
        <Button type="text" style="pointer-events: none; cursor: default">
          花名: {{ searchPersonResult.nickName }}
        </Button>
        <Button type="text" style="pointer-events: none; cursor: default">
          真名: {{ searchPersonResult.name }}
        </Button>
      </div>
      <CommentForm v-if="searchPersonResult" />
    </div>
  </Card>
</template>
