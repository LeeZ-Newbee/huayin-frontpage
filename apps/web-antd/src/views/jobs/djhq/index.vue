<script lang="ts" setup>
import type { PersonScoreInfo } from '#/api';
import type { PersonInfo } from '#/api/type/person';

import { onMounted, ref } from 'vue';

import { Button, Card, Image, Rate } from 'ant-design-vue';

import { latestPersions, oldPersions } from '#/api';
import { SERVER_DOMAIN } from '#/api/type/constants';
import { JobType } from '#/api/type/job';
import { router } from '#/router';

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

// 查看艺人详情
function checkPersonDetail(artistId: number | undefined) {
  if (!artistId) {
    console.error('艺人id为空');
    return;
  }
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

    <!-- 选角 -->
    <Card class="flex-[2]">
      <template #title>
        <div class="w-full text-center">选角</div>
      </template>
    </Card>
  </div>
</template>
