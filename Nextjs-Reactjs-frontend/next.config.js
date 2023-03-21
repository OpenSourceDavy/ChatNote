/** @type {import('next').NextConfig} */
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  reactStrictMode: false,
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              global_defs: {
                "typeof window": "object",
              },
            },
            ecma: 5,
            module: false,
            keep_classnames: false,
            keep_fnames: false,
            ie8: false,
            nameCache: null,
            safari10: false,
            toplevel: false,
            warnings: false,
          },
        }),
      ];
    }

    return config;
  },
};

