<script lang="ts" setup>
import type { NewUserInfo } from '#/api/type/user';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createUser } from '#/api';
import { RoleOptions } from '#/api/type/user';

const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: RoleOptions,
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'role',
      label: '用户角色',
      rules: 'required',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入用户名',
      },
      // 字段名
      fieldName: 'username',
      // 界面显示的label
      label: '用户名',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入密码',
      },
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1',
});

async function onSubmit(values: Record<string, any>) {
  const newUser: NewUserInfo = {
    name: values.username,
    password: values.password,
    role: values.role,
  };
  const createUserResult = await createUser(newUser);
  if (createUserResult) {
    message.success({
      content: `创建用户成功`,
    });
    baseFormApi.resetForm();
  }
}
</script>

<template>
  <Card style="width: 500px">
    <BaseForm />
  </Card>
</template>
