"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPresetVisitor = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));
const change_case_all_1 = require("change-case-all");
class ClientPresetVisitor extends visitor_plugin_common_1.BaseVisitor {
    constructor(schema, rawConfig, documents, info) {
        super(rawConfig, {});
        Object.defineProperty(this, "_operations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this._operations = [];
        (0, auto_bind_1.default)(this);
    }
    getImports() {
        return [`import { graphql } from '@codelab/shared/infra/gqlgen'`];
    }
    OperationDefinition(node) {
        const name = this.convertName(node, {
            suffix: 'Document',
        });
        const type = (0, change_case_all_1.pascalCase)(node.operation);
        const typeSuffix = this.getOperationSuffix(node, type);
        const resultType = this.convertName(node);
        const variablesTypes = this.convertName(node, {
            suffix: `${typeSuffix} Variables`,
        });
        this._operations.push({
            name,
            node,
            resultType,
            type,
            variablesTypes,
        });
        return this._operations.map((o) => o.name).join('\n');
    }
    get content() {
        const graphqlOperations = this._operations.map((o) => {
            return `export const ${o.name} = graphql(\`${(0, graphql_1.print)(o.node)}\`)`;
        });
        return `\n${graphqlOperations.join('\n')}\n`;
    }
}
exports.ClientPresetVisitor = ClientPresetVisitor;
//# sourceMappingURL=visitor.js.map