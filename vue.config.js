const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // Enables Options API
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Fix hydration warning
      })
    );
  },
});
