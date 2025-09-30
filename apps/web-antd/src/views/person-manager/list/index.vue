<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';

import type { FormSchema } from '../../../../../../packages/@core/ui-kit/form-ui/src/types';

import type { MediaDemo } from '#/api';
import type { PersonInfo } from '#/api/type/person';

import { ref, toRaw, watch } from 'vue';

import { alert, Page } from '@vben/common-ui';

import { Button, Card, Input, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addPersionMedia, searchPersonByNickName, updatePerson } from '#/api';
import { SERVER_DOMAIN } from '#/api/type/constants';
import { Gender, GenderOptions } from '#/api/type/gender';
import { JobOptions, JobType } from '#/api/type/job';
import { filterMedaiTagOptions } from '#/api/type/mediatag';

const nickNameSearch = defineModel<string>();

const searchResultPerson = ref<null | PersonInfo>(null);

// 基础创建表单是否可见
const baseFormVisible = ref<boolean>(true);

// 主播表单是否可见
const zbVoiceFormVisible = ref<boolean>(false);

const yscvManFormVisible = ref<boolean>(false);

const yscvWomenFormVisible = ref<boolean>(false);

const djcvManFormVisible = ref<boolean>(false);

const djcvWomenFormVisible = ref<boolean>(false);

// 评书主播或主播旁白需要额外上传的音视频
const zbVoiceFromSchemas: FormSchema[] = filterMedaiTagOptions(
  undefined,
  JobType.pszb,
).map((item) => ({
  component: 'Upload',
  componentProps: {
    // 更多属性见：https://ant.design/components/upload-cn
    accept: JobOptions.find((option) => option.value === JobType.pszb)
      ?.mediaType,
    disabled: false,
    action: '/api/upload',
    name: 'file',
    onChange: handleUploadChange,
    maxCount: 1,
    multiple: false,
    showUploadList: true,
    // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
    listType: 'picture-card',
  },
  fieldName: item.value.toString(),
  label: item.label,
  renderComponentContent: () => {
    return {
      default: () => '点击上传音频',
    };
  },
}));

// 有声CV男需要额外上传的音视频
const yscvManFromSchemas: FormSchema[] = filterMedaiTagOptions(
  Gender.Man,
  JobType.yscv,
).map((item) => ({
  component: 'Upload',
  componentProps: {
    // 更多属性见：https://ant.design/components/upload-cn
    accept: JobOptions.find((option) => option.value === JobType.yscv)
      ?.mediaType,
    disabled: false,
    action: '/api/upload',
    name: 'file',
    onChange: handleUploadChange,
    maxCount: 1,
    multiple: false,
    showUploadList: true,
    // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
    listType: 'picture-card',
  },
  fieldName: item.value.toString(),
  label: item.label,
  renderComponentContent: () => {
    return {
      default: () => '点击上传音频',
    };
  },
}));

// 有声CV女需要额外上传的音视频
const yscvWomenFromSchemas: FormSchema[] = filterMedaiTagOptions(
  Gender.Women,
  JobType.yscv,
).map((item) => ({
  component: 'Upload',
  componentProps: {
    // 更多属性见：https://ant.design/components/upload-cn
    accept: JobOptions.find((option) => option.value === JobType.yscv)
      ?.mediaType,
    disabled: false,
    action: '/api/upload',
    name: 'file',
    onChange: handleUploadChange,
    maxCount: 1,
    multiple: false,
    showUploadList: true,
    // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
    listType: 'picture-card',
  },
  fieldName: item.value.toString(),
  label: item.label,
  renderComponentContent: () => {
    return {
      default: () => '点击上传音频',
    };
  },
}));

// 短剧CV男需要额外上传的音视频
const djcvManFromSchemas: FormSchema[] = filterMedaiTagOptions(
  Gender.Man,
  JobType.djcv,
).map((item) => ({
  component: 'Upload',
  componentProps: {
    // 更多属性见：https://ant.design/components/upload-cn
    accept: JobOptions.find((option) => option.value === JobType.djcv)
      ?.mediaType,
    disabled: false,
    action: '/api/upload',
    name: 'file',
    onChange: handleUploadChange,
    maxCount: 1,
    multiple: false,
    showUploadList: true,
    // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
    listType: 'picture-card',
  },
  fieldName: item.value.toString(),
  label: item.label,
  renderComponentContent: () => {
    return {
      default: () => '点击上传视频',
    };
  },
}));

