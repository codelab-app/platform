import type { Types } from '@graphql-codegen/plugin-helpers';
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { ServerFetchPluginRawConfig } from './index';
export interface ServerFetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
}
export declare class ServerFetchVisitor extends BaseVisitor<ServerFetchPluginRawConfig, ServerFetchVisitorConfig> {
    private _operations;
    private _outputFile?;
    constructor(schema: GraphQLSchema, rawConfig: ServerFetchPluginRawConfig, _: Array<Types.DocumentFile>, info?: {
        outputFile?: string;
    });
    getImports(): string[];
    OperationDefinition(node: OperationDefinitionNode): string;
    get content(): string;
}
