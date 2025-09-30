import type { CommentInfo } from '../type/comment';
import type { MediaTag } from '../type/mediatag';
import type { PersonInfo } from '../type/person';

import { requestClient } from '#/api/request';

interface MediaDemo {
  demoId: number | undefined;
  demoType: number;
  fileUrl: string;
  artistId: number;
  // 所属艺人名
  name: string;
  // 所属艺人id
  isPlayed: boolean;
}

/**
 * 带评分的用户信息
 */
interface PersonScoreInfo extends PersonInfo {
  score: number;
}

/**
 * 艺人搜素字段信息
 */
interface PersonSearchInfo {
  avatarName: string | undefined;
  priceHigh: number;
  priceLow: number;
  tagId: number | undefined;
  jobId: number | undefined;
}

/**
 * 音视频小样搜索结果
 */
interface SearchMediaDemosResult {
  auditions: MediaDemo[];
}

/**
 * 音视频小样搜索结果
 */
interface SearchMediaDemosResult2 {
  demos: MediaDemo[];
}

/**
 * 新建人员
 */
export async function addPerson(person: PersonInfo) {
  return requestClient.post<PersonInfo>('/api/artist/add', person);
}

/**
 * 根据昵称搜索人员
 */
export async function searchPersonByNickName(nickName: string) {
  return requestClient.post<PersonInfo>('/api/artist/get', {
    nickName,
  });
}

/**
 * 根据id搜索人员
 */
export async function searchPersonById(artistId: number) {
  return requestClient.post<PersonInfo>('/api/artist/get', {
    artistId,
  });
}

/**
 * 更新人员
 */
export async function updatePerson(person: PersonInfo) {
  return requestClient.post('/api/artist/update', person);
}

/**
 * 删除人员
 */
export async function deletePerson(personId: number) {
  return requestClient.post('/api/artist/delete', { artisId: personId });
}

/**
 * 添加音视频小样信息
 * @param mediaDemo 小样信息
 */
export async function addPersionMedia(mediaDemo: MediaDemo) {
  return requestClient.post('/api/demo/add', mediaDemo);
}

/**
 * 添加评价
 */
export async function addComment(commentInfo: CommentInfo) {
  return requestClient.post('/api/eval/add', commentInfo);
}

/**
 * 查询最新演员
 */
export async function latestPersions(jobId: number) {
  return requestClient.post<PersonInfo[]>('/api/stats/latest', {
    job: jobId,
  });
}

/**
 * 查询老人合作默契榜
 */
export async function oldPersions(jobId: number) {
  return requestClient.post<PersonScoreInfo[]>('/api/stats/partnership', {
    job: jobId,
  });
}

/**
 * 查询艺名音视频小样
 */
export async function searchMediaDemos(searchParams: PersonSearchInfo) {
  return requestClient.post<SearchMediaDemosResult>(
    '/api/casting/select',
    searchParams,
  );
}

/**
 * 根据人员id查询评价
 */
export async function searchCommentsByPersonId(artistId: number) {
  return requestClient.post<CommentInfo[]>('/api/eval/list', {
    artistId,
  });
}

/**
 * 根据标签查询多媒体文件
 */
export async function searchMediaDemosByTag(mediaTag: MediaTag) {
  return requestClient.post<SearchMediaDemosResult2>('/api/demo/list', {
    demoType: mediaTag,
  });
}

/**
 * 根据id删除多媒体文件
 */
export async function deleteMediaDemoById(id: number) {
  return requestClient.post('/api/demo/delete', {
    demoId: id,
  });
}

export type { MediaDemo, PersonScoreInfo, PersonSearchInfo };