// 短剧CV女需要额外上传的音视频
const djcvWomonFromSchemas: FormSchema[] = filterMedaiTagOptions(
  Gender.Women,
  JobType.djcv,
).map((item) => ({
  component: 'Upload',
  componentProps: {
    // 更多属性见：https://ant.design/components/upload-cn
    accept: JobOptions.find((option) => option.value === JobType.djcv)
      ?.mediaType,
    disabled: false,
    action: '/api/upload',
    name: 'file',
    onChange: handleUploadChange,
    maxCount: 1,
    multiple: false,
    showUploadList: true,
    // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
    listType: 'picture-card',
  },
  fieldName: item.value.toString(),
  label: item.label,
  renderComponentContent: () => {
    return {
      default: () => '点击上传视频',
    };
  },
}));

// 添加艺人表单
const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onBaseSubmit,
  handleValuesChange(_values, fieldsChanged) {},

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        readonly: true, // 只读
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'nickName',
      // 界面显示的label
      label: '艺名',
      rules: 'required',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'name',
      // 界面显示的label
      label: '真名',
      rules: 'required',
    },
    {
      colon: false,
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: GenderOptions,
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'gender',
      label: '性别 : ',
    },

    {
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        maxlength: 20,
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'creditCardNum',
      // 界面显示的label
      label: '银行卡号',
      rules: 'required',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'ID',
      // 界面显示的label
      label: '身份证号',
      rules: 'required',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
        maxlength: 20,
      },
      // 字段名
      fieldName: 'qq',
      // 界面显示的label
      label: 'QQ',
      rules: 'required',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'address',
      // 界面显示的label
      label: '地址',
      rules: 'required',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'wechat',
      // 界面显示的label
      label: '微信',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
        maxlength: 20,
      },
      // 字段名
      fieldName: 'emergencyTelphone',
      // 界面显示的label
      label: '紧急联系人 电话',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
        maxlength: 20,
      },
      // 字段名
      fieldName: 'telephone',
      // 界面显示的label
      label: '电话',
      rules: 'required',
    },
    {
      colon: false,
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: JobOptions,
        placeholder: '请选择',
        showSearch: true,
      },
      // 占满2列空间 从第二列开始 相当于前面空了一列
      formItemClass: 'col-span-1 items-baseline',
      fieldName: 'job',
      label: '人员分类 : ',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
        maxlength: 3,
      },
      // 字段名
      fieldName: 'salary',
      // 占满2列空间 从第二列开始 相当于前面空了一列
      formItemClass: 'col-span-1 items-baseline',
      // 界面显示的label
      label: '费用报价',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        placeholder: '排名优先级(1~100)',
        maxlength: 3,
      },
      // 字段名
      fieldName: 'priorityRating',
      // 占满2列空间 从第二列开始 相当于前面空了一列
      formItemClass: 'col-span-1 items-baseline',
      // 界面显示的label
      label: '优先级',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        maxlength: '4',
        placeholder: '4字以内',
      },
      // 字段名
      fieldName: 'recommendWord1',
      // 界面显示的label
      label: '推荐词1',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        maxlength: '4',
        placeholder: '4字以内',
      },
      // 字段名
      fieldName: 'recommendWord2',
      // 界面显示的label
      label: '推荐词2',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        maxlength: '4',
        placeholder: '4字以内',
      },
      // 字段名
      fieldName: 'recommendWord3',
      // 界面显示的label
      label: '推荐词3',
    },
    {
      component: 'Upload',
      componentProps: {
        // 更多属性见：https://ant.design/components/upload-cn
        accept: '.png,.jpg,.jpeg',
        disabled: false,
        action: '/api/upload',
        name: 'file',
        onChange: handleUploadChange,
        maxCount: 1,
        multiple: false,
        showUploadList: true,
        // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
        listType: 'picture-card',
      },
      fieldName: 'avatar',
      label: '头像',
      renderComponentContent: () => {
        return {
          default: () => '+',
        };
      },
      rules: 'required',
    },
    {
      component: 'Upload',
      componentProps: {
        // 更多属性见：https://ant.design/components/upload-cn
        accept: '.png,.jpg,.jpeg',
        disabled: false,
        action: '/api/upload',
        name: 'file',
        onChange: handleUploadChange,
        maxCount: 1,
        multiple: false,
        showUploadList: true,
        // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
        listType: 'picture-card',
      },
      fieldName: 'idCardFront',
      label: '身份证正面',
      renderComponentContent: () => {
        return {
          default: () => '+',
        };
      },
      rules: 'required',
    },
    {
      component: 'Upload',
      componentProps: {
        // 更多属性见：https://ant.design/components/upload-cn
        accept: '.png,.jpg,.jpeg',
        action: '/api/upload',
        disabled: false,
        onChange: handleUploadChange,
        name: 'file',
        maxCount: 1,
        multiple: false,
        showUploadList: true,
        // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
        listType: 'picture-card',
      },
      fieldName: 'idCardReverse',
      label: '身份证反面',
      renderComponentContent: () => {
        return {
          default: () => '+',
        };
      },
      rules: 'required',
    },
  ],
  showDefaultActions: true,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-2',
});

