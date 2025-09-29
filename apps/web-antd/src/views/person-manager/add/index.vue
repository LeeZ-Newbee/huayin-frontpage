<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';

import type { FormSchema } from '../../../../../../packages/@core/ui-kit/form-ui/src/types';

import type { MediaDemo } from '#/api';
import type { PersonInfo } from '#/api/type/person';

import { ref, toRaw } from 'vue';

import { alert, Page } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addPersionMedia, addPerson } from '#/api';
import { Gender, GenderOptions } from '#/api/type/gender';
import { JobOptions, JobType } from '#/api/type/job';
import { filterMedaiTagOptions } from '#/api/type/mediatag';

// 基础创建表单是否可见
const baseFormVisible = ref<boolean>(true);

// 主播表单是否可见
const zbVoiceFormVisible = ref<boolean>(false);

const yscvManFormVisible = ref<boolean>(false);

const yscvWomenFormVisible = ref<boolean>(false);

const djcvManFormVisible = ref<boolean>(false);

const djcvWomenFormVisible = ref<boolean>(false);

// 刚添加的人员id
const addPersonId = ref<number>();

// 刚添加的人员性别
const addPersonGender = ref<number>();

// 刚添加的人员岗位
const addPersonJobType = ref<number>();

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
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'nickname',
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
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'banknum',
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
      fieldName: 'creditcard',
      // 界面显示的label
      label: '身份证号',
      rules: 'required',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
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
      },
      // 字段名
      fieldName: 'emerge_phone',
      // 界面显示的label
      label: '紧急联系人 电话',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'phone',
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
      },
      // 字段名
      fieldName: 'price',
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
      },
      // 字段名
      fieldName: 'priority',
      // 占满2列空间 从第二列开始 相当于前面空了一列
      formItemClass: 'col-span-1 items-baseline',
      // 界面显示的label
      label: '优先级',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'recommend1',
      // 界面显示的label
      label: '推荐词1(4字以内)',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'recommend2',
      // 界面显示的label
      label: '推荐词2',
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入',
      },
      // 字段名
      fieldName: 'recommend3',
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
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-2',
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
const [djcvWomanVideoForm, djcvWomanVideoFormApi] = useVbenForm({
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
  const avatarFiles = (toRaw(values.avatar) as UploadFile[])
    .filter((file) => file.status === 'done')
    .map((file) => file.response?.data?.url || file.url);
  const idCardFrontFile = (toRaw(values.idCardFront) as UploadFile[])
    .filter((file) => file.status === 'done')
    .map((file) => file.response?.data?.url || file.url);
  const idCardReverseFile = (toRaw(values.idCardReverse) as UploadFile[])
    .filter((file) => file.status === 'done')
    .map((file) => file.response?.data?.url || file.url);
  const jobType = Number.parseInt(values.job);
  addPersonJobType.value = jobType;
  addPersonGender.value = Number.parseInt(values.gender);
  const newPerson: PersonInfo = {
    artistId: undefined,
    nickName: values.nickname,
    name: values.name,
    avatar: avatarFiles[0],
    job: jobType,
    address: values.address,
    qq: values.qq,
    wechat: values.wechat,
    telephone: values.phone,
    emergencyTelphone: values.emerge_phone,
    creditCardNum: values.banknum,
    recommendWord1: values.recommend1,
    recommendWord2: values.recommend2,
    recommendWord3: values.recommend3,
    identityCardFront: idCardFrontFile[0],
    identityCardReverse: idCardReverseFile[0],
    salary: values.price,
    priorityRating: values.priority,
    createTime: undefined,
    gender: values.gender,
    ID: values.creditcard,
  };
  const result = await addPerson(newPerson);
  if (result.artistId) {
    addPersonId.value = result.artistId;
    alert({
      content: `添加成功(${addPersonId.value})`,
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
  const persondId = addPersonId.value;
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
    content: `添加完成`,
    icon: 'success',
  }).then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <Page>
    <Card v-if="baseFormVisible">
      <template #title>
        <div class="w-full text-center">人员档案录入</div>
      </template>
      <BaseForm />
    </Card>

    <Card v-if="zbVoiceFormVisible">
      <template #title>
        <div class="w-full text-center">试音录入</div>
      </template>
      <ZBVoiceForm />
    </Card>

    <Card v-if="yscvManFormVisible">
      <template #title>
        <div class="w-full text-center">试音录入</div>
      </template>
      <yscvManVoiceForm />
    </Card>

    <Card v-if="yscvWomenFormVisible">
      <template #title>
        <div class="w-full text-center">试音录入</div>
      </template>
      <yscvWomenVoiceForm />
    </Card>

    <Card v-if="djcvManFormVisible">
      <template #title>
        <div class="w-full text-center">试音录入</div>
      </template>
      <djcvManVideoForm />
    </Card>

    <Card v-if="djcvWomenFormVisible">
      <template #title>
        <div class="w-full text-center">试音录入</div>
      </template>
      <djcvWomanVideoForm />
    </Card>
  </Page>
</template>
