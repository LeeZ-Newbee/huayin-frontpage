import type { UserInfo } from '@vben/types';

import type { NewUserInfo } from '../type/user';

import { requestClient } from '#/api/request';

interface AllUserRequest {
  users: NewUserInfo[];
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

/**
 * 创建新用户
 * @param userInfo  用户信息
 */
export async function createUser(userInfo: NewUserInfo) {
  return requestClient.post('/api/user/add', userInfo);
}

/**
 * 获取所有用户
 */
export async function getAllUsers() {
  return requestClient.post<AllUserRequest>('/api/user/list');
}

/**
 * 根据用户名删除用户
 */
export async function deleteUserByName(userName: string) {
  return requestClient.post('/api/user/delete', { name: userName });
}
