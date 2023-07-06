"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToSwc = void 0;
const tslib_1 = require("tslib");
const ts_morph_1 = tslib_1.__importDefault(require("ts-morph"));
const migrateToSwc = (configObject, projectConfig) => {
    const transformProperty = configObject.getProperty('transform');
    const newInitializer = `
  {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true, decorators: true },
          transform: {
            decoratorMetadata: true,
            react: { runtime: 'automatic' }
          },
        },
      },
    ],
  }
  `;
    if (!transformProperty) {
        // add the reporters property if it doesn't exist
        configObject.addPropertyAssignment({
            initializer: newInitializer,
            name: 'transform',
        });
    }
    else if (ts_morph_1.default.Node.isPropertyAssignment(transformProperty)) {
        // if the reporters property exists and is a PropertyAssignment, update it
        transformProperty.setInitializer(newInitializer);
    }
};
exports.migrateToSwc = migrateToSwc;
//# sourceMappingURL=migrate-to-swc.js.map