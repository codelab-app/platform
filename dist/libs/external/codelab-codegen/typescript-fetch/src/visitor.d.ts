import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common';
import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { FetchPluginRawConfig } from './index';
import { Types } from '@graphql-codegen/plugin-helpers';
export interface FetchVisitorConfig extends ParsedConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare class FetchVisitor extends BaseVisitor<FetchPluginRawConfig, FetchVisitorConfig> {
    private _operations;
    constructor(documents: Types.DocumentFile[], rawConfig: FetchPluginRawConfig);
    getImports(): string[];
    get content(): string;
}
