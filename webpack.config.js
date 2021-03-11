const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
require('source-map-support').install();

const rootDir = path.join(__dirname, './');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'none',
  externals: [nodeExternals()],
  plugins: [],
  optimization: {
    nodeEnv: false,
  },
  resolve: {
    modules: ['apps', 'libs', 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      "@codelab/backend": path.resolve(__dirname, 'libs/backend/src/'),
      "@codelab/antd": path.resolve(__dirname, "libs/alpha/ui/antd/src/types"),
      "@codelab/generated": path.resolve(__dirname, "libs/generated/src/index"),
      "@codelab/tools-eslint-config-codelab": path.resolve(__dirname, 
        "libs/tools/eslint-config-codelab/src/index.ts"
      ),
      "@codelab/schematics": path.resolve(__dirname, "libs/tools/plugins/codelab/src/index.ts"),
      "@codelab/api/prisma": path.resolve(__dirname, "libs/api/prisma/src/index.ts"),
      "@codelab/alpha/core/graph": path.resolve(__dirname, "libs/alpha/core/graph/src/index.ts"),
      "@codelab/alpha/core/node": path.resolve(__dirname, "libs/alpha/core/node/src/index.ts"),
      "@codelab/alpha/core/props": path.resolve(__dirname, "libs/alpha/core/props/src/index.ts"),
      "@codelab/alpha/core/renderer": path.resolve(__dirname, "libs/alpha/core/renderer/src/index.ts"),
      "@codelab/alpha/core/traversal": path.resolve(__dirname, 
        "libs/alpha/core/traversal/src/index.ts"
      ),
      "@codelab/alpha/core/tree": path.resolve(__dirname, "libs/alpha/core/tree/src/index.ts"),
      "@codelab/alpha/shared/common": path.resolve(__dirname, "libs/alpha/shared/common/src/index.ts"),
      "@codelab/alpha/shared/event": path.resolve(__dirname, "libs/alpha/shared/event/src/index.ts"),
      "@codelab/alpha/shared/factory": path.resolve(__dirname, 
        "libs/alpha/shared/factory/src/index.ts"
      ),
      "@codelab/alpha/shared/utils": path.resolve(__dirname, "libs/alpha/shared/utils/src/index.ts"),
      "@codelab/alpha/shared/interface/collections": path.resolve(__dirname, 
        "libs/alpha/shared/interface/collections/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/entity": path.resolve(__dirname, 
        "libs/alpha/shared/interface/entity/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/form": path.resolve(__dirname, 
        "libs/alpha/shared/interface/form/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/graph": path.resolve(__dirname, 
        "libs/alpha/shared/interface/graph/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/graph-v2": path.resolve(__dirname, 
        "libs/alpha/shared/interface/graph-v2/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/mapper": path.resolve(__dirname, 
        "libs/alpha/shared/interface/mapper/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/node": path.resolve(__dirname, 
        "libs/alpha/shared/interface/node/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/props": path.resolve(__dirname, 
        "libs/alpha/shared/interface/props/src/index.ts"
      ),
      "@codelab/alpha/shared/interface/tree": path.resolve(__dirname, 
        "libs/alpha/shared/interface/tree/src/index.ts"
      ),
      "@codelab/alpha/ui/antd": path.resolve(__dirname, "libs/alpha/ui/antd/src/index.ts"),
      "@codelab/alpha/ui/component": path.resolve(__dirname, "libs/alpha/ui/component/src/index.ts"),
      "@codelab/alpha/ui/d3": path.resolve(__dirname, "libs/alpha/ui/d3/src/index.ts"),
      "@codelab/alpha/ui/hoc": path.resolve(__dirname, "libs/alpha/ui/hoc/src/index.ts"),
      "@codelab/backend": path.resolve(__dirname, "libs/backend/src/index"),
      "@codelab/frontend": path.resolve(__dirname, "libs/frontend/src/index.ts"),
      "@codelab/modules/page": path.resolve(__dirname, "libs/modules/page/src/index.ts"),
      "@codelab/modules/graph": path.resolve(__dirname, "libs/modules/graph/src/index.ts"),
      "@codelab/modules/app": path.resolve(__dirname, "libs/modules/app/src/index.ts"),
      "@codelab/modules/user": path.resolve(__dirname, "libs/modules/user/src/index.ts"),
      "@codelab/tools/generators/json-schema": path.resolve(__dirname, 
        "libs/tools/generators/json-schema/src/index.ts"
      ),
      "@codelab/tools/generators/graphql": path.resolve(__dirname, 
        "libs/tools/generators/graphql/src/index.ts"
      ),
      "@codelab/modules/notification-stories": path.resolve(__dirname, 
        "libs/modules/notification-stories/src/index.ts"
      ),
      "@codelab/modules/style": path.resolve(__dirname, "libs/modules/style/src/index.ts"),
      "@codelab/modules/lambda": path.resolve(__dirname, "libs/modules/lambda/src/index.ts"),
      "@codelab/tools/generators/form-decorator": path.resolve(__dirname, 
        "libs/tools/generators/form-decorator/src/index.ts"
      ),
      "@codelab/tools/generators/form-templates": path.resolve(__dirname, 
        "libs/tools/generators/form-templates/src/index.ts"
      ),
      "@codelab/tools/generators/crawler": path.resolve(__dirname, 
        "libs/tools/generators/crawler/src/index.ts"
      ),
      "tools-plugins-test": path.resolve(__dirname, "libs/tools/plugins/test/src/index.ts"),
      "libs": path.resolve(__dirname, "libs/")
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(rootDir, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
      },
    ],
  },
};
