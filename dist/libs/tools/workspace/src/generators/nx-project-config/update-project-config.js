"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectConfig = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const has_1 = tslib_1.__importDefault(require("lodash/has"));
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const omit_1 = tslib_1.__importDefault(require("lodash/omit"));
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const path_1 = tslib_1.__importDefault(require("path"));
const ts_morph_1 = tslib_1.__importStar(require("ts-morph"));
/**
 * Each project needs to output reporters to individual file, and we can't do that as CLI argument, so needs to be done at project level.
 *
 * We loop through each project and add the configurations there at a per-library basis.
 */
const updateProjectConfig = (tree, projectName) => {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    console.log(`Checking for ${projectConfig.name}...`);
    addCiLintConfig(tree, projectConfig);
    addCiTestConfig(tree, projectConfig);
    (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
};
exports.updateProjectConfig = updateProjectConfig;
/**
 * Output ESLint reporter to tmp library
 */
const addCiLintConfig = (tree, projectConfig) => {
    (0, merge_1.default)(projectConfig, {
        targets: {
            lint: {
                configurations: {
                    ci: {
                        format: 'junit',
                        outputFile: `tmp/reports/lint/${projectConfig.name}.xml`,
                        quiet: true,
                    },
                },
            },
        },
    });
};
const addCiTestConfig = (tree, projectConfig) => {
    /**
     * Only add if library is already using jest
     */
    var _a;
    if ((0, has_1.default)(projectConfig, 'targets.test')) {
        console.log(`Updating ${projectConfig.name}...`);
        /**
         * First need to add default reporters to developmentto override our jest config for reporters (since those config don't work in CLI, we had to add them to config file)
         */
        (0, merge_1.default)(projectConfig, {
            targets: {
                test: {
                    options: {
                        reporters: ['default'],
                    },
                },
            },
        });
        /**
         * But we need to filter out reporters config, since we will use the jest config
         */
        const testOptions = (0, omit_1.default)((_a = projectConfig.targets) === null || _a === void 0 ? void 0 : _a.test, 'options.reporters');
        /**
         * Use set because we want to remove old keys
         */
        (0, set_1.default)(projectConfig, 'targets.test:integration', (0, merge_1.default)({
            options: {
                memoryLimit: 8192,
                color: true,
                testPathPattern: ['[i].spec.ts'],
            },
            configurations: {
                ci: {
                    // outputFile: `tmp/reports/test-integration/${projectConfig.name}.xml`,
                    // reporters: ['default', 'jest-junit'],
                    parallel: 3,
                },
            },
        }, 
        /**
         * First merge with the default test config, this way if migration update test, we can copy it over
         *
         */
        testOptions));
        console.log((0, merge_1.default)({
            options: {
                memoryLimit: 8192,
                parallel: 3,
                color: true,
                testPathPattern: ['[^i].spec.ts'],
            },
            configurations: {
                ci: {
                /**
                 * Reporter options are not available via CLI
                 *
                 * https://stackoverflow.com/questions/59372493/override-jest-junit-default-output-location
                 */
                // outputFile: `${projectConfig.name}.xml`,
                // reporters: ['default', 'jest-junit'],
                },
            },
        }, testOptions));
        (0, set_1.default)(projectConfig, 'targets.test:unit', (0, merge_1.default)({
            options: {
                memoryLimit: 8192,
                parallel: 3,
                color: true,
                testPathPattern: ['[^i].spec.ts'],
            },
            configurations: {
                ci: {
                /**
                 * Reporter options are not available via CLI
                 *
                 * https://stackoverflow.com/questions/59372493/override-jest-junit-default-output-location
                 */
                // outputFile: `${projectConfig.name}.xml`,
                // reporters: ['default', 'jest-junit'],
                },
            },
        }, testOptions));
        /**
         * jest reporters options don't work with CLI, so we need to add to jest config
         */
        addReportersToJestConfig(tree, projectConfig);
    }
};
const addReportersToJestConfig = (tree, projectConfig) => {
    const project = new ts_morph_1.Project();
    const filePath = path_1.default.join(projectConfig.root, 'jest.config.ts');
    console.log(filePath);
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
        outputName: '${projectConfig.name}.xml'
      }
    ]
  ]`;
    if (!reportersProperty) {
        // add the reporters property if it doesn't exist
        configObject.addPropertyAssignment({
            name: 'reporters',
            initializer: newInitializer,
        });
    }
    else if (ts_morph_1.default.Node.isPropertyAssignment(reportersProperty)) {
        // if the reporters property exists and is a PropertyAssignment, update it
        reportersProperty.setInitializer(newInitializer);
    }
    tree.write(filePath, sourceFile.getFullText());
};
//# sourceMappingURL=update-project-config.js.map