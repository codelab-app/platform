import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { ServerFetchPluginRawConfig } from './index';
export interface ServerFetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare class ServerFetchVisitor extends BaseVisitor<ServerFetchPluginRawConfig, ServerFetchVisitorConfig> {
    private _operations;
    constructor(schema: GraphQLSchema, rawConfig: ServerFetchPluginRawConfig);
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
