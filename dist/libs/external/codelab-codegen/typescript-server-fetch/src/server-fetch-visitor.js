"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerFetchVisitor = void 0;
const tslib_1 = require("tslib");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));
const path_1 = tslib_1.__importDefault(require("path"));
const change_case_all_1 = require("change-case-all");
class ServerFetchVisitor extends visitor_plugin_common_1.BaseVisitor {
    constructor(schema, rawConfig, _, info) {
        super(rawConfig, {
            scalars: (0, visitor_plugin_common_1.buildScalarsFromConfig)(schema, rawConfig),
            gqlFn: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.gqlFn, ''),
            gqlFnPath: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.gqlFnPath, ''),
        });
        Object.defineProperty(this, "_operations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_outputFile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._operations = [];
        this._outputFile = path_1.default.basename(info?.outputFile || '');
        (0, auto_bind_1.default)(this);
    }
    getImports() {
        const documentImports = this._operations
            .map((operation) => operation.name)
            .join(', ');
        return [
            `import { ${this.config.gqlFn} } from '${this.config.gqlFnPath}'`,
            `import { ${documentImports} } from './${this._outputFile?.replace('.web.gen.ts', '.docs.gen')}'`,
            `\n`
        ];
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
            const operationName = o.node.name?.value;
            if (!operationName) {
                throw new Error('Missing operation name');
            }
            const pascalCaseName = operationName.charAt(0).toUpperCase() + operationName.slice(1);
            const exportedOperationName = `export const ${pascalCaseName}`;
            const operationBody = `${this.config.gqlFn}(${o.name}.toString(), variables, next)`;
            const operationArgs = [
                `variables: Types.${o.variablesTypes}`,
                `next?: NextFetchRequestConfig & { revalidateTag?: string }`,
            ].join(' ,');
            // server actions must be exported individually
            return `${exportedOperationName} = (${operationArgs}) => ${operationBody}`;
        });
        return graphqlOperations.join('\n');
    }
}
exports.ServerFetchVisitor = ServerFetchVisitor;
//# sourceMappingURL=server-fetch-visitor.js.map