<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type { MediaDemo, PersonScoreInfo, PersonSearchInfo } from '#/api';
import type { PersonInfo } from '#/api/type/person';

import { onMounted, reactive, ref } from 'vue';

import { VbenCheckButtonGroup } from '@vben/common-ui';

import {
  Button,
  Card,
  Image,
  Input,
  message,
  Rate,
  Slider,
} from 'ant-design-vue';

import { latestPersions, oldPersions, searchMediaDemos } from '#/api';
import { SERVER_DOMAIN } from '#/api/type/constants';
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

const tagOptions = filterMedaiTagOptions(undefined, JobType.zbpb);

const tagProps = reactive({
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
  tagId: tagOptions[0]?.value,
  jobId: JobType.zbpb,
});

// 开始选角
async function searchMediaDemo() {
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

// 查询新人榜
async function queryLatestPersons() {
  const queryResult = await latestPersions(JobType.zbpb);
  console.warn(`新人榜${queryResult}`);
  latestPersionsResult.value = queryResult;
}

// 查询老人榜 uploads/1759061627093_files.jpeg
async function queryOldPersons() {
  const queryResult = await oldPersions(JobType.zbpb);
  console.warn(`老人榜${queryResult}`);
  oldPersionsResult.value = queryResult;
}

// 音频开始播放
function handlePlay(deomoId: number | undefined) {
  console.warn(`开始播放${deomoId}`);
  const playDemo = mediaDemoQueryReuslt.value?.find((item) => {
    return item.demoId === deomoId;
  });
  if (playDemo) {
    playDemo.isPlayed = true;
  }
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

// 查看艺人详情
function checkPersonDetail(artistId: number) {
  router.push({ name: 'PersonDetail', params: { artistId } });
}

onMounted(() => {
  queryLatestPersons();
  queryOldPersons();
});
</script>

<template>
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
              <span class="text-lg font-medium">{{ person.nickName }}</span>
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
              <span class="text-lg font-medium">{{ person.nickName }}</span>
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

    <!-- 选角 -->
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

        <div class="flex gap-4">
          <Button type="text" style="pointer-events: none; cursor: default">
            价格:
          </Button>
          <Slider
            v-model:value="persionSearchInfo.priceLow"
            :max="500"
            :min="0"
            show-value="true"
            style="width: 100px"
          />

          <span>{{ persionSearchInfo.priceLow }}</span>
          <Slider
            v-model:value="persionSearchInfo.priceHigh"
            :max="500"
            :min="0"
            style="width: 100px"
          />
          <span>{{ persionSearchInfo.priceHigh }}</span>
        </div>
        <div class="flex gap-4">
          <Button type="text" style="pointer-events: none; cursor: default">
            标签:
          </Button>

          <VbenCheckButtonGroup
            v-model="persionSearchInfo.tagId"
            :options="tagOptions"
            v-bind="tagProps"
          />
        </div>
        <div class="border-b border-gray-200"></div>

        <div class="flex h-full flex-col gap-4">
          <Card v-for="demo in currentBatchList" :key="demo.artistId">
            <audio
              :src="SERVER_DOMAIN + demo.fileUrl"
              controls
              width="400"
              height="200"
              @play="handlePlay(demo.demoId)"
            ></audio>
            <div style="height: 10px"></div>
            <Button
              type="primary"
              :disabled="demo.isPlayed !== true"
              @click="checkPersonDetail(demo.artistId)"
            >
              查看艺人详情
            </Button>
          </Card>
        </div>
        <Button type="primary" @click="changeBatch">换一批</Button>
      </div>
    </Card>
  </div>
</template>
