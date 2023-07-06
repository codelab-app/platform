"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReportersToJestConfig = void 0;
const tslib_1 = require("tslib");
const ts_morph_1 = tslib_1.__importDefault(require("ts-morph"));
const addReportersToJestConfig = (configObject, projectConfig) => {
    const reportersProperty = configObject.getProperty('reporters');
    const newInitializer = `
  [
    'default',
    [
      'jest-junit',
      {
        outputName: '${projectConfig.name}.xml',
        reportTestSuiteErrors: true,
      }
    ]
  ]`;
    if (!reportersProperty) {
        // add the reporters property if it doesn't exist
        configObject.addPropertyAssignment({
            initializer: newInitializer,
            name: 'reporters',
        });
    }
    else if (ts_morph_1.default.Node.isPropertyAssignment(reportersProperty)) {
        // if the reporters property exists and is a PropertyAssignment, update it
        reportersProperty.setInitializer(newInitializer);
    }
};
exports.addReportersToJestConfig = addReportersToJestConfig;
//# sourceMappingURL=add-reporters.js.map