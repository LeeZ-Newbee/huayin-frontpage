<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type { MediaDemo, PersonScoreInfo, PersonSearchInfo } from '#/api';
import type { PersonInfo } from '#/api/type/person';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page, useVbenModal, VbenCheckButtonGroup } from '@vben/common-ui';

import {
  Button,
  Card,
  Image,
  Input,
  message,
  Rate,
  Select,
  Slider,
} from 'ant-design-vue';

import { latestPersions, oldPersions, searchMediaDemos } from '#/api';
import { SERVER_DOMAIN } from '#/api/type/constants';
import { Gender, GenderOptions } from '#/api/type/gender';
import { JobType } from '#/api/type/job';
import { filterMedaiTagOptions } from '#/api/type/mediatag';
import { router } from '#/router';

// 新人榜查询结果
const latestPersionsResult = ref<PersonInfo[] | undefined>([]);

// 老人榜查询结果
const oldPersionsResult = ref<PersonScoreInfo[] | undefined>([]);

// 音视频小样搜索结果
const mediaDemoQueryReuslt = ref<MediaDemo[] | undefined>([]);

// 当前显示的一批
const currentBatchList = ref<MediaDemo[] | undefined>([]);
// 每一批显示多少个
const OneBatchSize = 5;

// 当前一批的索引
let currentBatchStartIndex = 0;

// 播放状态记录：key 为音频 id（与模板中使用的 id 一致）
const playingStatus = reactive<Record<number, boolean>>({});

// 记录是否曾经点击过播放（用于控制"查看艺人详情"按钮可用性）
// 使用 artistId + demoType 的组合作为key，确保不同demoType的播放状态独立
const playedOnce = reactive<Record<string, boolean>>({});

const currentVideoFileUrl = ref<null | string>(null);
// 注册 Modal 实例
const [Modal, modalApi] = useVbenModal();

// 男女选择
const presetGender = GenderOptions;
const gender = ref<Gender | undefined>(presetGender[0]?.value);

// 性别切换
function onGenderChange() {
  persionSearchInfo.tagId = filterTagOptions.value[0]?.value;
}

// 标签显示列表
const filterTagOptions = computed(() => {
  const tagOptions =
    gender.value === Gender.Man ? tagManOptions : tagWomenOptions;
  return tagOptions;
});

const tagManOptions = filterMedaiTagOptions(Gender.Man, JobType.djcv);

const tagWomenOptions = filterMedaiTagOptions(Gender.Women, JobType.djcv);

const compProps = reactive({
  beforeChange: undefined,
  disabled: false,
  gap: 20,
  showIcon: false,
  size: 'middle',
  allowClear: false,
} as Recordable<any>);

// 选角参数
const persionSearchInfo = reactive<PersonSearchInfo>({
  avatarName: undefined,
  priceHigh: 500,
  priceLow: 0,
  tagId: filterTagOptions.value[0]?.value,
  jobId: JobType.djcv,
});

// 开始选角
async function searchMediaDemo() {
  // 发起新搜索前：清理播放状态，避免需要手动点暂停
  resetPlaybackState();
  // if (
  //   persionSearchInfo.avatarName === undefined ||
  //   persionSearchInfo.avatarName.length === 0
  // ) {
  //   message.warning('艺名不能为空');
  //   return;
  // }
  if (persionSearchInfo.priceHigh <= persionSearchInfo.priceLow) {
    message.warning('最高价格不能小于最低价格');
    return;
  }

  const searchResult = await searchMediaDemos(persionSearchInfo);
  console.warn(`小样搜索结果: ${searchResult.auditions}`);
  mediaDemoQueryReuslt.value = searchResult.auditions;
  currentBatchStartIndex = 0;
  changeBatch();
}

// 点击按钮：切换播放/暂停
function togglePlayByArtist(demo: MediaDemo) {
  // playingStatus[demo.artistId] = true;
  // 使用 artistId + demoType 的组合作为key
  const playKey = `${demo.artistId}_${demo.demoType}`;
  playedOnce[playKey] = true;
  currentVideoFileUrl.value = demo.fileUrl;
  modalApi.open();
}
// 判断艺人是否在新人榜中
function isNewArtist(artistId: number | undefined): boolean {
  if (!artistId) return false;
  return latestPersionsResult.value?.some(person => person.artistId === artistId)??false;
}

