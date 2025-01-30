import type { Types } from '@graphql-codegen/plugin-helpers';
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { ClientPresetPluginRawConfig } from './index';
export interface ClientPresetVisitorConfig extends ParsedConfig {
}
export declare class ClientPresetVisitor extends BaseVisitor<ClientPresetPluginRawConfig, ClientPresetVisitorConfig> {
    private _operations;
    constructor(schema: GraphQLSchema, rawConfig: ClientPresetPluginRawConfig, documents: Array<Types.DocumentFile>, info?: {
        outputFile?: string;
    });
    getImports(): string[];
    OperationDefinition(node: OperationDefinitionNode): string;
    get content(): string;
}
