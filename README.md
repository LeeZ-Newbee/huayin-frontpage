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