// 暂停所有并清理播放状态（在切换标签/搜索前调用）
function resetPlaybackState() {
  try {
    Object.keys(playingStatus).forEach(
      (key) => (playingStatus[Number(key)] = false),
    );
    currentVideoFileUrl.value = null;
    modalApi.close();
  } catch (e) {}
}

// 换一批
function changeBatch() {
  const allDemos = mediaDemoQueryReuslt.value;
  if (!allDemos) return;
  const allDemoSize = allDemos.length;
  if (allDemoSize === 0) {
    currentBatchList.value = [];
    return;
  }
  const endIndex = Math.min(currentBatchStartIndex + OneBatchSize, allDemoSize);
  if (endIndex === currentBatchStartIndex) {
    message.info('没有更多了');
    return;
  }
  currentBatchList.value = allDemos.slice(currentBatchStartIndex, endIndex);
  currentBatchStartIndex = endIndex;
}

// 查询新人榜
async function queryLatestPersons() {
  const queryResult = await latestPersions(JobType.djcv);
  console.warn(`新人榜${queryResult}`);
  latestPersionsResult.value = queryResult;
}

// 查询老人榜
async function queryOldPersons() {
  const queryResult = await oldPersions(JobType.djcv);
  console.warn(`老人榜${queryResult}`);
  oldPersionsResult.value = queryResult;
}

const STORAGE_KEY = 'castingState:djcv';
const RESTORE_FLAG_KEY = 'castingState:restore:djcv';

