import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { ServerFetchPluginRawConfig } from './index';
import { Types } from '@graphql-codegen/plugin-helpers';
export interface ServerFetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare class ServerFetchVisitor extends BaseVisitor<ServerFetchPluginRawConfig, ServerFetchVisitorConfig> {
    private _operations;
    constructor(documents: Types.DocumentFile[], rawConfig: ServerFetchPluginRawConfig);
    getImports(): string[];
    get content(): string;
}
