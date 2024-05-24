"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ant_design_icon_import_1 = require("./rules/ant-design-icon-import");
const barrel_files_1 = tslib_1.__importDefault(require("./rules/barrel-import/barrel-files"));
const domain_layer_constraint_1 = require("./rules/domain-layer-constraint");
/**
 * https://medium.com/appfire/writing-custom-typescript-eslint-rules-with-unit-tests-for-angular-project-f004482551db
 */
module.exports = {
    configs: {
        recommended: barrel_files_1.default,
    },
    rules: {
        'ant-design-icon-import': ant_design_icon_import_1.antDesignIconImport,
        'domain-layer-constraint': domain_layer_constraint_1.domainLayerConstraint,
    },
};
//# sourceMappingURL=index.js.map