const { createJiti } = require("../../../node_modules/.pnpm/jiti@2.5.1/node_modules/jiti/lib/jiti.cjs")

const jiti = createJiti(__filename, {
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
module.exports = jiti("/Users/zhichao.zhang/vue-vben-admin/internal/tailwind-config/src/index.ts")