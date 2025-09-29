/**
 * 岗位类型枚举值
 */
export enum JobType {
  /**
   * 对轨
   */
  dg = 6,
  /**
   * 短剧CV
   */
  djcv = 2,
  /**
   * 短剧后期
   */
  djhq = 7,
  /**
   * 话本
   */
  hb = 5,
  /**
   * 评书主播
   */
  pszb = 1,
  /**
   * 审听
   */
  st = 9,
  /**
   * 有声CV
   */
  yscv = 3,
  /**
   * 有声后期
   */
  yshq = 8,
  /**
   * 主播旁边
   */
  zbpb = 4,
}

/**
 * 岗位选项数组
 * mediaType 为该岗位支持上传的多媒体文件。如果为空则不支持上传文件
 */
export const JobOptions = [
  { label: '评书主播', value: JobType.pszb, mediaType: '.mp3,.wav,.ogg' },
  { label: '主播旁白', value: JobType.zbpb, mediaType: '.mp3,.wav,.ogg' },
  { label: '有声CV', value: JobType.yscv, mediaType: '.mp3,.wav,.ogg' },
  { label: '短剧CV', value: JobType.djcv, mediaType: '.mp4' },
  { label: '有声后期', value: JobType.yshq },
  { label: '短剧后期', value: JobType.djhq },
  { label: '话本', value: JobType.hb },
  { label: '对轨', value: JobType.dg },
  { label: '审听', value: JobType.st },
];
