import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { FetchPluginRawConfig } from './index';
export interface FetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare class FetchVisitor extends BaseVisitor<FetchPluginRawConfig, FetchVisitorConfig> {
    private _operations;
    constructor(schema: GraphQLSchema, rawConfig: FetchPluginRawConfig);
    getImports(): string[];
    /**
     * The entry point for the visitor
     * this will be called for each operation
     * @param node
     * @returns
     */
    OperationDefinition(node: OperationDefinitionNode): string;
    get content(): string;
}
