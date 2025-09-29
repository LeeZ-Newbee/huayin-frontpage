/**
 * 用户角色枚举
 */
export enum Role {
  /**
   * 导演
   */
  Director = 2,
  /**
   * 管理员
   */
  Manager = 1,
}

/**
 * 用户创建参数
 */
interface NewUserInfo {
  name: string;
  password: string;
  role: number;
}

export const RoleOptions = [
  { label: '导演', value: Role.Director },
  { label: '管理员', value: Role.Manager },
];

export type { NewUserInfo };