// 监听搜索结果，更新表单
watch(searchResultPerson, (value) => {
  console.warn(`searchResultPerson变更:${value}`);
  if (value) {
    baseFormApi.setValues(value);
    baseFormApi.setFieldValue('avatar', {
      fileList: [
        {
          url: SERVER_DOMAIN + value.avatar,
        },
      ],
    });
    baseFormApi.setFieldValue('[idCardFront]', {
      fileList: [
        {
          url: SERVER_DOMAIN + value.identityCardFront,
        },
      ],
    });
    baseFormApi.setFieldValue('idCardReverse', {
      fileList: [
        {
          url: SERVER_DOMAIN + value.identityCardReverse,
        },
      ],
    });
  } else {
    baseFormApi.resetForm();
  }
});

// 添加主播声音表单
const [ZBVoiceForm, zbVoiceFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onDemoSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: zbVoiceFromSchemas,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-3',
});

// 有声CV男 声音表单
const [yscvManVoiceForm, yscvManVoiceFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onDemoSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: yscvManFromSchemas,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-3',
});

// 有声CV女 声音表单
const [yscvWomenVoiceForm, yscvWomanVoiceFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onDemoSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: yscvWomenFromSchemas,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-3',
});

// 短剧CV男 视频表单
const [djcvManVideoForm, djcvManVideoFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onDemoSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: djcvManFromSchemas,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-3',
});

// 短剧CV男 视频表单
const [djcvWomenVideoForm, djcvWomanVideoFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onDemoSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: djcvWomonFromSchemas,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-3',
});

// 处理文件上传结果
function handleUploadChange({ file, fileList }) {
  if (file.status === 'done') {
    message.success(`上传成功${file.response.data.url}`);
  } else if (file.status === 'error') {
    message.error('上传失败');
  }
}

// 添加艺人表单点击提交
async function onBaseSubmit(values: Record<string, any>) {
  const avatarUrl =
    values.avatar.fileList === undefined
      ? (toRaw(values.avatar) as UploadFile[])
          .filter((file) => file.status === 'done')
          .map((file) => file.response?.data?.url || file.url)[0]
      : values.avatar.fileList[0].url.replace(SERVER_DOMAIN, '');
  console.warn(`图片地址:${avatarUrl}`);

  const idCardFrontUrl =
    values.idCardFront.fileList === undefined
      ? (toRaw(values.idCardFront) as UploadFile[])
          .filter((file) => file.status === 'done')
          .map((file) => file.response?.data?.url || file.url)[0]
      : values.idCardFront.fileList[0].url.replace(SERVER_DOMAIN, '');

  console.warn(`图片地址:${idCardFrontUrl}`);

  const idCardReverseUrl =
    values.idCardReverse.fileList === undefined
      ? (toRaw(values.idCardReverse) as UploadFile[])
          .filter((file) => file.status === 'done')
          .map((file) => file.response?.data?.url || file.url)[0]
      : values.idCardReverse.fileList[0].url.replace(SERVER_DOMAIN, '');

  console.warn(`图片地址:${idCardReverseUrl}`);

  // const avatarFiles = (toRaw(values.avatar) as UploadFile[])
  //   .filter((file) => file.status === 'done')
  //   .map((file) => file.response?.data?.url || file.url);
  // const idCardFrontFile = (toRaw(values.idCardFront) as UploadFile[])
  //   .filter((file) => file.status === 'done')
  //   .map((file) => file.response?.data?.url || file.url);
  // const idCardReverseFile = (toRaw(values.idCardReverse) as UploadFile[])
  //   .filter((file) => file.status === 'done')
  //   .map((file) => file.response?.data?.url || file.url);
  const jobType = Number.parseInt(values.job);

  const newPerson: PersonInfo = {
    artistId: searchResultPerson.value?.artistId,
    nickName: values.nickName,
    name: values.name,
    avatar: avatarUrl,
    job: jobType,
    address: values.address,
    qq: values.qq,
    wechat: values.wechat,
    telephone: values.telephone,
    emergencyTelphone: values.emergencyTelphone,
    creditCardNum: values.creditCardNum,
    recommendWord1: values.recommendWord1,
    recommendWord2: values.recommendWord2,
    recommendWord3: values.recommendWord3,
    identityCardFront: idCardFrontUrl,
    identityCardReverse: idCardReverseUrl,
    salary: values.salary,
    priorityRating: values.priorityRating,
    createTime: undefined,
    gender: values.gender,
    ID: values.ID,
  };
  const result = await updatePerson(newPerson);
  if (result) {
    alert({
      content: `更新成功`,
      icon: 'success',
    }).then(() => {
      baseFormApi.resetForm();
      if (
        jobType === JobType.pszb ||
        jobType === JobType.zbpb ||
        jobType === JobType.yscv ||
        jobType === JobType.djcv
      ) {
        // 评书主播、主播旁白、有声CV、短剧CV要继续选择录音或视图上传
        console.warn(`特殊岗位${jobType}`);
        baseFormVisible.value = false;
        if (jobType === JobType.pszb || jobType === JobType.zbpb) {
          zbVoiceFormVisible.value = true;
        } else {
          if (jobType === JobType.yscv) {
            if (values.gender === Gender.Man) {
              yscvManFormVisible.value = true;
            } else {
              yscvWomenFormVisible.value = true;
            }
          } else {
            if (values.gender === Gender.Man) {
              djcvManFormVisible.value = true;
            } else {
              djcvWomenFormVisible.value = true;
            }
          }
        }
      } else {
        console.warn(`非特殊岗位${jobType}`);
      }
    });
  }
}

