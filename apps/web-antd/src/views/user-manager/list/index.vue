<script lang="ts" setup>
import type { NewUserInfo } from '#/api/type/user';

import { computed, h, onMounted, ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { useRefresh } from '@vben/hooks';

import { Button, message, Table } from 'ant-design-vue';

import { deleteUserByName, getAllUsers } from '#/api';
import { Role } from '#/api/type/user';

import AddUserDialog from '../add/add-user-dialog.vue';

const { refresh } = useRefresh();

const [AddUserModal, formModalApi] = useVbenModal({
  connectedComponent: AddUserDialog,
});

const userListColumns = [
  { title: '用户名', dataIndex: 'name', key: 'name' },
  { title: '角色', dataIndex: 'role', key: 'role' },
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

// 删除用户
function handleDelete(user: any) {
  confirm('确定删除该用户么？').then(() => {
    deleteUser(user);
  });
}

async function deleteUser(user: any) {
  const deleteResult = await deleteUserByName(user.name);
  if (deleteResult) {
    message.success('删除成功');
    // 刷新当前页面
    refresh();
  }
}

const userList = ref<NewUserInfo[]>([]);

// 对数据二次处理，格式化时间
const processedUserList = computed(() => {
  return (
    userList.value
      // 格式化时间戳
      .map((item) => ({
        ...item,
        role: item.role === Role.Manager ? '管理员' : '导演',
      }))
  );
});

// 查询所有用户
async function queryUserList() {
  const queryResult = await getAllUsers();
  if (queryResult) {
    userList.value = queryResult.users;
  }
}

// 添加新用户
function addNewUser() {
  formModalApi.open();
}

onMounted(() => {
  queryUserList();
});
</script>

<template>
  <Page auto-content-height>
    <AddUserModal />
    <Button type="primary" @click="addNewUser">新增用户</Button>
    <Table
      :data-source="processedUserList"
      :columns="userListColumns"
      :pagination="false"
    />
  </Page>
</template>
