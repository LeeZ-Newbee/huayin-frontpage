const { createJiti } = require("../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.cjs")

const jiti = createJiti(__filename, {
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
module.exports = jiti("E:/GitHub/huayin-person-manager/internal/tailwind-config/src/index.ts")