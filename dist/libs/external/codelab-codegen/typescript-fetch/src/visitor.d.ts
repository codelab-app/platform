import type { Types } from '@graphql-codegen/plugin-helpers';
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { FetchPluginRawConfig } from './index';
export interface FetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
}
export declare class FetchVisitor extends BaseVisitor<FetchPluginRawConfig, FetchVisitorConfig> {
    private _operations;
    private _outputFile?;
    constructor(schema: GraphQLSchema, rawConfig: FetchPluginRawConfig, _: Array<Types.DocumentFile>, info?: {
        outputFile?: string;
    });
    getImports(): string[];
    OperationDefinition(node: OperationDefinitionNode): string;
    get content(): string;
}
