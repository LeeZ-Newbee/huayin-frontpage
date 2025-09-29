import { Gender } from './gender';
import { JobType } from './job';

/**
 * 音视频标签类型枚举值
 */
export enum MediaTag {
  bazong = 17,
  canglaolaonian = 40,
  cangsangchengnian = 38,
  cuohan = 19,
  danmei = 9,
  dushi = 4,
  gonggong = 25,
  gongzi = 18,
  guanchang = 10,
  guyan = 7,
  heidao = 11,
  laoniancangsangxing = 24,
  laonianruyaxing = 23,
  lishi = 3,
  luoli = 27,
  pishuaiqingnian = 15,
  qinglangqingnian = 14,
  qinglengqingnian = 32,
  qingshuangqingnian = 13,
  qingtianqingnian = 30,
  shaonian = 12,
  shaonv = 28,
  shashuangqingnian = 35,
  shayachengnian = 21,
  sheke = 1,
  shenshi = 20,
  wenhelaonian = 39,
  wenrouqingnian = 31,
  wenzhongchengnian = 16,
  wumingxiantese = 41,
  wuxia = 6,
  xianyan = 8,
  xuanhuan = 5,
  xuanyi = 2,
  youtong = 26,
  youyachengnian = 36,
  yuanqishaonv = 29,
  yujieqiangyu = 34,
  yujieqingyu = 33,
  zhengtai = 42,
  zhixingchengnian = 37,
  zhongniandashu = 22,
}

/**
 * 多媒体文件标签
 * gender表示该标签用于什么性别，如果为空则通用
 * jobs 表示该标签用于什么岗位
 */
export const MediaTagOptions = [
  { label: '社科', value: MediaTag.sheke, jobs: [JobType.pszb, JobType.zbpb] },
  { label: '悬疑', value: MediaTag.xuanyi, jobs: [JobType.pszb, JobType.zbpb] },
  { label: '历史', value: MediaTag.lishi, jobs: [JobType.pszb, JobType.zbpb] },
  { label: '都市', value: MediaTag.dushi, jobs: [JobType.pszb, JobType.zbpb] },
  {
    label: '玄幻',
    value: MediaTag.xuanhuan,
    jobs: [JobType.pszb, JobType.zbpb],
  },
  { label: '武侠', value: MediaTag.wuxia, jobs: [JobType.pszb, JobType.zbpb] },
  { label: '古言', value: MediaTag.guyan, jobs: [JobType.pszb, JobType.zbpb] },
  {
    label: '现言',
    value: MediaTag.xianyan,
    jobs: [JobType.pszb, JobType.zbpb],
  },
  { label: '耽美', value: MediaTag.danmei, jobs: [JobType.pszb, JobType.zbpb] },
  {
    label: '官场',
    value: MediaTag.guanchang,
    jobs: [JobType.pszb, JobType.zbpb],
  },
  { label: '黑道', value: MediaTag.heidao, jobs: [JobType.pszb, JobType.zbpb] },
  {
    label: '少年',
    value: MediaTag.shaonian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '清爽青年',
    value: MediaTag.qingshuangqingnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '清朗青年',
    value: MediaTag.qinglangqingnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '痞帅青年',
    value: MediaTag.pishuaiqingnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '稳重成年',
    value: MediaTag.wenzhongchengnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '霸总',
    value: MediaTag.bazong,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '公子',
    value: MediaTag.gongzi,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '糙汉',
    value: MediaTag.cuohan,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '绅士',
    value: MediaTag.shenshi,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '沙哑成年',
    value: MediaTag.shayachengnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '中年大叔',
    value: MediaTag.zhongniandashu,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年（儒雅型）',
    value: MediaTag.laonianruyaxing,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年（沧桑型）',
    value: MediaTag.laoniancangsangxing,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '公公',
    value: MediaTag.gonggong,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '幼童',
    value: MediaTag.youtong,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '萝莉',
    value: MediaTag.luoli,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '少女',
    value: MediaTag.shaonv,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '元气少女',
    value: MediaTag.yuanqishaonv,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '清甜青年',
    value: MediaTag.qingtianqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '温柔青年',
    value: MediaTag.wenrouqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '清冷青年',
    value: MediaTag.qinglengqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '御姐（轻御）',
    value: MediaTag.yujieqingyu,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '御姐（强御）',
    value: MediaTag.yujieqiangyu,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '飒爽青年',
    value: MediaTag.shashuangqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '优雅成年',
    value: MediaTag.youyachengnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '知性成年',
    value: MediaTag.zhixingchengnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '沧桑成年',
    value: MediaTag.cangsangchengnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '温和老年',
    value: MediaTag.wenhelaonian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '苍老老年',
    value: MediaTag.canglaolaonian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '无明显特征',
    value: MediaTag.wumingxiantese,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '正太',
    value: MediaTag.zhengtai,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
];

/**
 * 根据 性别和岗位过滤音视频文件标签
 * @param gender 性别
 * @param job 岗位
 * @returns 符合条件的标签数组
 */
export function filterMedaiTagOptions(gender?: Gender, job?: JobType) {
  return MediaTagOptions.filter((item) => {
    const genderMatch = !item.gender || !gender || item.gender === gender;
    const jobMatch = !item.jobs || !job || item.jobs.includes(job);
    return genderMatch && jobMatch;
  });
}
