import type { UserInfo } from '@vben/types';

import type { NewUserInfo } from '../type/user';

import { requestClient } from '#/api/request';

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
