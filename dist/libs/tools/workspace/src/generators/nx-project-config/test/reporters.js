"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReportersToJestConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const ts_morph_1 = tslib_1.__importStar(require("ts-morph"));
const addReportersToJestConfig = (tree, projectConfig) => {
    const project = new ts_morph_1.Project();
    const filePath = path_1.default.join(projectConfig.root, 'jest.config.ts');
    const sourceFile = project.addSourceFileAtPath(filePath);
    const defaultExportAssignment = sourceFile.getExportAssignment((exp) => !exp.isExportEquals());
    if (!defaultExportAssignment) {
        throw new Error('Could not find default export in jest.config.ts');
    }
    const configObject = defaultExportAssignment.getExpression();
    if (!ts_morph_1.default.Node.isObjectLiteralExpression(configObject)) {
        throw new Error('Default export is not an object literal');
    }
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
    tree.write(filePath, sourceFile.getFullText());
};
exports.addReportersToJestConfig = addReportersToJestConfig;
//# sourceMappingURL=reporters.js.map