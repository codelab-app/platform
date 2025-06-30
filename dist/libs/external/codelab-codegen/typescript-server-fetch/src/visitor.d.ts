import type { Types } from '@graphql-codegen/plugin-helpers';
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { ServerFetchPluginRawConfig } from './index';
export interface ServerFetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare class ServerFetchVisitor extends BaseVisitor<ServerFetchPluginRawConfig, ServerFetchVisitorConfig> {
    private _operations;
    constructor(documents: Array<Types.DocumentFile>, rawConfig: ServerFetchPluginRawConfig);
    getImports(): string[];
    get content(): string;
}
