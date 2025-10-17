import { createJiti } from "../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/turbo-run": "E:/GitHub/huayin-person-manager/scripts/turbo-run"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("E:/GitHub/huayin-person-manager/scripts/turbo-run/src/index.js")} */
const _module = await jiti.import("E:/GitHub/huayin-person-manager/scripts/turbo-run/src/index.ts");

export default _module?.default ?? _module;