"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ant_design_icon_import_1 = require("./rules/ant-design-icon-import");
const domain_layer_constraint_1 = require("./rules/domain-layer-constraint");
const recommended_1 = require("./rules/plugins/recommended");
const typebox_schema_naming_1 = require("./rules/typebox-schema-naming");
/**
 * https://medium.com/appfire/writing-custom-typescript-eslint-rules-with-unit-tests-for-angular-project-f004482551db
 */
module.exports = {
    configs: {
        recommended: recommended_1.recommendedConfig,
    },
    rules: {
        'ant-design-icon-import': ant_design_icon_import_1.antDesignIconImport,
        'domain-layer-constraint': domain_layer_constraint_1.domainLayerConstraint,
        'typebox-schema-naming': typebox_schema_naming_1.typeboxSchemaNaming,
    },
};
//# sourceMappingURL=index.js.map