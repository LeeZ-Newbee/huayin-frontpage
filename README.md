# 华音人员管理系统

华音人员管理系统是一个基于Vue 3 + TypeScript + Ant Design Vue的现代化人员管理平台，主要用于管理音频制作相关的人员信息、作品展示和选角功能。

## 项目特色

- 🎯 **智能选角系统** - 支持音频试听、评分和推荐功能
- 👥 **人员档案管理** - 完整的人员信息管理，包括基本信息、作品展示等
- 🎵 **多媒体支持** - 支持音频、视频文件上传和播放
- 📊 **数据分析** - 提供新人榜、合作默契榜等数据分析功能
- 🔄 **工作流管理** - 支持不同岗位类型的特殊工作流程

## 岗位类型

系统支持以下岗位类型：

- **评书主播** - 需要上传音频demo
- **主播旁白** - 需要上传音频demo  
- **有声CV** - 需要上传音频demo
- **短剧CV** - 需要上传视频demo
- **有声后期** - 音频后期制作
- **短剧后期** - 视频后期制作
- **话本** - 剧本创作
- **对轨** - 音频对轨
- **审听** - 内容审核

## 安装使用

1. 获取项目代码

```bash
git clone https://github.com/*.git
```

2. 安装依赖

```bash
cd *
npm i -g corepack
pnpm install
```

3. 运行

```bash
pnpm run dev
```

4. 打包

```bash
pnpm build
```

5. 部署

```bash
页面存放目录：/var/www/vue-project/huayin/dist/
scp -r ../dist.zip  root@82.156.25.199:/var/www/vue-project/huayin/dist/
unzip dist.zip
重启NGINX nginx -s reload
```
