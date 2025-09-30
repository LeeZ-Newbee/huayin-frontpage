import { createJiti } from "../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "/Users/zhichao.zhang/huayin-person-manager/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/Users/zhichao.zhang/huayin-person-manager/internal/tailwind-config/src/postcss.config.js")} */
const _module = await jiti.import("/Users/zhichao.zhang/huayin-person-manager/internal/tailwind-config/src/postcss.config.ts");

export default _module?.default ?? _module;