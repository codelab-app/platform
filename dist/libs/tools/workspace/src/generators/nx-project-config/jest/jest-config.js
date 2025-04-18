"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jestConfig = void 0;
const ts_morph_1 = require("ts-morph");
const stage3DecoratorConfig = `
  {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
            decoratorsBeforeExport: true
          },
          transform: {
            decoratorMetadata: true,
            decoratorVersion: "2022-03",
            react: { runtime: 'automatic' },
          },
        },
      },
    ],
  }
  `;
const legacyDecoratorConfig = `
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
/**
 * For node side we keep the old decorator
 */
const jestConfig = (configObject, projectConfig) => {
    const transformProperty = configObject.getProperty('transform');
    /**
     * Default to new decorator config, except for backend
     */
    // const initializer = projectConfig.sourceRoot?.startsWith('libs/backend')
    //   ? legacyDecoratorConfig
    //   : legacyDecoratorConfig
    const initializer = legacyDecoratorConfig;
    if (!transformProperty) {
        // add the reporters property if it doesn't exist
        configObject.addPropertyAssignment({
            initializer,
            name: 'transform',
        });
    }
    else if (ts_morph_1.Node.isPropertyAssignment(transformProperty)) {
        // if the reporters property exists and is a PropertyAssignment, update it
        transformProperty.setInitializer(initializer);
    }
};
exports.jestConfig = jestConfig;
//# sourceMappingURL=jest-config.js.map