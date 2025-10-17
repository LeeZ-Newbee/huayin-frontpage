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
    label: '青年公子',
    value: MediaTag.qingshuangqingnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年糙汉',
    value: MediaTag.qinglangqingnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年爽朗',
    value: MediaTag.pishuaiqingnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年温和',
    value: MediaTag.wenzhongchengnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年叛逆',
    value: MediaTag.bazong,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年高冷',
    value: MediaTag.gongzi,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '中年大嗓',
    value: MediaTag.cuohan,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '中年小嗓',
    value: MediaTag.shenshi,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年儒雅',
    value: MediaTag.shayachengnian,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年沧桑',
    value: MediaTag.zhongniandashu,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年健硕',
    value: MediaTag.laonianruyaxing,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '公公',
    value: MediaTag.laoniancangsangxing,
    gender: Gender.Man,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '男孩',
    value: MediaTag.youtong,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '女孩',
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
    label: '少御',
    value: MediaTag.yuanqishaonv,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年清冷',
    value: MediaTag.qingtianqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年飒爽',
    value: MediaTag.wenrouqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年温和',
    value: MediaTag.qinglengqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年魅惑',
    value: MediaTag.yujieqingyu,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '青年小嗓反派',
    value: MediaTag.yujieqiangyu,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '中年知性',
    value: MediaTag.shashuangqingnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '中年泼辣',
    value: MediaTag.youyachengnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '中年质朴',
    value: MediaTag.zhixingchengnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年沧桑',
    value: MediaTag.cangsangchengnian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年温和',
    value: MediaTag.wenhelaonian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '老年泼辣',
    value: MediaTag.canglaolaonian,
    gender: Gender.Women,
    jobs: [JobType.yscv, JobType.djcv],
  },
  {
    label: '伪男声',
    value: MediaTag.wumingxiantese,
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
