/** 艺人信息 */
interface PersonInfo {
  /**
   * 艺人id
   */
  artistId: number | undefined;
  /**
   * 艺名
   */
  nickName: string;
  /**
   * 真名
   */
  name: string;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 岗位
   */
  job: number;

  /**
   * 家庭住址
   */
  address: string;

  /**
   * qq号
   */
  qq: string;

  /**
   * 微信号
   */
  wechat: string;

  /**
   * 手机号
   */
  telephone: string;

  /**
   * 紧急联系人电话
   */
  emergencyTelphone: string;

  /**
   * 银行卡号
   */
  creditCardNum: string;

  /**
   * 推荐词1
   */
  recommendWord1: string;

  /**
   * 推荐词2
   */
  recommendWord2: string;

  /**
   * 推荐词3
   */
  recommendWord3: string;

  /**
   * 身份证号
   */
  ID: string;

  /**
   * 身份证正面图片地址
   */
  identityCardFront: string;

  /**
   * 身份证反面图片地址
   */
  identityCardReverse: string;

  /**
   * 工资
   */
  salary: number;

  /**
   * 优先级
   */
  priorityRating: number | undefined;

  /**
   * 添加时间
   */
  createTime: number | undefined;

  /**
   * 性别 0男 1女
   */
  gender: number;
}

export type { PersonInfo };
