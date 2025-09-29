<script lang="ts" setup>
import type { PersonScoreInfo } from '#/api';
import type { PersonInfo } from '#/api/type/person';

import { onMounted, ref } from 'vue';

import { VbenAvatar } from '@vben/common-ui';

import { Button, Card, Rate } from 'ant-design-vue';

import { latestPersions, oldPersions } from '#/api';
import { SERVER_DOMAIN } from '#/api/type/constants';
import { JobType } from '#/api/type/job';

// 新人榜查询结果
const latestPersionsResult = ref<PersonInfo[] | undefined>([]);

// 老人榜查询结果
const oldPersionsResult = ref<PersonScoreInfo[] | undefined>([]);

// 查询新人榜
async function queryLatestPersons() {
  const queryResult = await latestPersions(JobType.djhq);
  console.warn(`新人榜${queryResult}`);
  latestPersionsResult.value = queryResult;
}

// 查询老人榜
async function queryOldPersons() {
  const queryResult = await oldPersions(JobType.djhq);
  console.warn(`老人榜${queryResult}`);
  oldPersionsResult.value = queryResult;
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
            <VbenAvatar :src="SERVER_DOMAIN + person.avatar" :size="60" />
            <div class="flex flex-col gap-1" style="min-width: 200px">
              <span class="text-lg font-medium">{{ person.nickName }}</span>
              <div class="border-b border-gray-200"></div>
              <div class="flex items-center gap-1">
                <Button v-if="person.recommendWord1?.length > 0">
                  {{ person.recommendWord1 }}
                </Button>
                <Button v-if="person.recommendWord2?.length > 0">
                  {{ person.recommendWord2 }}
                </Button>
                <Button v-if="person.recommendWord3?.length > 0">
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
            <VbenAvatar :src="SERVER_DOMAIN + person.avatar" :size="60" />
            <div class="flex flex-col gap-1" style="min-width: 200px">
              <span class="text-lg font-medium">{{ person.nickName }}</span>
              <div class="border-b border-gray-200"></div>
              <div class="flex items-center gap-1">
                <Rate :value="person.score" :count="5" :allow-half="true" />
                <span>{{ person.score }}分</span>
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
    </Card>
  </div>
</template>
