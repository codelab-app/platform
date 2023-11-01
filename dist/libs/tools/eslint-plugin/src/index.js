"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_layer_constraint_1 = require("./rules/domain-layer-constraint");
/**
 * https://medium.com/appfire/writing-custom-typescript-eslint-rules-with-unit-tests-for-angular-project-f004482551db
 */
module.exports = {
    rules: {
        'domain-layer-constraint': domain_layer_constraint_1.domainLayerConstraint,
    },
};
//# sourceMappingURL=index.js.map