<script lang="ts" setup>
import type { NewUserInfo } from '#/api/type/user';

import { useVbenModal } from '@vben/common-ui';
import { useRefresh } from '@vben/hooks';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createUser } from '#/api';
import { RoleOptions } from '#/api/type/user';

defineOptions({
  name: 'AddUserDialog',
});

const { refresh } = useRefresh();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'name',
      label: '用户名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: RoleOptions,
        placeholder: '请输入',
      },
      fieldName: 'role',
      label: '用户角色',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: '添加新用户',
});

function onSubmit(values: Record<string, any>) {
  // message.loading({
  //   content: '正在提交中...',
  //   duration: 0,
  //   key: 'is-form-submitting',
  // });
  createNewUser(values);
}

async function createNewUser(values: Record<string, any>) {
  const newUser: NewUserInfo = {
    name: values.name,
    password: values.password,
    role: values.role,
  };
  const createUserResult = await createUser(newUser);
  if (createUserResult) {
    message.success({
      content: `创建用户成功`,
    });
    modalApi.close();
    // message.success({
    //   content: `创建成功`,
    //   key: 'is-form-submitting',
    // });
    refresh();
  }
}
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
