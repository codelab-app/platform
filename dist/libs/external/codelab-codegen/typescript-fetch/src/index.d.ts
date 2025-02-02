import type { PluginFunction } from '@graphql-codegen/plugin-helpers';
import type { RawConfig } from '@graphql-codegen/visitor-plugin-common';
export interface FetchPluginRawConfig extends RawConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare const plugin: PluginFunction<FetchPluginRawConfig>;
