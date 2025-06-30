"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJestConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const ts_morph_1 = require("ts-morph");
const add_reporters_1 = require("./add-reporters");
const jest_config_1 = require("./jest-config");
const updateJestConfig = (tree, projectConfig) => {
    const project = new ts_morph_1.Project();
    const filePath = path_1.default.join(projectConfig.root, 'jest.config.ts');
    // console.log(
    //   'Looking for jest.config.ts in',
    //   projectConfig,
    //   filePath,
    //   tree.exists(filePath),
    // )
    if (!tree.exists(filePath)) {
        return;
    }
    // Ignore root project has no config
    if (projectConfig.name === 'codelab') {
        return;
    }
    const sourceFile = project.addSourceFileAtPath(filePath);
    const defaultExportAssignment = sourceFile.getExportAssignment((exp) => !exp.isExportEquals());
    if (!defaultExportAssignment) {
        throw new Error('Could not find default export in jest.config.ts');
    }
    const configObject = defaultExportAssignment.getExpression();
    if (!ts_morph_1.Node.isObjectLiteralExpression(configObject)) {
        throw new Error('Default export is not an object literal');
    }
    (0, add_reporters_1.addReportersToJestConfig)(configObject, projectConfig);
    (0, jest_config_1.jestConfig)(configObject, projectConfig);
    tree.write(filePath, sourceFile.getFullText());
};
exports.updateJestConfig = updateJestConfig;
//# sourceMappingURL=update-jest-config.js.map