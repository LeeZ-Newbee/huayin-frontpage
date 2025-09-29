import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { defineStore } from 'pinia';

import { getUserInfoApi, loginApi, logoutApi } from '#/api';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    const userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;
      const { role } = await loginApi(params);
      if (role) {
        const accessToken = 'test_token';
        const userInfo: UserInfo = {
          username: params.name,
          role,
          avatar:
            'https://b0.bdstatic.com/ugc/XhisrD-9wE9pFFNLorwRQQb17175b744114bbeee44b6127da0efe9.jpg',
          token: accessToken,
          desc: '管理员用户',
          homePath: '',
          realName: params.name,
          userId: '',
        };
        accessStore.setAccessToken(accessToken);
        userStore.setUserInfo(userInfo);
        onSuccess
          ? await onSuccess?.()
          : await router.push(preferences.app.defaultHomePath);
      }
      // 如果成功获取到 accessToken
      // if (accessToken) {
      //   accessStore.setAccessToken(accessToken);

      //   // 获取用户信息并存储到 accessStore 中
      //   const [fetchUserInfoResult, accessCodes] = await Promise.all([
      //     fetchUserInfo(),
      //     getAccessCodesApi(),
      //   ]);

      //   userInfo = fetchUserInfoResult;

      //   userStore.setUserInfo(userInfo);
      //   accessStore.setAccessCodes(accessCodes);

      //   if (accessStore.loginExpired) {
      //     accessStore.setLoginExpired(false);
      //   } else {
      //     onSuccess
      //       ? await onSuccess?.()
      //       : await router.push(preferences.app.defaultHomePath);
      //   }

      //   if (userInfo?.realName) {
      //     notification.success({
      //       description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
      //       duration: 3,
      //       message: $t('authentication.loginSuccess'),
      //     });
      //   }
      // }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    let userInfo: null | UserInfo = null;
    userInfo = await getUserInfoApi();
    userStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
