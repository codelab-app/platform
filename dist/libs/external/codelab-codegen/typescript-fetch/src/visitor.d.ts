import type { Types } from '@graphql-codegen/plugin-helpers';
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { FetchPluginRawConfig } from './index';
export interface FetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare class FetchVisitor extends BaseVisitor<FetchPluginRawConfig, FetchVisitorConfig> {
    constructor(documents: Array<Types.DocumentFile>, rawConfig: FetchPluginRawConfig);
    get content(): string;
    getImports(): string[];
    private _operations;
}
