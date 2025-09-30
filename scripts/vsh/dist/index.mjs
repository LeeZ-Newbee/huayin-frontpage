import { createJiti } from "../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/vsh": "/Users/zhichao.zhang/huayin-person-manager/scripts/vsh"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/Users/zhichao.zhang/huayin-person-manager/scripts/vsh/src/index.js")} */
const _module = await jiti.import("/Users/zhichao.zhang/huayin-person-manager/scripts/vsh/src/index.ts");

export default _module?.default ?? _module;