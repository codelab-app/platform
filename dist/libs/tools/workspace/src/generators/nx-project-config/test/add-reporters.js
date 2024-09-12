"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReportersToJestConfig = void 0;
const ts_morph_1 = require("ts-morph");
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
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}'
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
    else if (ts_morph_1.Node.isPropertyAssignment(reportersProperty)) {
        // if the reporters property exists and is a PropertyAssignment, update it
        reportersProperty.setInitializer(newInitializer);
    }
};
exports.addReportersToJestConfig = addReportersToJestConfig;
//# sourceMappingURL=add-reporters.js.map