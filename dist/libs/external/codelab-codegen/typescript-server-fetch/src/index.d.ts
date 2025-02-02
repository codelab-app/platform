import type { RawConfig } from '@graphql-codegen/visitor-plugin-common';
import { type PluginFunction } from '@graphql-codegen/plugin-helpers';
export interface ServerFetchPluginRawConfig extends RawConfig {
    gqlFn: string;
    gqlFnPath: string;
    graphqlPath: string;
}
export declare const plugin: PluginFunction<ServerFetchPluginRawConfig>;
