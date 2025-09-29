import { createJiti } from "../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "/Users/zhichao.zhang/vue-vben-admin/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/Users/zhichao.zhang/vue-vben-admin/internal/tailwind-config/src/index.js")} */
const _module = await jiti.import("/Users/zhichao.zhang/vue-vben-admin/internal/tailwind-config/src/index.ts");

export default _module?.default ?? _module;