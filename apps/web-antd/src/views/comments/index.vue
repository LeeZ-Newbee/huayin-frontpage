<script lang="ts" setup>
import type { CommentInfo } from '#/api/type/comment';
import type { PersonInfo } from '#/api/type/person';

import { reactive, ref } from 'vue';

import { Button, Card, Input, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { addComment, searchPersonByNickName } from '#/api';

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
async function searchPerson() {
  const searchContent = nickNameSearch.value;
  console.warn(`搜索艺人:${searchContent}`);
  if (searchContent === undefined || searchContent.length === 0) {
    message.warn('搜索内容不能为空');
    return;
  }
  const searchResult = await searchPersonByNickName(searchContent);
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
    baseFormApi.resetForm();
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
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4">
      <div class="flex gap-1">
        <Button type="text">艺名：</Button>
        <Input
          v-model:value="nickNameSearch"
          type="text"
          style="width: 400px"
        />
        <Button type="primary" @click="searchPerson">搜索</Button>
      </div>

      <!-- 搜索结果 -->
      <div class="flex gap-1" v-if="searchPersonResult">
        <Button type="text">花名: {{ searchPersonResult.nickName }}</Button>
        <Button type="text">真名: {{ searchPersonResult.name }}</Button>
      </div>
      <CommentForm v-if="searchPersonResult" />
    </div>
  </Card>
</template>