function saveCastingState() {
  const state = {
    gender: gender.value,
    persionSearchInfo: { ...persionSearchInfo },
    mediaDemoQueryReuslt: mediaDemoQueryReuslt.value,
    currentBatchList: currentBatchList.value,
    currentBatchStartIndex,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function restoreCastingState() {
  try {
    const shouldRestore = sessionStorage.getItem(RESTORE_FLAG_KEY) === '1';
    if (!shouldRestore) return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    if (state.gender !== undefined) gender.value = state.gender;
    Object.assign(persionSearchInfo, state.persionSearchInfo ?? {});
    mediaDemoQueryReuslt.value = state.mediaDemoQueryReuslt ?? [];
    currentBatchList.value = state.currentBatchList ?? [];
    currentBatchStartIndex = state.currentBatchStartIndex ?? 0;
    // 恢复完成后清除恢复标记
    sessionStorage.removeItem(RESTORE_FLAG_KEY);
  } catch (e) {
    console.warn('恢复选角状态失败', e);
  }
}

// 查看艺人详情
function checkPersonDetail(artistId: number | undefined) {
  if (!artistId) {
    console.error('艺人id为空');
    return;
  }
  // 保存当前选角页面状态
  saveCastingState();
  router.push({ name: 'PersonDetail', params: { artistId }, query: { fromJob: 'djcv' } });
}

onMounted(() => {
  // 优先恢复历史状态
  restoreCastingState();
  // 仍然拉取榜单（不影响已恢复的选角结果）
  queryLatestPersons();
  queryOldPersons();
});
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full w-full gap-4 overflow-x-auto py-2">
      <!-- 新人榜 -->
      <Card class="flex-1">
        <template #title>
          <div class="w-full text-center">最新演员</div>
        </template>
        <div class="flex flex-col gap-4">
          <Card v-for="person in latestPersionsResult" :key="person.artistId">
            <div class="flex items-center gap-1">
              <Image
                :src="SERVER_DOMAIN + person.avatar"
                height="60px"
                width="60px"
              />
              <div class="flex flex-col gap-1" style="min-width: 200px">
                <span
                  class="text-lg font-medium"
                  style="cursor: pointer"
                  @click="checkPersonDetail(person.artistId)"
                  >{{ person.nickName }}
                </span>
                <div class="flex items-center gap-1">
                  <Button
                    v-if="person.recommendWord1?.length > 0"
                    style="pointer-events: none; cursor: default"
                  >
                    {{ person.recommendWord1 }}
                  </Button>
                  <Button
                    v-if="person.recommendWord2?.length > 0"
                    style="pointer-events: none; cursor: default"
                  >
                    {{ person.recommendWord2 }}
                  </Button>
                  <Button
                    v-if="person.recommendWord3?.length > 0"
                    style="pointer-events: none; cursor: default"
                  >
                    {{ person.recommendWord3 }}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
      <!-- 合作默契榜 -->
      <Card class="flex-1">
        <template #title>
          <div class="w-full text-center">合作默契榜</div>
        </template>
        <div class="flex flex-col gap-4">
          <Card v-for="person in oldPersionsResult" :key="person.artistId">
            <div class="flex items-center gap-1">
              <Image
                :src="SERVER_DOMAIN + person.avatar"
                height="60px"
                width="60px"
              />
              <div class="flex flex-col gap-1" style="min-width: 200px">
                <span
                  class="text-lg font-medium"
                  style="cursor: pointer"
                  @click="checkPersonDetail(person.artistId)"
                  >{{ person.nickName }}
                </span>
                <div class="flex items-center gap-1">
                  <Rate
                    :allow-half="true"
                    :value="Math.floor(person.score) / 2"
                    :count="5"
                    :disabled="true"
                  />
                  <span>{{ Math.floor(person.score) }}分</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
      <Card class="flex-[2]">
        <template #title>
          <div class="w-full text-center">选角</div>
        </template>
        <div class="flex w-full flex-col gap-2">
          <div class="flex gap-1">
            <Button type="text" style="pointer-events: none; cursor: default">
              艺名:
            </Button>
            <Input
              v-model:value="persionSearchInfo.avatarName"
              type="text"
              style="width: 200px"
              placeholder="模糊搜索"
            />
            <Button type="primary" @click="searchMediaDemo"> 搜索 </Button>
          </div>

          <div class="flex gap-1">
            <Button type="text" style="pointer-events: none; cursor: default">
              性别:
            </Button>
            <Select
              v-model:value="gender"
              style="width: 100px"
              @change="onGenderChange"
            >
              <Select.Option
                :value="preset.value"
                v-for="preset in presetGender"
                :key="preset.value"
              >
                {{ preset.label }}
              </Select.Option>
            </Select>
          </div>

          <div class="flex items-center gap-4">
            <Button type="text" style="pointer-events: none; cursor: default">
              价格:
            </Button>
            <span>{{ persionSearchInfo.priceLow }}</span>
            <Slider
              v-model:value="persionSearchInfo.priceHigh"
              :max="500"
              :min="10"
              :step="10"
              style="width: 150px"
            />
            <span>{{ persionSearchInfo.priceHigh }}</span>
          </div>
          <div class="flex gap-4">
            <Button type="text" style="pointer-events: none; cursor: default">
              标签:
            </Button>

            <VbenCheckButtonGroup
              v-model="persionSearchInfo.tagId"
              :options="filterTagOptions"
              v-bind="compProps"
            />
          </div>
          <div class="border-b border-gray-200"></div>

          <!-- 让每一行显示5个，并且做一个播放暂停按钮 -->
          <div class="flex flex-wrap gap-4">
            <Card v-for="demo in currentBatchList" :key="demo.artistId">
              <button
                @click="togglePlayByArtist(demo)"
                class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-md transition-all duration-300 hover:bg-gray-900"
              >
                <!-- 播放图标（三角形）点击后播放 -->
                <div
                  v-if="!playingStatus[demo.artistId]"
                  class="ml-1 h-0 w-0 border-b-[9px] border-l-[16px] border-t-[9px] border-b-transparent border-l-white border-t-transparent transition-transform duration-300"
                ></div>

                <!-- 暂停图标（双矩形） -->
                <div v-else class="flex space-x-1">
                  <div class="h-6 w-2 rounded-sm bg-white"></div>
                  <div class="h-6 w-2 rounded-sm bg-white"></div>
                </div>
              </button>
            <Button
              :type="isNewArtist(demo.artistId)?'primary':'default'"
              :class="(isNewArtist(demo.artistId)?'mt-1 bg-green-500 hover:bg-green-600 border-green-500':'mt-1') + (!playedOnce[`${demo.artistId}_${demo.demoType}`] ? ' pointer-events-none cursor-not-allowed' : '')"
              @click="checkPersonDetail(demo.artistId)"
            >
                详情
              </Button>
            </Card>
          </div>
          <Button type="primary" @click="changeBatch">换一批</Button>
        </div>
      </Card>
    </div>

    <Modal
      :width="800"
      :footer="false"
      :fullscreen-button="false"
      destroy-on-close
    >
      <video
        class="video-wrapper"
        v-if="currentVideoFileUrl"
        :src="currentVideoFileUrl"
        controls
        autoplay
      ></video>
    </Modal>
  </Page>
</template>

<style scoped>
.video-wrapper {
  width: 100%;
  max-height: 70vh; /* 限制最大高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
