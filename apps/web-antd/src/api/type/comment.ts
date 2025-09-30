/** 人员评价信息 */
interface CommentInfo {
  /**
   * 时间戳
   */
  time: number | undefined;
  /**
   * 评价
   */
  evaluate: string | undefined;
  /**
   * 导演
   */
  director: string | undefined;
  /**
   * 评分
   */
  score: number | undefined;
  /**
   * 合作内容
   */
  content: string | undefined;

  /**
   * 合作艺人id
   */
  artistId: number | undefined;
}

export type { CommentInfo };