// 小样表单点击提交
async function onDemoSubmit(values: Record<string, any>) {
  if (Object.keys(values).length === 0) {
    // 还未上传
    return;
  }
  const persondId = searchResultPerson.value?.artistId;
  if (persondId === undefined) {
    alert({
      content: `艺人id不存在`,
      icon: 'error',
    });
    return;
  }

  await Promise.all(
    Object.entries(values).map(async ([key, value]) => {
      if (value === undefined) {
        return;
      }
      console.warn(key, value);
      const tagId = key;
      const url = (value as UploadFile[])
        .filter((file) => file.status === 'done')
        .map((file) => file.response?.data?.url || file.url)[0];
      console.warn(tagId, url);
      if (url === undefined) {
        return;
      }
      const mediaDemo: MediaDemo = {
        demoType: Number.parseInt(tagId),
        fileUrl: url,
        artistId: persondId,
        demoId: undefined,
      };

      const result = await addPersionMedia(mediaDemo);
      console.warn(result);
    }),
  );

  alert({
    content: `更新完成`,
    icon: 'success',
  }).then(() => {
    window.location.reload();
  });
}

/**
 * 艺人搜索
 */
async function searchPerson() {
  const searchContent = nickNameSearch.value;
  console.warn(`搜索艺人:${searchContent}`);
  if (searchContent === undefined || searchContent.length === 0) {
    message.warn('搜索内容不能为空');
    return;
  }
  const searchResult = await searchPersonByNickName(searchContent);
  console.warn(`搜索艺人结果:${searchResult}`);
  Object.entries(searchResult).forEach(([key, value]) => {
    console.warn(key, value);
  });
  baseFormVisible.value = true;
  zbVoiceFormVisible.value = false;
  yscvManFormVisible.value = false;
  yscvWomenFormVisible.value = false;
  djcvManFormVisible.value = false;
  djcvWomenFormVisible.value = false;

  searchResultPerson.value = searchResult;
}

// 删除艺人
async function handlePersonDelete() {}
</script>

<template>
  <Page>
    <Card>
      <div class="flex flex-col gap-4">
        <div class="flex gap-1">
          <span>艺名：</span>
          <Input
            v-model:value="nickNameSearch"
            type="text"
            style="width: 400px"
          />
          <Button type="primary" @click="searchPerson">搜索</Button>
        </div>
      </div>
    </Card>

    <Card v-if="baseFormVisible">
      <template #title>
        <div class="w-full text-center">修改信息</div>
      </template>
      <BaseForm v-model="searchResultPerson" />
    </Card>

    <Card v-if="zbVoiceFormVisible">
      <template #title>
        <div class="w-full text-center">修改信息</div>
      </template>
      <ZBVoiceForm />
    </Card>

    <Card v-if="yscvManFormVisible">
      <template #title>
        <div class="w-full text-center">修改信息</div>
      </template>
      <yscvManVoiceForm />
    </Card>

    <Card v-if="yscvWomenFormVisible">
      <template #title>
        <div class="w-full text-center">修改信息</div>
      </template>
      <yscvWomenVoiceForm />
    </Card>

    <Card v-if="djcvManFormVisible">
      <template #title>
        <div class="w-full text-center">修改信息</div>
      </template>
      <djcvManVideoForm />
    </Card>

    <Card v-if="djcvWomenFormVisible">
      <template #title>
        <div class="w-full text-center">修改信息</div>
      </template>
      <djcvWomenVideoForm />
    </Card>
  </Page>
</template>
