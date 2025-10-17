import { createJiti } from "../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "E:/GitHub/huayin-person-manager/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("E:/GitHub/huayin-person-manager/internal/tailwind-config/src/index.js")} */
const _module = await jiti.import("E:/GitHub/huayin-person-manager/internal/tailwind-config/src/index.ts");

export default _module?.default ?? _module;